import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import { removeTerm } from '../../utilities/format';
import { formatAssigneesOptions, formatDiaryOptions } from './utilities';

/**
 *
 * @param filter
 * @param [options]
 * @returns {Function}
 */
export async function fetchDiaries(filter, options) {
  const { resourceId, ...filterData } = filter;
  let resourceIdQuery;

  if (Array.isArray(resourceId)) {
    resourceIdQuery = resourceId.map(id => removeTerm(id));
  } else if (resourceId) {
    resourceIdQuery = removeTerm(resourceId);
  }

  const config = {
    service: 'diaries',
    method: 'POST',
    path: '/read',
    data: { ...filterData, resourceId: resourceIdQuery }
  };

  const response = await serviceRunner.callService(config, 'fetchDiaries');
  return response.data.result;
}

/**
 *
 * @param data
 * @param [options]
 * @returns {Promise<void>}
 */
export async function createDiary(data, options) {
  const config = {
    service: 'diaries',
    method: 'POST',
    path: 'create',
    data
  };

  const response = await serviceRunner.callService(config, 'submitDiary');
  return response;
}

/**
 *
 * @param data
 * @param [options]
 * @returns {Promise<void>}
 */
export async function updateDiary(data, options) {
  const config = {
    service: 'diaries',
    method: 'POST',
    path: `update/${options.id}`,
    data
  };

  const response = await serviceRunner.callService(config, 'submitDiary');
  return response;
}

/**
 * Get enums as diary options
 * @returns {Promise<*>}
 */
export async function fetchDiaryOptions(csp = {}) {
  const config = {
    service: 'diaries',
    method: 'GET',
    path: `diaryOptions`
  };

  if (csp.companyCode && csp.state && csp.product) {
    config.path = `${config.path}?companyCode=${csp.companyCode}&state=${csp.state}&product=${csp.product}`;
  }
  const response = await serviceRunner.callService(config, 'fetchDiaryOptions');

  return response.data?.result;
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
}

/**
 *
 * @param userProfile
 * @param csp
 * @returns {Promise<{formattedDiariesOptions: {reasons: *, tags: *}, formattedAssigneeOptions: *}>}
 */
export async function fetchDiaryEnums(userProfile, csp) {
  const optionsPromise = fetchDiaryOptions(csp);
  const assigneesPromise = fetchAssigneeOptions(userProfile);

  const [diariesOptions, assigneeOptions] = await Promise.all([
    optionsPromise,
    assigneesPromise
  ]);

  const formattedDiariesOptions = formatDiaryOptions(diariesOptions);
  const formattedAssigneeOptions = formatAssigneesOptions(assigneeOptions);

  return {
    formattedDiariesOptions,
    formattedAssigneeOptions
  };
}
