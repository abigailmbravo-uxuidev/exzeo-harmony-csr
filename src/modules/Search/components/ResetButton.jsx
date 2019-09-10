import React from 'react';
import PropTypes from 'prop-types';

const ResetButton = ({ reset }) => (
  <h3 className="title">
    <button
      className="btn btn-link btn-sm"
      type="button"
      onClick={() => reset()}
    >
      <i className="fa fa-circle" />
      RESET
    </button>
  </h3>
);

ResetButton.propTypes = {
  reset: PropTypes.func
};

export default ResetButton;
