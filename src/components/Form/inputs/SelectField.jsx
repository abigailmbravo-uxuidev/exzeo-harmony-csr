import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FieldHint from './FieldHint';
import reduxFormField from './reduxFormField';

export const SelectInput = ({
  answers,
  hint,
  input,
  isDisabled,
  label,
  meta,
  styleName
}) => {
  const { onChange, name, value, disabled } = input;
  const { touched, error, warning } = meta;
  const Error = touched && (error || warning) && (
    <span>{error || warning}</span>
  );
  const formGroupStyles = classNames(
    'form-group',
    styleName,
    name,
    Error ? 'error' : ''
  );
  const Hint = hint && <FieldHint name={name} hint={hint} />;
  return (
    <div className={formGroupStyles}>
      {label && (
        <label htmlFor={name}>
          {label}
          {Hint}
        </label>
      )}
      {answers && answers.length >= 0 ? (
        <select
          className={Error ? 'error' : ''}
          tabIndex="0"
          value={value}
          name={name}
          disabled={disabled || isDisabled}
          onChange={onChange}
          aria-activedescendant={value}
        >
          <option aria-label="Please select..." value="">
            Please select...
          </option>
          {answers.map((answer, index) => (
            <option
              aria-label={answer.label || answer.answer}
              value={answer.answer}
              key={index}
            >
              {answer.label || answer.answer}
            </option>
          ))}
        </select>
      ) : null}
      {Error}
    </div>
  );
};

SelectInput.propTypes = {
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
  meta: PropTypes.shape(),
  /**
   * Label for field
   */
  label: PropTypes.string,

  /**
   * Styles for form group
   */
  styleName: PropTypes.string
};

SelectInput.defaultProps = {
  input: {
    onChange: () => {}
  }
};

export default reduxFormField(SelectInput);
