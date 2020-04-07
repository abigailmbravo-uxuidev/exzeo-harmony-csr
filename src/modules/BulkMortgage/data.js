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
