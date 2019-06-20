import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NumberFormat from 'react-number-format';
import FieldHint from '../inputs/FieldHint';

export const CurrencyInput = ({
  validations,
  input,
  meta: { touched, error, warning },
  hint,
  label,
  styleName,
  type,
  disabled,
  min,
  max
}) => {
  return (
    <div
      className={classNames(
        'form-group',
        styleName,
        input.name,
        { disabled },
        { valid: touched && !error },
        { error: touched && error }
      )}
    >
      {label && (
        <label htmlFor={input.name}>
          {label}
          {hint && <FieldHint name={input.name} hint={hint} />}
        </label>
      )}
      <NumberFormat
        type={type}
        displayType="input"
        {...input}
        tabIndex="0"
        thousandSeparator
        prefix="$ "
        min={min}
        max={max}
        disabled={disabled}
      />
      {touched && (error || warning) && <span>{error || warning}</span>}
    </div>
  );
};

CurrencyInput.propTypes = {
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
  max: PropTypes.number,
  min: PropTypes.number,
  type: PropTypes.oneOf([
    'email',
    'password',
    'text',
    'number',
    'date',
    'tel',
    'search'
  ]),
  styleName: PropTypes.string
};

CurrencyInput.defaultProps = {
  hint: '',
  input: {},
  meta: {},
  type: 'text',
  styleName: ''
};

export default CurrencyInput;
