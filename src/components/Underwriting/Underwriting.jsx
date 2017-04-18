import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';
import _ from 'lodash';
import Footer from '../Common/Footer';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import FieldGenerator from '../Form/FieldGenerator';

// ------------------------------------------------
// List the user tasks that directly tie to
//  the cg tasks.
// ------------------------------------------------
const userTasks = {
  formSubmit: 'askUWAnswers'
};

// ------------------------------------------------
// This allows the step to be completed in the CG,
//  make sure the data matches what the step needs.
// The workflow id comes from props.appState.
// ------------------------------------------------
const handleFormSubmit = (data, dispatch, props) => {
  const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  const taskName = userTasks.formSubmit;
  const taskData = { ...data };
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
};

const handleGetQuestions = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const uwQuestions = taskData && taskData.previousTask && taskData.previousTask.value ? taskData.previousTask.value.result : {};
  console.log(taskData.previousTask.value, uwQuestions)
  return uwQuestions;
};

const handleGetQuoteData = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const quoteData = _.find(taskData.model.variables, { name: 'quote' }).value.result;
  return quoteData;
};

const handleInitialize = (state) => {
  const questions = handleGetQuestions(state);
  const data = handleGetQuoteData(state);
  const values = {};
  questions.forEach((question) => {
    const val = _.get(data, `underwritingAnswers.${question.name}.answer`);
    values[question.name] = val;
  });
  return values;
};

// ------------------------------------------------
// The render is where all the data is being pulled
//  from the props.
// The quote data data comes from the previous task
//  which is createQuote / singleQuote. This might
//  not be the case in later calls, you may need
//  to pull it from another place in the model
// ------------------------------------------------
export const Underwriting = (props) => {
  const { appState, handleSubmit, fieldValues } = props;
  const taskData = props.tasks[appState.modelName].data;
  const questions = taskData.previousTask.value.result;
  const quoteData = _.find(taskData.model.variables, { name: 'quote' }).value.result.underwritingAnswers;

  // console.log('UNDERWRITING DATA', quoteData);

  return (
    <div className="route-content">
    <Form
      id="Underwriting"
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
    >
      <div className="scroll">
      <div className="form-group survey-wrapper" role="group">
        {questions.map((question, index) =>
          <FieldGenerator
            data={quoteData}
            question={question}
            values={fieldValues}
            key={index}
          />
        )}
      </div>
      <div className="workflow-steps">
        <button
          className="btn btn-primary"
          type="submit"
          form="Underwriting"
          disabled={props.appState.data.submitting}
        >next</button>
      </div>
      <Footer />
      </div>
    </Form>
    </div>
  );
};

// ------------------------------------------------
// Property type definitions
// ------------------------------------------------
Underwriting.propTypes = {
  ...propTypes,
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({
      submitting: PropTypes.boolean
    })
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
  quoteData: handleGetQuoteData(state)
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
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Underwriting' })(Underwriting));
