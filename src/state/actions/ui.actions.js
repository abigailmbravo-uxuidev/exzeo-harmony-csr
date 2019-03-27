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

export function toggleMinimizeNote(minimizeNote = false) {
  return {
    type: types.TOGGLE_MINIMIZE_NOTE,
    minimizeNote
  };
}

export function toggleMinimizeDiary(minimizeDiary = false) {
  return {
    type: types.TOGGLE_MINIMIZE_DIARY,
    minimizeDiary
  };
}
