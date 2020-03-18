import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

import {
  WAIT_TIME_MS,
  RETRY_MAX,
  TRANSACTION_STATUS
} from '../../constants/agency';

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
 * @param agencyData
 * @returns {{agency: *, type: string}}
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
  return async dispatch => {
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
 * @param agencyCode
 * @returns {Function}
 */
export function getAgencies(companyCode, state, agencyCode) {
  return async dispatch => {
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
  return async dispatch => {
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
 * @param agencyCode
 * @returns {Function}
 */
export function getAgentListByAgencyCode(agencyCode) {
  return async dispatch => {
    try {
      const agents = await fetchAgentsByAgencyCode(agencyCode);
      dispatch(setAgentList(agents));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @returns {Function}
 */
export function clearAgentList() {
  return async dispatch => {
    dispatch(setAgentList([]));
  };
}

/**
 *
 * @param agencyData
 * @returns {Function}
 */
export function updateAgency(agencyData) {
  return async dispatch => {
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
 * @param agencyCode
 * @returns {Function}
 */
export function addAgent(agentData, agencyCode) {
  return async dispatch => {
    try {
      await addNewAgent(agentData);
      dispatch(getAgentsByAgencyCode(agencyCode));
      dispatch(getAgentListByAgencyCode(agencyCode));
      dispatch(getListOfOrphanedAgents());
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @param agentData
 * @param agencyCode
 * @returns {Function}
 */
export function updateAgent(agentData, agencyCode) {
  return async dispatch => {
    try {
      await saveAgent(agentData);
      dispatch(getAgentsByAgencyCode(agencyCode));
      dispatch(getAgentListByAgencyCode(agencyCode));
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
    const response = await serviceRunner.callService(config, 'fetchAgency');
    return response.data && response.data.result ? response.data.result : {};
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param companyCode
 * @param state
 * @param agencyCode
 * @returns {Promise<Array>}
 */
export async function fetchAgencies(companyCode, state, agencyCode = '') {
  const config = {
    service: 'agency',
    method: 'GET',
    path: `agencies?companyCode=${companyCode}&state=${state}&pageSize=1000&sort=displayName&SortDirection=asc&agencyCode=${agencyCode}`
  };

  try {
    const response = await serviceRunner.callService(config, 'fetchAgencies');
    return response.data && response.data.result ? response.data.result : [];
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param searchParam
 * @returns {Promise<Array>}
 */
export async function fetchAvailableAgencies(searchParam = '') {
  let agencyCode = '';
  let displayName = '';

  const onlyNumbers = new RegExp('^[0-9]+$');
  if (onlyNumbers.test(searchParam)) agencyCode = searchParam;
  else displayName = encodeURI(searchParam);

  const config = {
    service: 'agency',
    method: 'GET',
    path: `agencies?agencyCode=${agencyCode}&displayName=${displayName}&availableOnly=true`
  };

  try {
    const response = await serviceRunner.callService(
      config,
      'fetchAvailableAgencies'
    );
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
    const response = await serviceRunner.callService(
      config,
      'fetchAgentsByAgencyCode'
    );
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
    const response = await serviceRunner.callService(config, 'fetchAgentList');
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

    const response = await serviceRunner.callService(config, 'saveAgency');
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
    const response = await serviceRunner.callService(config, 'saveAgent');
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
    const response = await serviceRunner.callService(config, 'addNewAgent');
    return response.data && response.data.result ? response.data.result : {};
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @returns {Promise<Array>}
 */
export async function fetchOrphanedAgents() {
  try {
    const config = {
      service: 'agency',
      method: 'GET',
      path: 'agents?type=orphaned'
    };
    const response = await serviceRunner.callService(
      config,
      'fetchOrphanedAgents'
    );
    return response.data && response.data.result ? response.data.result : [];
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @returns {Function}
 */
export function getListOfOrphanedAgents() {
  return async dispatch => {
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
    const response = await serviceRunner.callService(config, 'saveNewAgency');
    return response.data && response.data.result ? response.data.result : {};
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param agencyData
 * @returns {Function}
 */
export function createAgency(agencyData) {
  return async dispatch => {
    try {
      const agency = await saveNewAgency(agencyData);
      dispatch(setAgency(agency));
      dispatch(getAgentsByAgencyCode(agency.agencyCode));
      dispatch(getAgentListByAgencyCode(agency.agencyCode));
      dispatch(getListOfOrphanedAgents());
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @param branchData
 * @param agencyCode
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
    const response = await serviceRunner.callService(config, 'saveNewBranch');
    return response.data && response.data.result ? response.data.result : {};
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param branchData
 * @param agencyCode
 * @returns {Function}
 */
export function createBranch(branchData, agencyCode) {
  return async dispatch => {
    try {
      const branch = await saveNewBranch(branchData, agencyCode);
      dispatch(getAgency(agencyCode));
      dispatch(getAgentsByAgencyCode(agencyCode));
      dispatch(getAgentListByAgencyCode(agencyCode));
      dispatch(getListOfOrphanedAgents());
      return branch;
    } catch (error) {
      dispatch(errorActions.setAppError(error));
      return null;
    }
  };
}

/**
 *
 * @param agencyData
 * @returns {*}
 */
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
  if (agencyData.branches.filter(b => String(b.branchCode) === '0').length > 0)
    return agencyData;

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

/**
 *
 * @param transfers
 * @returns {Promise<*>}
 */
export async function transferPoliciesRequest(transfers) {
  try {
    const transferConfig = {
      exchangeName: 'harmony',
      routingKey: 'harmony.agency.startBoBTransfers',
      data: {
        transfers
      }
    };

    const response = await serviceRunner.callService(
      transferConfig,
      'transferPoliciesToAgent'
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param transfers
 * @returns {Function}
 */
export function transferPoliciesToAgent(transfers) {
  return async dispatch => {
    try {
      const result = await transferPoliciesRequest(transfers);
      return result;
    } catch (error) {
      dispatch(errorActions.setAppError(error));
      return error;
    }
  };
}

/**
 *
 * @param transactionId
 * @returns {Promise<*>}
 */
export async function getTransactionStatus(transactionId) {
  try {
    const transferConfig = {
      exchangeName: 'harmony',
      routingKey: 'harmony.agency.getTransactionStatus',
      data: {
        transactionId
      }
    };

    const response = await serviceRunner.callService(
      transferConfig,
      'getTransactionStatus'
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param transactionId
 * @param attemptNumber
 * @returns {Promise<*>}
 */
export async function verifyTransaction(transactionId, attemptNumber = 0) {
  const response = await getTransactionStatus(transactionId);
  if (response.result.status === TRANSACTION_STATUS) {
    return Promise.resolve(response);
  }

  if (attemptNumber < RETRY_MAX) {
    await new Promise(resolve => setTimeout(resolve, WAIT_TIME_MS));
    await verifyTransaction(transactionId, attemptNumber + 1);
  } else return Promise.reject(null);
}
