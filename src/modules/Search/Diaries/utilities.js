import moment from 'moment';

export const isValidRange = value => {
  const { min, max } = value;
  if (!min && !max) return undefined;

  return moment(min).isSameOrBefore(max) ? undefined : 'Not a valid date range';
};
