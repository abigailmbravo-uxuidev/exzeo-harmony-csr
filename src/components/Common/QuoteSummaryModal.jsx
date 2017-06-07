import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';

import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import Loader from './Loader';

const QuoteSummary = ({ appState, handleSubmit, verify, showQuoteSummaryModal }) => <div className="modal quote-summary">
  <Form noValidate onSubmit={handleSubmit(verify)}>
    {appState.data.submitting && <Loader />}
    <div className="card">
      <div className="card-header">
        <h4><i className="fa fa-envelope" /> Send Application</h4>
      </div>
      <div className="card-block">
        <h3>Congratulations</h3>
        <p>You have completed the required information for the online Homeowners Quoting Process.</p>
        <p>Are you ready to send e-mail Application out for policyholder signature(s) to bind the policy?</p>
        <p>All signatures must be complete within 10 days, or application will expire. Once you select this, no changes to the application can be made.
      </p>
      </div>
      <div className="card-footer">
        <div className="btn-footer">
          <button className="btn btn-secondary" type="button" onClick={() => showQuoteSummaryModal(false)}>Cancel</button>
          <button className="btn btn-primary" type="submit" disabled={appState.data.submitting}>Send</button>
        </div>
      </div>
    </div>
  </Form>
</div>;

QuoteSummary.propTypes = {
  ...propTypes,
  showQuoteSummaryModal: PropTypes.func,
  verify: PropTypes.func,
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    data: PropTypes.shape({
      recalc: PropTypes.boolean,
      submitting: PropTypes.boolean
    })
  })
};


const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState
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
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'QuoteSummary'
})(QuoteSummary));
