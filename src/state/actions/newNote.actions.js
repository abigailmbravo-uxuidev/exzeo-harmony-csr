import * as types from './actionTypes';

export function toggleNote(noteMeta) {
  return {
    type: types.TOGGLE_NOTE,
    noteMeta
  };
}

