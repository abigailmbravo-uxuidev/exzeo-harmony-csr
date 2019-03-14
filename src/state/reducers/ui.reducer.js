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
    default:
      return state;
  }
}
