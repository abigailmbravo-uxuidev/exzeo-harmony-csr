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
  const additionalInterests = props.quoteData.additionalInterests;

  const billPayer1 = _.find(additionalInterests, { order: 0, type: 'Bill Payer' }) || {};

  _.remove(additionalInterests, ai => ai.type === 'Bill Payer');

  if (data.isAdditional) {
    billPayer1.name1 = data.name1;
    billPayer1.name2 = data.name2;
    billPayer1.referenceNumber = data.referenceNumber;
    billPayer1.order = 0;
    billPayer1.active = true;
    billPayer1.type = 'Bill Payer';
    billPayer1.mailingAddress = {
      address1: data.mailingAddress1,
      address2: data.mailingAddress2,
      city: data.city,
      state: data.state,
      zip: data.zip,
      country: {
        code: 'USA',
        displayText: 'United States of America'
      }
    };

    additionalInterests.push(billPayer1);
  }

  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, { additionalInterests });
};

const handleGetQuestions = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  return taskData.uiQuestions;
};

const handleGetQuoteData = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const quoteData = taskData && taskData.model &&
 taskData.model.variables &&
 _.find(taskData.model.variables, { name: 'getQuoteBeforeAIs' }) &&
 _.find(taskData.model.variables, { name: 'getQuoteBeforeAIs' }).value ?
  _.find(taskData.model.variables, { name: 'getQuoteBeforeAIs' }).value.result : {};
  return quoteData;
};

const handleInitialize = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const quoteData = taskData && taskData.model &&
 taskData.model.variables &&
 _.find(taskData.model.variables, { name: 'getQuoteBeforeAIs' }) &&
 _.find(taskData.model.variables, { name: 'getQuoteBeforeAIs' }).value ?
  _.find(taskData.model.variables, { name: 'getQuoteBeforeAIs' }).value.result : {};

  const values = getInitialValues(taskData.uiQuestions, { additionalInterests: _.filter(quoteData.additionalInterests, ai => ai.type === 'Bill Payer') });

  userTasks.formSubmit = taskData.activeTask.name;

  _.forEach(taskData.uiQuestions, (q) => {
    if (!values[q.name]) {
      values[q.name] = '';
    }
  });
  values.isAdditional = true;

  return values;
};


export const BillPayer = (props) => {
  const {
    fieldQuestions,
    quoteData,
    handleSubmit,
    fieldValues
  } = props;

  return (
    <div className="route-content">
      <Form id="BillPayer" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            <h2 className="section-group-header">BillPayer</h2>
            {fieldQuestions && _.sortBy(fieldQuestions, 'sort').map((question, index) =>
              <FieldGenerator data={quoteData} question={question} values={fieldValues} key={index} />)}
          </div>
          <div className="workflow-steps">
            <button className="btn btn-secondary">cancel</button>
            <button className="btn btn-primary" type="submit" form="BillPayer" disabled={props.appState.data.submitting}>save</button>
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
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    data: PropTypes.shape({
      recalc: PropTypes.boolean,
      submitting: PropTypes.boolean
    })
  }),
  fieldValues: PropTypes.any, // eslint-disable-line
  initialized: PropTypes.bool,
  initialize: PropTypes.func
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'BillPayer.values', {}),
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

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'BillPayer' })(BillPayer));
