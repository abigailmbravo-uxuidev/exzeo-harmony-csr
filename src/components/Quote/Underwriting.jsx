import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Prompt } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm } from 'redux-form';

import { blockQuote } from '../../state/selectors/quote.selectors';
import { setAppState } from '../../state/actions/appState.actions';
import { setAppError } from '../../state/actions/error.actions';
import { getUnderwritingQuestions } from '../../state/actions/service.actions';
import { getQuote } from '../../state/actions/quote.actions';
import FieldGenerator from '../Form/FieldGenerator';
import Footer from '../Common/Footer';

const MODEL_NAME = 'csrUnderwriting';
const PAGE_NAME = 'underwriting';

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

export const handleFormSubmit = async (data, dispatch, props) => {
  const { quoteData } = props;

  const { floodCoverage, noPriorInsuranceSurcharge } = quoteData.underwritingAnswers;

  await props.updateQuote(MODEL_NAME, {
    quoteId: quoteData._id,
    ...data,
    floodCoverage,
    noPriorInsuranceSurcharge
  }, PAGE_NAME);

};

export const clearForm = (props) => {
  props.reset('Underwriting');
};
export class Underwriting extends Component {
  componentDidMount() {
    const {
      setAppStateAction, getQuoteAction, getUnderwritingQuestionsAction,
      appState, match: { params: { quoteNumber } }
    } = this.props;

    setAppStateAction(
      MODEL_NAME, appState.data.instanceId,
      {
        ...appState.data,
        submitting: true
      }
    );

    getQuoteAction(quoteNumber, PAGE_NAME)
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
      appState, fieldValues, handleSubmit, pristine, quoteData, underwritingQuestions, dirty, editingDisabled
    } = this.props;
    return (
      <React.Fragment>
        <Prompt when={dirty} message="Are you sure you want to leave with unsaved changes?" />
        <div className="route-content">
          <form id="Underwriting" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="scroll">
              <div className="form-group survey-wrapper" role="group">
                <h3>Underwriting Questions</h3>
                {underwritingQuestions && _.sortBy(underwritingQuestions, ['order']).map((question, index) =>
                  (<FieldGenerator
                    key={question.order}
                    data={quoteData.underwritingAnswers}
                    question={question}
                    values={fieldValues} />
                  ))}
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
              disabled={appState.data.submitting || pristine || editingDisabled}
              data-test="submit"
            >
              Update
            </button>
          </div>
        </div>
      </React.Fragment>
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
    data: PropTypes.shape({ submitting: PropTypes.bool })
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
  editingDisabled: blockQuote(state),
  underwritingQuestions: state.service.underwritingQuestions
});

export default connect(
  mapStateToProps,
  {
    setAppStateAction: setAppState,
    setAppErrorAction: setAppError,
    getQuoteAction: getQuote,
    getUnderwritingQuestionsAction: getUnderwritingQuestions
  }
)(reduxForm({ form: 'Underwriting', enableReinitialize: true })(Underwriting));
