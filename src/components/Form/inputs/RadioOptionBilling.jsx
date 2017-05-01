import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const RadioOptionBilling = ({
  onChange,
  answer,
  name,
  segmented,
  size,
  value
}) => (
  <div
    className={classNames(
        `radio-column-${size}`,
        { selected: value === answer }
    )}
    onClick={() => onChange(answer)}
  >
    <label
      className={classNames(
      'label-segmented': segmented,
      { selected: value === answer },
    )} htmlFor={name}
    >
      <input
        onChange={() => onChange(answer)}
        name={name}
        type="radio"
        checked={String(value) === String(answer)}
        value={answer}
      />
      <span>{answer}</span>
    </label>
  </div>
);

RadioOptionBilling.propTypes = {
  paymentPlan : PropTypes.any, // eslint-disable-line
  /**
   * Answer used to generate option
   */
  answer: PropTypes.string,

  /**
   * Name for option
   */
  name: PropTypes.string,

  /**
   * Change handler from parent
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Number of answers, for styling
   */
  size: PropTypes.number,

  /**
   * Whether to use segmented slides
   */
  segmented: PropTypes.bool,

  /**
   * Used to find if options is selected
   */
  value: PropTypes.any, // eslint-disable-line
};

export default RadioOptionBilling;
