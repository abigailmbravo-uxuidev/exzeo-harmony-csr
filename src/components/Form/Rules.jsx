import validator from 'validator';
import moment from 'moment';

const calculatedValue = value => {
  const numberValue = String(value).replace(/\D+/g, '');
  return Number(numberValue);
};

const rules = {
  required: value => (value || value === 0 ? undefined : 'Field Required'),
  email: value =>
    !value || validator.isEmail(value)
      ? undefined
      : 'Not a valid email address',
  optionalEmail: value =>
    !value || validator.isEmail(value)
      ? undefined
      : 'Not a valid email address',
  phone: value =>
    !value ||
    (value.match &&
      value.match(
        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/g
      ))
      ? undefined
      : 'is not a valid Phone Number.',
  date: value =>
    validator.isISO8601(value) ? undefined : 'is not a valid Date.',
  minLength3: value =>
    !value || validator.isLength(value, { min: 3 })
      ? undefined
      : 'Please enter at least 3 characters',
  minLength10: value =>
    !value || validator.isLength(value, { min: 10 })
      ? undefined
      : 'Please enter at least 10 characters',
  onlyAlphaNumeric: value =>
    !value || value.match(/^[\w\-\s]+$/g) ? undefined : 'Invalid characters',
  invalidCharacters: value =>
    !value.match(/\/|\\/) ? undefined : 'Invalid characters',
  numberDashesOnly: value =>
    value.match(/^(\d+-?)+\d+$/)
      ? undefined
      : 'Only numbers and dashes allowed',
  zipNumbersOnly: value =>
    !value || validator.isNumeric(String(value))
      ? undefined
      : 'Not a valid zip code',
  numbersOnly: value =>
    !value || validator.isNumeric(String(value))
      ? undefined
      : 'Not a valid number',
  dateCheck: value =>
    moment(value).isAfter(moment('2017-07-31').format('YYYY-MM-DD'))
      ? undefined
      : 'Date must be at least 08/01/2017',
  dwellingRange: value =>
    calculatedValue(value) <= 2000000 && calculatedValue(value) >= 125000
      ? undefined
      : 'Not a valid range. Must be ($125,000 - $2,000,000)',
  dependsOn: dependsOnValues => (value, allValues) => {
    if (value && value.length > 0) return undefined;
    for (const field of dependsOnValues) {
      if (allValues[field]) return 'Field Required';
    }

    return undefined;
  }
};

export function combineRules(validations, variables) {
  const ruleArray = [];

  if (validations) {
    for (let i = 0; i < validations.length; i += 1) {
      if (
        rules[validations[i]] &&
        (!variables ||
          (!variables.min && !variables.max) ||
          validations[i] === 'dwellingRange')
      ) {
        ruleArray.push(rules[`${validations[i]}`]);
      } else if (
        validations[i] === 'range' &&
        variables &&
        variables.min &&
        variables.max
      ) {
        const range = values => {
          if (
            Number(String(values).replace(/\D+/g, '')) === 0 ||
            String(values).length === 0
          )
            return 'Not a valid range';
          const valid =
            Number(String(values).replace(/\D+/g, '')) <= variables.max &&
            Number(String(values).replace(/\D+/g, '')) >= variables.min
              ? undefined
              : 'Not a valid range';
          return valid;
        };
        ruleArray.push(range);
      } else if (
        validations[i] === 'date' &&
        variables &&
        variables.min &&
        variables.max
      ) {
        const range = values => {
          const min = new Date(moment.utc(variables.min).format('MM/DD/YYYY'));
          const max = new Date(moment.utc(variables.max).format('MM/DD/YYYY'));
          const value = new Date(moment.utc(values).format('MM/DD/YYYY'));
          const valid =
            value <= max && value >= min ? undefined : 'Not a valid date range';
          return valid;
        };
        ruleArray.push(range);
      } else if (
        validations[i] === 'matchDateMin10' &&
        variables &&
        variables.dateString
      ) {
        const matchDate = values => {
          const valid =
            String(values).substring(0, 8) === variables.dateString &&
            validator.isLength(String(values), { min: 10 })
              ? undefined
              : 'Field must match date and be at least 10 characters';
          return valid;
        };
        ruleArray.push(matchDate);
      }
    }
  }
  return ruleArray;
}

export default rules;
