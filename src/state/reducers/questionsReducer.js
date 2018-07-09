import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function questionsReducer(state = initialState.questions, action) {
  switch (action.type) {
    case types.SET_QUESTIONS:
      return setQuestions(state, action);
    default:
      return state;
  }
}

function setQuestions(state, action) {
  if (!action.questions || !Array.isArray(action.questions)) return initialState.questions;

  return action.questions.reduce((questionMap, question) => {
    questionMap[question.name] = question;
    return questionMap;
  }, {});
}
