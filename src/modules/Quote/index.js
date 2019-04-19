import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader, Button } from '@exzeo/core-ui';
import { Route } from 'react-router-dom';
import { Gandalf } from '@exzeo/core-ui/src/@Harmony';
import { defaultMemoize } from 'reselect';

import UnderwritingValidationBarConnect from '../../components/Quote/UnderwritingValidationBar';
import App from '../../components/AppWrapper';
import OpenDiariesBar from '../../components/OpenDiariesBar';
import DiaryPolling from '../../components/DiaryPolling';
import { QUOTE_RESOURCE_TYPE } from '../../constants/diaries';
import { startWorkflow } from '../../state/actions/cg.actions';
import { setAppState } from '../../state/actions/appState.actions';
import { setAppError } from '../../state/actions/error.actions';
import { getQuote } from '../../state/actions/quote.actions';
import { getAgencies, getAgentsByAgencyCode } from '../../state/actions/agency.actions';
import { getZipcodeSettings } from '../../state/actions/service.actions';
import { getQuoteSelector } from '../../state/selectors/choreographer.selectors';
import Footer from '../../components/Common/Footer';
import Underwriting from '../../components/Quote/Underwriting';
import AdditionalInterests from '../../components/Quote/AdditionalInterests';
import MailingAddressBilling from '../../components/Quote/MailingAddressBilling';
import NotesFiles from '../../components/Quote/NotesFiles';
import Summary from '../../components/Quote/Summary';
import Application from '../../components/Quote/Application';
import MOCK_CONFIG_DATA from '../../mock-data/mockConfigurationPayload';

import { ROUTES_NOT_HANDLED_BY_GANDALF, ROUTES_NOT_USING_FOOTER, PAGE_ROUTING } from './constants/workflowNavigation';
import { getAgentList, getAgencyList } from '../../state/selectors/agency.selector';
import { handleCGSubmit } from '../../utilities/choreographer';

const FORM_ID = 'QuoteWorkflowCSR';

