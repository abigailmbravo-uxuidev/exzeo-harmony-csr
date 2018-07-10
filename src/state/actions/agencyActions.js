import * as types from './actionTypes';
import * as errorActions from './errorActions';
import * as serviceRunner from '../../utilities/serviceRunner';

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
export function setAgency(agency) {
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
 * @param agencyAgents
 * @returns {{type: string, agencyAgents: *}}
 */
export function setAgencyAgents(agencyAgents) {
  return {
    type: types.SET_AGENCY_AGENTS,
    agencyAgents
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
 * @param companyCode
 * @param state
 * @returns {Promise<Array>}
 */
export async function fetchAgencies(companyCode, state, agencyCode = '') {
  const config = {
    service: 'agency',
    method: 'GET',
    path: `v1/agencies/${companyCode}/${state}?pageSize=1000&sort=displayName&SortDirection=asc?agencyCode=${agencyCode}`
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
 * @param companyCode
 * @param state
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
 * @param agencyCode
 * @returns {Promise<{}>}
 */
export async function fetchAgency(agencyCode) {
  try {
    const config = {
      service: 'agency',
      method: 'GET',
      path: `v1/agencies?agencyCode=${agencyCode}`
    };
    const response = await serviceRunner.callService(config);
    return response.data && response.data.result ? response.data.result[0] : {};
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param companyCode
 * @param state
 * @returns {Function}
 */
export function getAgents(companyCode, state) {
  return async (dispatch) => {
    try {
      const agents = await fetchAgents(companyCode, state);
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
 * @returns {Promise<Array>}
 */
export async function fetchAgents(companyCode, state) {
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
 * @param agencyCode
 * @returns {Function}
 */
export function getAgentsByAgencyCode(agencyCode) {
  return async (dispatch) => {
    try {
      const agents = await fetchAgentsByAgencyCode(agencyCode);
      dispatch(setAgencyAgents(agents));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
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
      path: `v1/agents?agencyCode=${agencyCode}`
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
 * @returns {Promise<Array>}
 */
export async function saveAgency(agencyData) {
  try {
    const config = {
      service: 'agency',
      method: 'PUT',
      path: `v1/agency/${agencyData.agencyCode}`,
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
 * @param agencyData
 * @returns {Function}
 */
export function updateAgency(agencyData) {
  return async (dispatch) => {
    try {
      await saveAgency(agencyData);
      dispatch(getAgency(agencyData.agencyCode));
      dispatch(getAgentsByAgencyCode(agencyData.agencyCode));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @param agentData
 * @returns {Promise<Array>}
 */
export async function saveAgent(agentData) {
  try {
    const config = {
      service: 'agency',
      method: 'PUT',
      path: `v1/agent/${agentData.agentCode}`,
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
 * @returns {Function}
 */
export function updateAgent(agentData, agency) {
  return async (dispatch) => {
    try {
      await saveAgent(agentData);
      dispatch(getAgentsByAgencyCode(agency.agencyCode));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @param agentData
 * @returns {Promise<Array>}
 */
export async function addNewAgent(agentData) {
  try {
    const config = {
      service: 'agency',
      method: 'POST',
      path: 'v1/agent',
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
 * @returns {Function}
 */
export function addAgent(agentData) {
  return async (dispatch) => {
    try {
      await addNewAgent(agentData);
      dispatch(getAgentsByAgencyCode(agentData.agencyCode));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

export async function applyLicenseToAgency(data, agency) {
  // loop over available licenses to apply to an agent
  /* nested deep in the agency object:  agency.license[0].agents[0]
     agent: { agentCode :123, appointed: true, agentOfRecord: true  }
  */
  data.agencyLicense.forEach((l) => {
    const license = agency.license.find(li => li.licenseNumber === l);
    const selectedAgent = license && license.agent ? license.agent.find(a => a.agentCode === data.agentCode) : null;
    // this handles new agent objects
    if (license && license.agent && !selectedAgent) {
      license.agent.push({
        agentCode: data.agentCode,
        appointed: String(data.appointed) === 'true',
        agentOfRecord: String(data.agentOfRecord) === 'true'
      });
      const licenseIndex = agency.license.findIndex(li => li.licenseNumber === l);
      if (licenseIndex !== -1) {
        agency.license.splice(licenseIndex, 1, license);
      }
    } else if (license && license.agent && selectedAgent) { // this handles existing agent objects
      const agentIndex = license.agent.findIndex(a => a.agentCode === data.agentCode);
      selectedAgent.appointed = String(data.appointed) === 'true';
      selectedAgent.agentOfRecord = String(data.agentOfRecord) === 'true';
      selectedAgent.agentInfo = data;
      if (agentIndex !== -1) {
        license.agent.splice(agentIndex, 1, selectedAgent);
      }
      const licenseIndex = agency.license.findIndex(li => li.licenseNumber === l);
      if (licenseIndex !== -1) {
        agency.license.splice(licenseIndex, 1, license);
      }
    }
  });

  // any licenses that were not selected in the agencyLicense array need to be removed from the agent array inside the license array on the agency
  agency.license.filter(l => !data.agencyLicense.includes(l.licenseNumber)).forEach((license) => {
    const agentIndex = license.agent.findIndex(a => a.agentCode === data.agentCode);
    if (agentIndex !== -1) {
      license.agent.splice(agentIndex, 1);
    }
  });

  const { createdAt, createdBy, ...selectedAgency } = agency;
  return selectedAgency;
}
