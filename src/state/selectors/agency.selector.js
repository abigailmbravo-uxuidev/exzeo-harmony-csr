import { createSelector } from 'reselect';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';

const getAgencies = state => state.agencyState.agencies;

const getAgency = state => state.agencyState.agency;

const getAgents = state => state.agencyState.agents;

const getOrphanedAgents = state => state.agencyState.orphans;

const getAgentList = state => state.agencyState.agentList;

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

export const getAgentsListForTransfer = createSelector(
  [getAgentList],
  (agents) => {
    if (!agents || !Array.isArray(agents)) return [];
    return agents.map(o => ({
      label: `${o.firstName} ${o.lastName}`,
      answer: o.agentCode
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
      branchCode: Number(b.branchCode),
      answer: b.branchCode,
      label: `${b.branchCode}: ${b.displayName}`
    }));
    return sortBy(branches, b => b.branchCode);
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

export const getSortedAgents = createSelector(
  [getAgents],
  (agents) => {
    if (!Array.isArray(agents)) return [];
    return agents.sort((a, b) => {
      return a.firstName.localeCompare(b.firstName);
    });
  }
);

export const getAgencyList = createSelector(
  [getAgencies],
  (agencies) => {
    if (!agencies || !Array.isArray(agencies)) return [];
    return agencies.map(o => ({
      displayText: `${o.firstName} ${o.lastName}`,
      ...o
    }));
  }
);

export const getAgenciesList = createSelector(
  [getAgencies],
  (agencies) => {
    console.log(agencies)
    if (!agencies || !Array.isArray(agencies)) return [];
    return agencies.map(o => ({
      answer: o.agencyCode,
      label: `${o.displayName}`
    }));
  }
);