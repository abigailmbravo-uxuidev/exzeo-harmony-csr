import * as persistTypes from 'redux-persist/constants';
import * as types from './../actions/actionTypes';
import initialState from './initialState';
import serviceReducer from './serviceReducer';

describe('serviceReducer', () => {
  it('should call serviceReducer SERVICE_REQUEST', () => {
    const state = initialState.service;
    const inputProps = { };
    const action = {
      type: types.SERVICE_REQUEST,
      service: inputProps
    };

    expect(serviceReducer(state, action)).toEqual(inputProps);
  });
  it('should call serviceReducer REHYDRATE', () => {
    const state = initialState.service;
    const inputProps = { };
    const action = {
      type: persistTypes.REHYDRATE,
      payload: {
        service: inputProps
      }
    };
    expect(serviceReducer(state, action)).toEqual(inputProps);
  });
});
