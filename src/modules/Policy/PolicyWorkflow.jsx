import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Loader, FormSpy, remoteSubmit, date } from '@exzeo/core-ui';
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import {
  getConfigForJsonTransform,
  Gandalf,
  ClaimsTable,
  PolicyBilling,
  PaymentHistoryTable
} from '@exzeo/core-ui/src/@Harmony';
import { defaultMemoize } from 'reselect';

import { POLICY_RESOURCE_TYPE } from '../../constants/diaries';
import { toggleDiary } from '../../state/actions/ui.actions';
import { setAppError } from '../../state/actions/error.actions';
import { getEnumsForPolicyWorkflow } from '../../state/actions/list.actions';
import {
  createTransaction,
  getPolicy,
  initializePolicyWorkflow,
  transferAOR,
  updatePolicy,
  updateBillPlan
} from '../../state/actions/policy.actions';
import { getDiariesForTable } from '../../state/selectors/diary.selectors';
import {
  getPolicyFormData,
  getPolicyEffectiveDateReasons,
  getPolicyEndorsementHistory
} from '../../state/selectors/policy.selectors';

import App from '../../components/AppWrapper';
import OpenDiariesBar from '../../components/OpenDiariesBar';
import DiaryPolling from '../../components/DiaryPolling';
import NavigationPrompt from '../../components/NavigationPrompt';

import {
  ROUTES_NOT_HANDLED_BY_GANDALF,
  PAGE_ROUTING
} from './constants/workflowNavigation';

import Billing from './Billing';
import BillingTable from './BillingTable';
import Appraiser from './Appraiser';
import NotesFiles from '../NotesFiles';
import PolicyholderAgent from './PolicyholderAgent';
import PolicyFooter from './PolicyFooter';
import CancelType from './CancelType';
import CancelReason from './CancelReason';
import EffectiveDateModal from './EffectiveDateModal';
import ReinstatePolicyModal from './ReinstatePolicyModal';

// TODO these will be removed in subsequent PR's
import { startWorkflow, completeTask } from '../../utilities/cg';
import MOCK_CONFIG_DATA from '../../mock-data/mockPolicyHO3';
import EndorsementsMenu from './EndorsementsMenu';
import EndorsementsWatcher from './EndorsementsWatcher';
import PreviousEndorsements from './PreviousEndorsements';
import PolicyHolders from '../Quote/PolicyHolders';

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

const TEMPLATES = {
  AF3: MOCK_AF3,
  HO3: MOCK_HO3
};

const FORM_ID = 'PolicyWorkflowCSR';

export class PolicyWorkflow extends React.Component {
  state = {
    gandalfTemplate: null,
    showDiaries: false,
    showReinstatePolicyModal: false,
    showEffectiveDateChangeModal: false,
    isEndorsementCalculated: false,
    calculatedRate: null
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
    $ENDORSEMENTS_WATCHER: EndorsementsWatcher,
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

    initializePolicyWorkflow(policyNumber);
    getEnumsForPolicyWorkflow({ policyNumber });
    this.getTemplate();
  }

  // Temp fix for quote not being in state when component mounts on refresh (mostly a development time problem)
  componentDidUpdate(prevProps) {
    const { policy } = this.props;
    const { policy: prevPolicy } = prevProps;
    if ((policy || {}).product !== (prevPolicy || {}).product) {
      this.getTemplate();
    }
  }

  getTemplate = async () => {
    const { policy } = this.props;
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
    const { product } = policy;
    if (product) {
      this.setState(() => ({ gandalfTemplate: TEMPLATES[product] }));
    }
  };

