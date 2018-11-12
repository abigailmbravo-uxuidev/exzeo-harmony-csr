import * as serviceRunner from '../../utilities/serviceRunner';

import * as types from './actionTypes';
import * as errorActions from './error.actions';

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
  return async (dispatch) => {
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

// TODO: this is in place until the endpoint can filter a little better based on CSP and resources
// eslint-disable-next-line max-len
const TEMP_RESOURCE_QUERY = 'r=TTIC:FL:HO3:Diaries:DiariesService:*|READ,TTIC:FL:HO3:Diaries:DiariesService:*|INSERT,TTIC:FL:HO3:Diaries:DiariesService:*|UPDATE';
function buildAssigneesList(users) {
  return users.map(user => ({
    answer: user.userId,
    label: `${user.firstName} ${user.lastName}`,
    type: 'user'
  }));
}

export function getDiaryAssigneeOptions(userProfile) {
  const query = TEMP_RESOURCE_QUERY;
  return async (dispatch) => {
    try {
      const config = {
        method: 'GET',
        service: 'security-manager-service',
        path: `/user?${query}`
      };
      const response = await serviceRunner.callService(config);
      const users = response.data && Array.isArray(response.data.result) ? response.data.result : [];

      const diaryAssignees = buildAssigneesList(users);

      dispatch(setAssigneeOptions(diaryAssignees));
    } catch (error) {
      dispatch(errorActions.setAppError);
    }
  };
}

/**
 *
 * @param state
 * @returns {Function}
 */
export function getTerritoryManagers(state) {
  return async (dispatch) => {
    try {
      const tm = await fetchTerritoryManagers(state);
      dispatch(setTerritoryManagers(tm));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @param state
 * @returns {Promise<{}>}
 */
export async function fetchTerritoryManagers(state) {
  try {
    const config = {
      service: 'territory-manager-service',
      method: 'GET',
      path: `territoryManagers/${state}`
    };
    const response = await serviceRunner.callService(config);
    return response.data && response.data.result ? response.data.result : [];
  } catch (error) {
    throw error;
  }
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
    const response = await serviceRunner.callService(config);
    return response.data && response.data.result ? response.data.result.records : [];
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @returns {Function}
 */
export function getLists() {
  return async (dispatch) => {
    try {
      const lists = await fetchLists();
      dispatch(setLists(lists));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}
