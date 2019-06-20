import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FieldHint from '../inputs/FieldHint';

export const Input = ({
  input,
  meta: { touched, error, warning },
  hint,
  label,
  styleName,
  type,
  disabled,
  name,
  placeholder,
  min,
  max
}) => (
  <div
    className={classNames(
      'form-group',
      styleName,
      name,
      { disabled },
      { valid: touched && !error },
      { error: touched && error }
    )}
  >
    {label && (
      <label htmlFor={name}>
        {label}
        {hint && <FieldHint name={name} hint={hint} />}
      </label>
    )}
    <input
      name={name}
      type={type}
      disabled={disabled}
      {...input}
      placeholder={placeholder}
      min={min}
      max={max}
      tabIndex="0"
    />
    {touched && (error || warning) && <span>{error || warning}</span>}
  </div>
);

Input.propTypes = {
  hint: PropTypes.string,
  input: PropTypes.shape({
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any
  }),
  label: PropTypes.string,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool,
    warning: PropTypes.string
  }),
  styleName: PropTypes.string
};

Input.defaultProps = {
  type: 'text',
  input: {},
  meta: {},
  hint: '',
  placeholder: '',
  disabled: false
};

export default Input;
