import serviceRunner from '../../utilities/serviceRunner';
import * as types from './actionTypes';
import * as errorActions from "./errorActions";

// these actions are to allow the composite controls to communicate when their models are complete
// this communication allows the workflow to move to the next step
// TODO these should eventually be consolidated with above
/**
 *
 * @param modelName
 * @param instanceId
 * @param data
 * @returns {{type: string, appState: {modelName: *, instanceId: *, data: *}}}
 */
export function setAppState(modelName, instanceId, data) {
  return {
    type: types.APPSTATE_SET,
    appState: {
      modelName,
      instanceId,
      data
    }
  };
}

/**
 *
 * @param modelName
 * @param instanceId
 * @param error
 * @returns {{type: string, appState: {modelName: *, instanceId: *, error: *}}}
 */
export function setAppStateError(modelName, instanceId, error) {
  return {
    type: types.APPSTATE_ERROR,
    appState: {
      modelName,
      instanceId,
      error
    }
  };
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
      dispatch(getAgencies(agencies));
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
