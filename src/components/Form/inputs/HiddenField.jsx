import React, { PropTypes } from 'react';
import { Field } from 'redux-form';

const HiddenField = ({
  name
}) => (<Field name={name} component="input" type="hidden" />);

HiddenField.propTypes = {
  name: PropTypes.string
};

export default HiddenField;
