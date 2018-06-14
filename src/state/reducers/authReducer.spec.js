import * as persistTypes from 'redux-persist/constants';
import * as types from '../actions/actionTypes';
import initialState from './initialState';
import authReducer from './authReducer';

describe('auth Reducer', () => {
  it('should call quoteStateReducer AUTH', () => {
    const inputProps = { transaction: {} };
    const action = {
      type: types.AUTH,
      data: inputProps
    };

    expect(authReducer(inputProps, action)).toEqual(inputProps);
  });
  it('should call errorReducer REHYDRATE', () => {
    const state = initialState.authState;
    const inputProps = { userProfile: null };
    const action = {
      type: persistTypes.REHYDRATE,
      payload: {
        data: inputProps
      }
    };

    expect(authReducer(state, action)).toEqual(inputProps);
  });
});
