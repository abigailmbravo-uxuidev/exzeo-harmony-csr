import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';

import { blockQuote } from '../../state/selectors/quote.selectors';
import { setAppState } from '../../state/actions/appState.actions';
import { getQuote } from '../../state/actions/quote.actions';
import QuoteSummaryModal from '../../components/Common/QuoteSummaryModal';
import Footer from '../Common/Footer';

const MODEL_NAME = 'csrSubmitApplication';
const PAGE_NAME = 'application';

const handleInitialize = (state) => {
  return {};
};

export const handleGetUnderwritingExceptions = state => (state.quoteState.quote && state.quoteState.quote.underwritingExceptions ? state.quoteState.quote.underwritingExceptions : []);

export const handleFormSubmit = async (data, dispatch, props) => {
  const {
    appState, setAppStateAction, quoteData
  } = props;

  await props.updateQuote(MODEL_NAME, { dsUrl: `${process.env.REACT_APP_API_URL}/ds`, quoteId: quoteData._id }, PAGE_NAME);

  setAppStateAction(MODEL_NAME, '', {
    ...appState.data, submitting: false, showQuoteSummaryModal: false, applicationSent: true
  });
};

export const quoteSummaryModal = (props) => {
  const showQuoteSummaryModal = props.appState.data.showQuoteSummaryModal;
  props.setAppStateAction(
    MODEL_NAME, '',
    { ...props.appState.data, showQuoteSummaryModal: !showQuoteSummaryModal }
  );
};

export class QuoteApplication extends Component {
  componentDidMount() {
    const {
      appState, match, getQuoteAction, setAppStateAction
    } = this.props;
    getQuoteAction(match.params.quoteNumber, 'application');
    setAppStateAction(
      MODEL_NAME, '',
      { ...appState.data, submitting: false }
    );
  }

  render() {
    const {
      appState,
      handleSubmit,
      quoteData,
      underwritingExceptions,
      isUwOverrideSubmitting,
      editingDisabled
    } = this.props;

    const uwExceptions = underwritingExceptions.filter(e => !e.overridden).length;
    return (
      <React.Fragment>
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
              disabled={(uwExceptions > 0) || editingDisabled || appState.data.applicationSent || isUwOverrideSubmitting}
              data-test="submit"
            >
                Send to DocuSign
            </button>
          </div>
        </div>
      </React.Fragment>
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
    data: PropTypes.shape({ submitting: PropTypes.bool })
  })
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  showQuoteSummaryModal: state.appState.data.showQuoteSummaryModal,
  fieldValues: _.get(state.form, 'Application.values', {}),
  underwritingExceptions: handleGetUnderwritingExceptions(state),
  initialValues: handleInitialize(state),
  quoteData: state.quoteState.quote || {},
  editingDisabled: blockQuote(state),
  isUwOverrideSubmitting: state.form.UnderwritingOverride ? state.form.UnderwritingOverride.submitting : false
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, {
  setAppStateAction: setAppState,
  getQuoteAction: getQuote
})(reduxForm({ form: 'Application', enableReinitialize: true })(QuoteApplication));
