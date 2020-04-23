import { defaultMemoize } from 'reselect';

export const userResources = defaultMemoize((userProfile = {}) => {
  console.log(userProfile);
  const enableBulkMortgage = userProfile?.profile?.bulkMortgageEnabled;

  return {
    enableBulkMortgage
  };
});
