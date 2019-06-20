import * as types from '../actions/actionTypes';
import initialState from './initialState';
import searchReducer from './search.reducer';

describe('searchReducer Reducer', () => {
  it('should call searchReducer SEARCH', () => {
    const state = initialState.search;
    const inputProps = {
      currentPage: 1,
      loading: false,
      noResults: false,
      pageSize: 0,
      results: [],
      sortBy: '',
      sortDirection: '',
      totalPages: 0,
      totalRecords: 0
    };
    const action = {
      type: types.SEARCH,
      search: {}
    };

    expect(searchReducer(state, action)).toEqual(inputProps);
  });
});
