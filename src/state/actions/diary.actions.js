import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import {
  POLICY_RESOURCE_TYPE,
  QUOTE_RESOURCE_TYPE
} from '../../constants/diaries';
import { removeTerm } from '../../utilities/format';

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
 * Set Diary Options
 * @param {array} diaryOptions
 * @returns {{type: string, loading: array}}
 */
export function setDiaryOptions(diaryOptions) {
  return {
    type: types.SET_DIARY_OPTIONS,
    diaryOptions
  };
}

/**
 *
 * @param filter
 * @returns {Function}
 */
export function fetchDiaries(filter) {
  const { resourceId, ...filterData } = filter;
  let resourceData;

  if (Array.isArray(resourceId)) {
    resourceData = resourceId.map(id => removeTerm(id));
  } else if (resourceId) {
    resourceData = removeTerm(resourceId);
  }

  const config = {
    service: 'diaries',
    method: 'POST',
    path: '/read',
    data: { ...filterData, resourceId: resourceData }
  };

  return async dispatch => {
    try {
      const response = await serviceRunner.callService(config, 'fetchDiaries');
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
  return async dispatch => {
    const {
      companyCode,
      state,
      product,
      user,
      resourceType,
      resourceId,
      diaryId,
      sourceNumber
    } = props;

    const userObj = {
      userId: user.userId,
      userName: user.userName
    };

    let resource = {};
    if (
      resourceType === POLICY_RESOURCE_TYPE ||
      resourceType === QUOTE_RESOURCE_TYPE
    ) {
      resource = {
        type: resourceType,
        id: resourceId,
        companyCode,
        state,
        product
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
        resourceId, // eslint-disable-line
        resourceType, // eslint-disable-line
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
      await serviceRunner.callService(config, 'submitDiary');
      dispatch(
        fetchDiaries({
          resourceType,
          resourceId:
            resourceType === POLICY_RESOURCE_TYPE
              ? [resourceId, sourceNumber]
              : resourceId
        })
      );
    } catch (error) {
      dispatch(errorActions.setAppError(error));
      return false;
    }
    return true;
  };
}

/**
 *
 * @returns {Promise<{}>}
 */
export async function fetchDiaryOptions(companyCode, state, product) {
  try {
    const config = {
      service: 'diaries',
      method: 'GET',
      path: `diaryOptions`
    };

    if (companyCode && state && product) {
      config.path = `${config.path}?companyCode=${companyCode}&state=${state}&product=${product}`;
    }
    const response = await serviceRunner.callService(
      config,
      'fetchDiaryOptions'
    );
    return response.data && response.data.result ? response.data.result : [];
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param companyCode
 * @param state
 * @param product
 * @returns {function(*): Promise<any>}
 */
export function getDiaryOptions(companyCode, state, product) {
  return async dispatch => {
    try {
      const diaryOptions = await fetchDiaryOptions(companyCode, state, product);
      dispatch(setDiaryOptions(diaryOptions));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}
