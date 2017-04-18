import React, { PropTypes } from 'react';
import classNames from 'classnames';

const RadioOption = ({
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
        { selected: value === answer.answer }
    )}
    onClick={() => onChange(answer.answer)}
  >
    {answer.image && <img src={answer.image} role="presentation" />}
    <label
      className={classNames(
      'label-segmented': segmented,
      { selected: value === answer.answer },
    )} htmlFor={name}
    >
      <input
        onChange={() => onChange(answer.answer)}
        name={name}
        type="radio"
        checked={String(value) === String(answer.answer)}
        value={answer.answer}
      />
      <span>{answer.label || answer.answer}</span>
    </label>
  </div>
);

RadioOption.propTypes = {

  /**
   * Answer used to generate option
   */
  answer: PropTypes.shape({
    answer: PropTypes.any, // eslint-disable-line
    label: PropTypes.string,
    image: PropTypes.string
  }),

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

export default RadioOption;
