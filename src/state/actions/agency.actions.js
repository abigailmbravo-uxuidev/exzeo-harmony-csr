import * as serviceRunner from '../../utilities/serviceRunner';

import * as types from './actionTypes';
import * as errorActions from './error.actions';
/**
 *
 * @param agencies
 * @returns {{type: string, agencies: *}}
 */
export function setAgencies(agencies) {
  return {
    type: types.SET_AGENCIES,
    agencies
  };
}

/**
 *
 * @param agency
 * @returns {{type: string, agency: *}}
 */
export function setAgency(agencyData) {
  // TODO: Transforming Agent Data to be in the Branches array
  const agency = transormAgencyToBranch(agencyData);
  return {
    type: types.SET_AGENCY,
    agency
  };
}

/**
 *
 * @param agents
 * @returns {{type: string, agents: *}}
 */
export function setAgents(agents) {
  return {
    type: types.SET_AGENTS,
    agents
  };
}

/**
 *
 * @param agentList
 * @returns {{type: string, agencyAgents: *}}
 */
export function setAgentList(agentList) {
  return {
    type: types.SET_AGENTS_LIST,
    agentList
  };
}

/**
 *
 * @param orphans
 * @returns {{type: string, orphans: *}}
 */
export function setOrphanedAgents(orphans) {
  return {
    type: types.SET_ORPHANED_AGENTS,
    orphans
  };
}

/**
 *
 * @param agencyCode
 * @returns {Function}
 */
