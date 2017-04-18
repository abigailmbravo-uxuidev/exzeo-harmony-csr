import * as types from './actionTypes';

// these actions are to allow the composite controls to communicate when their models are complete
// this communication allows the workflow to move to the next step

export const setAppState = (modelName, instanceId, data) => {
  const newAppStateData = {
    modelName,
    instanceId,
    data
  };
  const stateObj = {
    type: types.APPSTATE_SET,
    appState: newAppStateData
  };
  return stateObj;
};

export const setAppStateError = (modelName, instanceId, error) => {
  const newAppStateData = {
    modelName,
    instanceId,
    error
  };
  const stateObj = {
    type: types.APPSTATE_ERROR,
    appState: newAppStateData
  };
  return stateObj;
};

// thunk if needed
export const dispatchAppState = (modelName, instanceId, data) => dispatch => dispatch(setAppState(modelName, instanceId, data));
