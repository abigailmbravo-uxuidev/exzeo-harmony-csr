import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import _cloneDeep from 'lodash/cloneDeep';
import { date } from '@exzeo/core-ui/src';
/**
 *
 * @param values
 * @returns {Promise<void>}
 */
export async function rateEndorsement(data, setAppError) {
  try {
    const transferConfig = {
      exchangeName: 'harmony',
      routingKey: 'harmony.policy.rateEndorsement',
      data
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

export function formatEndorsementData(data, timezone) {
  const calculatedData = _cloneDeep(data);
  calculatedData.endorsementDate = date.formatToUTC(
    date.formatDate(data.endorsementDate, date.FORMATS.SECONDARY),
    timezone
  );

  // ensure that the second policyholder is removed if there is no data entered
  if (
    calculatedData.policyHolders.length > 1 &&
    (!calculatedData.policyHolders[1].firstName ||
      !calculatedData.policyHolders[1].lastName ||
      !calculatedData.policyHolders[1].emailAddress ||
      !calculatedData.policyHolders[1].primaryPhoneNumber)
  ) {
    calculatedData.policyHolders.pop();
  }
  // ensure that we have order and entityType properties set for secondary policyHolder if there is one.
  if (calculatedData.policyHolders.length > 1) {
    const order = calculatedData.policyHolders[1].order;
    const entityType = calculatedData.policyHolders[1].entityType;
    calculatedData.policyHolders[1].order = order || 1;
    calculatedData.policyHolders[1].entityType = entityType || 'Person';
  }

  if (calculatedData.product === 'HO3') {
    calculatedData.coverageOptions.sinkholePerilCoverage.answer =
      String(calculatedData.coverageOptions.sinkholePerilCoverage.answer) ===
      'true';
    if (calculatedData.coverageOptions.sinkholePerilCoverage.answer) {
      calculatedData.deductibles.sinkhole = {
        ...calculatedData.deductibles.sinkhole,
        value: 10
      };
    } else {
      calculatedData.deductibles.sinkhole = {
        ...calculatedData.deductibles.sinkhole,
        value: null
      };
    }
  }

  delete calculatedData._TEMP_INITIAL_VALUES;
  delete calculatedData.cancel;
  delete calculatedData.summaryLedger;
  return calculatedData;
}
