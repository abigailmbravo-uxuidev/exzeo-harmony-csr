import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

/**
 *
 * @returns {Array}
 * @param agencyCode
 */
export async function fetchAvailableAgents(agencyCode) {
  try {
    const config = {
      service: 'agency',
      method: 'GET',
      path: `agents?agencyCode=${agencyCode}&availableOnly=true`
    };
    const response = await serviceRunner.callService(
      config,
      'fetchAvailableAgents'
    );
    return response.data && response.data.result ? response.data.result : [];
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param searchParam
 * @returns {Array}
 */
export async function fetchAvailableAgencies(searchParam = '') {
  let agencyCode = '';
  let displayName = '';

  const onlyNumbers = new RegExp('^[0-9]+$');
  if (onlyNumbers.test(searchParam)) agencyCode = searchParam;
  else displayName = encodeURI(searchParam);

  const config = {
    service: 'agency',
    method: 'GET',
    path: `agencies?agencyCode=${agencyCode}&displayName=${displayName}&availableOnly=true`
  };

  try {
    const response = await serviceRunner.callService(
      config,
      'fetchAvailableAgencies'
    );
    return response.data && response.data.result ? response.data.result : [];
  } catch (error) {
    throw error;
  }
}
