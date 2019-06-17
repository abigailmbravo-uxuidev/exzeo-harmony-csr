import * as types from './actionTypes';

/**
 *
 * @param noteMeta
 * @returns {{type: string, noteMeta: *}}
 */
export function toggleNote(noteMeta) {
  return {
    type: types.TOGGLE_NOTE,
    noteMeta
  };
}

/**
 *
 * @param diaryMeta
 * @returns {{diaryMeta, type: string}}
 */
export function toggleDiary(diaryMeta = {}) {
  return {
    type: types.TOGGLE_DIARY,
    diaryMeta
  };
}

/**
 *
 * @param minimizeNote
 * @returns {{minimizeNote: boolean, type: string}}
 */
export function toggleMinimizeNote(minimizeNote = false) {
  return {
    type: types.TOGGLE_MINIMIZE_NOTE,
    minimizeNote
  };
}

/**
 *
 * @param minimizeDiary
 * @returns {{type: string, minimizeDiary: boolean}}
 */
export function toggleMinimizeDiary(minimizeDiary = false) {
  return {
    type: types.TOGGLE_MINIMIZE_DIARY,
    minimizeDiary
  };
}

/**
 *
 * @param isLoading
 * @returns {{type: string, isLoading: boolean}}
 */
export function toggleLoading(isLoading) {
  return {
    type: types.TOGGLE_LOADING,
    isLoading
  };
}

// Temporary trick: the NotesUploader and Notes/Files page are not in sync. This will flip a boolean back and forth
// which will trigger the 'useFetchDiaries' hook to fire. This will ensure that if a user creates a note and is currently
// on the NOTES/FILES page, they see the updated list of notes.
export function setNotesSynced() {
  return {
    type: types.SET_NOTES_SYNCED
  }
}
