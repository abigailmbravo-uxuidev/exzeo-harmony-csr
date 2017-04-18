import * as persistTypes from 'redux-persist/constants';
import * as types from './../actions/actionTypes';
import initialState from './initialState';
import userReducer from './userReducer';

describe('User Reducer', () => {
  it('should call userReducer AUTHENTICATED', () => {
    const state = initialState.user;
    const inputProps = { token: '1234', isAuthenticated: true, loggedOut: false };
    const action = {
      type: types.AUTHENTICATED,
      user: inputProps
    };

    expect(userReducer(state, action)).toEqual(inputProps);
  });
  it('should call userReducer AUTHENTICATE_ERROR', () => {
    const state = initialState.user;
    const inputProps = { token: '1234', isAuthenticated: true, loggedOut: false };
    const action = {
      type: types.AUTHENTICATE_ERROR,
      user: inputProps
    };

    expect(userReducer(state, action)).toEqual(inputProps);
  });
  it('should call userReducer REHYDRATE', () => {
    const state = initialState.user;
    const inputProps = { token: '1234', isAuthenticated: true, loggedOut: false };
    const action = {
      type: persistTypes.REHYDRATE,
      payload: {
        user: inputProps
      }
    };

    expect(userReducer(state, action)).toEqual(inputProps);
  });
});
