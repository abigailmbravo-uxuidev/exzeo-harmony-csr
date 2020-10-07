import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef
} from 'react';
import { date, Loader } from '@exzeo/core-ui';
import {
  DetailsHeader,
  Gandalf,
  AdditionalInterests,
  AddressSection,
  DOM_COMPONENT_MAP,
  Summary
} from '@exzeo/core-ui/src/@Harmony';

import { POLICY_RESOURCE_TYPE } from '../../constants/diaries';
import { useWorkflowTemplate } from '../../hooks/workflowTemplates';
import AppWrapper from '../../components/WorkflowWrapper';
import SideNav from '../../components/SideNav';
import NavigationPrompt from '../../components/NavigationPrompt';
import PolicyHolders from '../../components/PolicyHolders';
import GenerateDocsForm from '../../components/GenerateDocsForm';
import Clock from '../../components/Clock';
import PlusButton from '../../components/PlusButton';
import { OpenDiariesBar } from '../Diaries';

import { PAGE_ROUTING } from './constants/workflowNavigation';
import { getHeaderDetails, getNavLinks } from './utilities';
import ReinstatePolicyModal from './ReinstatePolicyModal';
import RescindCancelModal from './RescindCancelModal';
import EffectiveDateModal from './EffectiveDateModal';
import Billing from './Billing';
import BillingDetails from './BillingDetails';
import Appraiser from './Appraiser';
import NotesFiles from '../NotesFiles';
import PolicyholderAgent from './PolicyholderAgent';
import CancelType from './CancelType';
import CancelReason from './CancelReason';
import PaymentHistoryTable from './PaymentHistoryTable';
import EndorsementsMenu from './EndorsementsMenu';
import EndorsementsWatcherHO3 from './EndorsementsWatcherHO3';
import EndorsementsWatcherAF3 from './EndorsementsWatcherAF3';
import PreviousEndorsements from './PreviousEndorsements';
import BillingSection from './BillingSection';
import Claims from './Claims';
import PolicyFooter from './PolicyFooter';

import TTICFLAF3 from '../../csp-templates/ttic-fl-af3-policy';
import TTICFLHO3 from '../../csp-templates/ttic-fl-ho3-policy';
import HCPCNJAF3 from '../../csp-templates/hcpc-nj-af3-policy';
import HCPCSCAF3 from '../../csp-templates/hcpc-sc-af3-policy';
import { PolicyWorkflowProvider } from './context';

const componentMap = {
  ...DOM_COMPONENT_MAP,
  $ADDRESS: AddressSection,
  $ADDITIONAL_INTERESTS: AdditionalInterests,
  $SUMMARY: Summary,
  $BILLING: Billing,
  $BILLING_DETAILS: BillingDetails,
  $POLICY_BILLING: BillingSection,
  $APPRAISER: Appraiser,
  $NOTES_FILES: NotesFiles,
  $POLICYHOLDER_AGENT: PolicyholderAgent,
  $CANCEL_TYPE: CancelType,
  $CANCEL_REASON: CancelReason,
  $CLAIMS_TABLE: Claims,
  $PAYMENT_HISTORY_TABLE: PaymentHistoryTable,
  $ENDORSEMENTS_MENU: EndorsementsMenu,
  $ENDORSEMENTS_WATCHER_HO3: EndorsementsWatcherHO3,
  $ENDORSEMENTS_WATCHER_AF3: EndorsementsWatcherAF3,
  $PREVIOUS_ENDORSEMENTS: PreviousEndorsements,
  $POLICYHOLDERS: PolicyHolders
};

const TEMPLATES = {
  'TTIC:FL:AF3': TTICFLAF3,
  'TTIC:FL:HO3': TTICFLHO3,
  'HCPC:NJ:AF3': HCPCNJAF3,
  'HCPC:SC:AF3': HCPCSCAF3
};

const FORM_ID = 'PolicyWorkflowCSR';

