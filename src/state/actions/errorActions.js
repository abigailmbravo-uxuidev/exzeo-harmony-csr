import * as types from './actionTypes';

export function setAppError(error) {
  return {
    type: types.APP_ERROR,
    error
  };
}

export function clearAppError() {
  return {
    type: types.APP_ERROR_CLEAR,
    error: {}
  };
}
