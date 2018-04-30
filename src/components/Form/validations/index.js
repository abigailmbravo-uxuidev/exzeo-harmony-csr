import validator from 'validator';
import moment from 'moment';

export const requireField = value =>
  (value || value === 0 ? undefined : 'Field Required');

export const zipNumbersOnly = value =>
  (!value || validator.isNumeric(String(value)) ? undefined : 'Not a valid zip code');

export const matchDateMin10 = (value, allValues, match, format) => (String(value).substring(0, 8) === moment.utc(allValues[match]).format(format) &&
  String(value).length > 9 ? undefined : 'Field must match date and be at least 10 characters');

export const range = (value, min, max) => {
  if (Number(String(value).replace(/\D+/g, '')) === 0 || String(value).length === 0) return 'Not a valid range';
  const valid = Number(String(value).replace(/\D+/g, '')) <= max && Number(String(value).replace(/\D+/g, '')) >= min ? undefined : 'Not a valid range';
  return valid;
};

