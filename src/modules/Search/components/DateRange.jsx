import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputWrapper from '@exzeo/core-ui/lib/@components/InputWrapper';

class DateRange extends Component {
  parseValue = (id, value) => {
    const { input } = this.props;
    return {
      ...input.value,
      [id]: value
    };
  };

  handleChange = (e) => {
    const { input } = this.props;
    const newVal = this.parseValue(e.target.id, e.target.value);
    input.onChange(newVal);
  };

  handleBlur = (e) => {
    const { input } = this.props;
    const newVal = this.parseValue(e.target.id, e.target.value);
    input.onBlur(newVal);
  };


  handleFocus = (e) => {
    const { input } = this.props;
    const newVal = this.parseValue(e.target.id, e.target.value);
    input.onFocus(newVal);
  };

  render() {
    const {
      input,
      meta,
      label,
      styleName,
      hint,
      disabled,
      dataTest,
      minDateProp,
      maxDateProp,
      errorHint
    } = this.props;

    return (
      <InputWrapper
        dataTest={dataTest}
        name={input.name}
        label={label}
        hint={hint}
        meta={meta}
        styleName={styleName}
        errorHint={errorHint}>
        <div className="date-range-inputs">
          <input
            type="date"
            data-test={`${dataTest}-${minDateProp}`}
            value={input.value[minDateProp]}
            name={minDateProp}
            id={minDateProp}
            disabled={disabled}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus} /><span>—</span>
          <input
            type="date"
            data-test={`${dataTest}-${maxDateProp}`}
            value={input.value[maxDateProp]}
            name={maxDateProp}
            id={maxDateProp}
            disabled={disabled}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus} />
        </div>
      </InputWrapper>
    );
  }
}

DateRange.propTypes = {
  dataTest: PropTypes.string.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func
  }).isRequired,
  disabled: PropTypes.bool,
  errorHint: PropTypes.bool,
  hint: PropTypes.string,
  label: PropTypes.string,
  maxDateProp: PropTypes.string,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool,
    warning: PropTypes.string
  }),
  minDateProp: PropTypes.string,
  styleName: PropTypes.string
};

DateRange.defaultProps = {
  disabled: false,
  label: '',
  styleName: '',
  hint: '',
  errorHint: false,
  maxDateProp: 'max',
  minDateProp: 'min'
};

export default DateRange;
