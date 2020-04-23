import { defaultMemoize } from 'reselect';

export const userResources = defaultMemoize((userProfile = {}) => {
  const enableBulkMortgage = userProfile?.profile?.bulkMortgageEnabled;

  return {
    enableBulkMortgage
  };
});
