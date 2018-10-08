import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function newNoteReducer(state = initialState.newNote, action) {
  switch (action.type) {
    case types.TOGGLE_NOTE:
      return { ...action.noteMeta };
    default:
      return state;
  }
}
