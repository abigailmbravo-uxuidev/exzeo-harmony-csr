import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import _cloneDeep from 'lodash/cloneDeep';
import { date } from '@exzeo/core-ui/src';
/**
 *
 * @param values
 * @param form
 * @returns {Promise<void>}
 */
export async function rateEndorsement(data, timezone) {
  try {
    const calculatedData = _cloneDeep(data);

    calculatedData.endorsementDate = date.formatToUTC(
      date.formatDate(data.endorsementDate, date.FORMATS.SECONDARY),
      timezone
    );

    delete calculatedData._TEMP_INITIAL_VALUES;
    delete calculatedData.cancel;
    delete calculatedData.summaryLedger;

    const transferConfig = {
      exchangeName: 'harmony',
      routingKey: 'harmony.policy.rateEndorsement',
      data: calculatedData
    };

    const response = await serviceRunner.callService(
      transferConfig,
      'rateEndorsement'
    );
    const {
      data: {
        result: { rating }
      }
    } = response;
    return rating;
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
