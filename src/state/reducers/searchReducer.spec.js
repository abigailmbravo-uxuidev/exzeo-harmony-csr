import * as types from '../actions/actionTypes';
import initialState from './initialState';
import searchReducer from './searchReducer';

describe('searchReducer Reducer', () => {

  it('should call searchReducer SEARCH', () => {
    const state = initialState.search;
    const inputProps = {};
    const action = {
      type: types.SEARCH,
      search: {}
    };

    expect(searchReducer(state, action)).toEqual(inputProps);
  });
});
