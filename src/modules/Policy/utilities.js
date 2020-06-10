import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import _cloneDeep from 'lodash/cloneDeep';
import { date, format } from '@exzeo/core-ui/src';

/**
 *
 * @returns {object}
 * @param data
 * @param errorHandler
 */
export async function rateEndorsement(data, errorHandler) {
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
    errorHandler(err);
    return {};
  }
}

/**
 *
 * @returns {object}
 * @param data
 * @param timezone
 */
export function formatEndorsementData(data, timezone) {
  const calculatedData = _cloneDeep(data);
  calculatedData.endorsementDate = date.formatToUTC(
    date.formatDate(data.endorsementDate, date.FORMATS.SECONDARY),
    timezone
  );

  calculatedData.policyHolders[0].firstName = format.trimWhiteSpace(
    calculatedData.policyHolders[0].firstName
  );
  calculatedData.policyHolders[0].lastName = format.trimWhiteSpace(
    calculatedData.policyHolders[0].lastName
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
    calculatedData.policyHolders[1].firstName = format.trimWhiteSpace(
      calculatedData.policyHolders[1].firstName
    );
    calculatedData.policyHolders[1].lastName = format.trimWhiteSpace(
      calculatedData.policyHolders[1].lastName
    );
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

/**
 *
 * @param agencyCode
 * @returns {Array}
 */
export async function fetchAgency(agencyCode) {
  try {
    const config = {
      service: 'agency',
      method: 'GET',
      path: `agencyTerritoryManager/${agencyCode}`
    };
    const response = await serviceRunner.callService(config, 'fetchAgency');
    return response.data && response.data.result ? response.data.result : {};
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param agencyCode
 * @returns {Array}
 */
export async function fetchAgentsByAgencyCode(agencyCode) {
  try {
    const config = {
      service: 'agency',
      method: 'GET',
      path: `agencies/${agencyCode}/agents`
    };
    const response = await serviceRunner.callService(
      config,
      'fetchAgentsByAgencyCode'
    );
    return response.data && response.data.result ? response.data.result : [];
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @returns {object}
 * @param data
 * @param errorHandler
 */
export async function rateEffectiveDateChange(data, errorHandler) {
  try {
    const transferConfig = {
      exchangeName: 'harmony',
      routingKey: 'harmony.policy.rateEffectiveDateChange',
      data
    };

    const response = await serviceRunner.callService(
      transferConfig,
      'rateEffectiveDateChange'
    );
    const {
      data: {
        result: { premiumChange, instanceId }
      }
    } = response;
    return { premiumChange, instanceId };
  } catch (err) {
    errorHandler(err);
    return {};
  }
}

/**
 *
 * @returns {object}
 * @param data
 * @param errorHandler
 */
export async function saveEffectiveDateChange(data, errorHandler) {
  try {
    const transferConfig = {
      exchangeName: 'harmony',
      routingKey: 'harmony.policy.saveEffectiveDateChange',
      data
    };

    return await serviceRunner.callService(
      transferConfig,
      'saveEffectiveDateChange'
    );
  } catch (err) {
    errorHandler(err);
    return {};
  }
}
