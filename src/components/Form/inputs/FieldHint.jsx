import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';

const FieldHint = ({
  name,
  hint
}) => (
  <span>
    <i className="fa fa-info-circle" data-tip data-for={name} />
    <ReactTooltip place="right" id={name} type="dark" effect="float">{hint}</ReactTooltip>
  </span>
);

FieldHint.propTypes = {
  name: PropTypes.string.isRequired,
  hint: PropTypes.string.isRequired
};

export default FieldHint;
