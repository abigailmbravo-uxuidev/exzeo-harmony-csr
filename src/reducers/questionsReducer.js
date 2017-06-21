import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function questionsReducer(state = initialState.questions, action) {
  let newState = state;
  switch (action.type) {
    case types.GET_QUESTIONS:
      newState = (action.questions) ? { ...state, ...action.questions } : newState;
      return newState;
    default:
      return state;
  }
}
