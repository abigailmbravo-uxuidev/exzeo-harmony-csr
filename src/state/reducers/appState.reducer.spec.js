import * as types from '../actions/actionTypes';
import initialState from './initialState';
import appStateReducer from './appState.reducer';

describe('App State Reducer', () => {
  it('should call appStateReducer APPSTATE_SET', () => {
    const state = initialState.appState;
    const inputProps = { data: { submitting: false } };
    const action = {
      type: types.APPSTATE_SET,
      appState: inputProps
    };

    expect(appStateReducer(state, action)).toEqual(inputProps);
  });
  it('should call appStateReducer APPSTATE_ERROR', () => {
    const state = initialState.appState;
    const inputProps = { data: { submitting: false } };
    const action = {
      type: types.APPSTATE_ERROR,
      appState: inputProps
    };

    expect(appStateReducer(state, action)).toEqual(inputProps);
  });
});
