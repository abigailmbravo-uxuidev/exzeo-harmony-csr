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
    const {
      latitude, longitude, county, country, ...physicalAddress
    } = agency.physicalAddress;
    const {
      latitude: lat, longitude: lon, county: c, country: co, careOf, ...mailingAddress
    } = agency.mailingAddress;
    return {
      ...agency,
      sameAsMailing: isEqual(physicalAddress, mailingAddress)
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

