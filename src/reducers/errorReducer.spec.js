import * as persistTypes from 'redux-persist/constants';
import * as types from './../actions/actionTypes';
import initialState from './initialState';
import errorReducer from './errorReducer';

describe('Error Reducer', () => {
  it('should call errorReducer APP_ERROR', () => {
    const state = initialState.appState;
    const inputProps = { data: { submitting: false, updateWorkflowDetails: false } };
    const action = {
      type: types.APP_ERROR,
      error: inputProps
    };

    expect(errorReducer(state, action)).toEqual(inputProps);
  });
  it('should call errorReducer APP_ERROR_CLEAR', () => {
    const state = initialState.appState;
    const inputProps = {};
    const action = {
      type: types.APP_ERROR_CLEAR,
      error: {}
    };

    expect(errorReducer(state, action)).toEqual(inputProps);
  });
  it('should call errorReducer REHYDRATE', () => {
    const state = initialState.appState;
    const inputProps = { data: { submitting: false, updateWorkflowDetails: false } };
    const action = {
      type: persistTypes.REHYDRATE,
      payload: {
        error: inputProps
      }
    };

    expect(errorReducer(state, action)).toEqual(inputProps);
  });
});
