import { createSelector } from 'reselect';
import isEqual from 'lodash/isEqual';

const getAgency = state => state.agencyState.agency;

const getAgents = state => state.agencyState.agents;

const getOrphanedAgents = state => state.agencyState.orphans;

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

export const getAgentsList = createSelector(
  [getAgents],
  (agents) => {
    if (!agents || !Array.isArray(agents)) return [];
    return agents.map(o => ({
      displayText: `${o.firstName} ${o.lastName}`,
      ...o
    }));
  }
);


export const getAgentOfRecord = createSelector(
  [getAgency, getAgents],
  (agency, agents) => {
    if (!agency || !agency.agencyCode || !agents || !Array.isArray(agents)) return {};
    const agentOfRecord = agents.filter(a => String(a.agentCode) === String(agency.agentOfRecord));
    return Array.isArray(agentOfRecord) && agentOfRecord.length > 0 ? agentOfRecord[0] : {};
  }
);

export const getBranchesList = createSelector(
  [getAgency],
  (agency) => {
    if (!agency || !agency.branches || !Array.isArray(agency.branches)) return [];
    const branches = agency.branches.map(b => ({
      answer: b.branchCode,
      label: `${b.branchCode}: ${b.displayName}`
    }));
    return branches;
  }
);

export const getBranchInitialValues = createSelector(
  [getAgency],
  (agency) => {
    if (!agency || !agency.agencyCode) return {};

    const {
      physicalAddress, mailingAddress, territoryManagerId, contact
    } = agency;

    return {
      physicalAddress, mailingAddress, territoryManagerId, contact
    };
  }
);

const getBranchCode = (state, branchCode) => { return branchCode; };

export const getAgencyBranchData = createSelector(
  [getBranchCode, getAgency],
  (branchCode, agency) => {
    if (!agency || !agency.branches || !Array.isArray(agency.branches)) return {};
    const branch = agency.branches.filter(b => String(b.branchCode) === String(branchCode));
    return Array.isArray(branch) && branch.length > 0 ? branch[0] : {};
  }
);

export const getEditModalInitialValues = createSelector(
  [getAgencyBranchData],
  (branch) => {
    if (!branch || !branch.physicalAddress) return {};
    const {
      latitude, longitude, county, country, ...physicalAddress
    } = branch.physicalAddress;
    const {
      latitude: lat, longitude: lon, county: c, country: co, careOf, ...mailingAddress
    } = branch.mailingAddress;
    return {
      ...branch,
      sameAsMailing: isEqual(physicalAddress, mailingAddress)
    };
  }
);
