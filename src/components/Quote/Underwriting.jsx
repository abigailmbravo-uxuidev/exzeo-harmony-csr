import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Prompt } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm, Form, propTypes, change } from 'redux-form';
import * as cgActions from '../../actions/cgActions';
import * as serviceActions from '../../actions/serviceActions';
import * as appStateActions from '../../actions/appStateActions';
import QuoteBaseConnect from '../../containers/Quote';
import ClearErrorConnect from '../Error/ClearError';
import FieldGenerator from '../Form/FieldGenerator';
import Footer from '../Common/Footer';

export const handleGetQuoteData = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  if (taskData) {
    const quoteEnd = _.find(taskData.model.variables, { name: 'retrieveQuote' })
    ? _.find(taskData.model.variables, { name: 'retrieveQuote' }).value.result
    : {};
    const quoteData = _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' })
    ? _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }).value.result
    : quoteEnd;
    return quoteData;
  }
  return {};
};

export const handleInitialize = (state) => {
  const questions = state.service.underwritingQuestions ? state.service.underwritingQuestions : [];
  const data = handleGetQuoteData(state);
  const values = {};

  questions.forEach((question) => {
    const val = _.get(data, `underwritingAnswers.${question.name}.answer`);
    values[question.name] = val;

    const defaultAnswer = question && question.answers &&
    _.find(question.answers, { default: true }) ?
    _.find(question.answers, { default: true }).answer : null;

    if (defaultAnswer && question.hidden) {
      values[question.name] = defaultAnswer;
    }
  });

  return values;
};

const checkQuoteState = quoteData => _.some(['Policy Issued', 'Documents Received'], state => state === quoteData.quoteState);

export const handleFormSubmit = (data, dispatch, props) => {
  const { appState, actions } = props;

  const workflowId = appState.instanceId;
  actions.appStateActions.setAppState(appState.modelName, workflowId, { ...appState.data, submitting: true });
  const steps = [
      { name: 'hasUserEnteredData', data: { answer: 'Yes' } },
      { name: 'askUWAnswers', data }
  ];

  actions.cgActions.batchCompleteTask(appState.modelName, workflowId, steps)
      .then(() => {
        // now update the workflow details so the recalculated rate shows
        props.actions.appStateActions.setAppState(props.appState.modelName,
          workflowId, { ...props.appState.data,
            selectedLink: 'underwriting',
            submitting: false });
      });
};

export const clearForm = (props) => {
  const { dispatch, questions } = props;
  for (let i = 0; i < questions.length; i += 1) {
    dispatch(change('Underwriting', questions[i].name, ''));
  }
};
let setUnderwriting = false;
export class Underwriting extends Component {

  componentDidMount() {
    if (this.props.appState.instanceId) {
      this.props.actions.appStateActions.setAppState(this.props.appState.modelName, this.props.appState.instanceId, {
        ...this.props.appState.data,
        submitting: true
      });
      const steps = [
    { name: 'hasUserEnteredData', data: { answer: 'No' } },
    { name: 'moveTo', data: { key: 'underwriting' } }
      ];
      const workflowId = this.props.appState.instanceId;

      this.props.actions.cgActions.batchCompleteTask(this.props.appState.modelName, workflowId, steps)
    .then(() => {
      this.props.actions.appStateActions.setAppState(this.props.appState.modelName, this.props.appState.instanceId, {
        ...this.props.appState.data,
        selectedLink: 'underwriting'
      });
    });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props, nextProps)) {
      const quoteData = nextProps.quoteData;
      if (quoteData.companyCode && quoteData.state && quoteData.agencyCode && !setUnderwriting) {
        this.props.actions.serviceActions.getUnderwritingQuestions(quoteData.companyCode, quoteData.state, quoteData.product, quoteData.property);
        setUnderwriting = true;
      }
    }
  }

  render() {
    const { fieldValues, handleSubmit, pristine, quoteData, underwritingQuestions, dirty } = this.props;
    return (
      <QuoteBaseConnect>
        <ClearErrorConnect />
        <Prompt when={dirty} message="Are you sure you want to leave with unsaved changes?" />

        <div className="route-content">
          <Form
            id="Underwriting"
            onSubmit={handleSubmit(handleFormSubmit)}
            noValidate
          >
            <div className="scroll">
              <div className="form-group survey-wrapper" role="group">
                <h3>Underwriting Questions</h3>
                {underwritingQuestions && _.sortBy(underwritingQuestions, ['order']).map((question, index) =>
                  <FieldGenerator
                    data={quoteData.underwritingAnswers}
                    question={question}
                    values={fieldValues}
                    key={index}
                  />
            )}
              </div>
            </div>
          </Form>
        </div>
        <div className="basic-footer btn-footer">
          <Footer />
          <div className="btn-wrapper">
            <button
              onClick={() => clearForm(this.props)}
              className="btn btn-secondary"
              type="button"
              form="Underwriting"
              disabled={this.props.appState.data.submitting}
            >Cancel</button>
            <button
              className="btn btn-primary"
              type="submit"
              form="Underwriting"
              disabled={this.props.appState.data.submitting || pristine || checkQuoteState(quoteData)}
            >Update</button>
          </div>
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
  stateObject: PropTypes.shape(),
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
  stateObject: state,
  tasks: state.cg,
  appState: state.appState,
  initialValues: handleInitialize(state),
  fieldValues: _.get(state.form, 'Underwriting.values', {}),
  quoteData: handleGetQuoteData(state),
  activateRedirect: state.appState.data.activateRedirect,
  underwritingQuestions: state.service.underwritingQuestions
});

const mapDispatchToProps = dispatch => ({
  actions: {
    serviceActions: bindActionCreators(serviceActions, dispatch),
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Underwriting', enableReinitialize: true })(Underwriting));
