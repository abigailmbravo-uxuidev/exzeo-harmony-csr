import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function questionsReducer(state = initialState.questions, action) {
  switch (action.type) {
    case types.GET_QUESTIONS:
      return getQuestions(state, action);
    default:
      return state;
  }
}

function getQuestions(state, action) {
  if (!action.questions || !Array.isArray(action.questions)) return initialState.questions;

  return action.questions.reduce((acc, question) => {
    acc[question.name] = question;

    return acc;
  }, {});
}
