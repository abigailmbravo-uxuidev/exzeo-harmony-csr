import React from 'react';
import { connect } from 'react-redux';
import { Loader, FormSpy, remoteSubmit, date } from '@exzeo/core-ui';
import {
  ClaimsTable,
  Gandalf,
  getConfigForJsonTransform,
  PaymentHistoryTable,
  PolicyBilling,
  callService
} from '@exzeo/core-ui/src/@Harmony';
import { defaultMemoize } from 'reselect';

import App from '../../components/AppWrapper';
import DiaryPolling from '../../components/DiaryPolling';
import NavigationPrompt from '../../components/NavigationPrompt';
import OpenDiariesBar from '../../components/OpenDiariesBar';
import { POLICY_RESOURCE_TYPE } from '../../constants/diaries';
import { setAppError } from '../../state/actions/error.actions';
import { getEnumsForPolicyWorkflow } from '../../state/actions/list.actions';
import {
  createTransaction,
  getPolicy,
  initializePolicyWorkflow,
  transferAOR,
  updateBillPlan,
  updatePolicy
} from '../../state/actions/policy.actions';
import { toggleDiary } from '../../state/actions/ui.actions';
import { getDiariesForTable } from '../../state/selectors/diary.selectors';
import {
  getPolicyEffectiveDateReasons,
  getPolicyEndorsementHistory,
  getPolicyFormData
} from '../../state/selectors/policy.selectors';

import NotesFiles from '../NotesFiles';
import PolicyHolders from '../Quote/PolicyHolders';
import Appraiser from './Appraiser';
import Billing from './Billing';
import BillingTable from './BillingTable';
import CancelReason from './CancelReason';
import CancelType from './CancelType';
import {
  PAGE_ROUTING,
  ROUTES_NOT_HANDLED_BY_GANDALF
} from './constants/workflowNavigation';
import EffectiveDateModal from './EffectiveDateModal';
import EndorsementsMenu from './EndorsementsMenu';
import EndorsementsWatcherAF3 from './EndorsementsWatcherAF3';
import EndorsementsWatcherHO3 from './EndorsementsWatcherHO3';
import PolicyFooter from './PolicyFooter';
import PolicyholderAgent from './PolicyholderAgent';
import PreviousEndorsements from './PreviousEndorsements';
import ReinstatePolicyModal from './ReinstatePolicyModal';
import RescindCancelModal from './RescindCancelModal';

import TTICFLAF3 from '../../csp-templates/ttic-fl-af3-policy';
import TTICFLHO3 from '../../csp-templates/ttic-fl-ho3-policy';
import HCPCNJAF3 from '../../csp-templates/hcpc-nj-af3-policy';
import HCPCSCAF3 from '../../csp-templates/hcpc-sc-af3-policy';

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

const FORM_ID = 'PolicyWorkflowCSR';

export class PolicyWorkflow extends React.Component {
  state = {
    gandalfTemplate: null,
    showDiaries: false,
    showReinstatePolicyModal: false,
    showEffectiveDateChangeModal: false,
    showRescindCancelModal: false,
    isEndorsementCalculated: false
  };

  formInstance = null;

  customComponents = {
    $BILLING: Billing,
    $BILLING_TABLE: BillingTable,
    $APPRAISER: Appraiser,
    $NOTES_FILES: NotesFiles,
    $POLICYHOLDER_AGENT: PolicyholderAgent,
    $CANCEL_TYPE: CancelType,
    $CANCEL_REASON: CancelReason,
    $CLAIMS_TABLE: ClaimsTable,
    $POLICY_BILLING: PolicyBilling,
    $PAYMENT_HISTORY_TABLE: PaymentHistoryTable,
    $ENDORSEMENTS_MENU: EndorsementsMenu,
    $ENDORSEMENTS_WATCHER_HO3: EndorsementsWatcherHO3,
    $ENDORSEMENTS_WATCHER_AF3: EndorsementsWatcherAF3,
    $PREVIOUS_ENDORSEMENTS: PreviousEndorsements,
    $POLICYHOLDERS: PolicyHolders
  };

