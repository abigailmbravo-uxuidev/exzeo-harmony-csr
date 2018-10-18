import * as types from '../actions/actionTypes';

import initialState from './initialState';

export default function questionsReducer(state = initialState.questions, action) {
  switch (action.type) {
    case types.SET_QUESTIONS:
      return setQuestions(state, action);
    case types.SET_ASSIGNEE_OPTIONS:
      return setAssigneeOptions(state, action);
    default:
      return state;
  }
}

function setQuestions(state, action) {
  // TODO: 'questions' state will become something like 'enums' or 'list' state. When that happens, we need to namespace the question map so things like 'diaryAssignees' and other lists can more easily be left alone.
  const currentState = { diaryAssignees: state.diaryAssignees || {} };

  if (!action.questions || !Array.isArray(action.questions)) {
    return {
      ...currentState
    };
  }

  return action.questions.reduce((questionMap, question) => {
    questionMap[question.name] = question;
    return questionMap;
  }, { ...currentState });
}

function setAssigneeOptions(state, action) {
  return {
    ...state,
    diaryAssignees: action.diaryAssignees
  };
}
