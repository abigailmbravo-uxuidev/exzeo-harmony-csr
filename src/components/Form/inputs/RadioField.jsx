/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import reduxFormField from './reduxFormField';
import FieldHint from './FieldHint';
import RadioOption from './RadioOption';

export const RadioInput = ({
  answers,
  displayValue,
  hint,
  input,
  label,
  meta,
  segmented,
  disabled,
  styleName
}) => {
  const { error, touched } = meta;
  const { onChange, name, value } = input;
  const formGroupStyles = classNames(
    'form-group',
    { segmented },
    name,
    styleName,
    disabled ? 'disabled' : ''
  );

  const labelStyles = classNames(
    'group-label',
    { 'label-segmented': segmented },
    { disabled }
  );

  const answerWrapperStyles = classNames('segmented-answer-wrapper', {
    error: touched && error
  });

  const Hint = hint && <FieldHint name={name} hint={hint} />;

  const DisplayField = displayValue && (
    <input type="text" value={displayValue} readOnly />
  );

  const onKeyPress = (event, answer) => {
    if (event.charCode === 13) {
      onChange(answer);
    }
  };

  return (
    <div className={formGroupStyles} role="group">
      <label className={labelStyles} htmlFor={name}>
        {label}
        {Hint}
        {DisplayField}
      </label>
      <div className={answerWrapperStyles}>
        {answers &&
          answers.length > 0 &&
          answers.map((answer, index) => (
            <RadioOption
              answer={answer}
              key={index}
              tabIndex={'0'}
              size={answers.length}
              onChange={onChange}
              onKeyPress={onKeyPress}
              name={name}
              segmented={segmented}
              disabled={disabled}
              value={value}
            />
          ))}
      </div>
    </div>
  );
};

RadioInput.propTypes = {
  /**
   * Answers used to generate options
   */
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      answer: PropTypes.any, // eslint-disable-line
      label: PropTypes.any, // eslint-disable-line
      image: PropTypes.string
    })
  ),

  /**
   * Used for dependent radio field, activates
   * read only input
   */
  displayValue: PropTypes.any, // eslint-disable-line

  /**
   * Tooltip for user
   */
  hint: PropTypes.string,

  /**
   * Provided by redux-form Field
   */
  input: PropTypes.shape({
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any // eslint-disable-line
  }),

  /**
   * Label for form field
   */
  label: PropTypes.string,

  /**
   * Validation results
   */
  meta: PropTypes.shape({
    warning: PropTypes.string,
    error: PropTypes.string,
    touched: PropTypes.bool
  }),

  /**
   * Whether field is segmented radio
   */

  /**
   * Classname for form-group
   */
  segmented: PropTypes.bool,
  styleName: PropTypes.string
};

RadioInput.defaultProps = {
  input: {},
  meta: {}
};

export default reduxFormField(RadioInput);