export class QuoteBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEmailPopup: false,
      gandalfTemplate: MOCK_CONFIG_DATA,
      showDiaries: false,
      form: {
        pristine: true
      }
    };

    this.getConfigForJsonTransform = defaultMemoize(this.getConfigForJsonTransform.bind(this));
  }

  componentDidMount() {
    const { match } = this.props;

    this.props.getQuote(match.params.quoteNumber, '').then((quoteData) => {
      if (quoteData && quoteData.property) {
        this.props.getAgencies(quoteData.companyCode, quoteData.state);
        this.props.getAgentsByAgencyCode(quoteData.agencyCode);
        this.props.getZipcodeSettings(quoteData.companyCode, quoteData.state, quoteData.product, quoteData.property.physicalAddress.zip);
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
    // this.setState(() => ({ gandalfTemplate: response.data.result }));
  };

  setTemplatePath(component, componentMap) {
    if ((component.formData.metaData || {}).target || (component.data.extendedProperties || {}).target) {
      componentMap[component.path] = (component.formData.metaData || {}).target || (component.data.extendedProperties || {}).target;
    }
  }

  getConfigForChildren(children, componentMap) {
    children.map((childComponent) => {
      this.setTemplatePath(childComponent, componentMap);
      if(Array.isArray(childComponent.children)) {
        this.getConfigForChildren(childComponent.children, componentMap)
      }
      return childComponent;
    });
  }

  getConfigForJsonTransform(gandalfTemplate) {
    if (!gandalfTemplate) return {};

    return gandalfTemplate.pages.reduce((pageComponentsMap, page) => {
      const pageComponents = page.components.reduce((componentMap, component) => {
        this.setTemplatePath(component, componentMap);
        if(Array.isArray(component.children)) {
          this.getConfigForChildren(component.children, componentMap)
        }
        return componentMap;
      }, {});

      return {
        ...pageComponentsMap,
        ...pageComponents
      }
    }, {});
  };

  handleToggleDiaries = () => {
    this.setState({ showDiaries: !this.state.showDiaries });
  };


  updateQuote = async (modelName, submitData, pageName) => {
    const { quoteData } = this.props;
    this.props.setAppState(modelName, '', { ...this.props.appState.data, submitting: true });
    try {
      await this.props.startWorkflow(modelName, {
        quoteId: quoteData._id,
        ...submitData
      });

      await this.props.getQuote(quoteData._id, pageName);
    } catch (error) {
      this.props.setAppError(error);
    } finally {
      this.props.setAppState(modelName, '', { ...this.props.appState.data, submitting: false });
    }
  }

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

  handleGandalfSubmit = async ({ shouldNav, ...values }) => {
    const currentStep = this.props.location.pathname.split('/')[3];
    const { modelName, submitData, pageName } = handleCGSubmit(values, currentStep, this.props);
    await this.updateQuote(modelName, submitData, pageName);
  };

  getLocalState = () => {
    return this.state;
  };

  setPristine = (pristine) => {
    this.setState(() => ({ pristine }));
  }

  handleFormState = (formState) => {
    this.setState(() => ({ 
      form: formState
     }));
  };

  setShowEmailPopup = (showEmailPopup) => {
    this.setState(() => ({ showEmailPopup }));
  };

  handleAgencyChange = (agencyCode, onChange) =>  {
    this.props.getAgentsByAgencyCode(agencyCode);
    return onChange(agencyCode);
  }

  render() {
    const {
      appState,
      quoteData,
      match,
      children,
      location,
      history,
      agencies,
      agents
    } = this.props;

    const { showDiaries, needsConfirmation, gandalfTemplate } = this.state;

    const currentStep = location.pathname.split('/')[3];
    const shouldUseGandalf = ROUTES_NOT_HANDLED_BY_GANDALF.indexOf(currentStep) === -1;
    const shouldRenderFooter = ROUTES_NOT_USING_FOOTER.indexOf(currentStep) === -1;
    const currentPage = PAGE_ROUTING[currentStep];
    const transformConfig = this.getConfigForJsonTransform(gandalfTemplate);

    // TODO going to use Context to pass these directly to custom components,
    //  so Gandalf does not need to know about these.
    const customHandlers = {
      formStateCallback: this.handleFormState,
      setEmailPopup: this.setShowEmailPopup,
      getState: this.getLocalState,
      handleSubmit: this.handleGandalfSubmit,
      history: history,
      updateQuote: this.handleUpdateQuote,
      handleAgencyChange: this.handleAgencyChange
    };

    console.log(this.state.form)

    return (
      <div className="app-wrapper csr quote">
        {/* {(appState.data.submitting || !quoteData.quoteNumber) && <Loader />} */}
        <App
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
                      formId={FORM_ID}
                      className="route-content"
                      currentPage={currentPage}
                      handleSubmit={this.handleGandalfSubmit}
                      initialValues={quoteData}
                      template={gandalfTemplate}
                      options={{ agents, agencies }} // enums for select/radio fields
                      transformConfig={transformConfig}
                      path={location.pathname}
                      customHandlers={customHandlers}
                      customComponents={this.customComponents}
                      renderFooter={x =>
                        <React.Fragment />}
                    />
                    <div className="basic-footer btn-footer">
                      <div className="btn-group basic-footer btn-footer">
                        <Button
                          data-test="submit"
                          className={Button.constants.classNames.primary}
                          onClick={this.primaryClickHandler}
                          disabled={needsConfirmation || this.state.form.pristine}
                          label={'Save'}
                        />
                          <Button
                            data-test="reset"
                            className={Button.constants.classNames.secondary}
                            label="reset"
                          />
                      </div>
                      <Footer />
                    </div>
                  </React.Fragment>
                }
                {/* <Route exact path={`${match.url}/coverage`} render={props => <Coverage {...props} match={match} updateQuote={this.updateQuote} />} /> */}
                <Route exact path={`${match.url}/billing`} render={props => <MailingAddressBilling  {...props} match={match} updateQuote={this.updateQuote} />} />
                <Route exact path={`${match.url}/notes`} render={props => <NotesFiles {...props} match={match} updateQuote={this.updateQuote} />} />
                <Route exact path={`${match.url}/summary`} render={props => <Summary {...props} match={match} updateQuote={this.updateQuote} />} />
                <Route exact path={`${match.url}/additionalInterests`} render={props => <AdditionalInterests {...props} match={match} updateQuote={this.updateQuote} />} />
                <Route exact path={`${match.url}/underwriting`} render={props => <Underwriting {...props} match={match} updateQuote={this.updateQuote} />} />
                <Route exact path={`${match.url}/application`} render={props => <Application {...props} match={match} updateQuote={this.updateQuote} />} />
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
          )} />
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
})(QuoteBase);
