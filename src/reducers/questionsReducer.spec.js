import * as persistTypes from 'redux-persist/constants';
import * as types from './../actions/actionTypes';
import initialState from './initialState';
import questionsReducer from './questionsReducer';

describe('Quote State Reducer', () => {
  it('should call questionsReducer GET_QUOTE', () => {
    const inputProps = { quoteId: '234', update: true };
    const action = {
      type: types.GET_QUESTIONS,
      quoteState: inputProps
    };

    expect(questionsReducer(inputProps, action)).toEqual(inputProps);
  });
});
