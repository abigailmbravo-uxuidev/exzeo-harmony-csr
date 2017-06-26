import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function serviceReducer(state = initialState.service, action) {
  let newState = state;
  switch (action.type) {
    case types.SERVICE_REQUEST:
      newState = (action.data) ? { ...state, ...action.data } : newState;
      return newState;
    default:
      return state;
  }
}