  getConfigForJsonTransform = defaultMemoize(getConfigForJsonTransform);

  componentDidMount() {
    const {
      getEnumsForPolicyWorkflow,
      initializePolicyWorkflow,
      match: {
        params: { policyNumber }
      }
    } = this.props;

    initializePolicyWorkflow(policyNumber).then(policy => {
      getEnumsForPolicyWorkflow(policy);
    });
    this.getTemplate();
  }

  componentDidUpdate(prevProps) {
    const { policy } = this.props;
    const { policy: prevPolicy } = prevProps;
    if ((policy || {}).product !== (prevPolicy || {}).product) {
      this.getTemplate();
    }
  }

  getTemplate = async () => {
    const { companyCode, state, product } = this.props.policy;
    const templateKey = `${companyCode}:${state}:${product}`;
    this.setState(() => ({ gandalfTemplate: TEMPLATES[templateKey] }));
  };

  handleGandalfSubmit = async values => {
    const { location, zipCodeSettings } = this.props;
    const { currentRouteName, currentStepNumber } = getCurrentStepAndPage(
      location.pathname
    );

    await this.props.updatePolicy({
      data: values,
      options: {
        step: currentStepNumber,
        cancelPolicy: currentRouteName === 'cancel',
        endorsePolicy: currentRouteName === 'endorsements',
        zipCodeSettings
      }
    });
  };

  handleToggleDiaries = () => {
    this.setState({ showDiaries: !this.state.showDiaries });
  };

