import moment from "moment";

export const requireField = (value) => {
  return value || value === 0 ? undefined : 'Field Required';
};

export const matchDateMin10 = (value, allValues, match, format) => {
  return String(value).substring(0, 8) === moment.utc(allValues[match]).format(format) &&
  String(value).length > 9 ? undefined : 'Field must match date and be at least 10 characters';
};



