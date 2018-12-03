import * as serviceRunner from '../../utilities/serviceRunner';
import { POLICY_RESOURCE_TYPE, QUOTE_RESOURCE_TYPE } from '../../constants/diaries';

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
      dispatch(setDiaries(response.data.result));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @param data
 * @param props
 * @returns {Function}
 */
export function submitDiary(data, props) {
  return async (dispatch) => {
    const {
      user,
      resourceType,
      resourceId,
      diaryId
    } = props;

    const userObj = {
      userId: user.userId,
      userName: user.userName
    };

    // TODO: remove this when CSP is ready
    let resource = {};
    if (resourceType === POLICY_RESOURCE_TYPE || resourceType === QUOTE_RESOURCE_TYPE) {
      resource = {
        type: resourceType,
        id: resourceId,
        companyCode: 'TTIC',
        state: 'FL',
        product: 'HO3'
      };
    } else {
      resource = { type: resourceType, id: resourceId };
    }
    // ------------------------------------->

    const config = {
      service: 'diaries',
      method: 'POST',
      data: {
        // TODO: leaving this longhand so we explicitly know where to fix this once we have a better idea for CSP
        // eslint-disable-next-line object-shorthand
        resource: resource,
        user: userObj
      }
    };

    // Editing a diary
    if (diaryId) {
      const {
        _id,
        resourceId,  // eslint-disable-line
        resourceType,  // eslint-disable-line
        // this has what we want if we are updating.
        ...entry
      } = data;

      config.path = `update/${diaryId}`;
      config.data.entry = { ...entry };

    // Creating a diary
    } else {
      config.path = 'create';
      config.data.entry = { ...data };
    }

    try {
      await serviceRunner.callService(config);
      dispatch(fetchDiaries({
        resourceType,
        resourceId
      }));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
      return false;
    }
    return true;
  };
}