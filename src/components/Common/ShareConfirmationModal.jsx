import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as cgActions from '../../state/actions/cg.actions';
import * as appStateActions from '../../state/actions/appState.actions';

const ShareConfirmation = ({ hideShareConfirmationModal }) => (
  <div className="modal quote-summary">
    <div className="card">
      <div className="card-header">
        <h4>
          <i className="fa fa-envelope" /> Email Sent
        </h4>
      </div>
      <div className="card-block">
        <h3>Email Sent Successfully</h3>
      </div>
      <div className="card-footer">
        <div className="btn-footer">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => hideShareConfirmationModal(false)}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
);

ShareConfirmation.propTypes = {
  hideShareConfirmationModal: PropTypes.func
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareConfirmation);
