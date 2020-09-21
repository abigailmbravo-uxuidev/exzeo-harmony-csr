import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

/**
 *
 * @param {string} policyNumber
 * @returns {Promise<*>}
 */
export async function getPaymentHistory(policyNumber) {
  try {
    const config = {
      service: 'payment',
      method: 'GET',
      path: `payments/${policyNumber}`
    };

    const response = await serviceRunner.callService(
      config,
      'getPaymentHistory'
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
