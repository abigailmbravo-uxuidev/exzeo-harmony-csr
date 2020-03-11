import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

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

/**
 *
 * @param postalCodes
 * @returns {{postalCodes: *, type: string}}
 */
export function setPostalCodes(postalCodes) {
  return {
    type: types.SET_POSTAL_CODES,
    postalCodes
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

function buildAssigneesList(users) {
  const activeUsers = users.filter(user => !!user.enabled);

  const userList = activeUsers.map(user => ({
    answer: user.userId,
    label: `${user.firstName} ${user.lastName}`,
    type: 'user'
  }));

  return userList.sort((a, b) => {
    const userA = a.label.toUpperCase();
    const userB = b.label.toUpperCase();
    if (userA > userB) return 1;
    if (userA < userB) return -1;
    return 0;
  });
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
 * @param state
 * @returns {Function}
 */
export function getTerritoryManagers(state) {
  return async dispatch => {
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
    const response = await serviceRunner.callService(
      config,
      'fetchTerritoryManagers'
    );
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

/**
 *
 * @param searchTerm
 * @returns {Function}
 */
export function searchPostalCodes(searchTerm) {
  return async dispatch => {
    try {
      const zipCodes = await fetchPostalCodes(searchTerm);
      dispatch(setPostalCodes(zipCodes));
      return zipCodes;
    } catch (error) {
      dispatch(errorActions.setAppError(error));
      return [];
    }
  };
}

/**
 *
 * @param searchTerm
 * @returns {Array<[]>}
 */
export async function fetchPostalCodes(searchTerm, state) {
  try {
    const config = {
      service: 'list-service',
      method: 'GET',
      path: `v1/postal-codes?postalCode=${searchTerm}&state=${state}&pageSize=10&sortDirection=asc&page=0&country=USA`
    };
    const response = await serviceRunner.callService(
      config,
      'fetchPostalCodes'
    );
    return response?.data?.result?.postalCodes;
  } catch (error) {
    throw error;
  }
}
