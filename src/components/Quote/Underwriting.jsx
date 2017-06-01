import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm, Form, propTypes, change, reset } from 'redux-form';
import { toastr } from 'react-redux-toastr';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import QuoteBaseConnect from '../../containers/Quote';
import ClearErrorConnect from '../Error/ClearError';
import FieldGenerator from '../Form/FieldGenerator';

const handleGetQuoteData = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const quoteData = _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }) ? _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }).value.result : {};
  return quoteData;
};

const handleGetQuestions = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const uwQuestions = _.find(taskData.model.variables, { name: 'getListOfUWQuestions' }) ? _.find(taskData.model.variables, { name: 'getListOfUWQuestions' }).value.result : [];
  return uwQuestions;
};

const handleInitialize = (state) => {
  const questions = handleGetQuestions(state);
  const data = handleGetQuoteData(state);
  const values = {};

  questions.forEach((question) => {
    const val = _.get(data.underwritingAnswers, `${question.name}.answer`);
    values[question.name] = val;
  });

  return values;
};

/**
------------------------------------------------
 The render is where all the data is being pulled
 from the props.
 The quote data data comes from the previous task
 which is createQuote / singleQuote. This might
 not be the case in later calls, you may need
 to pull it from another place in the model
------------------------------------------------
*/
export class Underwriting extends Component {

  componentWillMount() {
    const { appState, actions } = this.props;
    const workflowId = appState.instanceId;
    const steps = [
      { name: 'hasUserEnteredData', data: { answer: 'Yes' } }
    ];

    actions.cgActions.batchCompleteTask(appState.modelName, workflowId, steps)
      .then(() => {
        // now update the workflow details so the recalculated rate shows
        this.props.actions.appStateActions.setAppState(appState.modelName, appState.instanceId, { ...appState.data,
          quote: this.props.quoteData,
          updateWorkflowDetails: true,
          hideYoChildren: false
        });
      });
  }

  handleFormSubmit = (data) => {
    const { appState, actions, quoteData, tasks } = this.props;

    const workflowId = appState.instanceId;
    actions.appStateActions.setAppState(appState.modelName, workflowId, { ...appState.data, submitting: true });
    const steps = [
      { name: 'askUWAnswers', data }
    ];

    const activeTaskName = tasks[appState.modelName].data.activeTask.name;
    if (activeTaskName === 'hasUserEnteredData') {
      steps.unshift({ name: 'hasUserEnteredData', data: { answer: 'Yes' } });
    }

    actions.cgActions.batchCompleteTask(appState.modelName, workflowId, steps)
      .then(() => {
        toastr.success('Quote Saved', `Quote: ${this.props.quoteData.quoteNumber} has been saved successfully`);
        // now update the workflow details so the recalculated rate shows
        actions.appStateActions.setAppState(
          appState.modelName,
          workflowId,
          {
            ...appState.data,
            updateWorkflowDetails: true,
            quote: quoteData,
            hideYoChildren: false
          }
        );
      });
  };

  clearForm = () => {
    const { dispatch, questions } = this.props;
    for (let i = 0; i < questions.length; i += 1) {
      dispatch(change('Underwriting', questions[i].name, ''));
    }
  };


  render() {
    const { fieldValues, handleSubmit, pristine, quoteData, questions } = this.props;

    return (
      <QuoteBaseConnect>
        <ClearErrorConnect />
        <div className="route-content">
          <Form
            id="Underwriting"
            onSubmit={handleSubmit(this.handleFormSubmit)}
            noValidate
          >
            <div className="scroll">
              <div className="form-group survey-wrapper" role="group">

                <h4>Underwriting Questions</h4>

                {questions.map((question, index) =>

                  <FieldGenerator
                    data={quoteData.underwritingAnswers}
                    question={question}
                    values={fieldValues}
                    key={index}
                  />
            )}
                <div className="btn-footer">
                  <button
                    onClick={this.clearForm}
                    className="btn btn-secondary"
                    type="button"
                    form="Underwriting"
                    disabled={this.props.appState.data.submitting}
                  >Cancel</button>
                  <button
                    className="btn btn-primary"
                    type="submit"
                    form="Underwriting"
                    disabled={this.props.appState.data.submitting || pristine}
                  >Update</button>

                </div>
              </div>
            </div>
          </Form>
        </div>
      </QuoteBaseConnect>
    );
  }
}

// ------------------------------------------------
// Property type definitions
// ------------------------------------------------
Underwriting.propTypes = {
  ...propTypes,
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({ submitting: PropTypes.boolean })
  }),
  quoteData: PropTypes.shape(),
  questions: PropTypes.arrayOf(PropTypes.shape())
};

// ------------------------------------------------
// redux mapping
// ------------------------------------------------
const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'Underwriting.values', {}),
  initialValues: handleInitialize(state),
  questions: handleGetQuestions(state),
  quoteData: handleGetQuoteData(state),
  activateRedirect: state.appState.data.activateRedirect
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
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Underwriting', enableReinitialize: true })(Underwriting));
