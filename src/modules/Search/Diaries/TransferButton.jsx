import React from 'react';
import PropTypes from 'prop-types';

const TransferButton = ({ toggleTransfer }) => (
  <button
    className="btn btn-link btn-reset"
    type="button"
    onClick={toggleTransfer}
    data-test="toggleTransfer"
  >
    <i className="fa fa-share" />
    TRANSFER
  </button>
);

TransferButton.propTypes = {
  toggleTransfer: PropTypes.func.isRequired
};

export default TransferButton;
