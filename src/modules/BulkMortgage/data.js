import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import buildQueryString from '@exzeo/core-ui/src/@utils/buildQueryString';
import { buildAssigneesList } from '../../utilities/userResources';
/**
 *
 * @returns {Promise<[]>}
 */
export async function getTopMortgagees() {
  const data = {
    step: 'additionalInterestsCSR'
  };

  const response = await serviceRunner.callQuestions(data);
  return response.data.data;
}

/**
 *
 * @returns {Promise<[]>}
 * @param params
 */
export async function fetchMortgageesFromPolicies(params) {
  const path = `/transactions${buildQueryString(params)}`;
  const config = {
    service: 'policy-data',
    method: 'GET',
    path
  };

  try {
    const response = await serviceRunner.callService(config, 'fetchPolicy');
    return response ? response.data : [];
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param windowStart
 * @param windowEnd
 * @param pageNumber
 * @param name
 * @param userName
 * @param jobId
 * @returns {Promise<*|{}>}
 */
export async function getMortgageeJobs({
  windowStart,
  windowEnd,
  pageNumber,
  name = '',
  userName = '',
  jobId = ''
}) {
  const path = `/mortgageeJobs?windowStart=${windowStart}&windowEnd=${windowEnd}&page=${pageNumber}sort=updatedAt&name=${name}&userName=${userName}&jobId=${jobId}`;
  const config = {
    service: 'bulk-mortgage',
    method: 'GET',
    path
  };

  try {
    const response = await serviceRunner.callService(
      config,
      'getMortgageeJobs'
    );
    return response?.data?.result || {};
  } catch (error) {
    throw error;
  }
}

export async function getUsersForJobs(userProfile) {
  try {
    const { resources } = userProfile;

    const query = resources
      .filter(r => r.uri.includes('Diaries')) //TODO: change for Bulk Mortgage resource
      .reduce((acc, val) => `${acc},${val.uri}|${val.right}`, '');

    const config = {
      method: 'GET',
      service: 'security-manager-service',
      path: `/user?r=${query}`
    };
    const response = await serviceRunner.callService(config, 'getByJobUsers');
    const users =
      response.data && Array.isArray(response.data.result)
        ? response.data.result
        : [];
    return buildAssigneesList(users, 'username');
  } catch (error) {
    throw error;
  }
}
/**
 *
 * @returns {Promise<[]>}
 * @param {object} additionalInterest
 * @param {array} policies

 **/
export async function createBulkMortgageJob({ additionalInterest, policies }) {
  try {
    const config = {
      method: 'POST',
      service: 'policy-manager',
      path: `/bulkMortgageJobs/create`,
      data: {
        additionalInterest,
        policies
      }
    };
    const response = await serviceRunner.callService(
      config,
      'createBulkMortgageJob'
    );
    return response.data.result;
  } catch (error) {
    throw error;
  }
}
