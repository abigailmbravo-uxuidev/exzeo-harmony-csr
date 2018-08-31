import * as types from './actionTypes';
import * as serviceRunner from '../../utilities/serviceRunner';

import * as errorActions from './errorActions';
import { setAppError } from './errorActions';

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

export function submitDiary(data, dispatch, props) {
  return async (dispatch) => {
    const {
      user,
      resourceType,
      resourceId,
      initialValues
    } = props;

    const assignee = data.assignee.value;

    // TODO: Get Users from collection and select based on userId
    data.assignee.userName = 'tticcsr';

    let config = {
      service: 'diaries',
      method: 'POST',
      data: {
        entry: data,
        resource: { type: resourceType, id: resourceId },
        user: { userId: user.userId, userName: user.userName }
      }
    };

    if (initialValues && initialValues.diaryId) {
      config.path = `update/${initialValues.diaryId}`
    } else {
      config.path = 'create'
    }

    try {
      await serviceRunner.callService(config);
      dispatch(fetchDiaries({ userName: user.userName, resourceType, resourceId }));
    } catch (error) {
      dispatch(setAppError(error));
      return false;
    }
    return true;
  };
}
