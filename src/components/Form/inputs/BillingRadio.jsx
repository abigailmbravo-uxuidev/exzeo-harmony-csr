/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FieldHint from '../inputs/FieldHint';
import Radio from '../base/Radios';

export const BillingRadio = ({
   input,
   meta,
   segmented,
   styleName,
   label,
   answers,
   hint,
   displayValue
}) => {
  const { error, touched } = meta;
  const { onChange, name, disabled } = input;

  const onKeyPress = (event, answer) => {
    if (event.charCode === 13) {
      onChange(answer);
    }
  };

  return (
    <div className={classNames('form-group', { segmented }, name, styleName, disabled)} role="group">
      <label className={classNames('group-label', { 'label-segmented': segmented })} htmlFor={name}>
        {label}
        {hint && <FieldHint name={name} hint={hint} />}
        {displayValue && <input type="text" value={displayValue} readOnly />}
      </label>
      <div className={classNames('segmented-answer-wrapper', { error: touched && error })}>
        {answers && answers.length > 0 && answers.map((answer, index) =>
          <Radio
            key={index}
            input={input}
            answer={answer}
            onKeyPress={onKeyPress}
            size={answers.length}
            segmented={segmented}
          />
        )}
      </div>
    </div>
  );
};

BillingRadio.propTypes = {
  answers: PropTypes.array,
  displayValue: PropTypes.string,
  hint: PropTypes.string,
  input: PropTypes.shape({
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any,
  }),
  label: PropTypes.string,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool
  }),
  segmented: PropTypes.bool,
  styleName: PropTypes.string
};

BillingRadio.defaultProps = {
  input: {},
  meta: {},
  options: [],
};

export default BillingRadio;
