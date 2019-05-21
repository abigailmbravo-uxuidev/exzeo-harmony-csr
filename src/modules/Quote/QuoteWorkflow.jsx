import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Prompt } from 'react-router-dom';
import { Loader, Alert, Button } from '@exzeo/core-ui';
import { getConfigForJsonTransform, Gandalf } from '@exzeo/core-ui/src/@Harmony';
import { defaultMemoize } from 'reselect';

import UnderwritingValidationBarConnect from '../../components/Quote/UnderwritingValidationBar';
import App from '../../components/AppWrapper';
import OpenDiariesBar from '../../components/OpenDiariesBar';
import DiaryPolling from '../../components/DiaryPolling';
import { QUOTE_RESOURCE_TYPE } from '../../constants/diaries';
import { toggleDiary } from '../../state/actions/ui.actions';
import { setAppState } from '../../state/actions/appState.actions';
import { setAppError } from '../../state/actions/error.actions';
import { getQuote, updateQuote } from '../../state/actions/quote.actions';
import { getAgencies, getAgentsByAgencyCode } from '../../state/actions/agency.actions';
import { getZipcodeSettings, getNotes } from '../../state/actions/service.actions';
import { fetchDiaries } from '../../state/actions/diary.actions';
import { getEnumsForQuoteWorkflow } from '../../state/actions/list.actions';
import { getQuoteSelector } from '../../state/selectors/choreographer.selectors';
import { getAgentList, getAgencyList } from '../../state/selectors/agency.selector';
import { getDiariesForTable } from '../../state/selectors/diary.selectors';

import MOCK_CONFIG_DATA from '../../mock-data/mockHO3';
import { ROUTES_NOT_HANDLED_BY_GANDALF, ROUTES_NOT_USING_FOOTER, PAGE_ROUTING } from './constants/workflowNavigation';
import { formatForSubmit } from '../../utilities/choreographer';

import Application from './Application'
import PolicyHolders from './PolicyHolders';
import NotesFiles from '../NotesFiles';
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
      applicationSent: false,
      hasUnsavedChanges: false,
      nextLocation: null,
      confirmedNavigation: false
    };

    this.formInstance = null;

    this.customComponents = {
      $POLICYHOLDERS: PolicyHolders,
      $APPLICATION: Application,
      $NOTESFILES: NotesFiles
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
        this.props.fetchDiaries({ resourceId: quoteData.quoteNumber, resourceType: QUOTE_RESOURCE_TYPE });
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
    if (currentStep === 'application'){
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

  getNotes = () => {
    const { quoteData } = this.props;
    this.props.getNotes(quoteData.quoteNumber);
  };

  setFormInstance = (formInstance) => {
    this.formInstance = formInstance;
  };

  handleBlockedNavigation = (nextLocation) => {
    const { confirmedNavigation } = this.state;
    if(!confirmedNavigation) {
    this.toggleUnsavedChanges();
    this.setState(() => ({ nextLocation }));
    return false;
    } 
    // TODO: Need to reset the form instead of using confirmedNavigation state 
    this.setState(() => ({ confirmedNavigation: false }));
    return true;
  }

  toggleUnsavedChanges = () => {
    const { hasUnsavedChanges } = this.state;
    this.setState(() => ({ hasUnsavedChanges: !hasUnsavedChanges }));
  }

  handleConfirmNavigationClick = () => {
    const { history } = this.props;
    const { nextLocation } = this.state;
    this.setState({
      confirmedNavigation: true
   }, () => {
      this.formInstance.reset();
      this.toggleUnsavedChanges();
      history.push(nextLocation.pathname);
   })
  }

  setIsDirty = (isDirty) => {
    this.setState(() => ({ isDirty }));
  };


  render() {
    const {
      agencies,
      diaries,
      history,
      isLoading,
      location,
      match,
      notes,
      options,
      quoteData,
    } = this.props;

    const { showDiaries, gandalfTemplate } = this.state;

    const currentStep = location.pathname.split('/')[3];
    const shouldUseGandalf = (gandalfTemplate && ROUTES_NOT_HANDLED_BY_GANDALF.indexOf(currentStep) === -1);
    const shouldRenderFooter = ROUTES_NOT_USING_FOOTER.indexOf(currentStep) === -1;
    const currentPage = PAGE_ROUTING[currentStep];
    const transformConfig = this.getConfigForJsonTransform(gandalfTemplate);

    const checkApplicationSent = quoteData.quoteState ==='Application Sent DocuSign' || this.state.applicationSent;
    const onApplication = PAGE_ROUTING.application === currentPage;

    const disableForApplication = onApplication && (Array.isArray(quoteData.underwritingExceptions) &&
    quoteData.underwritingExceptions.filter(uw => !uw.overridden).length > 0 && onApplication);

    const disableForShare = PAGE_ROUTING.summary === currentPage && !['Qualified','Ready'].includes(quoteData.quoteInputState);
    
    // TODO going to use Context to pass these directly to custom components,
    //  so Gandalf does not need to know about these.
    const customHandlers = {
      setEmailPopup: this.setShowEmailPopup,
      getState: this.getLocalState,
      handleSubmit: this.handleGandalfSubmit,
      history: history,
      handleAgencyChange: this.handleAgencyChange,
      getNotes: this.getNotes,
      setAppError: this.props.setAppError,
      toggleDiary: this.props.toggleDiary,
      setFormInstance: this.setFormInstance, // needed for reset() in handleBlockedNavigation
      onDirtyCallback: this.setIsDirty // needed for Prompt "when"
    };
    return (
      <div className="app-wrapper csr quote">
        {(isLoading || !quoteData.quoteNumber) && <Loader />}
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
            render={() => (
              <React.Fragment>
                <Prompt when={this.state.isDirty} message={this.handleBlockedNavigation} />
                {this.state.hasUnsavedChanges && 
                  <Alert
                    modalClassName="unsaved-changes"
                    headerIcon="fa fa-exclamation-circle"
                    header="Unsaved Changes"
                    text="Are you sure you want to leave with unsaved changes?"
                    handleConfirm={this.handleConfirmNavigationClick}
                    confirmLabel="Yes"
                    renderSecondary={() => (
                      <Button
                      className={Button.constants.classNames.seconday}
                      dataTest="modal-confirm"
                      onClick={this.toggleUnsavedChanges}>No</Button>
                    )}
                  />
                 }
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
                      options={{ agencies, diaries, notes, ...options}} // enums for select/radio fields
                      transformConfig={transformConfig}
                      path={location.pathname}
                      customHandlers={customHandlers}
                      customComponents={this.customComponents}
                      stickyFooter
                      promptUnsavedChanges
                      renderFooter={({ pristine, submitting, form }) => shouldRenderFooter &&
                        <QuoteFooter
                          handlePrimaryClick={this.primaryClickHandler}
                          handleResetForm={form.reset}
                          currentStep={currentStep}
                          submitting={submitting}
                          isPrimaryDisabled={pristine || submitting || disableForApplication || checkApplicationSent || disableForShare}
                        />
                      }
                    />
                  </React.Fragment>
                }
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
    options: state.list,
    isLoading: state.ui.isLoading,
    diaries: getDiariesForTable(state),
    notes: state.service.notes
  }
};

export default connect(mapStateToProps, {
  setAppState,
  setAppError,
  getQuote,
  getAgencies,
  getAgentsByAgencyCode,
  getZipcodeSettings,
  getEnumsForQuoteWorkflow,
  updateQuote,
  getNotes,
  toggleDiary,
  fetchDiaries
})(QuoteBase);
