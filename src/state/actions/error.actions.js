import * as types from './actionTypes';

/**
 *
 * @param error
 * @returns {{type: string, error: *}}
 */
export function setAppError(error) {
  return {
    type: types.APP_ERROR,
    error
  };
}

/**
 *
 * @returns {{type: string, error: {}}}
 */
export function clearAppError() {
  return {
    type: types.APP_ERROR_CLEAR,
    error: {}
  };
}
