import React, { PropTypes } from 'react';
import classNames from 'classnames';
import FieldHint from './FieldHint';
import reduxFormField from './reduxFormField';

export const SliderInput = ({
  hint,
  input,
  label,
  leftLabel,
  max,
  min,
  rightLabel,
  step,
  styleName
}) => {
  const { name, value } = input;

  const formGroupStyles = classNames('form-group', 'range-component', styleName, name);

  const Hint = hint && (<FieldHint name={name} hint={hint} />);

  const handleChange = function (event) {
    const val = Number(event.target.value.replace(/\D+/g, ''));
    if (!Number.isNaN(val)) { input.onChange(val); }
  };

  return (
    <div className={formGroupStyles}>
      <label htmlFor={name}>
        {label}
         &nbsp;
        {Hint}
      </label>
      <div className="range-wrapper">
        <div className="range-control-wrapper">
          <span className="range-limit">{leftLabel || min || '0'}</span>
          <input
            type="range"
            name={name}
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={input.onChange}
          />
          <span className="range-limit">{rightLabel || max}</span>
        </div>
        <span className="range-value">
          <input
            type="text"
            value={`$ ${value}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            onChange={handleChange}
            name={name}
          />
        </span>
      </div>
    </div>
  );
};

SliderInput.propTypes = {

  /**
   * Tooltip for user
   */
  hint: PropTypes.string,

  /**
   * Input provided by redux-form field
   */
  input: PropTypes.shape({
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any, // eslint-disable-line
  }),

  /**
   * Label for form field
   */
  label: PropTypes.string,

  /**
   * Left label for range slider
   */
  leftLabel: PropTypes.string,

  /**
   * Max and min limit for range slider
   */
  max: PropTypes.number,
  min: PropTypes.number,

  /**
   * Right label for range slider
   */
  rightLabel: PropTypes.string,

  /**
   * Step for slider
   */
  step: PropTypes.number,

  /**
   * Style for form group
   */
  styleName: PropTypes.string

};

SliderInput.defaultProps = {
  input: {}
};

export default reduxFormField(SliderInput);
