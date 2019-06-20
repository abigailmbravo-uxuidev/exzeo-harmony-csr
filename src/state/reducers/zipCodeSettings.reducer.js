import * as types from '../actions/actionTypes';

import initialState from './initialState';

export default function zipCodeSettingsReducer(
  state = initialState.zipCodeSettingsState,
  action
) {
  switch (action.type) {
    case types.SET_ZIPCODE_SETTINGS:
      return setZipCodeSettings(state, action);
    default:
      return state;
  }
}

function setZipCodeSettings(state, action) {
  return {
    ...state,
    zipCodeSettings: action.zipCodeSettings
  };
}
