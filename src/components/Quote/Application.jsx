import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';

import { startWorkflow } from '../../state/actions/cg.actions';
import { setAppState } from '../../state/actions/appState.actions';
import { setAppError } from '../../state/actions/error.actions';
import { getLatestQuote } from '../../state/actions/quoteState.actions';
import QuoteBaseConnect from '../../containers/Quote';
import QuoteSummaryModal from '../../components/Common/QuoteSummaryModal';
import Footer from '../Common/Footer';

const MODEL_NAME = 'csrSubmitApplication';

const handleInitialize = (state) => {
  return {};
};

export const handleGetUnderwritingExceptions = state => (state.quoteState.quote && state.quoteState.quote.underwritingExceptions ? state.quoteState.quote.underwritingExceptions : []);

export const handleFormSubmit = async (data, dispatch, props) => {
  const {
    appState, setAppStateAction, startWorkflowAction, setAppErrorAction, getLatestQuoteAction, quoteData
  } = props;

  try {
    setAppStateAction(MODEL_NAME, '', { ...appState.data, submitting: true, applicationSent: true });
    await startWorkflowAction(MODEL_NAME, { dsUrl: `${process.env.REACT_APP_API_URL}/ds`, quoteId: quoteData._id });
    await getLatestQuoteAction(true, quoteData._id);
  } catch (error) {
    setAppErrorAction(error);
  } finally {
    setAppStateAction(MODEL_NAME, '', {
      ...appState.data, submitting: false, showQuoteSummaryModal: false, applicationSent: true
    });
  }
};

export const quoteSummaryModal = (props) => {
  const showQuoteSummaryModal = props.appState.data.showQuoteSummaryModal;
  props.setAppStateAction(
    MODEL_NAME, '',
    { ...props.appState.data, showQuoteSummaryModal: !showQuoteSummaryModal }
  );
};

const checkQuoteState = quoteData => _.some(['Policy Issued', 'Documents Received'], state => state === quoteData.quoteState);

export class QuoteApplication extends Component {
  componentDidMount() {
    const {
      appState, match, getLatestQuoteAction, setAppStateAction
    } = this.props;
    getLatestQuoteAction(true, match.params.quoteId);
    setAppStateAction(
      MODEL_NAME, '',
      { ...appState.data, submitting: false }
    );
  }

  render() {
    const {
      appState,
      handleSubmit,
      match,
      quoteData,
      underwritingExceptions
    } = this.props;

    return (
      <QuoteBaseConnect match={match}>
        <div className="route-content verify workflow">
          <form id="Application" onSubmit={handleSubmit(() => quoteSummaryModal(this.props))}>
            <div className="scroll">
              <div className="detail-wrapper">
                {underwritingExceptions && _.filter(underwritingExceptions, uw => !uw.overridden).length > 0 &&
                  <div className="messages" >
                    <div className="message error">
                      <i className="fa fa-exclamation-circle" aria-hidden="true" />&nbsp;Application cannot be sent due to Underwriting Validations.
                    </div>
                  </div>
                }
              </div>
            </div>
          </form>
          {appState.data.showQuoteSummaryModal && <QuoteSummaryModal {...this.props} verify={handleFormSubmit} showQuoteSummaryModal={() => quoteSummaryModal(this.props)} />}
        </div>
        <div className="basic-footer btn-footer">
          <Footer />
          <div className="btn-wrapper">
            <button
              tabIndex="0"
              aria-label="submit-btn form-application"
              form="Application"
              className="btn btn-primary"
              type="submit"
              disabled={(underwritingExceptions && _.filter(underwritingExceptions, uw => !uw.overridden).length > 0) || checkQuoteState(quoteData) || appState.data.applicationSent}>Send to DocuSign
            </button>
          </div>
        </div>
      </QuoteBaseConnect>
    );
  }
}

QuoteApplication.contextTypes = {
  router: PropTypes.object
};

QuoteApplication.propTypes = {
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({ submitting: PropTypes.boolean })
  })
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  showQuoteSummaryModal: state.appState.data.showQuoteSummaryModal,
  fieldValues: _.get(state.form, 'Application.values', {}),
  underwritingExceptions: handleGetUnderwritingExceptions(state),
  initialValues: handleInitialize(state),
  quoteData: state.quoteState.quote || {}
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, {
  startWorkflowAction: startWorkflow,
  setAppStateAction: setAppState,
  setAppErrorAction: setAppError,
  getLatestQuoteAction: getLatestQuote
})(reduxForm({ form: 'Application', enableReinitialize: true })(QuoteApplication));
