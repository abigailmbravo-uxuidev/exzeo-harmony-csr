import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from 'react';
import {
  DetailsHeader,
  Gandalf,
  AdditionalInterests,
  AdditionalInterestList,
  AddressSection,
  AgencyAgentSelect,
  Billing,
  DOM_COMPONENT_MAP,
  Summary
} from '@exzeo/core-ui/src/@Harmony';
import { Loader } from '@exzeo/core-ui';

import { QUOTE_RESOURCE_TYPE } from '../../constants/diaries';
import { useWorkflowTemplate } from '../../hooks/workflowTemplates';
import PolicyHolders from '../../components/PolicyHolders';
import AppWrapper from '../../components/WorkflowWrapper';
import SideNav from '../../components/SideNav';
import NavigationPrompt from '../../components/NavigationPrompt';
import PlusButton from '../../components/PlusButton';
import Clock from '../../components/Clock';
import UWConditions from '../../components/UWconditions';
import { OpenDiariesBar } from '../Diaries';

import { PAGE_ROUTING } from './constants/workflowNavigation';
import { getHeaderDetails, getNavLinks } from './utilities';
import { QuoteWorkflowProvider } from './context';
import Application from './Application';
import CoverageWatcherAF3 from './CoverageWatcherAF3';
import CoverageWatcherHO3 from './CoverageWatcherHO3';
import NotesFiles from '../NotesFiles';
import QuoteFooter from './QuoteFooter';
import UnderwritingValidationBar from './UnderwritingValidationBar';

// TODO these will be removed in subsequent PR's
import TTICFLAF3 from '../../csp-templates/ttic-fl-af3-quote';
import TTICFLHO3 from '../../csp-templates/ttic-fl-ho3-quote';
import HCPCNJAF3 from '../../csp-templates/hcpc-nj-af3-quote';
import HCPCSCAF3 from '../../csp-templates/hcpc-sc-af3-quote';

const TEMPLATES = {
  'TTIC:FL:AF3': TTICFLAF3,
  'TTIC:FL:HO3': TTICFLHO3,
  'HCPC:NJ:AF3': HCPCNJAF3,
  'HCPC:SC:AF3': HCPCSCAF3
};

const componentMap = {
  ...DOM_COMPONENT_MAP,
  $ADDRESS: AddressSection,
  $BILLING: Billing,
  $ADDITIONAL_INTERESTS: AdditionalInterests,
  $ADDITIONAL_INTEREST_LIST: AdditionalInterestList,
  $SUMMARY: Summary,
  $POLICYHOLDERS: PolicyHolders,
  $APPLICATION: Application,
  $NOTES_FILES: NotesFiles,
  $AGENCY_AGENT_SELECT: AgencyAgentSelect,
  $COVERAGE_WATCHER_AF3: CoverageWatcherAF3,
  $COVERAGE_WATCHER_HO3: CoverageWatcherHO3
};

const FORM_ID = 'QuoteWorkflowCSR';

export const QuoteWorkflow = ({
  history,
  match,
  isLoading,
  notes,
  options,
  quote = {},
  notesSynced,
  updateQuote,
  retrieveQuote,
  verifyQuote,
  setAppError,
  getEnumsForQuoteWorkflow,
  toggleNote
}) => {
  const { step, quoteNumber } = match.params;
  const workflowPage = PAGE_ROUTING[step];
  const template = useWorkflowTemplate(quote, 'quote', TEMPLATES, setAppError);
  const [showUWPopup, setShowUWPopup] = useState(false);
  useEffect(() => {
    retrieveQuote({ quoteNumber });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (quote.quoteNumber) {
      const { companyCode, state, product, quoteNumber } = quote;
      getEnumsForQuoteWorkflow({
        companyCode,
        state,
        product,
        quoteNumber
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quote.quoteNumber]);

  const headerDetails = useMemo(
    () => getHeaderDetails(quote, options.appraisers),
    [quote, options.appraisers]
  );

  const navLinks = useMemo(() => getNavLinks(quoteNumber), [quoteNumber]);

  const handleSubmit = useCallback(
    async values => {
      await updateQuote({
        data: values,
        options: {
          step: workflowPage,
          shouldSendApplication: workflowPage === PAGE_ROUTING.application
        }
      });
    },
    [workflowPage, updateQuote]
  );

  const customHandlers = useRef({
    notesSynced,
    setAppError
  });

  useEffect(() => {
    customHandlers.current.notesSynced = notesSynced;
  }, [notesSynced]);

  const newNote = () => {
    const { companyCode, state, product, quoteNumber } = quote;

    toggleNote({
      companyCode,
      state,
      product,
      noteType: 'Quote Note',
      documentId: quoteNumber,
      resourceType: QUOTE_RESOURCE_TYPE,
      entity: quote
    });
  };

  return (
    <QuoteWorkflowProvider
      editingDisabled={quote.editingDisabled}
      setAppError={setAppError}
      quote={quote}
      verifyQuote={verifyQuote}
      workflowPage={workflowPage}
    >
      <div className="app-wrapper csr quote">
        {(isLoading || !quote.quoteNumber) && <Loader />}

        {quote.quoteNumber && template && (
          <AppWrapper
            template={template}
            headerTitle="Quote"
            pageTitle={`Q: ${quote.quoteNumber || ''}`}
            diaryPollingFilter={{
              resourceId: quote.quoteNumber,
              resourceType: QUOTE_RESOURCE_TYPE
            }}
            aside={
              <>
                <SideNav navLinks={navLinks}>
                  {template.meta?.underwritingConditions && (
                    <li>
                      <button
                        tabIndex="0"
                        aria-label="open-btn form-newNote"
                        className="btn btn-secondary btn-xs btn-block"
                        onClick={() => setShowUWPopup(true)}
                      >
                        Underwriting Conditions
                      </button>
                    </li>
                  )}
                </SideNav>
                <PlusButton newNote={newNote} document={quote} />
                <Clock timezone={quote.property?.timezone} />
                {showUWPopup && (
                  <UWConditions
                    closePopup={() => setShowUWPopup(false)}
                    conditions={template.meta?.underwritingConditions}
                  />
                )}
              </>
            }
            subHeader={
              <DetailsHeader
                context="quote"
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
                  initialValues={quote}
                  options={{ notes, ...options }} // enums for select/radio fields
                  template={template}
                >
                  <QuoteFooter workflowPage={workflowPage} />
                  <NavigationPrompt history={history} />

                  <div id="modal-anchor" />
                </Gandalf>
              </div>
            </div>

            <div className="sidebar-wrapper">
              <OpenDiariesBar
                document={quote}
                resourceId={quote.quoteNumber}
                resourceType={QUOTE_RESOURCE_TYPE}
              />
              <UnderwritingValidationBar
                quoteData={quote}
                updateQuote={updateQuote}
              />
            </div>
          </AppWrapper>
        )}
      </div>
    </QuoteWorkflowProvider>
  );
};

export default QuoteWorkflow;
