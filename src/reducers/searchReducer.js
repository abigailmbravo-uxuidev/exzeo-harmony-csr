import * as types from './../actions/actionTypes';
import initialState from './initialState';
const PAGE_SIZE = 25;

export default function searchReducer(state = initialState.search, action) {
  switch (action.type) {
    case types.SEARCH:
     return { ...state, ...action.search };
    case types.RESET_SEARCH:
      return { ...state, ...initialState.search };
    case types.SET_SEARCH_RESULTS:
      return setResults(state, action);
    case types.TOGGLE_LOADING:
      return toggleLoading(state, action);
    default:
      return state;
  }
}

function setResults(state, action) {
  return {
    ...state,
    currentPage: action.currentPage,
    pageSize: action.pageSize,
    totalPages: Math.round(action.totalRecords / PAGE_SIZE),
    sortBy: action.sortBy,
    sortDirection: action.sortDirection,
    results: action.results,
    totalRecords: action.totalRecords,
    noResults: action.noResults

  };
}

function toggleLoading(state, action) {
  return {
    ...state,
    loading: action.loading
  }
}
