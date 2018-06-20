import { createSelector } from 'reselect';
import isEqual from 'lodash/isEqual';
import moment from 'moment';

const getAgency = state => state.agencyState.agency;

export const getEditModalInitialValues = createSelector(
  [getAgency],
  (agency) => {
    // noinspection JSUnusedLocalSymbols
    delete agency.createdBy; // agency service errors when passed
    agency.eoExpirationDate = moment(agency.eoExpirationDate).format('YYYY-MM-DD');
    agency.licenseEffectiveDate = moment(agency.licenseEffectiveDate).format('YYYY-MM-DD');
    const {
      latitude, longitude, county, ...physicalAddress
    } = agency.physicalAddress;
    return {
      ...agency,
      sameAsMailing: isEqual(physicalAddress, agency.mailingAddress)
    };
  }
);
