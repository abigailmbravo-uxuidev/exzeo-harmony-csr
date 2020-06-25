import { date } from '@exzeo/core-ui';

export const isValidRange = value => {
  const { min, max } = value;
  if (!min && !max) return undefined;

  return date.moment(min).isSameOrBefore(max)
    ? undefined
    : 'Not a valid date range';
};
