import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function searchReducer(state = initialState.search, action) {
  let newState = {};
  switch (action.type) {
    case types.POLICY_SEARCH:
      newState = { ...state, ...action.search };
      return newState;
    case types.QUOTE_SEARCH:
      newState = { ...state, ...action.search };
      return newState;
    default:
      return state;
  }
}
