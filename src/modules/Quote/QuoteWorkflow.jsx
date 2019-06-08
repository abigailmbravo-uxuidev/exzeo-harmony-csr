import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader, FormSpy, remoteSubmit } from '@exzeo/core-ui';
import { getConfigForJsonTransform, Gandalf, AgencySelect } from '@exzeo/core-ui/src/@Harmony';
import { defaultMemoize } from 'reselect';

import UnderwritingValidationBar from './UnderwritingValidationBar';
import App from '../../components/AppWrapper';
import OpenDiariesBar from '../../components/OpenDiariesBar';
import DiaryPolling from '../../components/DiaryPolling';
import { QUOTE_RESOURCE_TYPE } from '../../constants/diaries';
import { toggleDiary } from '../../state/actions/ui.actions';
import { setAppState } from '../../state/actions/appState.actions';
import { setAppError } from '../../state/actions/error.actions';
import { getQuote, updateQuote } from '../../state/actions/quote.actions';
import { getZipcodeSettings } from '../../state/actions/service.actions';
import { fetchNotes } from '../../state/actions/notes.actions';
import { fetchDiaries } from '../../state/actions/diary.actions';
import { getEnumsForQuoteWorkflow } from '../../state/actions/list.actions';
import { getQuoteSelector } from '../../state/selectors/quote.selectors.selectors';
import { getDiariesForTable } from '../../state/selectors/diary.selectors';

import MOCK_CONFIG_DATA from '../../mock-data/mockHO3';
import { ROUTES_NOT_HANDLED_BY_GANDALF, PAGE_ROUTING } from './constants/workflowNavigation';

import Application from './Application'
import PolicyHolders from './PolicyHolders';
import NotesFiles from '../NotesFiles';
import QuoteFooter from './QuoteFooter';
import NavigationPrompt from './NavigationPrompt';
import { QUOTE_INPUT_STATE, QUOTE_STATE, VALID_SHARE_STATE } from '../../utilities/quoteState';

const getCurrentStepAndPage = defaultMemoize((pathname) => {
  const currentRouteName = pathname.split('/')[3];
  return {
    currentStepNumber: PAGE_ROUTING[currentRouteName],
    currentRouteName,
  };
});

// Thin memoized wrapper around FormSpys to keep them from needlessly re-rendering.
const MemoizedFormListeners = React.memo(({ children }) => <React.Fragment>{children}</React.Fragment>);

const FORM_ID = 'QuoteWorkflowCSR';

