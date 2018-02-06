import * as persistTypes from 'redux-persist/constants';
import * as types from './../actions/actionTypes';
import initialState from './initialState';
import searchReducer from './searchReducer';

describe('searchReducer Reducer', () => {
  it('should call searchReducer POLICY_SEARCH', () => {
    const state = initialState.search;
    const inputProps = {};
    const action = {
      type: types.POLICY_SEARCH,
      search: {}
    };

    expect(searchReducer(state, action)).toEqual(inputProps);
  });

  it('should call searchReducer QUOTE_SEARCH', () => {
    const state = initialState.search;
    const inputProps = {};
    const action = {
      type: persistTypes.QUOTE_SEARCH,
      search: {}
    };

    expect(searchReducer(state, action)).toEqual(inputProps);
  });
});
