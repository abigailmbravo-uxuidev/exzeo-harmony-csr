import * as persistTypes from 'redux-persist/constants';
import * as types from './../actions/actionTypes';
import initialState from './initialState';
import appStateReducer from './appStateReducer';

describe('App State Reducer', () => {
  it('should call appStateReducer APPSTATE_SET', () => {
    const state = initialState.appState;
    const inputProps = { data: { submitting: false, updateWorkflowDetails: false } };
    const action = {
      type: types.APPSTATE_SET,
      appState: inputProps
    };

    expect(appStateReducer(state, action)).toEqual(inputProps);
  });
  it('should call appStateReducer APPSTATE_ERROR', () => {
    const state = initialState.appState;
    const inputProps = { data: { submitting: false, updateWorkflowDetails: false } };
    const action = {
      type: types.APPSTATE_ERROR,
      appState: inputProps
    };

    expect(appStateReducer(state, action)).toEqual(inputProps);
  });
  it('should call appStateReducer REHYDRATE', () => {
    const state = initialState.appState;
    const inputProps = { data: { submitting: false, updateWorkflowDetails: false } };
    const action = {
      type: persistTypes.REHYDRATE,
      payload: {
        appState: inputProps
      }
    };

    expect(appStateReducer(state, action)).toEqual(inputProps);
  });
});
