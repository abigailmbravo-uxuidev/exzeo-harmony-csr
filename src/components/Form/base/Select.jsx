import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import FieldHint from '../inputs/FieldHint';

const SelectInput = ({
   answers,
   hint,
   input,
   isDisabled,
   label,
   meta,
   styleName
 }) => {
  const { disabled, name } = input;
  const { touched, error, warning } = meta;

  return (
    <div className={classNames('form-group', styleName, name, (error || warning ? 'error' : ''))}>
      {label && <label htmlFor={name}>{label}{hint && <FieldHint name={name} hint={hint} />}</label>}
      {answers && answers.length >= 0 &&
      <select
        {...input}
        className={Error ? 'error' : ''}
        tabIndex="0"
        disabled={disabled || isDisabled}
        aria-activedescendant={input.value}
      >
        <option aria-label="Please select..." value="">Please select...</option>
        {answers.map((answer, index) => (
          <option aria-label={answer.label || answer.answer} value={answer.answer} key={index}>
            {answer.label || answer.answer}
          </option>
        ))}
      </select>
      }
      {touched && (error || warning) && <span>{error || warning}</span>}
    </div>
  );
};

SelectInput.propTypes = {
  /**
   * Answers array used to generate options
   */
  answers: propTypes.arrayOf(propTypes.shape({
    answer: propTypes.any, // eslint-disable-line
    label: propTypes.string,
    image: propTypes.string
  })),

  /**
   * Tooltip for user
   */
  hint: propTypes.string,

  /**
   * Input provided by redux-form field
   */
  input: propTypes.shape({
    disabled: propTypes.bool,
    name: propTypes.string,
    onChange: propTypes.func,
    value: propTypes.any, // eslint-disable-line
  }),
  meta: propTypes.shape(),
  /**
   * Label for field
   */
  label: propTypes.string,

  /**
   * Styles for form group
   */
  styleName: propTypes.string
};

SelectInput.defaultProps = {
  input: {
    onChange: () => {}
  }
};

export default SelectInput;
