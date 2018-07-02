import { createSelector } from 'reselect';
import isEqual from 'lodash/isEqual';
import moment from 'moment';

const getAgency = state => state.agencyState.agency;

const getAgents = state => state.agencyState.agents;

export const getEditModalInitialValues = createSelector(
  [getAgency],
  (agency) => {
    if (!agency || !agency.agencyCode) return {};
    // noinspection JSUnusedLocalSymbols
    delete agency.createdBy; // need to delete this for some reason because the endpoint fails
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

export const getListOfAgents = createSelector(
  [getAgents],
  (agent) => {
    if (!agent || !Array.isArray(agent)) return [];
    return agent.map(a => ({ answer: a.agentCode, label: `${a.firstName} ${a.lastName}` }));
  }
);

export const agencyLicenseArray = createSelector(
  [getAgency],
  (agency) => {
    if (!agency || !agency.license || !Array.isArray(agency.license)) return [];
    return agency.license.map(al => al.licenseNumber);
  }
);

