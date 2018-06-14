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
