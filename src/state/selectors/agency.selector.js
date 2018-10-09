import { createSelector } from 'reselect';
import isEqual from 'lodash/isEqual';
import moment from 'moment';

const getAgency = state => state.agencyState.agency;

const getAgents = state => state.agencyState.agentList;

const getAgencyAgents = state => state.agencyState.agencyAgents;

const getOrphanedAgents = state => state.agencyState.orphans;

export const getEditModalInitialValues = createSelector(
  [getAgency],
  (agency) => {
    if (!agency || !agency.agencyCode) return {};
    // noinspection JSUnusedLocalSymbols
    // delete agency.createdBy; // need to delete this for some reason because the endpoint fails
    // agency.eoExpirationDate = moment(agency.eoExpirationDate).format('YYYY-MM-DD');
    // agency.licenseEffectiveDate = moment(agency.licenseEffectiveDate).format('YYYY-MM-DD');

    // agency.agentList = [];
    // agency.license.map((lic) => {
    //   lic.eoExpirationDate = moment(lic.eoExpirationDate).format('YYYY-MM-DD');
    //   lic.licenseEffectiveDate = moment(lic.licenseEffectiveDate).format('YYYY-MM-DD');
    //   const agentCodes = lic.agent.map(a => String(a.agentCode));

    //   agentCodes.forEach((ac) => {
    //     if (!agency.agentList.includes(ac)) { agency.agentList.push(ac); }
    //   });
    //   return lic;
    // });
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
      value: {
        agentCode: a.agentCode,
        agentInfo: a.agentInfo || { license: [{ licenseNumber: a.licenseNumber, state: a.state }], ...a },
        agentOfRecord: a.agentOfRecord,
        appointed: a.appointed
      },
      answer: a.agentCode,
      label: `${a.firstName} ${a.lastName}`
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

export const getAgencyLicenseArray = createSelector(
  [getAgency],
  (agency) => {
    if (!agency || !agency.license || !Array.isArray(agency.license)) return [];
    return agency.license.map(al => al.licenseNumber);
  }
);

export const getOrphanedAgentsList = createSelector(
  [getOrphanedAgents],
  (orphans) => {
    if (!orphans || !Array.isArray(orphans)) return [];
    return orphans.map(o => ({
      displayText: `${o.firstName} ${o.lastName}`,
      ...o
    }));
  }
);

