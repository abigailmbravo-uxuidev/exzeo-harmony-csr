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

/**
 *
 * @returns {Promise<*>}
 */
export async function getPaymentOptions() {
  try {
    const config = {
      service: 'billing',
      method: 'GET',
      path: `payment-options-apply-payment`
    };

    const response = await serviceRunner.callService(
      config,
      'fetchPaymentOptions'
    );

    return response.data.paymentOptions;
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param {object} data - payment info
 * @returns {Promise<*>}
 */
export async function postPayment(data) {
  try {
    const config = {
      service: 'payment-manager',
      method: 'POST',
      path: `payments`,
      data
    };
    const response = await serviceRunner.callService(
      config,
      'postPaymentTransaction'
    );
    return response;
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param submitData
 * @returns {Promise<{}>}
 */
export async function postCreateTransaction(submitData) {
  try {
    const config = {
      service: 'policy-data',
      method: 'POST',
      path: 'transaction',
      data: submitData
    };

    const response = await serviceRunner.callService(
      config,
      'postCreateTransaction'
    );
    return response.data?.result || {};
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param policyNumber
 * @returns {Promise<void>}
 */
export async function postRescindCancellation(policyNumber) {
  try {
    const config = {
      exchangeName: 'harmony',
      routingKey: 'harmony.policy.rescindCancellation',
      data: { policyNumber }
    };

    await serviceRunner.callService(config, 'rescindCancellation');
  } catch (error) {
    throw error;
  }
}
