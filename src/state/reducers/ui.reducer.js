import * as types from '../actions/actionTypes';

import initialState from './initialState';

export default function appStateReducer(state = initialState.ui, action) {
  switch (action.type) {
    case types.TOGGLE_NOTE:
      return { ...state, note: action.noteMeta, minimizeNote: false };
    case types.TOGGLE_DIARY:
      return { ...state, diary: action.diaryMeta, minimizeDiary: false };
    case types.TOGGLE_MINIMIZE_NOTE:
      return { ...state, minimizeNote: action.minimizeNote };
    case types.TOGGLE_MINIMIZE_DIARY:
      return { ...state, minimizeDiary: action.minimizeDiary };
    case types.TOGGLE_LOADING:
      return { ...state, isLoading: action.isLoading };
    case types.SET_NOTES_SYNCED:
      // Flag that flips every time this action is called, letting the NOTES/FILES Page know to update. While this is not pretty,
      // it was the best way to ensure that NOTES/FILES follows newer patterns, while changing the smallest surface area.
      return { ...state, notesSynced: !state.notesSynced };
    default:
      return state;
  }
}
