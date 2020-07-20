import React from 'react';
import PropTypes from 'prop-types';

const TransferButton = ({ toggleTransfer }) => (
  <button
    className="btn btn-link btn-reset"
    type="button"
    onClick={toggleTransfer}
    dataTest="toggleTransfer"
  >
    <i className="fa fa-share" />
    TRANSFER
  </button>
);

TransferButton.propTypes = {
  reset: PropTypes.func.isRequired
};

export default TransferButton;
