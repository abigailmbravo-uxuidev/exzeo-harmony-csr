import React from 'react';
import { connect } from 'react-redux';
import { Loader, FormSpy, remoteSubmit, format, date } from '@exzeo/core-ui';
import {
  AgencyAgentSelect,
  getConfigForJsonTransform,
  Gandalf,
  DetailsHeader
} from '@exzeo/core-ui/src/@Harmony';

import { defaultMemoize } from 'reselect';

import { QUOTE_RESOURCE_TYPE } from '../../constants/diaries';
import { STANDARD_DATE_FORMAT } from '../../constants/dates';
import { DEFAULT_DETAILS, BASE_MAP_URI } from '../../constants/detailHeader';
import { UNQUALIFIED_STATE, QUOTE_STATE } from '../../utilities/quoteState';
import * as detailUtils from '../../utilities/documentDetails';
import { setAppError } from '../../state/actions/error.actions';
import {
  retrieveQuote,
  updateQuote,
  verifyQuote
} from '../../state/actions/quote.actions';
import { getZipcodeSettings } from '../../state/actions/service.actions';
import { getEnumsForQuoteWorkflow } from '../../state/actions/list.actions';
import { getQuoteSelector } from '../../state/selectors/quote.selectors';
import App from '../../components/WorkflowWrapper';
import NavigationPrompt from '../../components/NavigationPrompt';
import QuoteSideNav from '../../components/QuoteSideNav';
import { OpenDiariesBar } from '../Diaries';

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

const getHeaderDetails = defaultMemoize((quote, appraisalList) => {
  if (!quote || !quote.quoteNumber) return DEFAULT_DETAILS;

  const {
    product,
    quoteNumber,
    quoteState,
    policyHolders,
    policyHolderMailingAddress: pHMA = {},
    property,
    effectiveDate,
    rating = {},
    policyNumber,
    endDate
  } = quote;

  const { constructionType, floodZone, physicalAddress, territory } = property;

  const mapQuery = detailUtils.getMapQuery(physicalAddress);

  const appraisal =
    (appraisalList || []).find(
      x => x.label === property.physicalAddress.county
    ) || {};

  return {
    constructionType,
    floodZone,
    currentPremium: rating.totalPremium
      ? `${format.toCurrency(rating.totalPremium)}`
      : '--',
    territory,
    county: physicalAddress.county,
    effectiveDate: date.formattedDate(effectiveDate, STANDARD_DATE_FORMAT),
    endDate: date.formattedDate(endDate, STANDARD_DATE_FORMAT),
    appraisalURI: {
      label: 'PAS',
      value: appraisal.answer
    },
    mapURI: `${BASE_MAP_URI}${mapQuery}`,
    status: quoteState,
    details: {
      product: detailUtils.getProductName(product),
      quoteNumber
    },
    policyHolder: detailUtils.getPrimaryPolicyHolder(policyHolders),
    mailingAddress: detailUtils.getMailingAddress(pHMA),
    propertyAddress: {
      address1: physicalAddress.address1,
      address2: physicalAddress.address2,
      csz: detailUtils.getCityStateZip(physicalAddress)
    },
    policyNumber,
    sourcePath: policyNumber ? `/policy/${policyNumber}/coverage` : null,
    showPolicyLink: quoteState === 'Policy Issued'
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
      history,
      isLoading,
      location,
      match,
      notes,
      options,
      quote,
      updateQuote,
      notesSynced
    } = this.props;

    const { gandalfTemplate } = this.state;

    const headerDetails = getHeaderDetails(quote, options.appraisers);
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
            template={gandalfTemplate}
            headerTitle="Quote"
            pageTitle={`Q: ${quote.quoteNumber || ''}`}
            diaryPollingFilter={{
              resourceId: quote.quoteNumber,
              resourceType: QUOTE_RESOURCE_TYPE
            }}
            aside={
              <aside className="content-panel-left">
                <QuoteSideNav match={match} quote={quote} />
              </aside>
            }
            subHeader={
              <DetailsHeader
                context="quote"
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
                    customHandlers={customHandlers}
                    handleSubmit={this.handleGandalfSubmit}
                    initialValues={quote}
                    options={{ notes, ...options }} // enums for select/radio fields
                    path={location.pathname}
                    template={gandalfTemplate}
                    transformConfig={transformConfig}
                  >
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
                          handleApplicationClick={this.handleRetrieveQuote}
                        />
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

            <UnderwritingValidationBar
              quoteData={quote}
              updateQuote={updateQuote}
            />

            <OpenDiariesBar
              document={quote}
              resourceId={quote.quoteNumber}
              resourceType={QUOTE_RESOURCE_TYPE}
            />
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
    notes: state.notes,
    notesSynced: state.ui.notesSynced
  };
};

export default connect(mapStateToProps, {
  setAppError,
  retrieveQuote,
  verifyQuote,
  getZipCodeSettings: getZipcodeSettings,
  getEnumsForQuoteWorkflow,
  updateQuote
})(QuoteWorkflow);
