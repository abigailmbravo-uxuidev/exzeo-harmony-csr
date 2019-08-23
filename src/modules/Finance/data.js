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
