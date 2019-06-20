import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

const HiddenField = ({ name }) => (
  <Field name={name} component="input" type="hidden" />
);

HiddenField.propTypes = {
  name: PropTypes.string
};

export default HiddenField;
