import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

import * as types from './actionTypes';
import * as errorActions from './error.actions';
import { buildAssigneesList } from '../../utilities/userResources';

export function setQuestions(questions) {
  return {
    type: types.SET_QUESTIONS,
    questions
  };
}

export function setAssigneeOptions(diaryAssignees) {
  return {
    type: types.SET_ASSIGNEE_OPTIONS,
    diaryAssignees
  };
}

/**
 *
 * @param territoryManagers
 * @returns {{state: string, territoryManagers: *}}
 */
export function setTerritoryManagers(territoryManagers) {
  return {
    type: types.SET_TERRITORY_MANAGERS,
    territoryManagers
  };
}

export function setLists(lists) {
  return {
    type: types.SET_LISTS,
    lists
  };
}

export function getUIQuestions(step) {
  return async dispatch => {
    try {
      const data = { step };
      const response = await serviceRunner.callQuestions(data);
      const questions = response && response.data ? response.data.data : [];
      dispatch(setQuestions(questions));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

export function getDiaryAssigneeOptions(userProfile) {
  const { resources } = userProfile;
  const query = resources
    .filter(r => r.uri.includes('Diaries'))
    .reduce((acc, val) => `${acc},${val.uri}|${val.right}`, '');

  return async dispatch => {
    try {
      const config = {
        method: 'GET',
        service: 'security-manager-service',
        path: `/user?r=${query}`
      };
      const response = await serviceRunner.callService(
        config,
        'getDiaryAssigneeOptions'
      );
      const users =
        response.data && Array.isArray(response.data.result)
          ? response.data.result
          : [];

      const diaryAssignees = buildAssigneesList(users);
      dispatch(setAssigneeOptions(diaryAssignees));
    } catch (error) {
      dispatch(errorActions.setAppError);
    }
  };
}
/**
 *
 * @returns {Promise<{}>}
 */
export async function fetchLists() {
  try {
    const config = {
      service: 'list-service',
      method: 'GET',
      path: 'v1/lists'
    };
    const response = await serviceRunner.callService(config, 'fetchLists');
    return response.data && response.data.result
      ? response.data.result.records
      : [];
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @returns {Function}
 */
export function getLists() {
  return async dispatch => {
    try {
      const lists = await fetchLists();
      dispatch(setLists(lists));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}
