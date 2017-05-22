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

  const additionalInterest1 = _.find(additionalInterests, { order: 0, type: 'Additional Interest' }) || {};
  const additionalInterest2 = _.find(additionalInterests, { order: 1, type: 'Additional Interest' }) || {};

  _.remove(additionalInterests, ai => ai.type === 'Additional Interest');

  if (data.isAdditional) {
    additionalInterest1.name1 = data.ai1Name1;
    additionalInterest1.name2 = data.ai1Name2;
    additionalInterest1.referenceNumber = data.ai1ReferenceNumber;
    additionalInterest1.order = 0;
    additionalInterest1.active = true;
    additionalInterest1.type = 'Additional Interest';
    additionalInterest1.mailingAddress = {
      address1: data.ai1MailingAddress1,
      address2: data.ai1MailingAddress2,
      city: data.ai1City,
      state: data.ai1State,
      zip: data.ai1Zip,
      country: {
        code: 'USA',
        displayText: 'United States of America'
      }
    };

    additionalInterests.push(additionalInterest1);
  }
  if (data.isAdditional && data.isAdditional2) {
    additionalInterest2.name1 = data.ai2Name1;
    additionalInterest2.name2 = data.ai2Name2;
    additionalInterest2.referenceNumber = data.ai2ReferenceNumber;
    additionalInterest2.order = 1;
    additionalInterest2.active = true;
    additionalInterest2.type = 'Additional Interest';
    additionalInterest2.mailingAddress = {
      address1: data.ai2MailingAddress1,
      address2: data.ai2MailingAddress2,
      city: data.ai2City,
      state: data.ai2State,
      zip: data.ai2Zip,
      country: {
        code: 'USA',
        displayText: 'United States of America'
      }
    };

    additionalInterests.push(additionalInterest2);
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
    { additionalInterests: _.filter(quoteData.additionalInterests, ai => ai.type === 'Additional Interest') });

  userTasks.formSubmit = taskData.activeTask.name;

  _.forEach(taskData.uiQuestions, (q) => {
    if (!values[q.name]) {
      values[q.name] = '';
    }
  });

  if (_.trim(values.ai2Name1)) {
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

export const AdditionalInterest = (props) => {
  const {
    fieldQuestions,
    quoteData,
    handleSubmit,
    fieldValues
  } = props;

  return (
    <div className="route-content">
      <Form id="AdditionalInterest" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            <h3 className="section-group-header"><i className="fa fa-handshake-o" /> Additional Interest</h3>
            {fieldQuestions && _.sortBy(fieldQuestions, 'sort').map((question, index) => <FieldGenerator data={quoteData} question={question} values={fieldValues} key={index} />)}
          </div>
          <div className="workflow-steps">
            <button className="btn btn-secondary">cancel</button>
            <button className="btn btn-primary" type="submit" form="AdditionalInterest" disabled={props.appState.data.submitting}>save</button>
          </div>
          <Footer />
        </div>
      </Form>
    </div>
  );
};

AdditionalInterest.propTypes = {
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
  fieldValues: _.get(state.form, 'AdditionalInterest.values', {}),
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

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'AdditionalInterest' })(AdditionalInterest));
