import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as cgActions from '../../state/actions/cg.actions';
import * as appStateActions from '../../state/actions/appState.actions';
import * as quoteStateActions from '../../state/actions/quoteState.actions';
import QuoteBaseConnect from '../../containers/Quote';
import QuoteSummaryModal from '../../components/Common/QuoteSummaryModal';
import Footer from '../Common/Footer';

const MODEL_NAME = 'csrQuote';

const handleInitialize = (state) => {
  return {};
};

export const handleGetUnderwritingExceptions = state => (state.service.quote && state.service.quote.underwritingExceptions ? state.service.quote.underwritingExceptions : []);

export const handleFormSubmit = (data, dispatch, props) => {
  const { appState, actions, match } = props;
  const workflowId = match.params.workflowId;

  actions.appStateActions.setAppState(MODEL_NAME, workflowId,
    { ...appState.data, applicationSubmitting: true, applicationSent: true }
  );

  const steps = [
    { name: 'hasUserEnteredData', data: { answer: 'Yes' } },
    { name: 'moveTo', data: { key: 'application' } }
  ];
  actions.cgActions.batchCompleteTask(MODEL_NAME, workflowId, steps)
    .then(() => {
      actions.appStateActions.setAppState(MODEL_NAME, workflowId,
        { applicationSent: true }
      );
      actions.quoteStateActions.getLatestQuote(true, props.quoteData._id);
    });
};

export const quoteSummaryModal = (props) => {
  const showQuoteSummaryModal = props.appState.data.showQuoteSummaryModal;
  props.actions.appStateActions.setAppState(MODEL_NAME, props.match.params.workflowId,
    { ...props.appState.data, showQuoteSummaryModal: !showQuoteSummaryModal }
  );
};

const checkQuoteState = quoteData => _.some(['Policy Issued', 'Documents Received'], state => state === quoteData.quoteState);

export class QuoteApplication extends Component {
  componentDidMount() {
    const { appState, actions, match } = this.props;
    const workflowId = match.params.workflowId;
    if (workflowId) {
      actions.appStateActions.setAppState(MODEL_NAME, workflowId,
        { ...appState.data, submitting: true}
      );
      const steps = [
        { name: 'hasUserEnteredData', data: { answer: 'No' } },
        { name: 'moveTo', data: { key: 'application' } }
      ];

      actions.cgActions.batchCompleteTask(MODEL_NAME, workflowId, steps)
        .then(() => {
          actions.quoteStateActions.getLatestQuote(true, match.params.quoteId);
          actions.appStateActions.setAppState(MODEL_NAME, workflowId,
            { ...appState.data, selectedLink: 'application' }
          );
        });
    }
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
          { appState.data.showQuoteSummaryModal && <QuoteSummaryModal {...this.props} verify={handleFormSubmit} showQuoteSummaryModal={() => quoteSummaryModal(this.props)} /> }
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
              disabled={(underwritingExceptions && _.filter(underwritingExceptions, uw => !uw.overridden).length > 0) || checkQuoteState(quoteData) || appState.data.applicationSent}
            >Send to DocuSign
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
  quoteData: state.service.quote || {}
});

const mapDispatchToProps = dispatch => ({
  actions: {
    quoteStateActions: bindActionCreators(quoteStateActions, dispatch),
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Application', enableReinitialize: true })(QuoteApplication));
