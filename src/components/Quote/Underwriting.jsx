import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Prompt } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm } from 'redux-form';

import { startWorkflow } from '../../state/actions/cg.actions';
import { setAppState } from '../../state/actions/appState.actions';
import { setAppError } from '../../state/actions/error.actions';
import { getQuote, getUnderwritingQuestions } from '../../state/actions/service.actions';
import { getLatestQuote } from '../../state/actions/quoteState.actions';
import QuoteBaseConnect from '../../containers/Quote';
import FieldGenerator from '../Form/FieldGenerator';
import Footer from '../Common/Footer';

const MODEL_NAME = 'csrUnderwriting';

export const handleInitialize = (state) => {
  const questions = state.service.underwritingQuestions ? state.service.underwritingQuestions : [];
  const data = state.quoteState.quote;
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

export const handleFormSubmit = async (data, dispatch, props) => {
  const {
    quoteData, startWorkflowAction, setAppErrorAction, setAppStateAction, appState, getLatestQuoteAction
  } = props;

  const { floodCoverage, noPriorInsuranceSurcharge } = quoteData.underwritingAnswers;

  try {
    setAppStateAction(MODEL_NAME, appState.data.instanceId, { ...appState.data, submitting: true });
    await startWorkflowAction(MODEL_NAME, {
      quoteId: quoteData._id,
      ...data,
      floodCoverage,
      noPriorInsuranceSurcharge
    });

    getLatestQuoteAction(true, quoteData._id);
  } catch (error) {
    setAppErrorAction(error);
  } finally {
    setAppStateAction(MODEL_NAME, appState.data.instanceId, { ...appState.data, submitting: false });
  }
};

export const clearForm = (props) => {
  props.reset('Underwriting');
};
export class Underwriting extends Component {
  componentDidMount() {
    const {
      setAppStateAction, getQuoteAction, getUnderwritingQuestionsAction,
      appState, match: { params: { quoteId } }
    } = this.props;

    setAppStateAction(
      MODEL_NAME, appState.data.instanceId,
      {
        ...appState.data,
        submitting: true
      }
    );

    getQuoteAction(quoteId)
      .then((quoteData) => {
        getUnderwritingQuestionsAction(quoteData.companyCode, quoteData.state, quoteData.product, quoteData.property);
        setAppStateAction(
          MODEL_NAME, appState.data.instanceId,
          {
            ...appState.data,
            submitting: false
          }
        );
      });
  }

  render() {
    const {
      appState, fieldValues, handleSubmit, pristine, quoteData, underwritingQuestions, dirty, match
    } = this.props;
    return (
      <QuoteBaseConnect match={match}>
        <Prompt when={dirty} message="Are you sure you want to leave with unsaved changes?" />

        <div className="route-content">
          <form id="Underwriting" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="scroll">
              <div className="form-group survey-wrapper" role="group">
                <h3>Underwriting Questions</h3>
                {underwritingQuestions && _.sortBy(underwritingQuestions, ['order']).map((question, index) =>
                  (<FieldGenerator
                    data={quoteData.underwritingAnswers}
                    question={question}
                    values={fieldValues}
                    key={index} />))}
              </div>
            </div>
          </form>
        </div>
        <div className="basic-footer btn-footer">
          <Footer />
          <div className="btn-wrapper">
            <button
              tabIndex="0"
              aria-label="reset-btn form-underwriting"
              onClick={() => clearForm(this.props)}
              className="btn btn-secondary"
              type="button"
              form="Underwriting"
              disabled={appState.data.submitting}>Reset
            </button>
            <button
              tabIndex="0"
              aria-label="submit-btn form-underwriting"
              className="btn btn-primary"
              type="submit"
              form="Underwriting"
              disabled={appState.data.submitting || pristine || checkQuoteState(quoteData)}>Update
            </button>
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
  quoteData: state.quoteState.quote || {},
  activateRedirect: state.appState.data.activateRedirect,
  underwritingQuestions: state.service.underwritingQuestions
});

export default connect(
  mapStateToProps,
  {
    startWorkflowAction: startWorkflow,
    setAppStateAction: setAppState,
    setAppErrorAction: setAppError,
    getQuoteAction: getQuote,
    getLatestQuoteAction: getLatestQuote,
    getUnderwritingQuestionsAction: getUnderwritingQuestions
  }
)(reduxForm({ form: 'Underwriting', enableReinitialize: true })(Underwriting));
