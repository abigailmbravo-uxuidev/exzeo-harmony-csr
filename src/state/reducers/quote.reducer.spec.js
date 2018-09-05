import * as types from '../actions/actionTypes';
import quoteStateReducer from './quote.reducer';

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
