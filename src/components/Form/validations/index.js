import validator from 'validator';
import moment from 'moment';

export const matchDateMin = max => (value, allValues, matchTo, format) =>
  String(value).substring(0, 8) ===
    moment.utc(allValues[matchTo]).format(format) && String(value).length >= max
    ? undefined
    : `Field must match date and be at least ${max} characters`;

export const matchDateMin10 = matchDateMin(10);

export const requireField = value =>
  value || value === 0 ? undefined : 'Field Required';

export const zipNumbersOnly = value =>
  !value || validator.isNumeric(String(value))
    ? undefined
    : 'Not a valid zip code';

export const phone = value =>
  !value ||
  (value.match &&
    value.match(
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/g
    ))
    ? undefined
    : 'Not a valid Phone Number.';

export const range = (value, min, max) => {
  if (
    Number(String(value).replace(/\D+/g, '')) === 0 ||
    String(value).length === 0
  )
    return 'Not a valid range';
  const valid =
    Number(String(value).replace(/\D+/g, '')) <= max &&
    Number(String(value).replace(/\D+/g, '')) >= min
      ? undefined
      : 'Not a valid range';
  return valid;
};

export const ensureString = value => String(value);
