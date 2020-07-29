import * as types from './actionTypes';

/**
 * @param data
 * @returns {{type: string, appState: {modelName: *, instanceId: *, data: *}}}
 */
export function setAppState(data) {
  return {
    type: types.APPSTATE_SET,
    appState: {
      data
    }
  };
}
