import React, { PropTypes } from 'react';
import classNames from 'classnames';
import FieldHint from './FieldHint';
import reduxFormField from './reduxFormField';

export const SelectFieldBilling = ({
  answers,
  hint,
  input,
  label,
  styleName
}) => {
  const { onChange, name, value, disabled } = input;

  const formGroupStyles = classNames('form-group', { styleName }, { name });
  const Hint = hint && (<FieldHint name={name} hint={hint} />);

  return (
    <div className={formGroupStyles}>
      <label htmlFor={name}>
        {label} &nbsp; {Hint}
        {answers && answers.length > 0 ? (
          <select
            value={value}
            name={name}
            disabled={disabled}
            onChange={onChange}
          >
            <option disabled value={''}>Please select...</option>
            {answers.map((answer, index) => (
              <option value={answer.billToId} key={index}>
                {answer.displayText}
              </option>
            ))}
          </select>
        ) : null}
      </label>
    </div>
  );
};

SelectFieldBilling.propTypes = {

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
