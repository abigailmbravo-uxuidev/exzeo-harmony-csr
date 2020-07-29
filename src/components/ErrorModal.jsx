import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import * as errorActions from '../state/actions/error.actions';

const modalStyles = {
  content: {
    top: '20%',
    left: '20%'
  }
};

const target = document.getElementById('root');

const ErrorModal = ({ error, handleClose }) => {
  return (
    <Modal
      appElement={target}
      className="card"
      isOpen={error.message !== undefined}
      contentLabel="Error Modal"
      style={modalStyles}
    >
      <div className="card-header">
        <h4>
          <i className="fa fa-exclamation-circle" />
          &nbsp;Error
        </h4>
      </div>
      <div className="card-block">
        <p>{String(error.message)}</p>
      </div>
      <div className="card-footer">
        {error.requestId && (
          <div className="footer-message">
            <p>Request ID: {error.requestId}</p>
          </div>
        )}
        <button className="btn-primary" onClick={handleClose}>
          close
        </button>
      </div>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    error: state.error
  };
};

export default connect(mapStateToProps, {
  handleClose: errorActions.clearAppError
})(ErrorModal);