export const PolicyWorkflow = ({
  cancelOptions,
  effectiveDateReasons,
  endorsementHistory,
  getPolicy,
  history,
  initialized,
  isLoading,
  match,
  notesSynced,
  options,
  policy,
  policyFormData,
  setAppError,
  summaryLedger,
  zipCodeSettings,
  updatePolicy,
  initializePolicyWorkflow,
  getEnumsForPolicyWorkflow,
  updateBillPlan,
  transferAOR,
  setNotesSynced,
  toggleNote
}) => {
  const { step, policyNumber } = match.params;
  const workflowPage = PAGE_ROUTING[step];
  const template = useWorkflowTemplate(policy, TEMPLATES, setAppError);

  const [showEffectiveDate, setShowEffectiveDate] = useState(false);
  const [showReinstatePolicy, setShowReinstatePolicy] = useState(false);
  const [showRescindCancellation, setShowRescindCancellation] = useState(false);
  const [showDocsForm, setShowDocsForm] = useState(false);

  useEffect(() => {
    initializePolicyWorkflow(policyNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (policy.policyNumber) {
      getEnumsForPolicyWorkflow(policy);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [policy.policyNumber]);

  const navLinks = useMemo(() => getNavLinks(policyNumber), [policyNumber]);

  const headerDetails = useMemo(
    () => getHeaderDetails(policy, summaryLedger, options.appraisers),
    [policy, summaryLedger, options.appraisers]
  );

  const handleSubmit = useCallback(
    async values => {
      await updatePolicy({
        data: values,
        options: {
          step,
          cancelPolicy: workflowPage === PAGE_ROUTING.cancel,
          endorsePolicy: workflowPage === PAGE_ROUTING.endorsements,
          zipCodeSettings
        }
      });
    },
    [workflowPage, updatePolicy, zipCodeSettings, step]
  );

  const newNote = () => {
    const { companyCode, state, product, policyNumber, sourceNumber } = policy;

    toggleNote({
      companyCode,
      state,
      product,
      noteType: 'Policy Note',
      documentId: policyNumber,
      sourceNumber,
      resourceType: POLICY_RESOURCE_TYPE,
      entity: policy
    });
  };

  const modalHandlers = {
    showEffectiveDateChangeModal: () => setShowEffectiveDate(s => !s),
    showReinstatePolicyModal: () => setShowReinstatePolicy(s => !s),
    showRescindCancelModal: () => setShowRescindCancellation(s => !s)
  };

  const customHandlers = useRef({
    notesSynced,
    setAppError
  });

  useEffect(() => {
    customHandlers.current.notesSynced = notesSynced;
  }, [notesSynced]);

  return (
    <PolicyWorkflowProvider
      setAppError={setAppError}
      getPolicy={getPolicy}
      updateBillPlan={updateBillPlan}
      transferAOR={transferAOR}
    >
      <div className="app-wrapper csr policy">
        {(isLoading || (!initialized && template)) && <Loader />}

        {initialized && template && (
          <AppWrapper
            template={template}
            headerTitle="Policy"
            pageTitle={`P: ${policy.policyNumber || ''}`}
            diaryPollingFilter={{
              resourceId: [policy.policyNumber, policy.sourceNumber],
              resourceType: POLICY_RESOURCE_TYPE
            }}
            aside={
              <>
                <SideNav navLinks={navLinks}>
                  <li>
                    <button
                      aria-label="open-btn"
                      className="btn btn-primary btn-sm btn-block"
                      data-test="generate-document-btn"
                      onClick={() => setShowDocsForm(s => !s)}
                    >
                      <i className="fa fa-plus" />
                      Document
                    </button>
                  </li>
                  <li
                    className={
                      showDocsForm
                        ? 'document-panel show'
                        : 'document-panel hidden'
                    }
                  >
                    {showDocsForm && (
                      <GenerateDocsForm
                        policy={policy}
                        updateNotes={() => setNotesSynced()}
                        errorHandler={setAppError}
                      />
                    )}
                  </li>
                </SideNav>
                <PlusButton newNote={newNote} document={policy} />
                <Clock timezone={policy.property?.timezone} />
              </>
            }
            subHeader={
              <DetailsHeader
                context="policy"
                modalHandlers={modalHandlers}
                detailsFields={template.header}
                headerDetails={headerDetails}
              />
            }
          >
            <div className="content-wrapper">
              <div className="route-content">
                <Gandalf
                  formId={FORM_ID}
                  currentPage={workflowPage}
                  componentMap={componentMap}
                  customHandlers={customHandlers.current}
                  handleSubmit={handleSubmit}
                  manualSubmit={handleSubmit}
                  initialValues={policyFormData}
                  options={{
                    ...options,
                    cancelOptions,
                    zipCodeSettings,
                    endorsementHistory
                  }} // enums for select/radio fields
                  template={template}
                >
                  <div className="form-footer">
                    <PolicyFooter
                      editingDisabled={policy.editingDisabled}
                      timezone={zipCodeSettings.timezone}
                      history={history}
                      errorHandler={setAppError}
                      policyFormData={policyFormData}
                      manualSubmit={handleSubmit}
                      workflowPage={workflowPage}
                    />
                  </div>
                  <NavigationPrompt history={history} />
                  <div id="modal-anchor" />
                </Gandalf>
              </div>
            </div>
            <div className="sidebar-wrapper">
              <OpenDiariesBar document={policy} />
            </div>
            {showReinstatePolicy && (
              <ReinstatePolicyModal
                policy={policy}
                getPolicy={getPolicy}
                errorHandler={setAppError}
                closeModal={() => setShowReinstatePolicy(false)}
              />
            )}

            {showRescindCancellation && (
              <RescindCancelModal
                policyNumber={policy.policyNumber}
                getPolicy={getPolicy}
                errorHandler={setAppError}
                closeModal={() => setShowRescindCancellation(false)}
              />
            )}

            {showEffectiveDate && (
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
                getPolicy={getPolicy}
                errorHandler={setAppError}
                closeModal={() => setShowEffectiveDate(false)}
              />
            )}
          </AppWrapper>
        )}
      </div>
    </PolicyWorkflowProvider>
  );
};

export default PolicyWorkflow;
