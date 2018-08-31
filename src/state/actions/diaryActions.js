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
 *
 * @param filter
 * @returns {Function}
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

export function submitDiary(data, props) {
  return async (dispatch) => {
    const {
      user,
      resourceType,
      resourceId,
      initialValues
    } = props;

    const {
      // remove unneeded vars from entry object
      diaryId, resourceType: rt, resourceId: rid, _id, createdAt, updatedAt,
      // this has what we want if we are updating.
      ...entry
    } = data;

    const config = {
      service: 'diaries',
      method: 'POST',
      data: {
        entry: data,
        resource: { type: resourceType, id: resourceId },
        user: { userId: user.userId, userName: user.userName }
      }
    };

    if (initialValues && initialValues.diaryId) {
      config.path = `update/${initialValues.diaryId}`;
      config.data.entry = entry;
    } else {
      config.path = 'create';
    }

    try {
      await serviceRunner.callService(config);
      dispatch(fetchDiaries({ userId: user.userId }));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
      return false;
    }
    return true;
  };
}
