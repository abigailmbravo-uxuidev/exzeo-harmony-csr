import cloneDeep from 'lodash/cloneDeep';
import * as types from './actionTypes';
import * as errorActions from './error.actions';
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
      await saveAgent(agentData, agencyCode);
      dispatch(getAgentsByAgencyCode(agencyCode));
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


// TODO move to utilities
/**
 *
 * @param data
 * @param agency
 * @returns {Promise<*>}
 */
export function applyLicenseToAgency(data, agency) {
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

  // noinspection JSUnusedLocalSymbols
  const { createdAt, createdBy, ...selectedAgency } = agency;
  return selectedAgency;
}

/**
 *
 * @param formData
 * @param currentAgency
 * @returns {Function}
 */
export function addAgentToAgency(formData, currentAgency) {
  return async (dispatch) => {
    const agency = cloneDeep(currentAgency);

    formData.agencyLicense.forEach((l) => {
      const license = agency.license.find(li => li.licenseNumber === l);
      const selectedAgent = license && license.agent ? license.agent.find(a => a.agentCode === formData.agentCode) : null;

      if (license && license.agent && !selectedAgent) {
        license.agent.push({
          agentCode: Number(formData.selectedAgent),
          appointed: String(formData.appointed) === 'true',
          agentOfRecord: String(formData.agentOfRecord) === 'true'
        });
        const licenseIndex = agency.license.findIndex(li => li.licenseNumber === l);
        if (licenseIndex !== -1) {
          agency.license.splice(licenseIndex, 1, license);
        }
      }
    });

    // noinspection JSUnusedLocalSymbols
    const { createdAt, createdBy, ...selectedAgency } = agency;
    await dispatch(updateAgency(selectedAgency));
  };
}


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
    territoryManagerId
  });
  return agencyData;
}
