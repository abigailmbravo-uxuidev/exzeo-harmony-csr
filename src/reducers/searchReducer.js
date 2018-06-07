import * as types from './../actions/actionTypes';
import initialState from './initialState';
const { search: SEARCH } = initialState;
const PAGE_SIZE = 25;

export default function searchReducer(state = SEARCH, action) {
  switch (action.type) {
    case types.SET_SEARCH_RESULTS:
      return setResults(state, action);
    case types.TOGGLE_LOADING:
      return toggleLoading(state, action);
    case types.RESET_SEARCH:
      return { ...state, ...SEARCH };
    default:
      return state;
  }
}

function setResults(state, action) {
  return {
    ...state,
    currentPage: action.currentPage || SEARCH.currentPage,
    pageSize: action.pageSize || SEARCH.pageSize,
    totalPages: Math.round(action.totalRecords / PAGE_SIZE) || SEARCH.totalPages,
    sortBy: action.sortBy || SEARCH.sortBy,
    sortDirection: action.sortDirection || SEARCH.sortDirection,
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