export class QuoteWorkflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEmailPopup: false,
      gandalfTemplate: null,
      showDiaries: false,
      applicationSent: false,
    };

    this.formInstance = null;

    this.customComponents = {
      $POLICYHOLDERS: PolicyHolders,
      $APPLICATION: Application,
      $NOTES_FILES: NotesFiles,
      $AGENCY_SELECT: AgencySelect,
    };

  }

  getConfigForJsonTransform = defaultMemoize(getConfigForJsonTransform);

  componentDidMount() {
    const { match } = this.props;
    this.props.getQuote(match.params.quoteNumber, '').then((quoteData) => {
      if (quoteData && quoteData.property) {
        const { companyCode, state, product, property, agencyCode, agentCode } = quoteData;
        this.props.getEnumsForQuoteWorkflow({ companyCode, state, product, agencyCode, agentCode });
        this.props.getZipcodeSettings(companyCode, state, product, property.physicalAddress.zip);
      }

    });
    this.getTemplate();
  }

  getTemplate = async () => {
    // const { userProfile: { entity: { companyCode, state }} } = this.props;

    // const transferConfig = {
    //   exchangeName: 'harmony',
    //   routingKey:  'harmony.policy.retrieveDocumentTemplate',
    //   data: {
    //     companyCode,
    //     state,
    //     product: 'HO3',
    //     application: 'CSR',
    //     formName: 'quoteModel',
    //     version: date.formattedDate(undefined, date.FORMATS.SECONDARY)
    //   }
    // };

    // const response = await serviceRunner.callService(transferConfig, 'retrieveDocumentTemplate');
    this.setState(() => ({ gandalfTemplate: MOCK_CONFIG_DATA }));
  };

  handleGandalfSubmit = async ({ shouldNav, removeSecondary, options, ...values }) => {
    const { quoteData, location } = this.props;
    const { currentRouteName, currentStepNumber } = getCurrentStepAndPage(location.pathname);
    await this.props.updateQuote({
      data: values,
      options: {
        quoteData,
        step: currentStepNumber,
        shouldSendApplication: currentRouteName === 'application',
      },
    });

    if (currentRouteName === 'application'){
      this.setState({ applicationSent: true });
    }
  };

  handleToggleDiaries = () => {
    this.setState({ showDiaries: !this.state.showDiaries });
  };

  isSubmitDisabled = (pristine, submitting) => {
    const { location, quoteData } = this.props;
    if(quoteData.quoteState ==='Application Sent DocuSign' || this.state.applicationSent) return true;

    const { currentStepNumber } = getCurrentStepAndPage(location.pathname);

    if(currentStepNumber === PAGE_ROUTING.application){
      return (Array.isArray(quoteData.underwritingExceptions) &&
        quoteData.underwritingExceptions.filter(uw => !uw.overridden).length > 0);
    }

    if(currentStepNumber === PAGE_ROUTING.summary) {
      return !VALID_SHARE_STATE.includes(quoteData.quoteState) &&
        (QUOTE_STATE.QuoteStarted && quoteData.quoteInputState !== QUOTE_INPUT_STATE.Qualified);
    }

    return pristine || submitting;
  };

  primaryClickHandler = () => {
    remoteSubmit(FORM_ID);
  };

  setFormInstance = (formInstance) => {
    this.formInstance = formInstance;
  };

  render() {
    const {
      diaries,
      history,
      isLoading,
      location,
      match,
      notes,
      options,
      quoteData
    } = this.props;

    const { showDiaries, gandalfTemplate } = this.state;
    const { currentRouteName, currentStepNumber } = getCurrentStepAndPage(location.pathname);
    const shouldUseGandalf = (gandalfTemplate && ROUTES_NOT_HANDLED_BY_GANDALF.indexOf(currentRouteName) === -1);
    const transformConfig = this.getConfigForJsonTransform(gandalfTemplate);
    // TODO going to use Context to pass these directly to custom components,
    //  so Gandalf does not need to know about these.
    const customHandlers = {
      handleSubmit: this.handleGandalfSubmit,
      history: history,
      setAppError: this.props.setAppError,
      toggleDiary: this.props.toggleDiary
    };
    return (
      <div className="app-wrapper csr quote">
        {(isLoading || !quoteData.quoteNumber) &&
          <Loader />
        }

        {quoteData.quoteNumber && gandalfTemplate &&
          <App
            header={gandalfTemplate.header}
            context={match.path.split('/')[1]}
            resourceType={QUOTE_RESOURCE_TYPE}
            resourceId={quoteData.quoteNumber}
            pageTitle={`Q: ${quoteData.quoteNumber || ''}`}
            match={match}
            onToggleDiaries={this.handleToggleDiaries}
            showDiaries={showDiaries}
          >
              <React.Fragment>
                <div className="content-wrapper">
                  {shouldUseGandalf &&
                  <React.Fragment>
                    <Gandalf
                      formId={FORM_ID}
                      className="route-content"
                      currentPage={currentStepNumber}
                      customComponents={this.customComponents}
                      customHandlers={customHandlers}
                      handleSubmit={this.handleGandalfSubmit}
                      initialValues={quoteData}
                      options={{ diaries, notes, ...options}} // enums for select/radio fields
                      path={location.pathname}
                      template={gandalfTemplate}
                      transformConfig={transformConfig}
                      stickyFooter
                      renderFooter={({ pristine, submitting, form }) =>
                        <QuoteFooter
                          currentStep={currentRouteName}
                          formInstance={form}
                          isSubmitDisabled={this.isSubmitDisabled(pristine, submitting)}
                          handlePrimaryClick={this.primaryClickHandler}
                        />
                      }
                      formListeners={() =>
                        <MemoizedFormListeners>
                          <FormSpy subscription={{}}>
                            {({ form }) => {
                              this.setFormInstance(form);
                              return null;
                            }}
                          </FormSpy>

                          <FormSpy subscription={{ dirty: true, pristine: true }}>
                            {({ dirty }) =>
                              <NavigationPrompt dirty={dirty} formInstance={this.formInstance} history={history} />
                            }
                          </FormSpy>
                        </MemoizedFormListeners>
                      }
                    />
                  </React.Fragment>
                }
              </div>

              <UnderwritingValidationBar />

              <OpenDiariesBar
                entityEndDate={quoteData.endDate}
                resourceId={quoteData.quoteNumber}
                resourceType={QUOTE_RESOURCE_TYPE}
              />

              {(quoteData && quoteData.quoteNumber) &&
                <DiaryPolling filter={{ resourceId: quoteData.quoteNumber, resourceType: QUOTE_RESOURCE_TYPE }} />
              }

            </React.Fragment>
          </App>
        }
      </div>
    );
  }
}

QuoteWorkflow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

const mapStateToProps = state => {
  return {
    appState: state.appState,
    quoteData: getQuoteSelector(state),
    options: state.list,
    isLoading: state.ui.isLoading,
    diaries: getDiariesForTable(state),
    notes: state.notes
  }
};

export default connect(mapStateToProps, {
  setAppState,
  setAppError,
  getQuote,
  getZipcodeSettings,
  getEnumsForQuoteWorkflow,
  updateQuote,
  fetchNotes,
  toggleDiary,
  fetchDiaries
})(QuoteWorkflow);
