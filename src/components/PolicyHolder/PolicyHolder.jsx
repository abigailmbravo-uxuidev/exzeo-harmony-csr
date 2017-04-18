import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';
import _ from 'lodash';
import Footer from '../Common/Footer';

import { getInitialValues } from '../Customize/customizeHelpers';
import FieldGenerator from '../Form/FieldGenerator';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';

const userTasks = { formSubmit: 'askAdditionalPolicyHolder' };

const handleFormSubmit = (data, dispatch, props) => {
  const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  const taskName = userTasks.formSubmit;
  const taskData = { ...data };
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
};

const handleInitialize = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
//  const quoteData = taskData && taskData.previousTask && taskData.previousTask.value ? taskData.previousTask.value.result : {};
  const quoteData = taskData && taskData.model &&
 taskData.model.variables &&
 _.find(taskData.model.variables, { name: 'quote' }) &&
 _.find(taskData.model.variables, { name: 'quote' }).value ?
  _.find(taskData.model.variables, { name: 'quote' }).value.result : {};

  console.log(quoteData);
  const values = getInitialValues(taskData.uiQuestions, quoteData);

  if (values.firstName) {
    values.isAdditional = true;
  }

  _.forEach(taskData.uiQuestions, (q) => {
    if (!values[q.name]) { values[q.name] = ''; }
  });

  return values;
};

const handleGetQuestions = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  return taskData.uiQuestions;
};

const handleGetQuoteData = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const quoteData = taskData && taskData.model &&
 taskData.model.variables &&
 _.find(taskData.model.variables, { name: 'quote' }) &&
 _.find(taskData.model.variables, { name: 'quote' }).value ?
  _.find(taskData.model.variables, { name: 'quote' }).value.result : {};
  return quoteData;
};

export const PolicyHolder = (props) => {
  const {
    fieldQuestions,
    quoteData,
    handleSubmit,
    fieldValues
  } = props;

  return (
    <div className="route-content">
      <Form id="AdditionalPolicyHolder" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            <h3 className="section-group-header"><i className="fa fa-envelope-open" /> Additional Policyholder</h3>
            {fieldQuestions && fieldQuestions.map((question, index) =>
              <FieldGenerator
                data={quoteData}
                question={question}
                values={fieldValues}
                key={index}
              />
             )}
          </div>
          <div className="workflow-steps">
            <button className="btn btn-primary" type="submit" form="AdditionalPolicyHolder" disabled={props.appState.data.submitting}>next</button>
          </div>
          <Footer />
        </div>
      </Form>
    </div>
  );
};

PolicyHolder.propTypes = {
  ...propTypes,
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    data: PropTypes.shape({
      recalc: PropTypes.boolean,
      submitting: PropTypes.boolean
    })
  })
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'PolicyHolder.values', {}),
  initialValues: handleInitialize(state),
  fieldQuestions: handleGetQuestions(state),
  quoteData: handleGetQuoteData(state)
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'PolicyHolder' })(PolicyHolder));
