import _ from 'lodash';
import moment from 'moment';

export function convertQuoteStringsToNumber(data) {
  let newData = {};
  newData = _.cloneDeep(data);
  Object.keys(data).forEach((obj) => {
    if (_.isString(data[obj])) {
      newData[obj] = (!Number.isNaN(Number(data[obj])) ?
        Number(data[obj]) : data[obj]);
    }
  });
  return newData;
}

export function getInitialValues(questions, data) {
  const values = {};

  questions.forEach((question) => {
    if (question.readOnlyValue) {
      values[question.name] = question.readOnlyValue;
    } else if (question.defaultValueLocation) {
      const val = _.get(data, question.defaultValueLocation);
      if (val && question.answerType === 'date') {
        values[question.name] = moment.utc(val).format('YYYY-MM-DD');
      } else values[question.name] = val;
    } else if (question.defaultAnswer) {
      values[question.name] = question.defaultAnswer;
    } else {
      values[question.name] = '';
    }
  });

  // Go through and check if percent or currency is provided as initial
  questions.forEach((question) => {
    // For display boxes on radio fields
    if (question.conditional && question.conditional.dependency &&
      question.answers && question.answers.length > 0) {
      const exists = question.answers.find(a => a.answer == values[question.name]); // eslint-disable-line
      if (!exists) {
        const { dependency } = question.conditional;
        const parentValue = _.get(values, dependency.parent);

        const stateValue = values[question.name];
        // const calculatedValue = parentValue / 100;
        const newValue = question.answers.find(a =>
          (dependency.type === 'percent' ? (parentValue * a.answer) / 100 : parentValue * a.answer) === stateValue);
        if (newValue) {
          values[question.name] = newValue.answer;
        }
      }
    }
    else if (question.conditional && question.conditional.value) {
      values[question.name] = question.conditional.value.value;
    }
  });
  
  return values;
}
