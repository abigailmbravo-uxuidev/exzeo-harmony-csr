import React, { PropTypes } from 'react';

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
