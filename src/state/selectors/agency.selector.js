import { createSelector } from 'reselect';
import isEqual from 'lodash/isEqual';
import moment from 'moment';

const getAgency = state => state.agencyState.agency;

export const getEditModalInitialValues = createSelector(
  [getAgency],
  (agency) => {
    if (!agency.agencyCode) return {};
    // noinspection JSUnusedLocalSymbols
    agency.eoExpirationDate = moment(agency.eoExpirationDate).format('YYYY-MM-DD');
    agency.licenseEffectiveDate = moment(agency.licenseEffectiveDate).format('YYYY-MM-DD');

    agency.license.map((lic) => {
      lic.eoExpirationDate = moment(lic.eoExpirationDate).format('YYYY-MM-DD');
      lic.licenseEffectiveDate = moment(lic.licenseEffectiveDate).format('YYYY-MM-DD');
      return lic;
    });
    const {
      latitude, longitude, county, ...physicalAddress
    } = agency.physicalAddress;
    return {
      ...agency,
      sameAsMailing: isEqual(physicalAddress, agency.mailingAddress)
    };
  }
);
export default getEditModalInitialValues;
