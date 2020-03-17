import { createSelector } from 'reselect';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';

const getAgencies = state => state.agencyState.agencies;

const getAgency = state => state.agencyState.agency;

const getAgents = state => state.agencyState.agents;

const getOrphanedAgents = state => state.agencyState.orphans;

const getAgentListData = state => state.agencyState.agentList;

/**
 *
 * @param {array} contracts
 * @param {array} cspList
 * @returns {boolean}
 */
export function hasContract(contracts, cspList) {
  if (!contracts || !Array.isArray(contracts)) return false;

  return cspList.every(({ companyCode, state, product }) => {
    return contracts.some(c => {
      const hasStateProduct = c.stateProducts.some(sp => {
        return sp.state === state && sp.product === product;
      });
      return c.companyCode === companyCode && hasStateProduct;
    });
  });
}

/**
 *
 * @param {array} licenses
 * @param {array} stateList
 * @returns {boolean}
 */
export function isAppointed(licenses, stateList) {
  if (!licenses || !Array.isArray(licenses)) return false;
  return licenses.some(
    lic => lic.appointed && stateList.every(s => lic.state === s.state)
  );
}

/**
 *
 * @param {array} agencies
 * @param {array} cspList
 * @returns {{answer: string, label: string}[]}
 */
export function filterAgencies(agencies = [], cspList) {
  return agencies
    .filter(a => hasContract(a.contracts, cspList))
    .map(a => {
      return {
        answer: a.agencyCode,
        label: `${a.agencyCode}: ${a.displayName}`
      };
    });
}

/**
 *
 * @param {array} agents
 * @param {array} stateList
 * @returns {{answer: string, label: string}[]}
 */
export function filterAgents(agents = [], stateList) {
  return (agents || [])
    .filter(a => isAppointed(a.licenses, stateList))
    .map(a => ({
      answer: a.agentCode,
      label: `${a.agentCode}: ${a.firstName} ${a.lastName}`
    }));
}

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

export const getAgentsList = createSelector([getAgents], agents => {
  if (!agents || !Array.isArray(agents)) return [];
  return agents.map(o => ({
    displayText: `${o.firstName} ${o.lastName}`,
    ...o
  }));
});

export const getBranchesList = createSelector([getAgency], agency => {
  if (!agency || !agency.branches || !Array.isArray(agency.branches)) return [];
  const branches = agency.branches.map(b => ({
    branchCode: Number(b.branchCode),
    answer: b.branchCode,
    label: `${b.branchCode}: ${b.displayName}`
  }));
  return sortBy(branches, b => b.branchCode);
});

export const getBranchInitialValues = createSelector([getAgency], agency => {
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
});

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

export const getAgenciesList = createSelector([getAgencies], agencies => {
  if (!agencies || !Array.isArray(agencies)) return [];
  return agencies.map(o => ({
    answer: o.agencyCode,
    label: `${o.displayName}`
  }));
});
