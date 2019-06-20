import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function notesReducer(state = initialState.notes, action) {
  switch (action.type) {
    case types.SET_NOTES:
      return [...action.notes];
    default:
      return state;
  }
}
