import { createSelector } from 'reselect';

const getAgencies = state => state.service.agencies;

export const getAgenciesForTypeAhead = createSelector(
  [getAgencies],
  (agencies) => {
    if (!Array.isArray(agencies)) {
      return [];
    }

    return agencies.map(agency => ({
      label: agency.displayName,
      answer: agency.agencyCode
    }));
  }
);