  isSubmitDisabled = (pristine, submitting) => {
    const { policy } = this.props;
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

  handleToggleRescindCancelModal = () => {
    this.setState(state => ({
      showRescindCancelModal: !state.showRescindCancelModal
    }));
  };

  toggleEffectiveDateChangeModal = () => {
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

  rescindCancelSubmit = async data => {
    const {
      policy: { policyNumber },
      getPolicy,
      setAppError
    } = this.props;

    const config = {
      exchangeName: 'harmony',
      routingKey: 'harmony.policy.rescindCancellation',
      data: { policyNumber }
    };

    await callService(config, 'rescindCancellation').catch(err => {
      setAppError(err);
      this.handleToggleRescindCancelModal();
    });

    await getPolicy(policyNumber);
    this.handleToggleRescindCancelModal();
  };

  render() {
    const {
      diaries,
      history,
      isLoading,
      location,
      match,
      options,
      policy,
      notesSynced,
      initialized,
      policyFormData,
      zipCodeSettings,
      cancelOptions,
      effectiveDateReasons,
      endorsementHistory
    } = this.props;

    const {
      gandalfTemplate,
      showDiaries,
      showReinstatePolicyModal,
      showRescindCancelModal,
      showEffectiveDateChangeModal
    } = this.state;

    const modalHandlers = {
      showEffectiveDateChangeModal: this.toggleEffectiveDateChangeModal,
      showReinstatePolicyModal: this.handleToggleReinstateModal,
      showRescindCancelModal: this.handleToggleRescindCancelModal
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
      toggleDiary: this.props.toggleDiary,
      getPolicy: this.props.getPolicy,
      transferAOR: this.props.transferAOR,
      updateBillPlan: this.props.updateBillPlan
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
                  <div className="route-content">
                    {shouldUseGandalf && (
                      <Gandalf
                        formId={FORM_ID}
                        currentPage={currentStepNumber}
                        customComponents={this.customComponents}
                        customHandlers={customHandlers}
                        handleSubmit={this.handleGandalfSubmit}
                        initialValues={policyFormData}
                        options={{
                          diaries,
                          ...options,
                          cancelOptions,
                          zipCodeSettings,
                          endorsementHistory
                        }} // enums for select/radio fields
                        path={location.pathname}
                        template={gandalfTemplate}
                        transformConfig={transformConfig}
                      >
                        <FormSpy
                          subscription={{
                            pristine: true,
                            submitting: true,
                            dirtyFields: true,
                            invalid: true
                          }}
                        >
                          {({ form, pristine, submitting }) => (
                            <div className="form-footer">
                              <PolicyFooter
                                history={customHandlers.history}
                                setAppError={customHandlers.setAppError}
                                policyFormData={policyFormData}
                                timezone={zipCodeSettings.timezone}
                                currentStep={currentRouteName}
                                formInstance={form}
                                isSubmitDisabled={this.isSubmitDisabled(
                                  pristine,
                                  submitting
                                )}
                                handleGandalfSubmit={this.handleGandalfSubmit}
                                handlePrimaryClick={this.primaryClickHandler}
                              />
                            </div>
                          )}
                        </FormSpy>
                        <FormSpy subscription={{}}>
                          {({ form }) => {
                            this.setFormInstance(form);
                            return null;
                          }}
                        </FormSpy>

                        <FormSpy subscription={{ dirty: true, pristine: true }}>
                          {({ dirty }) => (
                            <NavigationPrompt
                              dirty={dirty}
                              formInstance={this.formInstance}
                              history={history}
                            />
                          )}
                        </FormSpy>
                        <div id="modal-anchor" />
                      </Gandalf>
                    )}
                  </div>
                </div>
              )}

              {initialized && (
                <OpenDiariesBar
                  entity={policy}
                  resourceId={policy.policyNumber}
                  resourceType={POLICY_RESOURCE_TYPE}
                />
              )}

              {showReinstatePolicyModal && (
                <ReinstatePolicyModal
                  reinstatePolicySubmit={this.reinstatePolicySubmit}
                  closeModal={this.handleToggleReinstateModal}
                  policyNumber={policy.policyNumber}
                />
              )}

              {showRescindCancelModal && (
                <RescindCancelModal
                  rescindCancelSubmit={this.rescindCancelSubmit}
                  closeModal={this.handleToggleRescindCancelModal}
                  policyNumber={policy.policyNumber}
                />
              )}

              {showEffectiveDateChangeModal && (
                <EffectiveDateModal
                  initialValues={{
                    policyNumber: policy.policyNumber,
                    effectiveDate: date.formatDate(
                      policy.effectiveDate,
                      date.FORMATS.SECONDARY
                    ),
                    effectiveDateChangeReason: ''
                  }}
                  zipCodeSettings={zipCodeSettings}
                  effectiveDateReasons={effectiveDateReasons}
                  getPolicy={this.props.getPolicy}
                  errorHandler={this.props.setAppError}
                  closeModal={this.toggleEffectiveDateChangeModal}
                />
              )}

              {policy && policy.policyNumber && policy.sourceNumber && (
                <DiaryPolling
                  filter={{
                    resourceId: [policy.policyNumber, policy.sourceNumber],
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

const mapStateToProps = state => {
  return {
    cancelOptions: state.policyState.cancelOptions,
    diaries: getDiariesForTable(state),
    effectiveDateReasons: getPolicyEffectiveDateReasons(state),
    initialized: !!(
      state.policyState.policy.policyID && state.policyState.summaryLedger._id
    ),
    isLoading: state.ui.isLoading,
    notesSynced: state.ui.notesSynced,
    options: state.list,
    policy: state.policyState.policy,
    endorsementHistory: getPolicyEndorsementHistory(state),
    policyFormData: getPolicyFormData(state),
    summaryLedger: state.policyState.summaryLedger,
    userProfile: state.authState.userProfile,
    zipCodeSettings: state.service.getZipcodeSettings || {}
  };
};

export default connect(mapStateToProps, {
  createTransaction,
  getPolicy,
  getEnumsForPolicyWorkflow,
  initializePolicyWorkflow,
  setAppError,
  transferAOR,
  toggleDiary,
  updatePolicy,
  updateBillPlan
})(PolicyWorkflow);
