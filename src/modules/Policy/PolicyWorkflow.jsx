import React from 'react';
import { connect } from 'react-redux';
import { Loader, FormSpy, remoteSubmit, date, format } from '@exzeo/core-ui';
import {
  ClaimsTable,
  Gandalf,
  getConfigForJsonTransform,
  PaymentHistoryTable,
  PolicyBilling,
  callService,
  DetailsHeader
} from '@exzeo/core-ui/src/@Harmony';
import { defaultMemoize } from 'reselect';

import App from '../../components/WorkflowWrapper';
import PolicySideNav from '../../components/PolicySideNav';
import NavigationPrompt from '../../components/NavigationPrompt';
import { OpenDiariesBar } from '../Diaries';
import * as detailUtils from '../../utilities/documentDetails';
import { POLICY_RESOURCE_TYPE } from '../../constants/diaries';
import { setAppError } from '../../state/actions/error.actions';
import { getEnumsForPolicyWorkflow } from '../../state/actions/list.actions';
import {
  createTransaction,
  getPolicy,
  initializePolicyWorkflow,
  transferAOR,
  updateBillPlan,
  updatePolicy,
  getClaims
} from '../../state/actions/policy.actions';
import {
  getPolicyEffectiveDateReasons,
  getPolicyEndorsementHistory,
  getPolicyFormData
} from '../../state/selectors/policy.selectors';
import { STANDARD_DATE_FORMAT } from '../../constants/dates';
import { DEFAULT_DETAILS, BASE_MAP_URI } from '../../constants/detailHeader';

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

