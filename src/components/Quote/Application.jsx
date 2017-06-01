import React, { PropTypes } from 'react';
import { reduxForm, Form, propTypes } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import _ from 'lodash';
import { toastr } from 'react-redux-toastr';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import QuoteBaseConnect from '../../containers/Quote';
import ClearErrorConnect from '../Error/ClearError';
import QuoteSummaryModal from '../../components/Common/QuoteSummaryModal';

const handleInitialize = (state) => {
  const formValues = {

  };
  return formValues;
};

const handleGetUnderwritingExceptions = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const updateQuoteStateUWD1 = _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' });

  const quoteData = updateQuoteStateUWD1 ? updateQuoteStateUWD1.value.result : null;

  const underwritingExceptions = quoteData && quoteData.underwritingExceptions ? quoteData.underwritingExceptions : [];
  return underwritingExceptions;
};

const handleFormSubmit = (data, dispatch, props) => {
  const { appState, tasks, actions, fieldValues } = props;

  const workflowId = appState.instanceId;

  const steps = [
{ name: 'hasUserEnteredData', answer: 'Yes' },
    {
      name: 'moveTo',
      data: { key: 'application' }
    }
  ];
  actions.cgActions.batchCompleteTask(props.appState.modelName, workflowId, steps)
  .then(() => {
    toastr.success('Quote Submitted', 'Quote has been submitted successfully');

    props.actions.appStateActions.setAppState(
      appState.modelName,
      props.appState.instanceId,
      {
        ...props.appState.data,
        activateRedirectLink: '/quote/coverage',
        activateRedirect: true,
        updateWorkflowDetails: true
      });
  });
};

const quoteSummaryModal = (props) => {
  const showQuoteSummaryModal = props.appState.data.showQuoteSummaryModal;
  props.actions.appStateActions.setAppState(
    props.appState.modelName,
    props.appState.instanceId,
    { showQuoteSummaryModal: !showQuoteSummaryModal }
  );
};

// ------------------------------------------------
// The render is where all the data is being pulled
//  from the props.
// The quote data data comes from the previous task
//  which is createQuote / singleQuote. This might
//  not be the case in later calls, you may need
//  to pull it from another place in the model
// ------------------------------------------------
export const QuoteApplication = (props) => {
  const { appState, handleSubmit, underwritingExceptions } = props;

  const redirect = (props.activateRedirect)
    ? (<Redirect to={props.activateRedirectLink} />)
    : null;

  return (
    <QuoteBaseConnect>
      { redirect }
      <ClearErrorConnect />
      <div className="route-content verify workflow">
        <Form id="Application" onSubmit={handleSubmit(() => quoteSummaryModal(props))} noValidate>
          <div className="scroll">
            <div className="detail-wrapper">

              {underwritingExceptions && underwritingExceptions.length > 0 &&
                <div className="messages" >
                  <div className="message error">
                    <i className="fa fa-exclamation-circle" aria-hidden="true" />&nbsp;Application cannot be sent due to Underwriting Validations.
                  </div>
                </div>
              }

            </div>
            <div className="workflow-steps">
              <button
                form="Application"
                className="btn btn-primary" type="submit" disabled={underwritingExceptions && underwritingExceptions.length > 0}
              >Send to DocuSign</button>
            </div>

          </div>

        </Form>
        { appState.data.showQuoteSummaryModal && <QuoteSummaryModal verify={handleFormSubmit} showQuoteSummaryModal={() => quoteSummaryModal(props)} /> }
      </div>
    </QuoteBaseConnect>
  );
};

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
  initialValues: handleInitialize(state)
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
