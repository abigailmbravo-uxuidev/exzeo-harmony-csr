import * as types from '../actions/actionTypes';

import initialState from './initialState';
import questionsReducer from './questions.reducer';

describe('Questions State Reducer', () => {
  it('should call questionsReducer GET_QUESTIONS', () => {
    const inputProps = [{ quoteId: '234', update: true, name: 'test' }];
    const action = {
      type: types.SET_QUESTIONS,
      questions: inputProps
    };

    const map = {
      ...initialState.questions,
      [inputProps[0].name]: inputProps[0]
    };

    expect(questionsReducer(initialState.questions, action)).toEqual(map);
  });

  it('should call questionsReducer SET_ASSIGNEE_OPTIONS', () => {
    const inputProps = [{ answer: 'test', label: 'Mr Test', type: 'user' }];
    const action = {
      type: types.SET_ASSIGNEE_OPTIONS,
      diaryAssignees: inputProps
    };

    const map = {
      diaryAssignees: inputProps
    };

    expect(questionsReducer(initialState.questions, action)).toEqual(map);
  });
});
