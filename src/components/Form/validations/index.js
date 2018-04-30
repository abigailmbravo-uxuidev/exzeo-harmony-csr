import validator from 'validator';
import moment from "moment";

const matchDate = max => (value, allValues, match, format) => String(value).substring(0, 8) === moment.utc(allValues[match]).format(format) &&
String(value).length >= max ? undefined : 'Field must match date and be at least 10 characters';

export const requireField = (value) =>
  value || value === 0 ? undefined : 'Field Required';

export const matchDateMin10 = matchDate(10);

export const zipNumbersOnly = (value) =>
  !value || validator.isNumeric(String(value)) ? undefined : 'Not a valid zip code';


export const phone = (value) =>
  !value || (value.match &&
  value.match(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/g)) ? undefined : 'Not a valid Phone Number.';
