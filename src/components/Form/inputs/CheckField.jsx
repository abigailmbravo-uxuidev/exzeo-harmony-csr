/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FieldHint from './FieldHint';
import reduxFormField from './reduxFormField';

export const CheckInput = ({ hint, input, isSwitch, label, styleName }) => {
  const { disabled, name, value, onChange } = input;

  const formGroupStyles = classNames(
    input.value ? 'active' : 'inactive',
    'form-group',
    { name },
    { disabled },
    { switch: isSwitch },
    styleName
  );

  const Hint = hint && <FieldHint name={name} hint={hint} />;

  const onKeyPress = (event, answer) => {
    if (event.charCode === 13) {
      onChange(answer);
    }
  };

  const Switch = isSwitch && (
    <div
      className="switch-div"
      tabIndex={'0'}
      onKeyPress={event => onKeyPress(event, !value)}
    />
  );

  return (
    <div className={formGroupStyles}>
      <label
        htmlFor={name}
        onClick={() => onChange(!value)}
        tabIndex={'0'}
        onKeyPress={event => onKeyPress(event, !value)}
      >
        {label}
        {Hint}
        <input
          {...input}
          type="checkbox"
          checked={value}
          onChange={() => onChange(!value)}
        />
        {Switch}
      </label>
    </div>
  );
};

CheckInput.propTypes = {
  /**
   * Tool tip hint
   */
  hint: PropTypes.string,

  /**
   * Input properties from redux field
   */
  input: PropTypes.shape({
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any // eslint-disable-line
  }),

  /**
   * Converts checkbox to switch
   */
  isSwitch: PropTypes.bool,

  /**
   * Label for component
   */
  label: PropTypes.string,

  /**
   * Classname for form-group
   */
  styleName: PropTypes.string
};

CheckInput.defaultProps = {
  input: {
    onChange: () => {},
    value: false
  },
  styleName: ''
};

export default reduxFormField(CheckInput);
