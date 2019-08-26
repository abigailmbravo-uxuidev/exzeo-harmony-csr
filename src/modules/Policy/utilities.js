import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

/**
 *
 * @param values
 * @param form
 * @returns {Promise<void>}
 */
export async function rateEndorsement(values, form) {
  try {
    const transferConfig = {
      exchangeName: 'harmony',
      routingKey: 'harmony.policy.rateEndorsement',
      data: values
    };

    const response = await serviceRunner.callService(
      transferConfig,
      'rateEndorsement'
    );
    // recommended fix from final-form while using form.reset() inside of onSubmit()
  } catch {
    console.error('Error attempting to Rate Endorsement');
  }
}

/**
 *
 * @param values
 * @param form
 * @returns {Promise<void>}
 */
export async function saveEndorsement(values, form) {
  try {
    const transferConfig = {
      exchangeName: 'harmony',
      routingKey: 'harmony.policy.saveEndorsement',
      data: values
    };

    const response = await serviceRunner.callService(
      transferConfig,
      'saveEndorsement'
    );
    // recommended fix from final-form while using form.reset() inside of onSubmit()
    setTimeout(form.reset);
  } catch {
    console.error('Error attempting to Submit Endorsement');
  }
}
