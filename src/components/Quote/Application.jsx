import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Form, propTypes } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import _ from 'lodash';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import QuoteBaseConnect from '../../containers/Quote';
import ClearErrorConnect from '../Error/ClearError';
import QuoteSummaryModal from '../../components/Common/QuoteSummaryModal';
import Footer from '../Common/Footer';

const handleInitialize = (state) => {
  const formValues = {

  };
  return formValues;
};

export const handleGetQuoteData = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  if (!taskData) return {};
  const quoteEnd = _.find(taskData.model.variables, { name: 'retrieveQuote' })
  ? _.find(taskData.model.variables, { name: 'retrieveQuote' }).value.result
  : {};
  const quoteData = _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' })
  ? _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }).value.result
  : quoteEnd;
  return quoteData;
};

export const handleGetUnderwritingExceptions = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  if (!taskData) return [];
  const quoteEnd = _.find(taskData.model.variables, { name: 'retrieveQuote' })
    ? _.find(taskData.model.variables, { name: 'retrieveQuote' }).value.result
    : {};
  const quoteData = _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' })
    ? _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }).value.result
    : quoteEnd;

  const underwritingExceptions = quoteData && quoteData.underwritingExceptions ? quoteData.underwritingExceptions : [];
  return underwritingExceptions;
};

export const handleFormSubmit = (data, dispatch, props) => {
  const { appState, actions } = props;

  const workflowId = appState.instanceId;

  props.actions.appStateActions.setAppState(
      appState.modelName,
      props.appState.instanceId,
    {
      ...props.appState.data,
      applicationSubmitting: true
    });

  const steps = [
    { name: 'hasUserEnteredData', data: { answer: 'Yes' } },
    {
      name: 'moveTo',
      data: { key: 'application' }
    }
  ];
  actions.cgActions.batchCompleteTask(props.appState.modelName, workflowId, steps)
  .then(() => {
    props.actions.appStateActions.setAppState(
      appState.modelName,
      props.appState.instanceId,
      {
        ...props.appState.data,
        activateRedirectLink: '/quote/coverage',
        activateRedirect: true,
        applicationSubmitting: false
      });
  });
};

export const quoteSummaryModal = (props) => {
  const showQuoteSummaryModal = props.appState.data.showQuoteSummaryModal;
  props.actions.appStateActions.setAppState(
    props.appState.modelName,
    props.appState.instanceId,
    { ...props.appState.data, showQuoteSummaryModal: !showQuoteSummaryModal }
  );
};

const checkQuoteState = quoteData => _.some(['Policy Issued', 'Documents Received'], state => state === quoteData.quoteState);

export class QuoteApplication extends Component {

  componentDidMount() {
    if (this.props.appState.instanceId) {
      this.props.actions.appStateActions.setAppState(this.props.appState.modelName, this.props.appState.instanceId, {
        ...this.props.appState.data,
        submitting: true
      });
      const steps = [
    { name: 'hasUserEnteredData', data: { answer: 'No' } },
    { name: 'moveTo', data: { key: 'application' } }
      ];
      const workflowId = this.props.appState.instanceId;

      this.props.actions.cgActions.batchCompleteTask(this.props.appState.modelName, workflowId, steps)
    .then(() => {
      this.props.actions.appStateActions.setAppState(this.props.appState.modelName, this.props.appState.instanceId, {
        ...this.props.appState.data,
        selectedLink: 'application'
      });
    });
    }
  }

  render() {
    const { appState, handleSubmit, underwritingExceptions, quoteData } = this.props;

    const redirect = (this.props.activateRedirect)
    ? (<Redirect to={this.props.activateRedirectLink} />)
    : null;

    return (
      <QuoteBaseConnect>
        { redirect }
        <ClearErrorConnect />
        <div className="route-content verify workflow">
          <Form id="Application" onSubmit={handleSubmit(() => quoteSummaryModal(this.props))} noValidate>
            <div className="scroll">
              <div className="detail-wrapper">
                {underwritingExceptions && _.filter(underwritingExceptions, uw => !uw.overridden).length > 0 &&
                  <div className="messages" >
                    <div className="message error">
                      <i className="fa fa-exclamation-circle" aria-hidden="true" />&nbsp;Application cannot be sent due to Underwriting Validations.
                    </div>
                  </div>
                }

              </div>
            </div>
          </Form>
          { appState.data.showQuoteSummaryModal && <QuoteSummaryModal verify={handleFormSubmit} showQuoteSummaryModal={() => quoteSummaryModal(this.props)} /> }
        </div>
        <div className="basic-footer btn-footer">
          <Footer />
          <div className="btn-wrapper">
            <button
              tabIndex={'0'}
              aria-label="submit-btn form-application"
              form="Application"
              className="btn btn-primary" type="submit" disabled={(underwritingExceptions && _.filter(underwritingExceptions, uw => !uw.overridden).length > 0) || checkQuoteState(quoteData)}
            >Send to DocuSign</button>
          </div>
        </div>
      </QuoteBaseConnect>
    );
  }
}

QuoteApplication.contextTypes = {
  router: PropTypes.object
};

// ------------------------------------------------
// Property type definitions
// ------------------------------------------------
QuoteApplication.propTypes = {
  ...propTypes,
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({ submitting: PropTypes.boolean })
  })
};
// ------------------------------------------------
// redux mapping
// ------------------------------------------------
const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  showQuoteSummaryModal: state.appState.data.showQuoteSummaryModal,
  fieldValues: _.get(state.form, 'QuoteApplication.values', {}),
  underwritingExceptions: handleGetUnderwritingExceptions(state),
  initialValues: handleInitialize(state),
  quoteData: state.service.transactions || handleGetQuoteData(state)
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Application', enableReinitialize: true })(QuoteApplication));
