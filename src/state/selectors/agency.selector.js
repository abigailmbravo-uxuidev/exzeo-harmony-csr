import { createSelector } from 'reselect';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';

const getAgencies = state => state.agencyState.agencies;

const getAgency = state => state.agencyState.agency;

const getAgents = state => state.agencyState.agents;

const getOrphanedAgents = state => state.agencyState.orphans;

const getAgentListData = state => state.agencyState.agentList;

export const filterActiveAgentsList = agents => {
  return (agents || [])
    .filter(a => a.status === 'Active')
    .map(a => ({
      answer: a.agentCode,
      label: `${a.agentCode}: ${a.firstName} ${a.lastName}`,
      firstName: a.firstName,
      lastName: a.lastName
    }));
};

export const filterAgenciesList = agencies => {
  return (agencies || [])
    .filter(a => a.status !== 'Cancel')
    .map(a => ({
      answer: a.agencyCode,
      label: `${a.agencyCode}: ${a.displayName}`
    }));
};

export const getAgencyList = createSelector(
  [getAgencies],
  agencies => {
    if (!agencies || !Array.isArray(agencies)) return [];
    const list = filterAgenciesList(agencies);
    return list;
  }
);

export const getAgentList = createSelector(
  [getAgents],
  agents => {
    if (!agents || !Array.isArray(agents)) return [];
    const list = filterActiveAgentsList(agents);
    return list;
  }
);

export const getOrphanedAgentsList = createSelector(
  [getOrphanedAgents],
  orphans => {
    if (!orphans || !Array.isArray(orphans)) return [];
    return orphans.map(o => ({
      displayText: `${o.firstName} ${o.lastName}`,
      ...o
    }));
  }
);

export const getAgentsListForTransfer = createSelector(
  [getAgentListData],
  agents => {
    if (!agents || !Array.isArray(agents)) return [];
    return agents.map(o => ({
      label: `${o.firstName} ${o.lastName}`,
      answer: o.agentCode
    }));
  }
);

export const getAgentsList = createSelector(
  [getAgents],
  agents => {
    if (!agents || !Array.isArray(agents)) return [];
    return agents.map(o => ({
      displayText: `${o.firstName} ${o.lastName}`,
      ...o
    }));
  }
);

export const getBranchesList = createSelector(
  [getAgency],
  agency => {
    if (!agency || !agency.branches || !Array.isArray(agency.branches))
      return [];
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
  agency => {
    if (!agency || !agency.agencyCode) return {};

    const {
      physicalAddress,
      mailingAddress,
      territoryManagerId,
      contact
    } = agency;

    return {
      physicalAddress,
      mailingAddress,
      territoryManagerId,
      contact
    };
  }
);

const getBranchCode = (state, branchCode) => {
  return branchCode;
};

export const getAgencyBranchData = createSelector(
  [getBranchCode, getAgency],
  (branchCode, agency) => {
    if (!agency || !agency.branches || !Array.isArray(agency.branches))
      return {};
    const branch = agency.branches.filter(
      b => String(b.branchCode) === String(branchCode)
    );
    return Array.isArray(branch) && branch.length > 0 ? branch[0] : {};
  }
);

export const getEditModalInitialValues = createSelector(
  [getAgencyBranchData],
  branch => {
    if (!branch || !branch.physicalAddress) return {};
    const {
      latitude,
      longitude,
      county,
      country,
      ...physicalAddress
    } = branch.physicalAddress;
    const {
      latitude: lat,
      longitude: lon,
      county: c,
      country: co,
      careOf,
      ...mailingAddress
    } = branch.mailingAddress;
    return {
      ...branch,
      sameAsMailing: isEqual(physicalAddress, mailingAddress)
    };
  }
);

export const getAgentOfRecord = createSelector(
  [getAgencyBranchData, getAgents],
  (agencyBranchData, agents) => {
    if (
      !agencyBranchData ||
      !agencyBranchData.agentOfRecord ||
      !agents ||
      !Array.isArray(agents)
    )
      return {};
    const agentOfRecord = agents.filter(
      a => String(a.agentCode) === String(agencyBranchData.agentOfRecord)
    );
    return Array.isArray(agentOfRecord) && agentOfRecord.length > 0
      ? agentOfRecord[0]
      : {};
  }
);

export const getSortedAgents = createSelector(
  [getAgents, getBranchCode],
  (agents, branchCode) => {
    if (!Array.isArray(agents)) return [];

    return agents
      .filter(agent =>
        agent.agencies.some(
          agency => Number(agency.branchCode) === Number(branchCode)
        )
      )
      .sort((a, b) => a.firstName.localeCompare(b.firstName));
  }
);

export const getAgenciesList = createSelector(
  [getAgencies],
  agencies => {
    if (!agencies || !Array.isArray(agencies)) return [];
    return agencies.map(o => ({
      answer: o.agencyCode,
      label: `${o.displayName}`
    }));
  }
);
