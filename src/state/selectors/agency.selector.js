import { createSelector } from 'reselect';
import isEqual from 'lodash/isEqual';

const getAgency = state => state.agencyState.agency;

export const getEditModalInitialValues = createSelector(
  [getAgency],
  (agency) => {
    // noinspection JSUnusedLocalSymbols
    const { latitude, longitude, county, ...physicalAddress } = agency.physicalAddress;
    return {
      ...agency,
      sameAsMailing: isEqual(physicalAddress, agency.mailingAddress)
    }
  }
);
