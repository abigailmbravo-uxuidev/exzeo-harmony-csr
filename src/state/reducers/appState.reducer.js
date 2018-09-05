import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function appStateReducer(state = initialState.appState, action) {
  switch (action.type) {
    case types.APPSTATE_SET:
      return { ...state, ...action.appState };
    case types.APPSTATE_ERROR:
      return { ...state, ...action.appState };
    default:
      return state;
  }
}
