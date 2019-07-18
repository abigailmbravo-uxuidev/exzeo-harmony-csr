import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import _find from 'lodash/find';

import { Loader, FormSpy, remoteSubmit } from '@exzeo/core-ui';
import {
  getConfigForJsonTransform,
  Gandalf
} from '@exzeo/core-ui/src/@Harmony';
import { defaultMemoize } from 'reselect';

import App from '../../components/AppWrapper';
import OpenDiariesBar from '../../components/OpenDiariesBar';
import DiaryPolling from '../../components/DiaryPolling';
import { POLICY_RESOURCE_TYPE } from '../../constants/diaries';
import { toggleDiary } from '../../state/actions/ui.actions';
import { getUIQuestions } from '../../state/actions/questions.actions';
import { getDiariesForTable } from '../../state/selectors/diary.selectors';
import { setAppError } from '../../state/actions/error.actions';
import { setAppState } from '../../state/actions/appState.actions';
import {
  getZipcodeSettings,
  getAgents,
  getAgency
} from '../../state/actions/service.actions';
import { fetchNotes } from '../../state/actions/notes.actions';

import EditEffectiveDataModal from '../../components/Policy/EditEffectiveDatePopup';
import ReinstatePolicyModal from '../../components/Policy/ReinstatePolicyPopup';
import Coverage from '../../components/Policy/Coverage';
import PolicyHolder from '../../components/Policy/PolicyholderAgent';
import Billing from '../../components/Policy/MortgageBilling';
import Notes from '../../components/Notes';
import Cancel from '../../components/Policy/Cancel';
import Endorsements from '../../components/Policy/Endorsements';

import {
  createTransaction,
  getBillingOptionsForPolicy,
  getEffectiveDateChangeReasons,
  getPolicy,
  getPaymentOptionsApplyPayments,
  getPaymentHistory,
  getCancelOptions,
  getEndorsementHistory,
  initializePolicyWorkflow
} from '../../state/actions/policy.actions';

import MOCK_CONFIG_DATA from '../../mock-data/mockPolicyHO3';
import {
  ROUTES_NOT_HANDLED_BY_GANDALF,
  PAGE_ROUTING
} from './constants/workflowNavigation';

// TODO: Move this into a component folder
import NavigationPrompt from '../Quote/NavigationPrompt';
import BillingTable from './BillingTable';
import Appraiser from './Appraiser';
import NotesFiles from '../NotesFiles';
import PolicyholderAgent from './PolicyholderAgent';
import PolicyFooter from './PolicyFooter';

const getCurrentStepAndPage = defaultMemoize(pathname => {
  const currentRouteName = pathname.split('/')[3];
  return {
    currentStepNumber: PAGE_ROUTING[currentRouteName],
    currentRouteName
  };
});

// Thin memoized wrapper around FormSpys to keep them from needlessly re-rendering.
const MemoizedFormListeners = React.memo(({ children }) => (
  <React.Fragment>{children}</React.Fragment>
));

const FORM_ID = 'PolicyWorkflowCSR';

