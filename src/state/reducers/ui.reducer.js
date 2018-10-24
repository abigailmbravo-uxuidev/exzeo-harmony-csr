import * as types from '../actions/actionTypes';

import initialState from './initialState';

export default function appStateReducer(state = initialState.ui, action) {
  switch (action.type) {
    case types.TOGGLE_NOTE:
      return { ...state, note: action.noteMeta };
    case types.TOGGLE_DIARY:
      return { ...state, diary: action.diaryMeta };
    default:
      return state;
  }
}
