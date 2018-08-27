import React, { Component } from 'react';
import InputWrapper from '@exzeo/core-ui/lib/@components/InputWrapper';

class DateRange extends Component {
  handleChange = (e) => {
    console.log(e.target.value);
  };

  handleBlur = (e) => {
    console.log(e.target.value);
  };


  handleFocus = (e) => {
    console.log(e.target.value);
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
      minDateId,
      maxDateId,
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
            name={minDateId}
            id={minDateId}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus} />{' - '}
          <input
            type="date"
            name={maxDateId}
            id={maxDateId}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus} />
          </div>
      </InputWrapper>
    );
  }
}

export default DateRange;
