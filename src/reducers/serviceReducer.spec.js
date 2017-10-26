import * as persistTypes from 'redux-persist/constants';
import * as types from './../actions/actionTypes';
import initialState from './initialState';
import serviceReducer from './serviceReducer';

describe('Service Reducer', () => {
  it('should call quoteStateReducer SERVICE_REQUEST', () => {
    const inputProps = { transaction: {} };
    const action = {
      type: types.SERVICE_REQUEST,
      data: inputProps
    };

    expect(serviceReducer(inputProps, action)).toEqual(inputProps);
  });
  it('should call errorReducer REHYDRATE', () => {
    const state = initialState.service;
    const inputProps = {};
    const action = {
      type: persistTypes.REHYDRATE,
      payload: {
        data: inputProps
      }
    };

    expect(serviceReducer(state, action)).toEqual(inputProps);
  });
});
