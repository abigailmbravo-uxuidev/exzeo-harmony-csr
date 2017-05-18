import React, { PropTypes } from 'react';
import classNames from 'classnames';
import FieldHint from './FieldHint';
import reduxFormField from './reduxFormField';

export const SelectInputAgency = ({
  agencies,
  hint,
  input,
  label,
  styleName,
  meta
}) => {
  const { onChange, name, value, disabled } = input;
  const { touched, error, warning } = meta;
  const formGroupStyles = classNames('form-group', { styleName }, { name });
  const Hint = hint && (<FieldHint name={name} hint={hint} />);
  const Error = touched && (error || warning) && <span style={{ color: 'red' }}>{error || warning}</span>;

  return (
    <div className={formGroupStyles}>
      <label htmlFor={name}>
        {label} &nbsp; {Hint}
      </label>
      {agencies && agencies.length > 0 ? (
        <select
          value={value}
          name={name}
          disabled={disabled}
          onChange={onChange}
        >
          <option disabled value={''}>Please select...</option>
          {agencies.map((agency, index) => (
            <option value={agency.agencyCode} key={index}>
              {agency.displayName}
            </option>
            ))}
        </select>
        ) : null}
      { Error }
    </div>
  );
};

SelectInputAgency.propTypes = {
  /**
   * Answers array used to generate options
   */
  agencies: PropTypes.any, // eslint-disable-line
  meta: PropTypes.any, // eslint-disable-line

  /**
   * Tooltip for user
   */
  hint: PropTypes.string,

  /**
   * Input provided by redux-form field
   */
   input: PropTypes.any, // eslint-disable-line


  /**
   * Label for field
   */
  label: PropTypes.string,

  /**
   * Styles for form group
   */
  styleName: PropTypes.string
};

SelectInputAgency.defaultProps = {
  input: {
    onChange: () => {}
  }
};

export default reduxFormField(SelectInputAgency);