  handleGandalfSubmit = async values => {
    const { location, zipCodeSettings } = this.props;
    const { currentRouteName, currentStepNumber } = getCurrentStepAndPage(
      location.pathname
    );

    const response = await this.props.updatePolicy({
      data: values,
      options: {
        step: currentStepNumber,
        cancelPolicy: currentRouteName === 'cancel',
        endorsePolicy: currentRouteName === 'endorsements',
        zipCodeSettings,
        isRateCalculated: this.state.calculatedRate
      }
    });

    if (response && response.rating) {
      this.setState(state => ({
        calculatedRate: response.rating
      }));
    } else if (
      currentRouteName === 'endorsements' &&
      response &&
      !response.error
    ) {
      this.setState(state => ({
        calculatedRate: null
      }));
    }
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

  setEndorsementFormInstance = formInstance => {
    this.endorsementFormInstance = formInstance;
  };

  handleToggleReinstateModal = () => {
    this.setState(state => ({
      showReinstatePolicyModal: !state.showReinstatePolicyModal
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

  changeEffectiveDate = async data => {
    const { zipCodeSettings, policy, getPolicy } = this.props;

    // const effectiveDateUTC = date.formattedDate(
    //   data.effectiveDate,
    //   date.FORMATS.SECONDARY,
    //   zipCodeSettings.timezone
    // );

    const effectiveDateUTC = date.formatToUTC(
      date.formatDate(data.effectiveDate, date.FORMATS.SECONDARY),
      zipCodeSettings.timezone
    );

    const startResult = await startWorkflow({
      modelName: 'effectiveDateChangeModel',
      data: {
        policyNumber: policy.policyNumber,
        policyID: policy.policyID
      }
    });

    await completeTask({
      stepName: 'saveEffectiveDate',
      workflowId: startResult.modelInstanceId,
      data: {
        policyNumber: policy.policyNumber,
        policyID: policy.policyID,
        effectiveDateChangeReason: data.effectiveDateChangeReason,
        effectiveDate: effectiveDateUTC
      }
    }).catch(err => {
      this.props.setAppError(err);
      this.toggleEffectiveDateChangeModal;
    });
    //This gets scheduled so the status may not be changed yet when calling getPolicy. Reference HAR-5228
    await new Promise(resolve => setTimeout(resolve, 3000));
    await getPolicy(policy.policyNumber);
    this.toggleEffectiveDateChangeModal();
  };

  handleEndoresementReset = async data => {
    this.formInstance.reset();
    this.setState(state => ({
      calculatedRate: null
    }));
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
      showEffectiveDateChangeModal
    } = this.state;

    const modalHandlers = {
      showEffectiveDateChangeModal: this.toggleEffectiveDateChangeModal,
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
                  {shouldUseGandalf && (
                    <React.Fragment>
                      <Gandalf
                        formId={FORM_ID}
                        className="route-content"
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
                        stickyFooter={true}
                        renderFooter={({ pristine, submitting, form }) => (
                          <PolicyFooter
                            setEndorsementFormInstance={
                              this.setEndorsementFormInstance
                            }
                            currentStep={currentRouteName}
                            formInstance={form}
                            calculatedRate={this.state.calculatedRate}
                            handleEndorsementReset={
                              this.handleEndoresementReset
                            }
                            isSubmitDisabled={this.isSubmitDisabled(
                              pristine,
                              submitting
                            )}
                            handlePrimaryClick={this.primaryClickHandler}
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

                            <FormSpy
                              subscription={{ dirtySinceLastSubmit: true }}
                            >
                              {({ dirtySinceLastSubmit }) => {
                                if (
                                  this.state.calculatedRate &&
                                  dirtySinceLastSubmit
                                ) {
                                  this.endorsementFormInstance.reset();
                                  this.setState(state => ({
                                    calculatedRate: null
                                  }));
                                }
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
                  closeModal={this.handleToggleReinstateModal}
                  policyNumber={policy.policyNumber}
                />
              )}

              {showEffectiveDateChangeModal && (
                <EffectiveDateModal
                  initialValues={{
                    effectiveDate: date.formatDate(
                      policy.effectiveDate,
                      date.FORMATS.SECONDARY
                    ),
                    effectiveDateChangeReason: ''
                  }}
                  effectiveDateReasons={effectiveDateReasons}
                  changeEffectiveDateSubmit={this.changeEffectiveDate}
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

export default connect(
  mapStateToProps,
  {
    createTransaction,
    getPolicy,
    getEnumsForPolicyWorkflow,
    initializePolicyWorkflow,
    setAppError,
    transferAOR,
    toggleDiary,
    updatePolicy,
    updateBillPlan
  }
)(PolicyWorkflow);
