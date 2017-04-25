/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import reduxFormField from './reduxFormField';
import FieldHint from './FieldHint';
import RadioOptionBilling from './RadioOptionBilling';

export const RadioInputBilling = ({
  paymentPlans,
  answers,
  displayValue,
  hint,
  input,
  label,
  meta,
  segmented,
  styleName
}) => {
  const { error, touched } = meta;
  const { onChange, name, value, disabled } = input;

  const formGroupStyles = classNames(
    'form-group',
    { segmented },
    { name },
    { styleName },
    { disabled },
  );

  const labelStyles = classNames('group-label', { 'label-segmented': segmented });

  const answerWrapperStyles = classNames('segmented-answer-wrapper', { error: touched && error });

  const Hint = hint && (<FieldHint name={name} hint={hint} />);

  const DisplayField = displayValue && (<input type="text" value={displayValue} readOnly />);

  const getSelectedPlan = (answer) => {
    let selection;

    if (answer === 'Annual') {
      selection = 'annual';
    } else if (answer === 'Semi-Annual') {
      selection = 'semiAnnual';
    } else if (answer === 'Quarterly') {
      selection = 'quarterly';
    }
    console.log('getSelectedPlan', selection);
    console.log('paymentPlans', paymentPlans[selection]);

    return selection;
  };

  return (
    <div className={formGroupStyles} role="group">
      <label className={labelStyles} htmlFor={name}>
        {label}
        {Hint}
        {DisplayField}
      </label>
      <div className={answerWrapperStyles}>
        {answers && answers.length > 0 && answers.map((answer, index) =>
          <RadioOptionBilling
            input={input}
            paymentPlan={paymentPlans[getSelectedPlan(answer)]}
            answer={answer}
            key={index}
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
