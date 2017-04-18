import * as types from './actionTypes';

export const setAppError = error => ({
  type: types.APP_ERROR,
  error
});

export const clearAppError = () => ({
  type: types.APP_ERROR_CLEAR,
  error: {}
});

export const dispatchClearAppError = () => dispatch => dispatch(clearAppError());
