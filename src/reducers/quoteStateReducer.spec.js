import * as persistTypes from 'redux-persist/constants';
import * as types from './../actions/actionTypes';
import initialState from './initialState';
import quoteStateReducer from './quoteStateReducer';

describe('Quote State Reducer', () => {
  it('should call quoteStateReducer GET_QUOTE', () => {
    const inputProps = { quoteId: '234', update: true };
    const action = {
      type: types.GET_QUOTE,
      quoteState: inputProps
    };

    expect(quoteStateReducer(inputProps, action)).toEqual(inputProps);
  });
});
