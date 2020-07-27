import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

/**
 * Search for diaries
 * @param reason
 * @param dueDateMin
 * @param dueDateMax
 * @param assignees
 * @param open
 * @param product
 * @returns {Promise<*>}
 */
export async function fetchDiaries({
  reason,
  dueDateMin,
  dueDateMax,
  assignees,
  open,
  product
}) {
  try {
    const config = {
      service: 'diaries',
      method: 'POST',
      path: '/read',
      data: {
        assignees: assignees.length === 0 ? null : assignees,
        dueDateMax,
        dueDateMin,
        open,
        reason,
        product
      }
    };

    const response = await serviceRunner.callService(config, 'fetchDiaries');
    return response.data?.result;
  } catch (error) {
    throw error;
  }
}

/**
 * Get enums as diary options
 * @returns {Promise<*>}
 */
export async function fetchDiaryOptions() {
  try {
    const config = {
      service: 'diaries',
      method: 'GET',
      path: `diaryOptions`
    };

    const response = await serviceRunner.callService(
      config,
      'fetchDiaryOptions'
    );

    return response.data?.result;
  } catch (error) {
    throw error;
  }
}

/**
 * Get users as assignee options
 * @param userProfile
 * @returns {Promise<*>}
 */
export async function fetchAssigneeOptions(userProfile) {
  const { resources } = userProfile;
  const query = resources
    .filter(r => r.uri.includes('Diaries'))
    .reduce((acc, val) => `${acc},${val.uri}|${val.right}`, '');

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

    return response.data?.result;
  } catch (error) {
    throw error;
  }
}

/**
 * Transfer diaries to a user
 * @param diaries
 * @param assignee
 * @returns {Promise<void>}
 */
export async function transferDiaries({ diaries, assignee }) {
  const config = {
    service: 'diaries',
    method: 'POST',
    path: '/diaries/transfer',
    data: {
      diaries,
      assignee
    }
  };

  try {
    const response = await serviceRunner.callService(config, 'transferDiaries');
    return response && response.data ? response.data : [];
  } catch (error) {
    throw error;
  }
}