export class PolicyWorkflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gandalfTemplate: null,
      showDiaries: false,
      showReinstatePolicyModal: false,
      showEffectiveDateChangeModal: false
    };

    this.formInstance = null;

    this.customComponents = {
      $BILLING_TABLE: BillingTable,
      $APPRAISER: Appraiser,
      $NOTES_FILES: NotesFiles,
      $POLICYHOLDER_AGENT: PolicyholderAgent
    };
  }

  getConfigForJsonTransform = defaultMemoize(getConfigForJsonTransform);

  componentDidMount() {
    const {
      initializePolicyWorkflow,
      getUIQuestions,
      match: {
        params: { policyNumber }
      }
    } = this.props;

    initializePolicyWorkflow(policyNumber);
    getUIQuestions('propertyAppraisalCSR');
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

  handleGandalfSubmit = async values => {
    const { location } = this.props;
    const { currentRouteName, currentStepNumber } = getCurrentStepAndPage(
      location.pathname
    );
    // await this.props.updateQuote({
    //   data: values,
    //   options: {
    //     step: currentStepNumber,
    //     shouldSendApplication: currentRouteName === 'application'
    //   }
    // });

    // if (currentRouteName === 'application') {
    //   this.setApplicationSent(true);
    //   this.setShowApplicationModal(false);
    // }
  };

  handleToggleDiaries = () => {
    this.setState({ showDiaries: !this.state.showDiaries });
  };

  isSubmitDisabled = (pristine, submitting) => {
    const { location, policy } = this.props;
    if (policy.editingDisabled) return true;
    return pristine || submitting;
  };

  primaryClickHandler = () => {
    remoteSubmit(FORM_ID);
  };

  setFormInstance = formInstance => {
    this.formInstance = formInstance;
  };

  handleToggleReinstateModal = () => {
    this.setState(state => ({
      showReinstatePolicyModal: !state.showReinstatePolicyModal
    }));
  };

  handleToggleEffectiveDateChangeModal = () => {
    this.setState(state => ({
      showEffectiveDateChangeModal: !state.showEffectiveDateChangeModal
    }));
  };

  reinstatePolicySubmit = async data => {
    const { policy, summaryLedger, createTransaction, getPolicy } = this.props;

    const submitData = {
      policyID: policy.policyID,
      policyNumber: policy.policyNumber,
      billingStatus: summaryLedger.status.code,
      transactionType: 'Reinstatement'
    };
    await createTransaction(submitData);
    await getPolicy(policy.policyNumber);
    this.handleToggleReinstateModal();
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
      policy,
      userProfile,
      notesSynced,
      initialized,
      summaryLedger,
      questions
    } = this.props;

    const {
      gandalfTemplate,
      showDiaries,
      showReinstatePolicyModal,
      showEffectiveDateChangeModal
    } = this.state;

    const modalHandlers = {
      showEffectiveDateChangeModal: this.handleToggleEffectiveDateChangeModal,
      showReinstatePolicyModal: this.handleToggleReinstateModal
    };

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
      editingDisabled: policy.editingDisabled,
      handleSubmit: this.handleGandalfSubmit,
      history: history,
      notesSynced: notesSynced,
      setAppError: this.props.setAppError,
      setShowApplicationModal: this.setShowApplicationModal,
      showApplicationModal: this.state.showApplicationModal,
      toggleDiary: this.props.toggleDiary
    };
    return (
      <div className="app-wrapper csr policy">
        {(isLoading || !policy.policyNumber) && <Loader />}

        {policy.policyNumber && gandalfTemplate && (
          <App
            header={gandalfTemplate.header}
            context={match.path.split('/')[1]}
            resourceType={POLICY_RESOURCE_TYPE}
            resourceId={policy.policyNumber}
            pageTitle={`P: ${policy.policyNumber || ''}`}
            match={match}
            onToggleDiaries={this.handleToggleDiaries}
            showDiaries={showDiaries}
            modalHandlers={modalHandlers}
          >
            <React.Fragment>
              {initialized && (
                <div className="content-wrapper">
                  {shouldUseGandalf && (
                    <React.Fragment>
                      <Gandalf
                        formId={FORM_ID}
                        className="route-content"
                        currentPage={currentStepNumber}
                        customComponents={this.customComponents}
                        customHandlers={customHandlers}
                        handleSubmit={this.handleGandalfSubmit}
                        initialValues={{
                          ...policy,
                          summaryLedger
                        }}
                        options={{ diaries, notes, ...options, questions }} // enums for select/radio fields
                        path={location.pathname}
                        template={gandalfTemplate}
                        transformConfig={transformConfig}
                        stickyFooter
                        renderFooter={({ pristine, submitting, form }) => (
                          <PolicyFooter />
                        )}
                        formListeners={() => (
                          <MemoizedFormListeners>
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
                          </MemoizedFormListeners>
                        )}
                      />
                    </React.Fragment>
                  )}
                  <Route
                    exact
                    path={`${match.url}/billing`}
                    render={props => <Billing {...props} />}
                  />
                  <Route
                    exact
                    path={`${match.url}/cancel`}
                    render={props => <Cancel {...props} />}
                  />
                  <Route
                    exact
                    path={`${match.url}/endorsements`}
                    render={props => (
                      <Endorsements {...props} params={match.params} />
                    )}
                  />
                </div>
              )}

              {initialized && (
                <OpenDiariesBar
                  entityEndDate={policy.endDate}
                  resourceId={policy.policyNumber}
                  resourceType={POLICY_RESOURCE_TYPE}
                />
              )}

              {showReinstatePolicyModal && (
                <ReinstatePolicyModal
                  reinstatePolicySubmit={this.reinstatePolicySubmit}
                  hideReinstatePolicyModal={this.handleToggleReinstateModal}
                />
              )}

              {showEffectiveDateChangeModal && (
                <EditEffectiveDataModal
                  changeEffectiveDateSubmit={this.changeEffectiveDate}
                  hideEffectiveDateModal={
                    this.handleToggleEffectiveDateChangeModal
                  }
                />
              )}

              {policy && policy.policyNumber && (
                <DiaryPolling
                  filter={{
                    resourceId: policy.policyNumber,
                    resourceType: POLICY_RESOURCE_TYPE
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

PolicyWorkflow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

const mapStateToProps = state => {
  return {
    options: state.list,
    isLoading: state.ui.isLoading,
    diaries: getDiariesForTable(state),
    notes: state.notes,
    notesSynced: state.ui.notesSynced,
    userProfile: state.authState.userProfile,
    appState: state.appState,
    authState: state.authState,
    initialized: !!(
      state.policyState.policy.policyID && state.policyState.summaryLedger._id
    ),
    policy: state.policyState.policy,
    summaryLedger: state.policyState.summaryLedger,
    zipCodeSettings: state.service.getZipcodeSettings,
    questions: state.questions
  };
};

export default connect(
  mapStateToProps,
  {
    createTransaction,
    getAgents,
    getAgency,
    getEffectiveDateChangeReasons,
    getBillingOptionsForPolicy,
    getCancelOptions,
    getEndorsementHistory,
    getPaymentHistory,
    getPaymentOptionsApplyPayments,
    getPolicy,
    getZipCodeSettings: getZipcodeSettings,
    setAppState,
    toggleDiary,
    initializePolicyWorkflow,
    getUIQuestions,
    setAppError
  }
)(PolicyWorkflow);
