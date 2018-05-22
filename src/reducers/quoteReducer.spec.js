import * as persistTypes from 'redux-persist/constants';
import * as types from './../actions/actionTypes';
import initialState from './initialState';
import quoteStateReducer from './quoteReducer';

describe('Quote State Reducer', () => {
  it('should call quoteStateReducer GET_QUOTE', () => {
    const inputProps = { quoteId: '234', update: true };
    const action = {
      type: types.GET_QUOTE,
      quoteState: inputProps
    };

    expect(quoteStateReducer(inputProps, action)).toEqual(inputProps);
  });
  it('should call errorReducer REHYDRATE', () => {
    const state = initialState.quoteState;
    const inputProps = {};
    const action = {
      type: persistTypes.REHYDRATE,
      payload: {
        data: inputProps
      }
    };

    expect(quoteStateReducer(state, action)).toEqual(inputProps);
  });
});
