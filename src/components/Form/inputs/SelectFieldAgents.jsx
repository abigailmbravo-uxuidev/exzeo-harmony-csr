import React, { PropTypes } from 'react';
import classNames from 'classnames';
import FieldHint from './FieldHint';
import reduxFormField from './reduxFormField';

export const SelectInputAgents = ({
  agents,
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
        {agents && agents.length > 0 ? (
          <select
            value={value}
            name={name}
            disabled={disabled}
            onChange={onChange}
          >
            <option disabled value={''}>Please select...</option>
            {agents.map((agent, index) => (
              <option value={agent.agentCode} key={index}>
                {agent.agentname}
              </option>
            ))}
          </select>
        ) : null}
      </label>
      { Error }
    </div>
  );
};

SelectInputAgents.propTypes = {
  ...PropTypes,
  /**
   * Answers array used to generate options
   */
  agents: PropTypes.any, // eslint-disable-line

  /**
   * Tooltip for user
   */
  hint: PropTypes.string,

  /**
   * Input provided by redux-form field
   */
  input: PropTypes.shape({
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any, // eslint-disable-line
  }),

  /**
   * Label for field
   */
  label: PropTypes.string,

  /**
   * Styles for form group
   */
  styleName: PropTypes.string
};

SelectInputAgents.defaultProps = {
  input: {
    onChange: () => {}
  }
};

export default reduxFormField(SelectInputAgents);
