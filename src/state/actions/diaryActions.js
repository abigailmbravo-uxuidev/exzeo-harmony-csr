import * as types from './actionTypes';
import * as serviceRunner from '../../utilities/serviceRunner';
import * as errorActions from './errorActions';

/**
 * Set Diaries
 * @param {array} diaries
 * @returns {{type: string, loading: array}}
 */
export function setDiaries(diaries) {
  return {
    type: types.SET_DIARIES,
    diaries
  };
}

/**
 * Fetch Diaries
 * @param {array} filter
 * @returns {{type: string, loading: array}}
 */
export function fetchDiaries(filter) {
  const config = {
    service: 'diaries',
    method: 'POST',
    path: '/read',
    data: { ...filter }
  };

  return async (dispatch) => {
    try {
      const response = await serviceRunner.callService(config);
      console.log(response);
      dispatch(setDiaries(response.data));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}
