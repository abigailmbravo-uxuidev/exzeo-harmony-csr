import * as types from '../actions/actionTypes';
import initialState from './initialState';
import questionsReducer from './questionsReducer';

describe('Questions State Reducer', () => {
  it('should call questionsReducer GET_QUESTIONS', () => {
    const inputProps = [{ quoteId: '234', update: true, name: 'test' }];
    const action = {
      type: types.GET_QUESTIONS,
      questions: inputProps
    };

    const map = {
      [inputProps[0].name]: inputProps[0]
    };

    expect(questionsReducer(initialState.questions, action)).toEqual(map);
  });
});
