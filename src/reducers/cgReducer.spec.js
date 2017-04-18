import * as persistTypes from 'redux-persist/constants';
import * as types from './../actions/actionTypes';
import initialState from './initialState';
import cgReducer from './cgReducer';

describe('CG Reducer', () => {
  it('should call cgReducer CG_START', () => {
    const state = initialState.appState;
    const inputProps = { data: { submitting: false, updateWorkflowDetails: false } };
    const action = {
      type: types.CG_START,
      workflowData: inputProps
    };

    expect(cgReducer(state, action)).toEqual(inputProps);
  });
  it('should call cgReducer CG_ACTIVE_TASK', () => {
    const state = initialState.appState;
    const inputProps = { data: { submitting: false, updateWorkflowDetails: false } };
    const action = {
      type: types.CG_ACTIVE_TASK,
      workflowData: inputProps
    };

    expect(cgReducer(state, action)).toEqual(inputProps);
  });
  it('should call cgReducer CG_COMPLETE', () => {
    const state = initialState.appState;
    const inputProps = { data: { submitting: false, updateWorkflowDetails: false } };
    const action = {
      type: types.CG_COMPLETE,
      workflowData: inputProps
    };

    expect(cgReducer(state, action)).toEqual(inputProps);
  });
  it('should call cgReducer CG_ERROR', () => {
    const state = initialState.appState;
    const inputProps = { data: { submitting: false, updateWorkflowDetails: false } };
    const action = {
      type: types.CG_ERROR,
      workflowData: inputProps
    };

    expect(cgReducer(state, action)).toEqual(inputProps);
  });
  it('should call cgReducer REHYDRATE', () => {
    const state = initialState.appState;
    const inputProps = { data: { submitting: false, updateWorkflowDetails: false } };
    const action = {
      type: persistTypes.REHYDRATE,
      payload: {
        cg: inputProps
      }
    };

    expect(cgReducer(state, action)).toEqual(inputProps);
  });

  it('should call cgReducer CG_START - new state', () => {
    const state = initialState.appState;
    const inputProps = { data: { submitting: false, updateWorkflowDetails: false } };
    const action = {
      type: types.CG_START
    };

    expect(cgReducer(state, action)).toEqual(inputProps);
  });
  it('should call cgReducer CG_ACTIVE_TASK - new state', () => {
    const state = initialState.appState;
    const inputProps = { data: { submitting: false, updateWorkflowDetails: false } };
    const action = {
      type: types.CG_ACTIVE_TASK
    };

    expect(cgReducer(state, action)).toEqual(inputProps);
  });
  it('should call cgReducer CG_COMPLETE - new state', () => {
    const state = initialState.appState;
    const inputProps = { data: { submitting: false, updateWorkflowDetails: false } };
    const action = {
      type: types.CG_COMPLETE
    };

    expect(cgReducer(state, action)).toEqual(inputProps);
  });
  it('should call cgReducer CG_ERROR - new state', () => {
    const state = initialState.appState;
    const inputProps = { data: { submitting: false, updateWorkflowDetails: false } };
    const action = {
      type: types.CG_ERROR
    };

    expect(cgReducer(state, action)).toEqual(inputProps);
  });
  it('should call cgReducer REHYDRATE - new state', () => {
    const state = initialState.appState;
    const inputProps = { data: { submitting: false, updateWorkflowDetails: false } };
    const action = {
      type: persistTypes.REHYDRATE
    };

    expect(cgReducer(state, action)).toEqual(inputProps);
  });
  it('should call cgReducer default', () => {
    const state = initialState.appState;
    const inputProps = { data: { submitting: false, updateWorkflowDetails: false } };
    const action = {};

    expect(cgReducer(state, action)).toEqual(inputProps);
  });
});
