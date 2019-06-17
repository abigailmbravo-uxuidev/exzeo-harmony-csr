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
import { setAppError } from '../../state/actions/error.actions';
import { reviewQuote, updateQuote } from '../../state/actions/quote.actions';
import { getZipcodeSettings } from '../../state/actions/service.actions';
import { getEnumsForQuoteWorkflow } from '../../state/actions/list.actions';
import { getQuoteSelector } from '../../state/selectors/quote.selectors';
import { getDiariesForTable } from '../../state/selectors/diary.selectors';

import MOCK_CONFIG_DATA from '../../mock-data/mockHO3';
import { ROUTES_NOT_HANDLED_BY_GANDALF, PAGE_ROUTING } from './constants/workflowNavigation';

import Application from './Application';
import PolicyHolders from './PolicyHolders';
import NotesFiles from '../NotesFiles';
import QuoteFooter from './QuoteFooter';
import NavigationPrompt from './NavigationPrompt';
import { UNQUALIFIED_STATE } from '../../utilities/quoteState';

const getCurrentStepAndPage = defaultMemoize((pathname) => {
  const currentRouteName = pathname.split('/')[3];
  return {
    currentStepNumber: PAGE_ROUTING[currentRouteName],
    currentRouteName
  };
});

// Thin memoized wrapper around FormSpys to keep them from needlessly re-rendering.
const MemoizedFormListeners = React.memo(({ children }) => <React.Fragment>{children}</React.Fragment>);

const FORM_ID = 'QuoteWorkflowCSR';

export class QuoteWorkflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gandalfTemplate: null,
      showDiaries: false,
      applicationSent: false,
      showApplicationModal: false
    };

    this.formInstance = null;

    this.customComponents = {
      $POLICYHOLDERS: PolicyHolders,
      $APPLICATION: Application,
      $NOTES_FILES: NotesFiles,
      $AGENCY_SELECT: AgencySelect
    };

  }

  getConfigForJsonTransform = defaultMemoize(getConfigForJsonTransform);

  componentDidMount() {
    const { match, reviewQuote, getEnumsForQuoteWorkflow, getZipcodeSettings } = this.props;
    reviewQuote({ quoteNumber: match.params.quoteNumber })
      .then((quoteData) => {
        if (quoteData && quoteData.property) {
          const { companyCode, state, product, property, agencyCode, agentCode, quoteNumber } = quoteData;
          getEnumsForQuoteWorkflow({
            companyCode,
            state,
            product,
            agencyCode,
            agentCode,
            quoteNumber
          });
          getZipcodeSettings(companyCode, state, product, property.physicalAddress.zip);
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

  handleGandalfSubmit = async (values) => {
    const { location } = this.props;
    const { currentRouteName, currentStepNumber } = getCurrentStepAndPage(location.pathname);
    await this.props.updateQuote({
      data: values,
      options: {
        step: currentStepNumber,
        shouldSendApplication: currentRouteName === 'application',
      }
    });

    if (currentRouteName === 'application') {
      this.setApplicationSent(true);
      this.setShowApplicationModal(false);
    }
  };

  handleToggleDiaries = () => {
    this.setState({ showDiaries: !this.state.showDiaries });
  };

  isSubmitDisabled = (pristine, submitting) => {
    const { location, quoteData } = this.props;
    if (quoteData.quoteState === 'Application Sent DocuSign' || this.state.applicationSent) return true;

    const { currentStepNumber } = getCurrentStepAndPage(location.pathname);

    if (currentStepNumber === PAGE_ROUTING.application) {
      return UNQUALIFIED_STATE.includes(quoteData.quoteInputState) ||
        quoteData.hasActiveExceptions
    }

    if (currentStepNumber === PAGE_ROUTING.summary) {
      return UNQUALIFIED_STATE.includes(quoteData.quoteInputState) ||
        quoteData.hasUWError;
    }

    return pristine || submitting;
  };

  primaryClickHandler = () => {
    remoteSubmit(FORM_ID);
  };

  setFormInstance = (formInstance) => {
    this.formInstance = formInstance;
  };

  setApplicationSent = (applicationSent) => {
    this.setState({ applicationSent });
  };

  setShowApplicationModal = (showApplicationModal) => {
    this.setState({ showApplicationModal });

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
      quoteData,
      userProfile,
      updateQuote,
      notesSynced,
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
      notesSynced: notesSynced,
      setAppError: this.props.setAppError,
      setShowApplicationModal: this.setShowApplicationModal,
      showApplicationModal: this.state.showApplicationModal,
      toggleDiary: this.props.toggleDiary,
    };
    return (
      <div className="app-wrapper csr quote">
        {(isLoading || !quoteData.quoteNumber) &&
        <Loader/>
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
                    options={{ diaries, notes, ...options }} // enums for select/radio fields
                    path={location.pathname}
                    template={gandalfTemplate}
                    transformConfig={transformConfig}
                    stickyFooter
                    renderFooter={({ pristine, submitting, form }) => (
                      <QuoteFooter
                        currentStep={currentRouteName}
                        formInstance={form}
                        isSubmitDisabled={this.isSubmitDisabled(pristine, submitting)}
                        handlePrimaryClick={this.primaryClickHandler}
                        handleApplicationClick={() => this.setShowApplicationModal(true)}
                      />
                    )}
                    formListeners={() => (
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
                    )}
                  />
                </React.Fragment>
              }
            </div>

            <UnderwritingValidationBar
              quoteData={quoteData}
              userProfile={userProfile}
              updateQuote={updateQuote}
            />

            <OpenDiariesBar
              entityEndDate={quoteData.endDate}
              resourceId={quoteData.quoteNumber}
              resourceType={QUOTE_RESOURCE_TYPE}
            />

            {(quoteData && quoteData.quoteNumber) &&
              <DiaryPolling filter={{
                resourceId: quoteData.quoteNumber,
                resourceType: QUOTE_RESOURCE_TYPE
              }}/>
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
    quoteData: getQuoteSelector(state),
    options: state.list,
    isLoading: state.ui.isLoading,
    diaries: getDiariesForTable(state),
    notes: state.notes,
    notesSynced: state.ui.notesSynced,
    userProfile: state.authState.userProfile
  };
};

export default connect(mapStateToProps, {
  setAppError,
  reviewQuote,
  getZipcodeSettings,
  getEnumsForQuoteWorkflow,
  updateQuote,
  toggleDiary,
})(QuoteWorkflow);
