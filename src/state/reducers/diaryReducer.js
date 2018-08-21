import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.diaries, action) {
  switch (action.type) {
    case types.SET_DIARIES:
      return [...action.diaries] ;
    default:
      return state;
  }
}