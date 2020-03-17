import React from 'react';
import { connect } from 'react-redux';
import { Loader, FormSpy, remoteSubmit } from '@exzeo/core-ui';
import {
  AgencyAgentSelect,
  getConfigForJsonTransform,
  Gandalf
} from '@exzeo/core-ui/src/@Harmony';

import { defaultMemoize } from 'reselect';

import { QUOTE_RESOURCE_TYPE } from '../../constants/diaries';
import { toggleDiary } from '../../state/actions/ui.actions';
import { setAppError } from '../../state/actions/error.actions';
import {
  retrieveQuote,
  updateQuote,
  verifyQuote
} from '../../state/actions/quote.actions';
import { getZipcodeSettings } from '../../state/actions/service.actions';
import { getEnumsForQuoteWorkflow } from '../../state/actions/list.actions';
import { getQuoteSelector } from '../../state/selectors/quote.selectors';
import { getDiariesForTable } from '../../state/selectors/diary.selectors';
import { UNQUALIFIED_STATE, QUOTE_STATE } from '../../utilities/quoteState';

import App from '../../components/AppWrapper';
import OpenDiariesBar from '../../components/OpenDiariesBar';
import DiaryPolling from '../../components/DiaryPolling';
import NavigationPrompt from '../../components/NavigationPrompt';

import {
  ROUTES_NOT_HANDLED_BY_GANDALF,
  PAGE_ROUTING
} from './constants/workflowNavigation';

import Application from './Application';
import PolicyHolders from './PolicyHolders';
import NotesFiles from '../NotesFiles';
import QuoteFooter from './QuoteFooter';
import UnderwritingValidationBar from './UnderwritingValidationBar';
import CoverageWatcherAF3 from './CoverageWatcherAF3';
import CoverageWatcherHO3 from './CoverageWatcherHO3';

// TODO these will be removed in subsequent PR's
import TTICFLAF3 from '../../csp-templates/ttic-fl-af3-quote';
import TTICFLHO3 from '../../csp-templates/ttic-fl-ho3-quote';
import HCPCNJAF3 from '../../csp-templates/hcpc-nj-af3-quote';
import HCPCSCAF3 from '../../csp-templates/hcpc-sc-af3-quote';

const getCurrentStepAndPage = defaultMemoize(pathname => {
  const currentRouteName = pathname.split('/')[3];
  return {
    currentStepNumber: PAGE_ROUTING[currentRouteName],
    currentRouteName
  };
});

const TEMPLATES = {
  'TTIC:FL:AF3': TTICFLAF3,
  'TTIC:FL:HO3': TTICFLHO3,
  'HCPC:NJ:AF3': HCPCNJAF3,
  'HCPC:SC:AF3': HCPCSCAF3
};

const FORM_ID = 'QuoteWorkflowCSR';

export class QuoteWorkflow extends React.Component {
  state = {
    gandalfTemplate: null,
    showDiaries: false,
    applicationSent: false,
    showApplicationModal: false
  };

  formInstance = null;

  customComponents = {
    $POLICYHOLDERS: PolicyHolders,
    $APPLICATION: Application,
    $NOTES_FILES: NotesFiles,
    $AGENCY_AGENT_SELECT: AgencyAgentSelect,
    $COVERAGE_WATCHER_AF3: CoverageWatcherAF3,
    $COVERAGE_WATCHER_HO3: CoverageWatcherHO3
  };

  getConfigForJsonTransform = defaultMemoize(getConfigForJsonTransform);

  componentDidMount() {
    const {
      match,
      retrieveQuote,
      getEnumsForQuoteWorkflow,
      getZipCodeSettings
    } = this.props;
    retrieveQuote({ quoteNumber: match.params.quoteNumber }).then(quote => {
      if (quote && quote.property) {
        const {
          companyCode,
          state,
          product,
          property,
          agencyCode,
          agentCode,
          quoteNumber
        } = quote;

        getEnumsForQuoteWorkflow({
          companyCode,
          state,
          product,
          agencyCode,
          agentCode,
          quoteNumber
        });
        getZipCodeSettings(
          companyCode,
          state,
          product,
          property.physicalAddress.zip,
          property.id
        );
      }
    });
    this.getTemplate();
  }

  componentDidUpdate(prevProps) {
    const { quote } = this.props;
    const { quote: prevQuote } = prevProps;
    if ((quote || {}).product !== (prevQuote || {}).product) {
      this.getTemplate();
    }
  }

  getTemplate = async () => {
    const { companyCode, state, product } = this.props.quote;
    const templateKey = `${companyCode}:${state}:${product}`;
    this.setState(() => ({ gandalfTemplate: TEMPLATES[templateKey] }));
  };

  handleGandalfSubmit = async values => {
    const { location } = this.props;
    const { currentRouteName, currentStepNumber } = getCurrentStepAndPage(
      location.pathname
    );
    await this.props.updateQuote({
      data: values,
      options: {
        step: currentStepNumber,
        shouldSendApplication: currentRouteName === 'application'
      }
    });

    if (currentRouteName === 'application') {
      this.setApplicationSent(true);
      this.setState({ showApplicationModal: false });
    }
  };

  handleRetrieveQuote = async () => {
    const {
      quote: { quoteNumber },
      verifyQuote,
      setAppError
    } = this.props;
    const { ApplicationReady } = QUOTE_STATE;

    try {
      const { quoteState } = await verifyQuote({ quoteNumber });
      quoteState !== ApplicationReady
        ? setAppError({
            message: `The Quote Status is no longer ${ApplicationReady}, please review the Qualifier Status message(s).`
          })
        : this.setState({ showApplicationModal: true });
    } catch (error) {
      setAppError({ message: `Error with verify quote: ${error}` });
    }
  };

