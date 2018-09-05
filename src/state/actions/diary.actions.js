import * as serviceRunner from '../../utilities/serviceRunner';

import * as types from './actionTypes';
import * as errorActions from './error.actions';

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

    const userObj = {
      userId: user.userId,
      userName: user.userName
    };
    const config = {
      service: 'diaries',
      method: 'POST',
      data: {
        resource: { type: resourceType, id: resourceId },
        user: userObj
      }
    };

    // Editing a diary
    if (initialValues && initialValues.diaryId) {
      const {
        _id,
        createdAt,
        diaryId,
        resourceId,  // eslint-disable-line
        resourceType,  // eslint-disable-line
        updatedAt,
        // this has what we want if we are updating.
        ...entry
      } = data;

      config.path = `update/${initialValues.diaryId}`;
      config.data.entry = { ...entry };

    // Creating a diary
    } else {
      config.path = 'create';
      // TODO won't need to add 'created by' once endpoint is updated
      config.data.entry = { ...data, createdBy: userObj };
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
