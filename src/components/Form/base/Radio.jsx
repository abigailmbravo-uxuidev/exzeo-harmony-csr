import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Radio = ({
  input: { onChange, name, value },
  answer,
  onKeyPress,
  segmented,
  size
}) => (
  <div
    className={classNames(`radio-column-${size}`, {
      selected: value === answer
    })}
    onKeyPress={event => onKeyPress(event, answer)}
    onClick={() => onChange(answer)}
  >
    <label
      className={classNames(
        { 'label-segmented': segmented },
        { selected: value === answer }
      )}
      htmlFor={name}
    >
      <input
        name={name}
        value={answer}
        type="radio"
        checked={String(value) === String(answer)}
        readOnly
      />
      <span tabIndex={'0'}>{answer}</span>
    </label>
  </div>
);

Radio.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
  }),
  onKeyPress: PropTypes.func,
  answer: PropTypes.any,
  size: PropTypes.number,
  segmented: PropTypes.bool
};

export default Radio;
