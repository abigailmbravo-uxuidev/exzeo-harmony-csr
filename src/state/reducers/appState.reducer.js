import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function appStateReducer(state = initialState.appState, action) {
  switch (action.type) {
    case types.APPSTATE_SET:
      return { ...state, ...action.appState };
    case types.APPSTATE_ERROR:
      return { ...state, ...action.appState };
    case types.TOGGLE_LOADING:
      return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
}