  handleToggleDiaries = () => {
    this.setState({ showDiaries: !this.state.showDiaries });
  };

  isSubmitDisabled = (pristine, submitting, values) => {
    const { location, quote } = this.props;
    if (quote.editingDisabled || this.state.applicationSent) return true;

    const { currentStepNumber } = getCurrentStepAndPage(location.pathname);

    if (currentStepNumber === PAGE_ROUTING.billing) {
      return pristine || submitting || !values.billToId;
    }

    if (currentStepNumber === PAGE_ROUTING.application) {
      return (
        UNQUALIFIED_STATE.includes(quote.quoteInputState) ||
        quote.blockSendApplication
      );
    }

    if (currentStepNumber === PAGE_ROUTING.summary) {
      return (
        UNQUALIFIED_STATE.includes(quote.quoteInputState) ||
        quote.blockQuoteSummary
      );
    }

    return pristine || submitting;
  };

  primaryClickHandler = () => {
    remoteSubmit(FORM_ID);
  };

  setFormInstance = formInstance => {
    this.formInstance = formInstance;
  };

  setApplicationSent = applicationSent => {
    this.setState({ applicationSent });
  };

  setShowApplicationModal = showApplicationModal => {
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
      quote,
      userProfile,
      updateQuote,
      notesSynced
    } = this.props;

    const { showDiaries, gandalfTemplate } = this.state;
    const { currentRouteName, currentStepNumber } = getCurrentStepAndPage(
      location.pathname
    );
    const shouldUseGandalf =
      gandalfTemplate &&
      ROUTES_NOT_HANDLED_BY_GANDALF.indexOf(currentRouteName) === -1;
    const transformConfig = this.getConfigForJsonTransform(gandalfTemplate);
    // TODO going to use Context to pass these directly to custom components,
    //  so Gandalf does not need to know about these.
    const customHandlers = {
      editingDisabled: quote.editingDisabled,
      handleSubmit: this.handleGandalfSubmit,
      history: history,
      notesSynced: notesSynced,
      setAppError: this.props.setAppError,
      setShowApplicationModal: this.setShowApplicationModal,
      showApplicationModal: this.state.showApplicationModal,
      toggleDiary: this.props.toggleDiary
    };
    return (
      <div className="app-wrapper csr quote">
        {(isLoading || !quote.quoteNumber) && <Loader />}

        {quote.quoteNumber && gandalfTemplate && (
          <App
            header={gandalfTemplate.header}
            context={match.path.split('/')[1]}
            resourceType={QUOTE_RESOURCE_TYPE}
            resourceId={quote.quoteNumber}
            pageTitle={`Q: ${quote.quoteNumber || ''}`}
            match={match}
            onToggleDiaries={this.handleToggleDiaries}
            showDiaries={showDiaries}
          >
            <React.Fragment>
              <div className="content-wrapper">
                <div className="route-content">
                  {shouldUseGandalf && (
                    <React.Fragment>
                      <Gandalf
                        formId={FORM_ID}
                        currentPage={currentStepNumber}
                        customComponents={this.customComponents}
                        customHandlers={customHandlers}
                        handleSubmit={this.handleGandalfSubmit}
                        initialValues={quote}
                        options={{ diaries, notes, ...options }} // enums for select/radio fields
                        path={location.pathname}
                        template={gandalfTemplate}
                        transformConfig={transformConfig}
                        stickyFooter
                        renderFooter={
                          <FormSpy
                            subscription={{
                              pristine: true,
                              submitting: true,
                              values: true
                            }}
                          >
                            {({ form, pristine, submitting, values }) => (
                              <QuoteFooter
                                currentStep={currentRouteName}
                                formInstance={form}
                                isSubmitDisabled={this.isSubmitDisabled(
                                  pristine,
                                  submitting,
                                  values
                                )}
                                handlePrimaryClick={this.primaryClickHandler}
                                handleApplicationClick={
                                  this.handleRetrieveQuote
                                }
                              />
                            )}
                          </FormSpy>
                        }
                        formListeners={
                          <React.Fragment>
                            <FormSpy subscription={{}}>
                              {({ form }) => {
                                this.setFormInstance(form);
                                return null;
                              }}
                            </FormSpy>

                            <FormSpy
                              subscription={{ dirty: true, pristine: true }}
                            >
                              {({ dirty }) => (
                                <NavigationPrompt
                                  dirty={dirty}
                                  formInstance={this.formInstance}
                                  history={history}
                                />
                              )}
                            </FormSpy>
                          </React.Fragment>
                        }
                      />
                    </React.Fragment>
                  )}
                </div>
              </div>

              <UnderwritingValidationBar
                quoteData={quote}
                userProfile={userProfile}
                updateQuote={updateQuote}
              />

              <OpenDiariesBar
                entity={quote}
                resourceId={quote.quoteNumber}
                resourceType={QUOTE_RESOURCE_TYPE}
              />

              {quote && quote.quoteNumber && (
                <DiaryPolling
                  filter={{
                    resourceId: quote.quoteNumber,
                    resourceType: QUOTE_RESOURCE_TYPE
                  }}
                />
              )}
            </React.Fragment>
          </App>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    quote: getQuoteSelector(state),
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
  retrieveQuote,
  verifyQuote,
  getZipCodeSettings: getZipcodeSettings,
  getEnumsForQuoteWorkflow,
  updateQuote,
  toggleDiary
})(QuoteWorkflow);
