import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';
import _ from 'lodash';
import Footer from '../Common/Footer';
// import localStorage from 'localStorage';
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

  const mortgagee1 = _.find(additionalInterests, { order: 0, type: 'Mortgagee' }) || {};
  const mortgagee2 = _.find(additionalInterests, { order: 1, type: 'Mortgagee' }) || {};

  _.remove(additionalInterests, ai => ai.type === 'Mortgagee');

  if (data.isAdditional) {
    mortgagee1.name1 = data.m1Name1;
    mortgagee1.name2 = data.m1Name2;
    mortgagee1.referenceNumber = data.m1ReferenceNumber;
    mortgagee1.order = 0;
    mortgagee1.active = true;
    mortgagee1.type = 'Mortgagee';
    mortgagee1.mailingAddress = {
      address1: data.m1MailingAddress1,
      address2: data.m1MailingAddress2,
      city: data.m1City,
      state: data.m1State,
      zip: data.m1Zip,
      country: {
        code: 'USA',
        displayText: 'United States of America'
      }
    };

    additionalInterests.push(mortgagee1);
  }
  if (data.isAdditional && data.isAdditional2) {
    mortgagee2.name1 = data.m2Name1;
    mortgagee2.name2 = data.m2Name2;
    mortgagee2.referenceNumber = data.m2ReferenceNumber;
    mortgagee2.order = 1;
    mortgagee2.active = true;
    mortgagee2.type = 'Mortgagee';
    mortgagee2.mailingAddress = {
      address1: data.m2MailingAddress1,
      address2: data.m2MailingAddress2,
      city: data.m2City,
      state: data.m2State,
      zip: data.m2Zip,
      country: {
        code: 'USA',
        displayText: 'United States of America'
      }
    };

    additionalInterests.push(mortgagee2);
  }

  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, { additionalInterests });
};

const handleInitialize = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
//   const quoteData = taskData && taskData.previousTask && taskData.previousTask.value ? taskData.previousTask.value.result : {};

  const quoteData = taskData && taskData.model &&
   taskData.model.variables &&
   _.find(taskData.model.variables, { name: 'getQuoteBeforeAIs' }) &&
   _.find(taskData.model.variables, { name: 'getQuoteBeforeAIs' }).value ?
    _.find(taskData.model.variables, { name: 'getQuoteBeforeAIs' }).value.result : {};

  const values = getInitialValues(taskData.uiQuestions, { additionalInterests: _.filter(quoteData.additionalInterests, ai => ai.type === 'Mortgagee') });

  userTasks.formSubmit = taskData.activeTask.name;

  _.forEach(taskData.uiQuestions, (q) => {
    if (!values[q.name]) {
      values[q.name] = '';
    }
  });

  if (_.trim(values.m2Name1)) {
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

export const Mortgagee = (props) => {
  const {
    fieldQuestions,
    quoteData,
    handleSubmit,
    fieldValues
  } = props;
  return (
    <div className="route-content">
      <Form id="Mortgagee" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            <h2 className="section-group-header">Mortgagee</h2>
            {fieldQuestions && _.sortBy(fieldQuestions, 'sort').map((question, index) => <FieldGenerator data={quoteData} question={question} values={fieldValues} key={index} />)}
          </div>
          <div className="workflow-steps">
            <button className="btn btn-secondary">cancel</button>
            <button className="btn btn-primary" type="submit" form="Mortgagee" disabled={props.appState.data.submitting}>save</button>
          </div>
          <Footer />
        </div>
      </Form>
    </div>
  );
};

Mortgagee.propTypes = {
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
  fieldValues: _.get(state.form, 'Mortgagee.values', {}),
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

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Mortgagee' })(Mortgagee));
