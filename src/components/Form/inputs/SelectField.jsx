import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FieldHint from './FieldHint';
import reduxFormField from './reduxFormField';

export const SelectInput = ({
  answers,
  hint,
  input,
  label,
  meta,
  styleName
}) => {
  const { onChange, name, value, disabled } = input;
  const { touched, error, warning } = meta;
  const Error = touched && (error || warning) && <span style={{ border: '1pt solid red' }}>{error || warning}</span>;

  const formGroupStyles = classNames('form-group', { styleName }, { name }, Error ? 'error' : '');
  const Hint = hint && (<FieldHint name={name} hint={hint} />);

  return (
    <div className={formGroupStyles}>
      <label htmlFor={name}>{label} &nbsp; {Hint}</label>
      {answers && answers.length > 0 ? (
        <select
          className={Error ? 'error' : ''}
          value={value}
          name={name}
          disabled={disabled}
          onChange={onChange}
        >
          <option disabled value={''}>Please select...</option>
          {answers.map((answer, index) => (
            <option value={answer.answer} key={index}>
              {answer.label || answer.answer}
            </option>
            ))}
        </select>
        ) : null}
    </div>
  );
};

SelectInput.propTypes = {

  /**
   * Answers array used to generate options
   */
  answers: PropTypes.arrayOf(PropTypes.shape({
    answer: PropTypes.any, // eslint-disable-line
    label: PropTypes.string,
    image: PropTypes.string
  })),

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
    value: PropTypes.any, // eslint-disable-line
  }),
  meta: {
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string
  },
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
