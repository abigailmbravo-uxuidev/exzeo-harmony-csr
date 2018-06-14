import * as types from './actionTypes';

export const toggleNote = noteMeta => ({
  type: types.TOGGLE_NOTE,
  noteMeta
});

