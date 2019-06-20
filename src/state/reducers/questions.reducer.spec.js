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
      ...initialState.questions,
      diaryAssignees: inputProps
    };

    expect(questionsReducer(initialState.questions, action)).toEqual(map);
  });

  it('should call questionsReducer SET_TERRITORY_MANAGERS', () => {
    const inputProps = [{ answer: 'test', label: 'Mr Test', type: 'user' }];
    const action = {
      type: types.SET_TERRITORY_MANAGERS,
      territoryManagers: inputProps
    };

    const map = {
      ...initialState.questions,
      territoryManagers: inputProps
    };

    expect(questionsReducer(initialState.questions, action)).toEqual(map);
  });

  it('should call questionsReducer SET_LISTS', () => {
    const lists = [
      {
        code: 'test',
        extendedProperties: {
          listItem: { displayText: '1', type: 'string', isActive: true }
        }
      }
    ];
    const action = {
      type: types.SET_LISTS,
      lists
    };

    const map = {
      ...initialState.questions,
      lists: {
        test: [
          { displayText: '1', isActive: true, key: 'listItem', type: 'string' }
        ]
      }
    };

    expect(questionsReducer(initialState.questions, action)).toEqual(map);
  });
});
