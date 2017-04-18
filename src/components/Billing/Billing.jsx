/* eslint-disable jsx-a11y/label-has-for */
import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, change, propTypes } from 'redux-form';
import _ from 'lodash';
import Footer from '../Common/Footer';
import { CheckInput } from '../Form/inputs/CheckField';
import { getInitialValues } from '../Customize/customizeHelpers';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';

import FieldGenerator from '../Form/FieldGenerator';
// ------------------------------------------------
// List the user tasks that directly tie to
//  the cg tasks.
// ------------------------------------------------
const userTasks = {
  formSubmit: 'askAdditionalQuestions'
};
const handleFormSubmit = (data, dispatch, props) => {
  const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  const taskName = userTasks.formSubmit;
  const taskData = { ...data };
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
};

const handleInitialize = (state) => {
  console.log(state);
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const quoteData = taskData && taskData.model &&
    taskData.model.variables &&
    _.find(taskData.model.variables, { name: 'quote' }) &&
    _.find(taskData.model.variables, { name: 'quote' }).value ?
    _.find(taskData.model.variables, { name: 'quote' }).value.result : {};

  const values = getInitialValues(taskData.uiQuestions, quoteData);

  _.forEach(taskData.uiQuestions, (q) => {
    if (!values[q.name]) {
      values[q.name] = '';
    }
  });

  return values;
};

const handleGetQuestions = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  return taskData.uiQuestions;
};

const handleGetQuoteData = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const quoteData = taskData && taskData.previousTask && taskData.previousTask.value ? taskData.previousTask.value.result : {};
  return quoteData;
};

let sameAsProperty = false;
export const Billing = (props) => {
  const {
    fieldQuestions,
    quoteData,
    dispatch,
    handleSubmit,
    fieldValues
  } = props;

  const annualPremium = 0;
  const semiAnnualPremium = 0;
  const quarterlyPremium = 0;

  const fillMailForm = () => {
    fieldQuestions.forEach((question) => {
      if (question.physicalAddressLocation) {
        if (!sameAsProperty) {
          dispatch(change('Billing', question.name, _.get(quoteData, question.physicalAddressLocation)));
        } else {
          dispatch(change('Billing', question.name, ''));
        }
      }
    });
    sameAsProperty = !sameAsProperty;
  };

  return (
    <div className="route-content">
      <Form className="fade-in" id="Billing" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            <h3 className="section-group-header"><i className="fa fa-envelope-open" /> Mailing Address</h3>
            <CheckInput
              label="Is the mailing address the same as the property address?" input={{
                value: sameAsProperty,
                name: 'sameAsProperty',
                onChange: fillMailForm
              }} isSwitch
            /> {fieldQuestions && fieldQuestions.map((question, index) => (<FieldGenerator data={quoteData} question={question} values={fieldValues} key={index} />))}
            <h3 className="section-group-header"><i className="fa fa-dollar" /> Billing Information</h3>
            <div className="form-group  BillTo">
              <label>Bill To</label>
              <select name="BillTo" value="">
                <option value="ph1">Policyholder 1</option>
                <option value="mh1">Bank of America</option>
                <option value="mh2">Capital One</option>
              </select>
            </div>
            <div className="form-group segmented BillType  " role="group">
              <label className="group-label label-segmented">Bill Plan</label>
              <div className="segmented-answer-wrapper">
                <div className="radio-column-3">
                  <label className="label-segmented"><input type="radio" value="A" name="billPlan" />
                    <span>Annual</span>
                  </label>
                </div>
                <div className="radio-column-3">
                  <label className="label-segmented"><input type="radio" value="S" name="billPlan" />
                    <span>Semi-Annual</span>
                  </label>
                </div>
                <div className="radio-column-3">
                  <label className="label-segmented"><input type="radio" value="Q" name="billPlan" />
                    <span>Quarterly
                                        </span>
                  </label>
                </div>
              </div>
              <div className="installment-term">
                <dl className="column-3">
                  <div>
                    <dt>
                      <span>Annual</span>
                                            Installment Plan</dt>
                    <dd>1st Installment: ${annualPremium}</dd>
                  </div>
                </dl>
                <dl className="column-3">
                  <div>
                    <dt>
                      <span>Semi-Annual</span>
                                            Installment Plan</dt>
                    <dd>1st Installment: ${semiAnnualPremium}</dd>
                    <dd>2nd Installment: ${semiAnnualPremium}</dd>
                  </div>
                </dl>
                <dl className="column-3">
                  <div>
                    <dt>
                      <span>Quarterly</span>
                                            Installment Plan</dt>
                    <dd>1st Installment: ${quarterlyPremium}</dd>
                    <dd>2nd Installment: ${quarterlyPremium}</dd>
                    <dd>3rd Installment: ${quarterlyPremium}</dd>
                    <dd>4th Installment: ${quarterlyPremium}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          <div className="workflow-steps">
            <button className="btn btn-primary" type="submit" form="Billing" disabled={props.appState.data.submitting}>next</button>
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
Billing.propTypes = {
  ...propTypes,
  dispatch: PropTypes.func,
  handleSubmit: PropTypes.func,
  fieldValues: PropTypes.any, // eslint-disable-line
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    data: PropTypes.shape({
      recalc: PropTypes.boolean,
      submitting: PropTypes.boolean
    })
  })
};

// ------------------------------------------------
// redux mapping
// ------------------------------------------------
const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'Billing.values', {}),
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

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Billing' })(Billing));
