import React from 'react';
import PropTypes from 'prop-types';

const ResetButton = ({ reset }) => (
  <button
    className="btn btn-link btn-reset"
    type="button"
    onClick={() => reset()}
    dataTest="reset"
  >
    <i className="fa fa-refresh" />
    RESET
  </button>
);

ResetButton.propTypes = {
  reset: PropTypes.func.isRequired
};

export default ResetButton;
