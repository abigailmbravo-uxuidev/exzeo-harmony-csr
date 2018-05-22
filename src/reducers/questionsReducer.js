import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function questionsReducer(state = initialState.questions, action) {
  switch (action.type) {
    case types.GET_QUESTIONS:
      return action.questions ? [ ...action.questions ] : [ ...state ];
    default:
      return state;
  }
}
