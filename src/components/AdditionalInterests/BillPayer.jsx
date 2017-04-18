import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';
import _ from 'lodash';
import Footer from '../Common/Footer';
import { getInitialValues } from '../Customize/customizeHelpers';
import FieldGenerator from '../Form/FieldGenerator';
// import Footer from '../Common/Footer';
// import { setDetails } from '../../../actions/detailsActions';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';

const userTasks = {
  formSubmit: ''
};

const handleFormSubmit = (data, dispatch, props) => {
  const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  const taskName = userTasks.formSubmit;
  const taskData = { ...data };
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
};

export const BillPayer = (props) => {
  const {
        tasks,
        appState,
        handleSubmit,
        initialized,
        fieldValues,
        initialize
    } = props;

  const taskData = (tasks && appState && tasks[appState.modelName]) ? tasks[appState.modelName].data : {};

  const quoteData = taskData && taskData.model &&
 taskData.model.variables &&
 _.find(taskData.model.variables, { name: 'quote' }) &&
 _.find(taskData.model.variables, { name: 'quote' }).value ?
  _.find(taskData.model.variables, { name: 'quote' }).value.result : {};

  if (taskData && !initialized) {
        // set form submit for AI
    userTasks.formSubmit = taskData.activeTask.name;

    const values = getInitialValues(taskData.uiQuestions, quoteData);

    _.forEach(taskData.uiQuestions, (q) => {
      if (!values[q.name]) {
        values[q.name] = '';
      }
    });

    if (_.trim(values.name1)) {
      values.isAdditional = true;
    }

    initialize(values);
  }
  return (
    <div className="route-content">
      <Form id="BillPayer" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            <h3 className="section-group-header"><i className="fa fa-envelope-open" /> BillPayer</h3>
            {taskData && taskData.uiQuestions && taskData.uiQuestions.map((question, index) => <FieldGenerator data={quoteData} question={question} values={fieldValues} key={index} />)}
          </div>
          <div className="workflow-steps">
            <button className="btn btn-primary" type="submit" form="BillPayer" disabled={props.appState.data.submitting}>next</button>
          </div>
          <Footer />
        </div>
      </Form>
    </div>
  );
};

BillPayer.propTypes = {
  ...propTypes,
  handleSubmit: PropTypes.func,
  fieldValues: PropTypes.any, // eslint-disable-line
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    data: PropTypes.shape({
      recalc: PropTypes.boolean,
      submitting: PropTypes.boolean
    })
  }),
  initialized: PropTypes.bool,
  initialize: PropTypes.func
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'BillPayer.values', {})
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'BillPayer' })(BillPayer));
