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

  const additionalInsured1 = _.find(additionalInterests, { order: 0, type: 'Additional Insured' }) || {};
  const additionalInsured2 = _.find(additionalInterests, { order: 1, type: 'Additional Insured' }) || {};

  _.remove(additionalInterests, ai => ai.type === 'Additional Insured');

  if (data.isAdditional) {
    additionalInsured1.name1 = data.ains1Name1;
    additionalInsured1.name2 = data.ains1Name2;
    additionalInsured1.referenceNumber = data.ains1ReferenceNumber;
    additionalInsured1.order = 0;
    additionalInsured1.active = true;
    additionalInsured1.type = 'Additional Insured';
    additionalInsured1.mailingAddress = {
      address1: data.ains1MailingAddress1,
      address2: data.ains1MailingAddress2,
      city: data.ains1City,
      state: data.ains1State,
      zip: data.ains1Zip,
      country: {
        code: 'USA',
        displayText: 'United States of America'
      }
    };

    additionalInterests.push(additionalInsured1);
  }
  if (data.isAdditional && data.isAdditional2) {
    additionalInsured2.name1 = data.ains2Name1;
    additionalInsured2.name2 = data.ains2Name2;
    additionalInsured2.referenceNumber = data.ains2ReferenceNumber;
    additionalInsured2.order = 1;
    additionalInsured2.active = true;
    additionalInsured2.type = 'Additional Insured';
    additionalInsured2.mailingAddress = {
      address1: data.ains2MailingAddress1,
      address2: data.ains2MailingAddress2,
      city: data.ains2City,
      state: data.ains2State,
      zip: data.ains2Zip,
      country: {
        code: 'USA',
        displayText: 'United States of America'
      }
    };

    additionalInterests.push(additionalInsured2);
  }

  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, { additionalInterests });
};

const handleInitialize = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const quoteData = taskData && taskData.model &&
 taskData.model.variables &&
 _.find(taskData.model.variables, { name: 'getQuoteBeforeAIs' }) &&
 _.find(taskData.model.variables, { name: 'getQuoteBeforeAIs' }).value ?
  _.find(taskData.model.variables, { name: 'getQuoteBeforeAIs' }).value.result : {};
  const values = getInitialValues(taskData.uiQuestions,
    { additionalInterests: _.filter(quoteData.additionalInterests, ai => ai.type === 'Additional Insured') });

  userTasks.formSubmit = taskData.activeTask.name;

  _.forEach(taskData.uiQuestions, (q) => {
    if (!values[q.name]) {
      values[q.name] = '';
    }
  });

  if (_.trim(values.ains2Name1)) {
    values.isAdditional2 = true;
  }

  values.isAdditional = true;

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
 _.find(taskData.model.variables, { name: 'getQuoteBeforeAIs' }) &&
 _.find(taskData.model.variables, { name: 'getQuoteBeforeAIs' }).value ?
  _.find(taskData.model.variables, { name: 'getQuoteBeforeAIs' }).value.result : {};
  return quoteData;
};


export const AdditionalInsured = (props) => {
  const {
    fieldQuestions,
    quoteData,
    handleSubmit,
    fieldValues
  } = props;

  return (
    <div className="route-content">
      <Form id="AdditionalInsured" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            <h2 className="section-group-header">Additional Insured</h2>
            {fieldQuestions && _.sortBy(fieldQuestions, 'sort').map((question, index) => <FieldGenerator data={quoteData} question={question} values={fieldValues} key={index} />)}
          </div>
          <div className="workflow-steps">
            <button className="btn btn-secondary">cancel</button>
            <button className="btn btn-primary" type="submit" form="AdditionalInsured" disabled={props.appState.data.submitting}>save</button>
          </div>
          <Footer />
        </div>
      </Form>
    </div>
  );
};

AdditionalInsured.propTypes = {
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
  fieldValues: _.get(state.form, 'AdditionalInsured.values', {}),
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

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'AdditionalInsured' })(AdditionalInsured));
