import * as types from "./actionTypes";
import * as errorActions from "./errorActions";
import * as serviceRunner from "../../utilities/serviceRunner";

/**
 *
 * @param agencies
 * @returns {{type: string, agencies: *}}
 */
export function setAgencies(agencies) {
  return {
    type: types.SET_AGENCIES,
    agencies
  }
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
  }
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
  }
}

/**
 *
 * @param companyCode
 * @param state
 * @returns {Function}
 */
export function getAgencies(companyCode, state) {
  return async (dispatch) => {
    try {
      const agencies = await fetchAgencies(companyCode, state);
      dispatch(setAgencies(agencies));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  }
}

/**
 *
 * @param companyCode
 * @param state
 * @returns {Promise<Array>}
 */
export async function fetchAgencies(companyCode, state) {
  const config = {
    service: 'agency',
    method: 'GET',
    path: `v1/agencies/${companyCode}/${state}?pageSize=1000&sort=displayName&SortDirection=asc`
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
export function getAgency(companyCode, state, agencyCode) {
  return async (dispatch) => {
    try {
      const agency = await fetchAgency(companyCode, state, agencyCode);
      dispatch(setAgency(agency))
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  }
}

/**
 *
 * @param companyCode
 * @param state
 * @param agencyCode
 * @returns {Promise<{}>}
 */
export async function fetchAgency(companyCode, state, agencyCode) {
  try {
    const config = {
      service: 'agency',
      method: 'GET',
      path: `v1/agency/${companyCode}/${state}/${agencyCode}`
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
  }
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
    throw error
  }
}
