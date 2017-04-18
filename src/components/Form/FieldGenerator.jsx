import React, { PropTypes } from 'react';
import dependencyHelper from './dependencyHelper';
import {
  CheckField,
  DisplayField,
  FormHeading,
  HiddenField,
  RadioField,
  SelectField,
  SliderField,
  TextField
} from './inputs';

const FieldGenerator = ({
  question,
  data,
  values,
  onChange
}) => {
  const fieldOptions = dependencyHelper(question, data, values);

  const inputProps = {
    ...fieldOptions,
    hint: fieldOptions.description,
    label: fieldOptions.question,
    type: fieldOptions.answerType,
    onChange
  };

  if (inputProps.hidden) inputProps.type = 'hidden';
  if (inputProps.display) inputProps.type = 'display';
  if (inputProps.remove) inputProps.type = 'remove';

  switch (inputProps.type) {
    case 'select':
      return <SelectField {...inputProps} />;
    case 'radio': {
      if (question.answers.length > 6) {
        return <SelectField {...inputProps} />;
      }
      const maxChars = window.innerWidth / (12 * inputProps.answers.length);
      let isDropdown = false;
      inputProps.answers.some((a) => {
        isDropdown = a.answer && a.answer.length > maxChars;
        return isDropdown;
      });
      return isDropdown ?
        <SelectField {...inputProps} /> :
        <RadioField {...inputProps} segmented />;
    }
    case 'bool':
      return <CheckField {...inputProps} isSwitch />;
    case 'range':
    case 'slider':
      return <SliderField {...inputProps} />;
    case 'text':
    case 'date':
    case 'number':
    case 'password':
      return <TextField {...inputProps} />;
    case 'display':
      return <DisplayField {...inputProps} />;
    case 'heading':
      return <FormHeading {...inputProps} />;
    case 'hidden':
      return <HiddenField {...inputProps} />;
    case 'remove':
      return null;
    default:
      return <RadioField {...inputProps} segmented />;
  }
};

FieldGenerator.propTypes = {
  question: PropTypes.shape({
    question: PropTypes.string,
    description: PropTypes.string,
    answerType: PropTypes.string
  }),
  onChange: PropTypes.func,
  data: PropTypes.any, // eslint-disable-line
  values: PropTypes.any, // eslint-disable-line
};

export default FieldGenerator;
