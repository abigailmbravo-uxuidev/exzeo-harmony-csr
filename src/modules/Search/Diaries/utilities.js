import moment from 'moment';

export const isValidRange = value => {
  const { min, max } = value;
  if (!min && !max) return undefined;

  return moment(min).isSame(max) || moment(min).isBefore(max)
    ? undefined
    : 'Not a valid date range';
};
