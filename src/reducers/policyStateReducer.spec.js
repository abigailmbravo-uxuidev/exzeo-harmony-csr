import * as persistTypes from 'redux-persist/constants';
import * as types from './../actions/actionTypes';
import initialState from './initialState';
import policyStateReducer from './policyStateReducer';

describe('Policy State Reducer', () => {
  it('should call policyStateReducer GET_POLICY', () => {
    const state = initialState.policyState;
    const inputProps = { policyNumber: '123', update: true };
    const action = {
      type: types.GET_POLICY,
      policyState: inputProps
    };

    expect(policyStateReducer(state, action)).toEqual(inputProps);
  });
  it('should call policyStateReducer REHYDRATE', () => {
    const state = initialState.policyState;
    const inputProps = { policyNumber: '123', update: true };
    const action = {
      type: persistTypes.REHYDRATE,
      payload: {
        policyState: inputProps
      }
    };
    expect(policyStateReducer(state, action)).toEqual(inputProps);
  });
});
