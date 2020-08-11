import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

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

export async function fetchPolicy(policyNumber) {
  const config = {
    service: 'policy-data',
    method: 'GET',
    path: `transactions/${policyNumber}/latest`
  };

  try {
    const response = await serviceRunner.callService(config, 'fetchPolicy');
    return response ? response.data : {};
  } catch (error) {
    throw error;
  }
}

export async function fetchSummaryLedger(policyNumber) {
  const config = {
    service: 'harmony-data',
    method: 'GET',
    path: `summary-ledgers/${policyNumber}/latest`
  };

  try {
    const response = await serviceRunner.callService(
      config,
      'fetchSummaryLedger'
    );
    return response && response.data && response.data.result
      ? response.data.result
      : {};
  } catch (error) {
    throw error;
  }
}

export async function getPolicy(policyNumber) {
  try {
    const policy = await fetchPolicy(policyNumber);
    const summaryLedger = await fetchSummaryLedger(policy.policyNumber);
    policy.summaryLedger = summaryLedger;
    return policy;
  } catch (error) {
    throw error;
  }
}

export async function postPayment(data) {
  try {
    const config = {
      service: 'billing',
      method: 'POST',
      path: `post-payment-transaction`,
      data
    };
    await serviceRunner.callService(config, 'postPaymentTransaction');
  } catch (error) {
    throw error;
  }
}
