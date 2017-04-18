import * as persistTypes from 'redux-persist/constants';
import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function appStateReducer(state = initialState.appState, action) {
  let newState = {};
  switch (action.type) {
    case types.APPSTATE_SET:
      return { ...state, ...action.appState };
    case types.APPSTATE_ERROR:
      return { ...state, ...action.appState };
    case persistTypes.REHYDRATE:
      newState = (action.payload && action.payload.appState) ? action.payload.appState : newState;
      return newState;
    default:
      return state;
  }
}
