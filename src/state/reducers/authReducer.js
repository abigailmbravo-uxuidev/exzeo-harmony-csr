import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.authState, action) {
  let newState = state;
  switch (action.type) {
    case types.AUTH:
      newState = { ...state, ...action.authState };
      return newState;
    default:
      return state;
  }
}
