import { date } from '@exzeo/core-ui';

export const isValidRange = value => {
  const { min, max } = value;
  if (!min && !max) return undefined;

  const minDate = date.toUTC(min);
  const maxDate = date.toUTC(max);

  return minDate <= maxDate ? undefined : 'Not a valid date range';
};
