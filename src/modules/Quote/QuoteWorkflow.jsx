import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Loader, Button } from '@exzeo/core-ui';
import { Gandalf, getConfigForJsonTransform } from '@exzeo/core-ui/src/@Harmony';
import { defaultMemoize } from 'reselect';

import UnderwritingValidationBarConnect from '../../components/Quote/UnderwritingValidationBar';
import App from '../../components/AppWrapper';
import OpenDiariesBar from '../../components/OpenDiariesBar';
import DiaryPolling from '../../components/DiaryPolling';
import { QUOTE_RESOURCE_TYPE } from '../../constants/diaries';
import { setAppState } from '../../state/actions/appState.actions';
import { setAppError } from '../../state/actions/error.actions';
import { getQuote, updateQuote } from '../../state/actions/quote.actions';
import { getAgencies, getAgentsByAgencyCode } from '../../state/actions/agency.actions';
import { getZipcodeSettings, getUnderwritingQuestions } from '../../state/actions/service.actions';
import { getEnumsForQuoteWorkflow, getBillingOptions } from '../../state/actions/list.actions';
import { getQuoteSelector } from '../../state/selectors/choreographer.selectors';
import { getFormattedUWQuestions } from '../../state/selectors/underwritingQuestions.selectors';
// import Footer from '../../components/Common/Footer';
// import AdditionalInterests from '../../components/Quote/AdditionalInterests';
import NotesFiles from '../../components/Quote/NotesFiles';
import Application from './Application'
import MOCK_CONFIG_DATA from '../../mock-data/mockHO3';

import { ROUTES_NOT_HANDLED_BY_GANDALF, ROUTES_NOT_USING_FOOTER, PAGE_ROUTING } from './constants/workflowNavigation';
import { getAgentList, getAgencyList } from '../../state/selectors/agency.selector';
import choreographer, { startWorkflow, formatForSubmit } from '../../utilities/choreographer';
import PolicyHolders from './Coverage/PolicyHolders';
import QuoteFooter from './QuoteFooter';

const FORM_ID = 'QuoteWorkflowCSR';

