
import * as types from '../actions/actionTypes';

import initialState from './initialState';
import territoryManagerReducer from './territoryManager.reducer';

describe('zipCodeSettingsReducer', () => {
  it('should call zipCodeSettingsReducer SET_TERRITORY_MANAGERS', () => {
    const state = initialState.territoryManagerState;
    const inputProps = [{}];
    const action = {
      type: types.SET_TERRITORY_MANAGERS,
      territoryManagers: inputProps
    };

    expect(territoryManagerReducer(state, action))
      .toEqual({ ...initialState.territoryManagerState, territoryManagers: inputProps });
  });
});
