import { createSelector } from 'reselect';
import isEqual from 'lodash/isEqual';
import moment from 'moment';

const getAgency = state => state.agencyState.agency;

const getAgents = state => state.agencyState.agents;

const getAgencyAgents = state => state.agencyState.agencyAgents;

export const getEditModalInitialValues = createSelector(
  [getAgency],
  (agency) => {
    if (!agency || !agency.agencyCode) return {};
    // noinspection JSUnusedLocalSymbols
    delete agency.createdBy; // need to delete this for some reason because the endpoint fails
    agency.eoExpirationDate = moment(agency.eoExpirationDate).format('YYYY-MM-DD');
    agency.licenseEffectiveDate = moment(agency.licenseEffectiveDate).format('YYYY-MM-DD');

    agency.agentList = [];
    agency.license.map((lic) => {
      lic.eoExpirationDate = moment(lic.eoExpirationDate).format('YYYY-MM-DD');
      lic.licenseEffectiveDate = moment(lic.licenseEffectiveDate).format('YYYY-MM-DD');
      const agentCodes = lic.agent.map(a => String(a.agentCode));

      agentCodes.forEach((ac) => {
        if (!agency.agentList.includes(ac)) { agency.agentList.push(ac); }
      });
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
    return agent.map(a => ({
      answer: a.agentCode, label: `${a.firstName} ${a.lastName}`, agentCode: a.agentCode, agentInfo: { ...a }, agentOfRecord: a.agentOfRecord, appointed: a.appointed
    }));
  }
);

export const getListOfAgencyAgents = createSelector(
  [getAgencyAgents],
  (agent) => {
    if (!agent || !Array.isArray(agent)) return [];
    return agent.map(a => String(a.agentCode));
  }
);

export const agencyLicenseArray = createSelector(
  [getAgency],
  (agency) => {
    if (!agency || !agency.license || !Array.isArray(agency.license)) return [];
    return agency.license.map(al => al.licenseNumber);
  }
);

