import * as types from './actionTypes';

export const setSearch = data => ({
  type: types.SEARCH,
  search: {
    ...data
  }
});

