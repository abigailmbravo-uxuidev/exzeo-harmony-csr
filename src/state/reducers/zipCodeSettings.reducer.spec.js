import * as types from '../actions/actionTypes';

import initialState from './initialState';
import zipCodeSettingsReducer from './zipCodeSettings.reducer';

describe('zipCodeSettingsReducer', () => {
  it('should call zipCodeSettingsReducer SET_ZIPCODE_SETTINGS', () => {
    const state = initialState.zipCodeSettingsState;
    const inputProps = [{}];
    const action = {
      type: types.SET_ZIPCODE_SETTINGS,
      zipCodeSettings: inputProps
    };

    expect(zipCodeSettingsReducer(state, action)).toEqual({
      ...initialState.zipCodeSettingsState,
      zipCodeSettings: inputProps
    });
  });
});
