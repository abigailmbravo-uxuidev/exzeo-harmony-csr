import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
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
 * @param policyNumber
 * @param lastName
 * @param propertyAddress
 * @returns {Promise<{}>}
 */
export async function fetchPolicies({
  policyNumber = '',
  lastName = '',
  propertyAddress = ''
}) {
  const config = {
    service: 'policy-data',
    method: 'GET',
    path: `transactions?policyNumber=${policyNumber}&lastName=${lastName}&propertyAddress=${propertyAddress}&latest=true`
  };

  try {
    const response = await serviceRunner.callService(config, 'fetchPolicy');
    return response ? response.data : {};
  } catch (error) {
    throw error;
  }
}
