import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.authState, action) {
  let newState = {};
  switch (action.type) {
    case types.AUTH:
      const newState = { ...state, ...action.authState };
      return newState;
    default:
      return state;
  }
}
