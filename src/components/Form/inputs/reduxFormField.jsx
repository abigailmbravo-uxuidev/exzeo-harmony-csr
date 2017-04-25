import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { combineRules } from '../Rules';

export default function reduxFormField(fieldComponent) {
  return class FormField extends Component {

    static propTypes = {

      /**
       * Disabled prop for input
       */
      disabled: PropTypes.bool,

      /**
       * Tooltip hint for component
       */
      hint: PropTypes.string,

      /**
       * String to put in label
       */
      label: PropTypes.string.isRequired,

      /**
       * Name of input element, needed for onChange
       */
      name: PropTypes.string.isRequired,

      /**
       * Type for input
       */
      type: PropTypes.oneOf([
        'bool',
        'date',
        'display',
        'email',
        'hidden',
        'number',
        'password',
        'radio',
        'range',
        'search',
        'select',
        'slider',
        'string',
        'tel',
        'text',
        'currency',
        'selectBilling'
      ]),

      /**
       * class put on form-group
       */
      styleName: PropTypes.string,

      /**
       * Validations array for redux field
       */
      validations: PropTypes.arrayOf(PropTypes.string)

    }
    static defaultProps = {
      disabled: false,
      hint: '',
      styleName: '',
      type: 'text'
    }

    render() {
      const {
        disabled,
        hint,
        label,
        name,
        styleName,
        type,
        validations,
        min,
        max
      } = this.props;

      const ruleArray = combineRules(validations, { min, max });

      return (
        <Field
          {...this.props}
          disabled={disabled}
          label={label}
          hint={hint}
          styleName={styleName}
          component={fieldComponent}
          type={type === 'radio' ? null : type}
          name={name}
          validate={ruleArray}
        />
      );
    }

  };
}
