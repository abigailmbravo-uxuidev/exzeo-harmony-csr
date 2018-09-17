import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Prompt } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm } from 'redux-form';
import * as cgActions from '../../state/actions/cg.actions';
import * as quoteStateActions from '../../state/actions/quoteState.actions';
import * as serviceActions from '../../state/actions/service.actions';
import * as appStateActions from '../../state/actions/appState.actions';
import QuoteBaseConnect from '../../containers/Quote';
import FieldGenerator from '../Form/FieldGenerator';
import Footer from '../Common/Footer';

const MODEL_NAME = 'csrQuote';

export const handleInitialize = (state) => {
  const questions = state.service.underwritingQuestions ? state.service.underwritingQuestions : [];
  const data = state.service.quote;
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
  const { appState, actions, match } = props;
  const workflowId = match.params.workflowId;

  actions.appStateActions.setAppState(MODEL_NAME, workflowId, { ...appState.data, submitting: true });
  const steps = [
    { name: 'hasUserEnteredData', data: { answer: 'Yes' } },
    { name: 'askUWAnswers', data }
  ];

  actions.cgActions.batchCompleteTask(MODEL_NAME, workflowId, steps)
    .then(() => {
      actions.quoteStateActions.getLatestQuote(true, props.quoteData._id);
      // now update the workflow details so the recalculated rate shows
      actions.appStateActions.setAppState(MODEL_NAME, workflowId,
        { ...appState.data, selectedLink: 'underwriting', submitting: false }
      );
    });
};

export const clearForm = (props) => {
  props.reset('Underwriting');
};
export class Underwriting extends Component {
  componentDidMount() {
    const { actions, appState, match } = this.props;
    const workflowId = match.params.workflowId;

    if (workflowId) {
      actions.appStateActions.setAppState(MODEL_NAME, workflowId, {
        ...appState.data,
        submitting: true
      });

      const steps = [
        { name: 'hasUserEnteredData', data: { answer: 'No' } },
        { name: 'moveTo', data: { key: 'underwriting' } }
      ];

      actions.cgActions.batchCompleteTask(MODEL_NAME, workflowId, steps)
        .then(() => {
          return actions.serviceActions.getQuote(match.params.quoteId)
        })
        .then((quoteData) => {
          actions.serviceActions.getUnderwritingQuestions(quoteData.companyCode, quoteData.state, quoteData.product, quoteData.property);

          actions.appStateActions.setAppState(MODEL_NAME, workflowId,
            { ...appState.data, selectedLink: 'underwriting' }
          );
        });
    }
  }

  render() {
    const { appState, fieldValues, handleSubmit, pristine, quoteData, underwritingQuestions, dirty, match } = this.props;
    return (
      <QuoteBaseConnect match={match}>
        <Prompt when={dirty} message="Are you sure you want to leave with unsaved changes?" />

        <div className="route-content">
          <form id="Underwriting" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="scroll">
              <div className="form-group survey-wrapper" role="group">
                <h3>Underwriting Questions</h3>
                {underwritingQuestions && _.sortBy(underwritingQuestions, ['order']).map((question, index) =>
                  <FieldGenerator
                    data={quoteData.underwritingAnswers}
                    question={question}
                    values={fieldValues}
                    key={index}
                  />)}
              </div>
            </div>
          </form>
        </div>
        <div className="basic-footer btn-footer">
          <Footer />
          <div className="btn-wrapper">
            <button
              tabIndex={'0'}
              aria-label="reset-btn form-underwriting"
              onClick={() => clearForm(this.props)}
              className="btn btn-secondary"
              type="button"
              form="Underwriting"
              disabled={appState.data.submitting}
            >Reset</button>
            <button
              tabIndex={'0'}
              aria-label="submit-btn form-underwriting"
              className="btn btn-primary"
              type="submit"
              form="Underwriting"
              disabled={appState.data.submitting || pristine || checkQuoteState(quoteData)}
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
  quoteData: state.service.quote || {},
  activateRedirect: state.appState.data.activateRedirect,
  underwritingQuestions: state.service.underwritingQuestions
});

const mapDispatchToProps = dispatch => ({
  actions: {
    quoteStateActions: bindActionCreators(quoteStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch),
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Underwriting', enableReinitialize: true })(Underwriting));
