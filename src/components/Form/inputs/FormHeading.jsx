import React from 'react';
import PropTypes from 'prop-types';

const Heading = ({
  label
}) => (
  <span className="section-group-header">
    <i className={`fa ${label}`} />
    &nbsp;{label}
  </span>
);

Heading.propTypes = {
  /**
   * Heading
   */
  label: PropTypes.string.isRequired
};

export default Heading;
