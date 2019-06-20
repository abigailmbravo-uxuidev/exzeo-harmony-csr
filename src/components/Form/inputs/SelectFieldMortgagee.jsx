import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FieldHint from './FieldHint';
import reduxFormField from './reduxFormField';

export const SelectInputMortgagee = ({
  answers,
  hint,
  input,
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
              value={answer.ID}
              key={index}
              aria-label={`${answer.AIName1} ${answer.AIAddress1}, ${answer.AICity}, ${answer.AIState} ${answer.AIZip}`}
            >
              {answer.AIName1} {answer.AIAddress1}, {answer.AICity},{' '}
              {answer.AIState} {answer.AIZip}
            </option>
          ))}
        </select>
      ) : null}
      {Error}
    </div>
  );
};

SelectInputMortgagee.propTypes = {
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

SelectInputMortgagee.defaultProps = {
  input: {
    onChange: () => {}
  }
};

export default reduxFormField(SelectInputMortgagee);
