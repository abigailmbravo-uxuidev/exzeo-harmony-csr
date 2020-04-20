import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import { formatMortgagees } from './utilities';
import buildQueryString from '@exzeo/core-ui/src/@utils/buildQueryString';
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
