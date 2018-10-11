import { createSelector } from 'reselect';
import isEqual from 'lodash/isEqual';
import moment from 'moment';

const getAgency = state => state.agencyState.agency;

const getAgents = state => state.agencyState.agents;

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

export const getAgentOfRecord = createSelector(
  [getAgency, getAgents],
  (agency, agents) => {
    if (!getAgency || !getAgency.agencyCode || !getAgents || !Array.isArray(getAgents)) return {};
    const agentOfRecord = getAgents.filter(a => a.agencyCode === getAgency.agencyCode);
    return Array.isArray(agentOfRecord) && agentOfRecord.length > 0 ? agentOfRecord[0] : {};
  }
);

