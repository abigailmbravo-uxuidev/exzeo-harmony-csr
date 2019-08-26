import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import _cloneDeep from 'lodash/cloneDeep';
import { date } from '@exzeo/core-ui/src';
/**
 *
 * @param values
 * @returns {Promise<void>}
 */
export async function rateEndorsement(data, timezone, setAppError) {
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
        result: { rating, instanceId }
      }
    } = response;
    return { rating, instanceId };
  } catch (err) {
    setAppError(err);
    return {};
  }
}
