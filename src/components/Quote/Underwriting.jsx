import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm, Form, propTypes, change } from 'redux-form';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import QuoteBaseConnect from '../../containers/Quote';
import ClearErrorConnect from '../Error/ClearError';
import FieldGenerator from '../Form/FieldGenerator';

const handleGetQuoteData = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  if (taskData) {
    const quoteData = _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }) ? _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }).value.result : {};
    return quoteData;
  }
  return {};
};

const populateUnderwritingQuestions = (state) => {
  if (state.cg && state.cg.getUWQuestions && state.cg.getUWQuestions.data &&
    state.cg.getUWQuestions.data.model && state.cg.getUWQuestions.data.model.variables) {
    const underwritingQuestions = _.filter(state.cg.getUWQuestions.data.model.variables, item => item.name === 'getListOfUWQuestions');
    if (underwritingQuestions.length > 0) {
      const data = underwritingQuestions[0].value.result;
      return data;
    }
  }
  return [];
};

const handleInitialize = (state) => {
  const questions = populateUnderwritingQuestions(state);
  const data = handleGetQuoteData(state);
  const values = {};

  questions.forEach((question) => {
    const val = _.get(data.underwritingAnswers, `${question.name}.answer`);
    values[question.name] = val;
  });

  return values;
};

const checkQuoteState = quoteData => _.some(['Policy Issued', 'Documents Received'], state => state === quoteData.quoteState);

export class Underwriting extends Component {

  componentWillMount() {
    const { quoteData } = this.props;
    const startModelData = {
      companyCode: quoteData.companyCode,
      state: quoteData.state,
      property: quoteData.property,
      product: quoteData.product
    };
    this.props.actions.cgActions.startWorkflow('getUWQuestions', startModelData, false);
  }

  handleFormSubmit = (data) => {
    const { appState, actions, quoteData } = this.props;

    const workflowId = appState.instanceId;
    actions.appStateActions.setAppState(appState.modelName, workflowId, { ...appState.data, submitting: true });
    const steps = [
      { name: 'hasUserEnteredData', data: { answer: 'Yes' } },
      { name: 'askUWAnswers', data }
    ];

    actions.cgActions.batchCompleteTask(appState.modelName, workflowId, steps)
      .then(() => {
        // now update the workflow details so the recalculated rate shows
        this.props.actions.appStateActions.setAppState(this.props.appState.modelName,
          workflowId, { ...this.props.appState.data,
            selectedLink: 'underwriting',
            submitting: false });
      });
  };

  clearForm = () => {
    const { dispatch, questions } = this.props;
    for (let i = 0; i < questions.length; i += 1) {
      dispatch(change('Underwriting', questions[i].name, ''));
    }
  };


  render() {
    const { fieldValues, handleSubmit, pristine, quoteData, stateObject } = this.props;

    const questions = populateUnderwritingQuestions(stateObject);

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

                <h3>Underwriting Questions</h3>

                {questions && questions.map((question, index) =>

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
                    disabled={this.props.appState.data.submitting || pristine || checkQuoteState(quoteData)}
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
