/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FieldHint from '../inputs/FieldHint';

export const RadioInputBilling = ({ input, meta, segmented, styleName, label, answers, paymentPlans, hint, displayValue }) => {
  const { error, touched } = meta;
  const { onChange, name, value, disabled } = input;

  const getSelectedPlan = (answer) => {
    let selection;

    if (answer === 'Annual') {
      selection = 'annual';
    } else if (answer === 'Semi-Annual') {
      selection = 'semiAnnual';
    } else if (answer === 'Quarterly') {
      selection = 'quarterly';
    }
    return selection;
  };

  const onKeyPress = (event, answer) => {
    if (event.charCode === 13) {
      onChange(answer);
    }
  };

  return (
    <div className={classNames('form-group', segmented, name, styleName, disabled)} role="group">
      <label className={classNames('group-label', { 'label-segmented': segmented })} htmlFor={name}>
        {label}
        {hint && <FieldHint name={name} hint={hint} />}
        {displayValue && <input type="text" value={displayValue} readOnly />}
      </label>
      <div className={classNames('segmented-answer-wrapper', { error: touched && error })}>
        {answers && answers.length > 0 && answers.map((answer, index) =>
          <RadioOptionBilling
            input={input}
            paymentPlan={paymentPlans[getSelectedPlan(answer)]}
            answer={answer}
            onKeyPress={onKeyPress}
            key={index}
            tabIndex={'0'}
            size={answers.length}
            onChange={onChange}
            name={name}
            segmented={segmented}
            value={value}
          />
        )}
      </div>
    </div>
  );
};

RadioInputBilling.propTypes = {
  paymentPlans: PropTypes.any, // eslint-disable-line
  /**
   * Answers used to generate options
   */
  answers: PropTypes.any, // eslint-disable-line
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
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any, // eslint-disable-line
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

RadioInputBilling.defaultProps = {
  input: {},
  meta: {}
};

export default reduxFormField(RadioInputBilling);
