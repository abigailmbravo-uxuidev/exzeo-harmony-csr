import React from 'react';
import PropTypes from 'prop-types';
import reduxFormField from './reduxFormField';

export const DisplayInput = ({ label, input, displayValue }) => (
  <div className="form-group">
    <label htmlFor={input.name}>{label}</label>
    <input
      tabIndex={'0'}
      type="text"
      name={input.name}
      value={
        displayValue ||
        (!Number.isNaN(Number(input.value))
          ? `$ ${input.value}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
          : input.value)
      }
      readOnly
    />
  </div>
);

DisplayInput.propTypes = {
  displayValue: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.any // eslint-disable-line
  })
};

export default reduxFormField(DisplayInput);