const getHeaderDetails = defaultMemoize(
  (policy, summaryLedger, appraisalList) => {
    if (!policy || !policy.policyNumber || !summaryLedger)
      return DEFAULT_DETAILS;

    const {
      cancelDate,
      effectiveDate,
      endDate,
      policyHolders,
      policyHolderMailingAddress: pHMA = {},
      policyID,
      policyNumber,
      product,
      property,
      sourceNumber,
      status
    } = policy;

    const {
      currentPremium,
      status: { displayText }
    } = summaryLedger;

    const {
      constructionType,
      physicalAddress,
      floodZone,
      territory
    } = property;

    const mapQuery = detailUtils.getMapQuery(physicalAddress);

    const appraisal =
      (appraisalList || []).find(
        x => x.label === property.physicalAddress.county
      ) || {};

    return {
      constructionType,
      policyID,
      policyNumber,
      sourceNumber,
      territory,
      floodZone,
      county: physicalAddress.county,
      currentPremium: currentPremium
        ? `${format.toCurrency(currentPremium)}`
        : '--',
      effectiveDate: date.formattedDate(effectiveDate, STANDARD_DATE_FORMAT),
      appraisalURI: {
        label: 'PAS',
        value: appraisal.answer
      },
      mapURI: `${BASE_MAP_URI}${mapQuery}`,
      status: `${status} / ${displayText}`,
      details: {
        product: detailUtils.getProductName(product)
      },
      policyHolder: detailUtils.getPrimaryPolicyHolder(policyHolders),
      mailingAddress: detailUtils.getMailingAddress(pHMA),
      propertyAddress: {
        address1: physicalAddress.address1,
        address2: physicalAddress.address2,
        csz: detailUtils.getCityStateZip(physicalAddress)
      },
      nonPaymentNoticeDate: detailUtils.getNonPaymentNoticeDate(
        summaryLedger,
        status
      ),
      nonPaymentNoticeDueDate: detailUtils.getNonPaymentNoticeDueDate(
        summaryLedger,
        status
      ),
      cancellation: detailUtils.getCancellationDate(
        summaryLedger,
        status,
        cancelDate,
        endDate
      ),
      sourcePath: sourceNumber ? `/quote/${sourceNumber}/coverage` : null
    };
  }
);

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
    isEndorsementCalculated: false,
    pollingFilter: null
  };

  formInstance = null;
  customHandlers = {};
  modalHandlers = {};

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

  getAllClaims = () => {
    const {
      policy: { policyNumber },
      getClaims
    } = this.props;
    getClaims(policyNumber);
  };

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

  reinstatePolicySubmit = async () => {
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

  rescindCancelSubmit = async () => {
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
      cancelOptions,
      claims,
      effectiveDateReasons,
      endorsementHistory,
      getPolicy,
      history,
      initialized,
      isLoading,
      location,
      match,
      notesSynced,
      options,
      policy,
      policyFormData,
      setAppError,
      summaryLedger,
      transferAOR,
      updateBillPlan,
      zipCodeSettings
    } = this.props;

    const {
      gandalfTemplate,
      showReinstatePolicyModal,
      showRescindCancelModal,
      showEffectiveDateChangeModal
    } = this.state;

    const headerDetails = getHeaderDetails(
      policy,
      summaryLedger,
      options.appraisers
    );
    const { currentRouteName, currentStepNumber } = getCurrentStepAndPage(
      location.pathname
    );
    const shouldUseGandalf =
      gandalfTemplate &&
      ROUTES_NOT_HANDLED_BY_GANDALF.indexOf(currentRouteName) === -1;
    const transformConfig = this.getConfigForJsonTransform(gandalfTemplate);

    // This is how to replicate 'useRef' in a Class component - sets us up for refactoring this component to functional component
    this.modalHandlers.showEffectiveDateChangeModal = this.toggleEffectiveDateChangeModal;
    this.modalHandlers.showReinstatePolicyModal = this.handleToggleReinstateModal;
    this.modalHandlers.showRescindCancelModal = this.handleToggleRescindCancelModal;
    // TODO going to use Context to pass these directly to custom components,
    //  so Gandalf does not need to know about these.
    this.customHandlers.editingDisabled = policy.editingDisabled;
    this.customHandlers.handleSubmit = this.handleGandalfSubmit;
    this.customHandlers.history = history;
    this.customHandlers.notesSynced = notesSynced;
    this.customHandlers.setAppError = setAppError;
    this.customHandlers.getPolicy = getPolicy;
    this.customHandlers.transferAOR = transferAOR;
    this.customHandlers.updateBillPlan = updateBillPlan;
    this.customHandlers.claims = claims;
    this.customHandlers.getClaims = this.getAllClaims;

    return (
      <div className="app-wrapper csr policy">
        {(isLoading || !(initialized && gandalfTemplate)) && <Loader />}

        {initialized && gandalfTemplate && (
          <App
            template={gandalfTemplate}
            headerTitle="Policy"
            pageTitle={`P: ${policy.policyNumber || ''}`}
            diaryPollingFilter={{
              resourceId: [policy.policyNumber, policy.sourceNumber],
              resourceType: POLICY_RESOURCE_TYPE
            }}
            aside={
              <aside className="content-panel-left">
                <PolicySideNav match={match} policy={policy} />
              </aside>
            }
            subHeader={
              <DetailsHeader
                context="policy"
                modalHandlers={this.modalHandlers}
                detailsFields={gandalfTemplate.header}
                headerDetails={headerDetails}
              />
            }
          >
            <div className="content-wrapper">
              <div className="route-content">
                {shouldUseGandalf && (
                  <Gandalf
                    formId={FORM_ID}
                    currentPage={currentStepNumber}
                    customComponents={this.customComponents}
                    customHandlers={this.customHandlers}
                    handleSubmit={this.handleGandalfSubmit}
                    initialValues={policyFormData}
                    options={{
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
                            history={history}
                            setAppError={setAppError}
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

            <OpenDiariesBar document={policy} />

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
                currentPremium={summaryLedger.currentPremium}
                zipCodeSettings={zipCodeSettings}
                effectiveDateReasons={effectiveDateReasons}
                getPolicy={this.props.getPolicy}
                errorHandler={this.props.setAppError}
                closeModal={this.toggleEffectiveDateChangeModal}
              />
            )}
          </App>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cancelOptions: state.policyState.cancelOptions,
    claims: state.policyState.claims,
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
    zipCodeSettings: state.service.getZipcodeSettings || {}
  };
};

export default connect(mapStateToProps, {
  createTransaction,
  getClaims,
  getEnumsForPolicyWorkflow,
  getPolicy,
  initializePolicyWorkflow,
  setAppError,
  transferAOR,
  updatePolicy,
  updateBillPlan
})(PolicyWorkflow);
