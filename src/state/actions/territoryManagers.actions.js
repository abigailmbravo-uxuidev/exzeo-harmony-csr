import cloneDeep from 'lodash/cloneDeep';
import * as types from './actionTypes';
import * as errorActions from './error.actions';
import * as serviceRunner from '../../utilities/serviceRunner';

/**
 *
 * @param territoryManagers
 * @returns {{state: string, territoryManagers: *}}
 */
export function setTerritoryManagers(territoryManagers) {
  return {
    type: types.SET_TERRITORY_MANAGERS,
    territoryManagers
  };
}


/**
 *
 * @param state
 * @returns {Function}
 */
export function getTerritoryManagers(state) {
  return async (dispatch) => {
    try {
      const tm = await fetchTerritoryManagers(state);
      dispatch(setTerritoryManagers(tm));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}


/**
 *
 * @param state
 * @returns {Promise<{}>}
 */
export async function fetchTerritoryManagers(state) {
  try {
    const config = {
      service: 'territory-manager-service',
      method: 'GET',
      path: `territoryManagers/${state}`
    };
    const response = await serviceRunner.callService(config);
    return response.data && response.data.result ? response.data.result : [];
  } catch (error) {
    throw error;
  }
}
