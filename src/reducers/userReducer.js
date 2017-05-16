import axios from 'axios';
import * as persistTypes from 'redux-persist/constants';
import * as types from './../actions/actionTypes';
import initialState from './initialState';

// we want this store to rehydrate so we add the rehydrate type to the reducer

export default function userReducer(state = initialState.user, action) {
  let newState = {};
  switch (action.type) {
    case types.AUTHENTICATED:
      newState = { ...state, ...action.user };
      newState.error = undefined;
      // add the auth header to every request
      axios.defaults.headers.common['authorization'] = `bearer ${action.user.token}`; // eslint-disable-line
      return newState;
    case types.AUTHENTICATE_ERROR:
      return { ...state, ...action.user };
    case persistTypes.REHYDRATE:
      newState = (action.payload && action.payload.user) ? action.payload.user : newState;
      // add the auth header to every request
      if (action.payload.user && action.payload.user.token) {
        axios.defaults.headers.common['authorization'] = `bearer ${action.payload.user.token}`; // eslint-disable-line
      }
      return newState;
    default:
      return state;
  }
}