export function getAgency(agencyCode) {
  return async (dispatch) => {
    try {
      const agency = await fetchAgency(agencyCode);
      dispatch(setAgency(agency));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @param companyCode
 * @param state
 * @returns {Function}
 */
export function getAgencies(companyCode, state, agencyCode) {
  return async (dispatch) => {
    try {
      const agencies = await fetchAgencies(companyCode, state, agencyCode);
      dispatch(setAgencies(agencies));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @param agencyCode
 * @returns {Function}
 */
export function getAgentsByAgencyCode(agencyCode) {
  return async (dispatch) => {
    try {
      const agents = await fetchAgentsByAgencyCode(agencyCode);
      dispatch(setAgents(agents));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @param companyCode
 * @param state
 * @returns {Function}
 */
export function getAgentList(companyCode, state) {
  return async (dispatch) => {
    try {
      const agents = await fetchAgentList(companyCode, state);
      dispatch(setAgentList(agents));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @param agencyData
 * @returns {Function}
 */
export function updateAgency(agencyData) {
  return async (dispatch) => {
    try {
      await saveAgency(agencyData);
      dispatch(getAgency(agencyData.agencyCode));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @param agentData
 * @returns {Function}
 */
export function addAgent(agentData, agencyCode) {
  return async (dispatch) => {
    try {
      await addNewAgent(agentData);
      dispatch(getAgentsByAgencyCode(agencyCode));
      dispatch(getListOfOrphanedAgents());
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @param agentData
 * @returns {Function}
 */
export function updateAgent(agentData, agencyCode) {
  return async (dispatch) => {
    try {
      await saveAgent(agentData);
      dispatch(getAgentsByAgencyCode(agencyCode));
      dispatch(getListOfOrphanedAgents());
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @param agencyCode
 * @returns {Promise<{}>}
 */
export async function fetchAgency(agencyCode) {
  try {
    const config = {
      service: 'agency',
      method: 'GET',
      path: `agencies/${agencyCode}`
    };
    const response = await serviceRunner.callService(config);
    return response.data && response.data.result ? response.data.result : {};
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param companyCode
 * @param state
 * @returns {Promise<Array>}
 */
export async function fetchAgencies(companyCode, state, agencyCode = '') {
  const config = {
    service: 'agency',
    method: 'GET',
    path: `agencies?companyCode=${companyCode}&state=${state}?&pageSize=1000&sort=displayName&SortDirection=asc?agencyCode=${agencyCode}`
  };

  try {
    const response = await serviceRunner.callService(config);
    return response.data && response.data.result ? response.data.result : [];
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param agencyCode
 * @returns {Promise<Array>}
 */
export async function fetchAgentsByAgencyCode(agencyCode) {
  try {
    const config = {
      service: 'agency',
      method: 'GET',
      path: `agencies/${agencyCode}/agents`
    };
    const response = await serviceRunner.callService(config);
    return response.data && response.data.result ? response.data.result : [];
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param companyCode
 * @param state
 * @returns {Promise<Array>}
 */
export async function fetchAgentList(companyCode, state) {
  try {
    const config = {
      service: 'agency',
      method: 'GET',
      path: `v1/agents/${companyCode}/${state}`
    };
    const response = await serviceRunner.callService(config);
    return response.data && response.data.result ? response.data.result : [];
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param agencyData
 * @returns {Promise<{}>}
 */
export async function saveAgency(agencyData) {
  try {
    const config = {
      service: 'agency',
      method: 'PUT',
      path: `agencies/${agencyData.agencyCode}`,
      data: agencyData
    };

    const response = await serviceRunner.callService(config);
    return response.data && response.data.result ? response.data.result : {};
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param agentData
 * @returns {Promise<{}>}
 */
export async function saveAgent(agentData) {
  try {
    const config = {
      service: 'agency',
      method: 'PUT',
      path: `agents/${agentData.agentCode}`,
      data: agentData
    };
    const response = await serviceRunner.callService(config);
    return response.data && response.data.result ? response.data.result : {};
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param agentData
 * @returns {Promise<{}>}
 */
export async function addNewAgent(agentData) {
  try {
    const config = {
      service: 'agency',
      method: 'POST',
      path: 'agents',
      data: agentData
    };
    const response = await serviceRunner.callService(config);
    return response.data && response.data.result ? response.data.result : {};
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param formData
 * @param currentAgency
 * @returns {Function}
 */

export async function fetchOrphanedAgents() {
  try {
    const config = {
      service: 'agency',
      method: 'GET',
      path: 'agents?type=orphaned'
    };
    const response = await serviceRunner.callService(config);
    return response.data && response.data.result ? response.data.result : [];
  } catch (error) {
    throw error;
  }
}

export function getListOfOrphanedAgents() {
  return async (dispatch) => {
    try {
      const orphans = await fetchOrphanedAgents();
      dispatch(setOrphanedAgents(orphans));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}


/**
 *
 * @param agencyData
 * @returns {Promise<{}>}
 */
export async function saveNewAgency(agencyData) {
  try {
    const config = {
      service: 'agency',
      method: 'POST',
      path: 'agencies',
      data: agencyData
    };
    const response = await serviceRunner.callService(config);
    return response.data && response.data.result ? response.data.result : {};
  } catch (error) {
    throw error;
  }
}


export function createAgency(agencyData) {
  return async (dispatch) => {
    try {
      const agency = await saveNewAgency(agencyData);
      dispatch(setAgency(agency));
      dispatch(getAgentsByAgencyCode(agency.agencyCode));
      dispatch(getListOfOrphanedAgents());
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @param agencyData
 * @returns {Promise<{}>}
 */
export async function saveNewBranch(branchData, agencyCode) {
  try {
    const config = {
      service: 'agency',
      method: 'POST',
      path: `agencies/${agencyCode}/branches`,
      data: branchData
    };
    const response = await serviceRunner.callService(config);
    return response.data && response.data.result ? response.data.result : {};
  } catch (error) {
    throw error;
  }
}


export function createBranch(branchData, agencyCode) {
  return async (dispatch) => {
    try {
      const branch = await saveNewBranch(branchData, agencyCode);
      dispatch(getAgency(agencyCode));
      dispatch(getAgentsByAgencyCode(agencyCode));
      dispatch(getListOfOrphanedAgents());
      return branch;
    } catch (error) {
      dispatch(errorActions.setAppError(error));
      return null;
    }
  };
}

export function transormAgencyToBranch(agencyData) {
  const {
    mailingAddress,
    physicalAddress,
    contact,
    principal,
    agentOfRecord,
    faxNumber,
    primaryPhoneNumber,
    secondaryPhoneNumber,
    status,
    territoryManagerId,
    displayName,
    websiteUrl
  } = agencyData;
  if (!Array.isArray(agencyData.branches)) agencyData.branches = [];

  // main branch already exists
  if (agencyData.branches.filter(b => String(b.branchCode) === '0').length > 0) return agencyData;

  agencyData.branches.push({
    branchCode: 0,
    mailingAddress,
    physicalAddress,
    agentOfRecord,
    contact,
    principal,
    displayName,
    faxNumber,
    primaryPhoneNumber,
    secondaryPhoneNumber,
    status,
    websiteUrl,
    territoryManagerId,
    mailPolicyDocsToBranch: true,
    mailCommissionChecksToBranch: true

  });
  return agencyData;
}