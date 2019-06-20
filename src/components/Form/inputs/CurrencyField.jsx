import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NumberFormat from 'react-number-format';
import FieldHint from './FieldHint';
import reduxFormField from './reduxFormField';

export const CurrencyInput = ({
  validations,
  input,
  hint,
  label,
  styleName,
  meta,
  type,
  disabled,
  min,
  max
}) => {
  const { touched, error, warning } = meta;
  const { name, value, onChange } = input;

  const formGroupStyles = classNames(
    'form-group',
    styleName,
    name,
    { disabled },
    { valid: touched && !error },
    { error: touched && error }
  );

  const Hint = hint && <FieldHint name={name} hint={hint} />;

  const Error = touched && (error || warning) && (
    <span>{error || warning}</span>
  );

  const Label = label && (
    <label htmlFor={name}>
      {label}
      {Hint}
    </label>
  );

  return (
    <div className={formGroupStyles}>
      {Label}
      <NumberFormat
        {...input}
        tabIndex="0"
        displayType="input"
        thousandSeparator
        prefix="$ "
        min={min}
        max={max}
        disabled={disabled}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
      />
      {Error}
    </div>
  );
};

CurrencyInput.propTypes = {
  /**
   * Hint for the user
   */
  hint: PropTypes.string,

  /**
   * Input from redux-field Field component
   */
  input: PropTypes.shape({
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any
  }),

  /**
   * Label to display above question
   */
  label: PropTypes.string,

  /**
   * Validations props
   */
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool,
    warning: PropTypes.string
  }),

  /**
   * Max and min limit for range slider
   */
  max: PropTypes.number,
  min: PropTypes.number,

  /**
   * Answer Type from original question
   */
  type: PropTypes.oneOf([
    'email',
    'password',
    'text',
    'number',
    'date',
    'tel',
    'search'
  ]),

  /**
   * Stylename for form-group
   */
  styleName: PropTypes.string
};

CurrencyInput.defaultProps = {
  hint: '',
  input: {},
  meta: {},
  type: 'text',
  styleName: ''
};

export default reduxFormField(CurrencyInput);