export class QuoteBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEmailPopup: false,
      gandalfTemplate: null,
      showDiaries: false,
      formReset: null,
      submitting: false,
      applicationSent: false
    };

    this.formRef = React.createRef();

    this.customComponents = {
      $POLICYHOLDERS: PolicyHolders,
      $APPLICATION: Application
    };

  }

  getConfigForJsonTransform = defaultMemoize(getConfigForJsonTransform);

  componentDidMount() {
    const { match } = this.props;


    this.props.getQuote(match.params.quoteNumber, '').then((quoteData) => {
      if (quoteData && quoteData.property) {
        const { companyCode, state, product, property } = quoteData;
        this.props.getEnumsForQuoteWorkflow({ companyCode, state, product, property });
        this.props.getAgencies(quoteData.companyCode, quoteData.state);
        this.props.getAgentsByAgencyCode(quoteData.agencyCode);
        this.props.getZipcodeSettings(quoteData.companyCode, quoteData.state, quoteData.product, quoteData.property.physicalAddress.zip);
        this.props.getUnderwritingQuestions(quoteData.companyCode, quoteData.state, quoteData.product, quoteData.property);
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

  getBillingOptions = () => {
    const { quoteData } = this.props;
    this.props.getBillingOptions(quoteData);
  };

  handleToggleDiaries = () => {
    this.setState({ showDiaries: !this.state.showDiaries });
  };

  primaryClickHandler = () => {
    // ie11 does not handle customEvents the same way as other browsers. So here we have to check before creating
    // this custom submit event - this is being used to submit the form from outside of the form.
    const form = document.getElementById(FORM_ID);
    if (typeof (Event) === 'function') {
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    } else {
      const event = document.createEvent('Event');
      event.initEvent('submit', true, true);
      form.dispatchEvent(event);
    }
  };

  handleGandalfSubmit = async ({ shouldNav, options, ...values }) => {
    const { quoteData } = this.props;
    const currentStep = this.props.location.pathname.split('/')[3];
    const { modelName, submitData, pageName } = formatForSubmit(values, currentStep, this.props);
    await this.props.updateQuote({ data: submitData, modelName, pageName, quoteData, options });
    if(currentStep === 'application'){
      this.setState({ applicationSent: true });

    }
  };

  getLocalState = () => {
    return this.state;
  };


  setShowEmailPopup = (showEmailPopup) => {
    this.setState(() => ({ showEmailPopup }));
  };

  handleAgencyChange = (agencyCode, onChange) =>  {
    this.props.getAgentsByAgencyCode(agencyCode);
    return onChange(agencyCode);
  };

  render() {
    const {
      quoteData,
      match,
      location,
      history,
      agencies,
      options
    } = this.props;

    const { showDiaries, needsConfirmation, gandalfTemplate } = this.state;

    const currentStep = location.pathname.split('/')[3];
    const shouldUseGandalf = (gandalfTemplate && ROUTES_NOT_HANDLED_BY_GANDALF.indexOf(currentStep) === -1);
    const shouldRenderFooter = ROUTES_NOT_USING_FOOTER.indexOf(currentStep) === -1;
    const currentPage = PAGE_ROUTING[currentStep];
    const transformConfig = this.getConfigForJsonTransform(gandalfTemplate);
    const disableForApplication = (Array.isArray(quoteData.underwritingExceptions) && 
    quoteData.underwritingExceptions.filter(uw => !uw.overridden).length > 0 && 
    PAGE_ROUTING.application === currentPage);
    const checkApplicationSent = quoteData.quoteState ==='Application Sent DocuSign' || this.state.applicationSent
    const notOnApplication = PAGE_ROUTING.application !== currentPage;

    // TODO going to use Context to pass these directly to custom components,
    //  so Gandalf does not need to know about these.
    const customHandlers = {
      setEmailPopup: this.setShowEmailPopup,
      getState: this.getLocalState,
      handleSubmit: this.handleGandalfSubmit,
      history: history,
      handleAgencyChange: this.handleAgencyChange,
      getBillingOptions: this.getBillingOptions,
    };
    return (
      <div className="app-wrapper csr quote">
        {(this.props.isLoading || !quoteData.quoteNumber) && <Loader />}
        {quoteData.quoteNumber && <App
          header={gandalfTemplate ? gandalfTemplate.header : {}}
          context={match.path.split('/')[1]}
          resourceType={QUOTE_RESOURCE_TYPE}
          resourceId={quoteData.quoteNumber}
          pageTitle={`Q: ${quoteData.quoteNumber || ''}`}
          match={match}
          onToggleDiaries={this.handleToggleDiaries}
          showDiaries={showDiaries}
          render={() => (
            <React.Fragment>

              <div className="content-wrapper">
                {shouldUseGandalf &&
                <React.Fragment>
                  <Gandalf
                    ref={this.formRef}
                    formId={FORM_ID}
                    className="route-content"
                    currentPage={currentPage}
                    handleSubmit={this.handleGandalfSubmit}
                    initialValues={quoteData}
                    template={gandalfTemplate}
                    options={{ agencies, ...options}} // enums for select/radio fields
                    transformConfig={transformConfig}
                    path={location.pathname}
                    customHandlers={customHandlers}
                    customComponents={this.customComponents}
                    stickyFooter={true}
                    renderFooter={({ pristine, submitting, form }) => shouldRenderFooter &&
                      <QuoteFooter
                        handlePrimaryClick={this.primaryClickHandler}
                        handlResetForm={form.reset}
                        currentStep={currentStep}
                        submitting={submitting}
                        isPrimaryDisabled={(notOnApplication && (pristine || submitting)) || disableForApplication || checkApplicationSent}
                      />
                    }
                  />




                </React.Fragment>
                }
                {/* <Route exact path={`${match.url}/coverage`} render={props => <Coverage {...props} match={match} updateQuote={this.updateQuote} />} /> */}
                {/* <Route exact path={`${match.url}/billing`} render={props => <MailingAddressBilling  {...props} match={match} updateQuote={this.updateQuote} />} /> */}
                <Route exact path={`${match.url}/notes`} render={props => <NotesFiles {...props} match={match} updateQuote={this.updateQuote} />} />
                {/* <Route exact path={`${match.url}/summary`} render={props => <Summary {...props} match={match} updateQuote={this.updateQuote} />} /> */}
                {/* <Route exact path={`${match.url}/additionalInterests`} render={props => <AdditionalInterests {...props} match={match} updateQuote={this.updateQuote} />} /> */}
                {/* <Route exact path={`${match.url}/underwriting`} render={props => <Underwriting {...props} match={match} updateQuote={this.updateQuote} />} /> */}
                {/* <Route exact path={`${match.url}/application`} render={props => <Application {...props} match={match} updateQuote={this.updateQuote} />} /> */}
              </div>

              <UnderwritingValidationBarConnect />

              <OpenDiariesBar
                entityEndDate={quoteData.endDate}
                resourceId={quoteData.quoteNumber}
                resourceType={QUOTE_RESOURCE_TYPE} />

              {(quoteData && quoteData.quoteNumber) &&
              <DiaryPolling filter={{ resourceId: quoteData.quoteNumber, resourceType: QUOTE_RESOURCE_TYPE }} />
              }

            </React.Fragment>
          )} />}
      </div>
    );
  }
}

QuoteBase.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

const mapStateToProps = state => {
  return {
    appState: state.appState,
    quoteData: getQuoteSelector(state),
    agents: getAgentList(state),
    agencies: getAgencyList(state),
    zipCodeSettings: state.service.getZipcodeSettings,
    underwritingQuestions: getFormattedUWQuestions(state),
    billingConfig: state.list.billingConfig,
    options: state.list,
    isLoading: state.ui.isLoading
  }
};

export default connect(mapStateToProps, {
  startWorkflow,
  setAppState,
  setAppError,
  getQuote,
  getAgencies,
  getAgentsByAgencyCode,
  getZipcodeSettings,
  getUnderwritingQuestions,
  getBillingOptions,
  getEnumsForQuoteWorkflow,
  updateQuote
})(QuoteBase);
