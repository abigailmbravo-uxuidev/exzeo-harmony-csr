import * as types from './../actions/actionTypes';
import initialState from './initialState';

function setResults(state, action) {
  return {
    ...state,
    searchResults: action.searchResults
  };
}

export default function searchReducer(state = initialState.search, action) {
  let newState = {};
  switch (action.type) {
    case types.SEARCH:
      newState = { ...state, ...action.search };
      return newState;
    case types.SET_SEARCH_RESULTS:
      return setResults(state, action);
    default:
      return state;
  }
}
