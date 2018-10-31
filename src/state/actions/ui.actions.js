import * as types from './actionTypes';

export function toggleNote(noteMeta) {
  return {
    type: types.TOGGLE_NOTE,
    noteMeta
  };
}

export function toggleDiary(diaryMeta = {}) {
  return {
    type: types.TOGGLE_DIARY,
    diaryMeta
  };
}
