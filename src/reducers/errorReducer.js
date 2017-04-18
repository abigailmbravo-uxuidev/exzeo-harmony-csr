import * as persistTypes from 'redux-persist/constants';
import * as types from './../actions/actionTypes';
import initialState from './initialState';

// we want this store to rehydrate so we add the rehydrate type to the reducer

export default function userReducer(state = initialState.error, action) {
  let newState = {};
  switch (action.type) {
    case types.APP_ERROR:
      newState = { ...state, ...action.error };
      return newState;
    case types.APP_ERROR_CLEAR:
      return {};
    case persistTypes.REHYDRATE:
      newState = (action.payload && action.payload.error) ? action.payload.error : newState;
      return newState;
    default:
      return state;
  }
}
