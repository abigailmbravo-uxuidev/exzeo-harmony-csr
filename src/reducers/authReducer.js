import * as persistTypes from 'redux-persist/constants';
import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.authState, action) {
  let newState = state;
  console.log('authReducerz', state)
  switch (action.type) {
    case types.AUTH:
      newState = { ...state, ...action.authState };
      return newState;
    case persistTypes.REHYDRATE:
      newState = (action.payload && action.payload.authState) ? action.payload.authState : newState;
      return newState;
    default:
      return state;
  }
}
