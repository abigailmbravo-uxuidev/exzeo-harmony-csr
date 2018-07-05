import * as types from './actionTypes';

// these actions are to allow the composite controls to communicate when their models are complete
// this communication allows the workflow to move to the next step

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
