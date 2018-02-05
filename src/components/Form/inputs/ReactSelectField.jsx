import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import classNames from 'classnames';
import FieldHint from './FieldHint';
import reduxFormField from './reduxFormField';

export const ReactSelectInput = ({
  answers,
  hint,
  input,
  label,
  meta,
  styleName
}) => {
  const {
    onChange, name, value
  } = input;
  const { touched, error, warning } = meta;
  const Error = touched && (error || warning) && <span>{error || warning}</span>;
  const formGroupStyles = classNames('form-group', styleName, name, Error ? 'error' : '');
  const Hint = hint && (<FieldHint name={name} hint={hint} />);
  return (
    <div className={formGroupStyles}>
      { label && <label htmlFor={name}>{label}{Hint}</label> }
      {answers && answers.length >= 0 ? (
        <Select
          name={name}
          searchable
          labelKey="displayText"
          autoFocus
          value={value}
          options={answers}
          onChange={onChange}
        />
        ) : null}
      {Error}
    </div>
  );
};

ReactSelectInput.propTypes = {

  /**
   * Answers array used to generate options
   */
  answers: PropTypes.arrayOf(PropTypes.shape({
    answer: PropTypes.any, // eslint-disable-line
    label: PropTypes.string,
    image: PropTypes.string
  })),

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
  meta: PropTypes.shape(),
  /**
   * Label for field
   */
  label: PropTypes.string,

  /**
   * Styles for form group
   */
  styleName: PropTypes.string
};

ReactSelectInput.defaultProps = {
  input: {
    onChange: () => {}
  }
};

export default reduxFormField(ReactSelectInput);
