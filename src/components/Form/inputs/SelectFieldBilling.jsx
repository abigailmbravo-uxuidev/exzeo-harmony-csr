import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FieldHint from './FieldHint';
import reduxFormField from './reduxFormField';

export const SelectFieldBilling = ({
  answers,
  hint,
  input,
  label,
  styleName,
  meta
}) => {
  const { onChange, name, value, disabled } = input;
  const { touched, error, warning } = meta;
  const Error = touched && (error || warning) && (
    <span>{error || warning}</span>
  );
  const formGroupStyles = classNames(
    'form-group',
    { styleName },
    { name },
    Error ? 'error' : ''
  );
  const Hint = hint && <FieldHint name={name} hint={hint} />;

  return (
    <div className={formGroupStyles}>
      <label htmlFor={name}>
        {label}
        {Hint}
      </label>
      {answers && answers.length > 0 ? (
        <select
          tabIndex={'0'}
          className={Error ? 'error' : ''}
          value={value}
          name={name}
          disabled={disabled}
          onChange={onChange}
        >
          <option aria-label={'Please select...'} disabled value={''}>
            Please select...
          </option>
          {answers.map((answer, index) => (
            <option
              aria-label={answer.displayText}
              value={answer.billToId}
              key={index}
            >
              {answer.displayText}
            </option>
          ))}
        </select>
      ) : null}
      {Error}
    </div>
  );
};

SelectFieldBilling.propTypes = {
  /**
   * Answers array used to generate options
   */
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      answer: PropTypes.any, // eslint-disable-line
      label: PropTypes.string,
      image: PropTypes.string
    })
  ),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string
  }),

  /**
   * Tooltip for user
   */
  hint: PropTypes.string,

  /**
   * Input provided by redux-form field
   */
  input: PropTypes.shape({
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any // eslint-disable-line
  }),

  /**
   * Label for field
   */
  label: PropTypes.string,

  /**
   * Styles for form group
   */
  styleName: PropTypes.string
};

SelectFieldBilling.defaultProps = {
  input: {
    onChange: () => {}
  }
};

export default reduxFormField(SelectFieldBilling);
