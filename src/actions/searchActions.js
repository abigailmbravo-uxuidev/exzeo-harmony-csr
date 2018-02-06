import * as types from './actionTypes';

export const setPolicySearch = data => ({
  type: types.POLICY_SEARCH,
  search: {
    ...data
  }
});

export const setQuoteSearch = data => ({
  type: types.QUOTE_SEARCH,
  search: {
    ...data
  }
});

