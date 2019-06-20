import { createSelector } from 'reselect';

import { getAgencies } from './entity.selectors';

export const getAgenciesForTypeAhead = createSelector(
  [getAgencies],
  agencies => {
    if (!Array.isArray(agencies)) {
      return [];
    }

    return agencies.map(agency => ({
      label: agency.displayName,
      answer: agency.agencyCode
    }));
  }
);
