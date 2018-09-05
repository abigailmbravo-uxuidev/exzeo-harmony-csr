import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function errorReducer(state = initialState.error, action) {
  switch (action.type) {
    case types.APP_ERROR:
      return { ...state, ...action.error };
    case types.APP_ERROR_CLEAR:
      return {};
    default:
      return state;
  }
}
