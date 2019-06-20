import * as types from '../actions/actionTypes';
import initialState from './initialState';
import serviceReducer from './service.reducer';

describe('serviceReducer', () => {
  it('should call serviceReducer SERVICE_REQUEST', () => {
    const state = initialState.service;
    const inputProps = {};
    const action = {
      type: types.SERVICE_REQUEST,
      service: inputProps
    };

    expect(serviceReducer(state, action)).toEqual({ ...state, ...inputProps });
  });
});
