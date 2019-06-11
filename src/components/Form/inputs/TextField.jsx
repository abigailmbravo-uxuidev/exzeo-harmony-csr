import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FieldHint from './FieldHint';
import reduxFormField from './reduxFormField';

export const TextInput = ({
  dateString,
  input,
  hint,
  label,
  styleName,
  meta,
  type,
  disabled,
  min,
  max,
  dependsOn,
  name
}) => {
  const { touched, error, warning } = meta;

  const formGroupStyles = classNames(
    'form-group',
    styleName,
    name,
    { disabled },
    { valid: touched && !error },
    { error: touched && error },
  );

  const Hint = hint && (<FieldHint name={name} hint={hint} />);

  const Error = touched && (error || warning) && (
    <span>{error || warning}</span>
  );

  const Label = label && (<label htmlFor={name} for={input.name}>
    {label}{Hint}
  </label>);

  return (
    <div className={formGroupStyles}>
      {Label}
      <input
        min={min}
        max={max}
        disabled={disabled}
        name={name}
        {...input}
        tabIndex={'0'}
        type={type}
        id={input.name}
      />
      {Error}
    </div>
  );
};

TextInput.propTypes = {

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

  dependsOn: PropTypes.array,

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

TextInput.defaultProps = {
  hint: '',
  input: {},
  meta: {},
  type: 'text',
  styleName: ''
};

export default reduxFormField(TextInput);
