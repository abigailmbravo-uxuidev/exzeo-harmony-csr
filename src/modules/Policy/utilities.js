import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import _cloneDeep from 'lodash/cloneDeep';
import { date, format, emptyArray } from '@exzeo/core-ui/src';
import _orderBy from 'lodash/orderBy';
import { BASE_MAP_URI, DEFAULT_DETAILS } from '../../constants/detailHeader';
import * as detailUtils from '../../utilities/documentDetails';
import { STANDARD_DATE_FORMAT } from '../../constants/dates';
import React from 'react';

/**
 *
 * @param data
 * @param errorHandler
 * @returns {object}
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
        result: { rating, instanceId, billPlan }
      }
    } = response;
    return { rating, instanceId, billPlan };
  } catch (err) {
    errorHandler(err);
    return {};
  }
}

/**
 *
 * @param data
 * @param timezone
 * @returns {object}
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
 * @param data
 * @param errorHandler
 * @returns {object}
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
 * @param data
 * @param errorHandler
 * @returns {object}
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

/**
 * @param cell
 * @returns {String}
 */
export const formatPaymentAmount = (cell = 0) => format.toCurrency(cell, 2);

/**
 * @returns {String}
 * @param cell
 * @param row
 * @param rowIndex
 * @param timezone
 */
export function formatPaymentDate(cell, row, rowIndex, timezone) {
  return date.formattedDate(cell, 'MM/DD/YYYY zz', timezone);
}

/**
 * @returns {String}
 * @param cell
 */
export const formatPrimaryDate = cell =>
  cell ? date.formatDate(cell, date.FORMATS.PRIMARY) : '';

/**
 * @returns {String}
 * @param cell
 */
export const formatClaimType = cell => (cell ? `Cat: ${cell}` : 'Daily');

/**
 * Sort payment history by date, fall back to createdAt date for ties.
 * @param paymentHistory
 * @returns {[Object]}
 */
export function sortPaymentHistoryByDate(paymentHistory) {
  if (!Array.isArray(paymentHistory) || !paymentHistory.length)
    return emptyArray;

  return _orderBy(paymentHistory, ['date', 'createdAt'], ['desc', 'desc']);
}

/**
 *
 * @param policy
 * @param summaryLedger
 * @param appraisalList
 * @returns {{constructionType: *, propertyAddress: {address2: *, address1: *, csz: string}, floodZone: *, policyNumber: *, county: *, sourceNumber: *, nonPaymentNoticeDueDate: (*|string), cancellation: ({showReinstatement: boolean, label: string, value: *}|{showRescindCancel: boolean, label: string, value: *}|{showRescindCancel: boolean, label: string, value: *}|{label: string, value: *}|{}), policyID: *, mailingAddress: *, appraisalURI: {label: string, value: *}, details: {product: string}, mapURI: string, nonPaymentNoticeDate: (*|string), effectiveDate: string, sourcePath: (string|null), territory: *, currentPremium: (string|string), status: string, policyHolder: *}|{premium: {}, cancellation: {}, mailingAddress: {}, propertyAddress: {}, property: {}, details: {}, policyHolder: {}}}
 */
export function getHeaderDetails(policy, summaryLedger, appraisalList) {
  if (!policy?.policyNumber || !summaryLedger) return DEFAULT_DETAILS;

  const {
    cancelDate,
    effectiveDate,
    endDate,
    policyHolders,
    policyHolderMailingAddress: pHMA = {},
    policyID,
    policyNumber,
    product,
    property,
    sourceNumber,
    status
  } = policy;

  const {
    currentPremium,
    status: { displayText }
  } = summaryLedger;

  const { constructionType, physicalAddress, floodZone, territory } = property;

  const mapQuery = detailUtils.getMapQuery(physicalAddress);

  const appraisal =
    (appraisalList || []).find(
      x => x.label === property.physicalAddress.county
    ) || {};

  return {
    constructionType,
    policyID,
    policyNumber,
    sourceNumber,
    territory,
    floodZone,
    county: physicalAddress.county,
    currentPremium: currentPremium
      ? `${format.toCurrency(currentPremium)}`
      : '--',
    effectiveDate: date.formattedDate(effectiveDate, STANDARD_DATE_FORMAT),
    appraisalURI: {
      label: 'PAS',
      value: appraisal.answer
    },
    mapURI: `${BASE_MAP_URI}${mapQuery}`,
    status: `${status} / ${displayText}`,
    details: {
      product: detailUtils.getProductName(product)
    },
    policyHolder: detailUtils.getPrimaryPolicyHolder(policyHolders),
    mailingAddress: detailUtils.getMailingAddress(pHMA),
    propertyAddress: {
      address1: physicalAddress.address1,
      address2: physicalAddress.address2,
      csz: detailUtils.getCityStateZip(physicalAddress)
    },
    nonPaymentNoticeDate: detailUtils.getNonPaymentNoticeDate(
      summaryLedger,
      status
    ),
    nonPaymentNoticeDueDate: detailUtils.getNonPaymentNoticeDueDate(
      summaryLedger,
      status
    ),
    cancellation: detailUtils.getCancellationDate(
      summaryLedger,
      status,
      cancelDate,
      endDate
    ),
    sourcePath: sourceNumber ? `/quote/${sourceNumber}/coverage` : null
  };
}

export const getNavLinks = policyNumber => [
  {
    key: 'coverage',
    to: `/policy/${policyNumber}/coverage`,
    label: <span>Coverage / Rating</span>,
    className: 'coverage',
    exact: true
  },
  {
    key: 'policyholder',
    to: `/policy/${policyNumber}/policyHolder`,
    label: <span>Policyholder / Agent</span>,
    className: 'policyholder',
    exact: true
  },
  {
    key: 'billing',
    to: `/policy/${policyNumber}/billing`,
    label: <span>Mortgage / Billing</span>,
    className: 'billing',
    exact: true
  },
  {
    key: 'notes',
    to: `/policy/${policyNumber}/notes`,
    label: <span>Notes / Files / Diaries</span>,
    className: 'notes',
    exact: true
  },
  {
    key: 'cancel',
    to: `/policy/${policyNumber}/cancel`,
    label: <span>Cancel Policy</span>,
    className: 'cancel',
    exact: true
  },
  {
    key: 'endorsements',
    to: `/policy/${policyNumber}/endorsements`,
    label: <span>Endorsements</span>,
    className: 'endorsements',
    exact: true
  }
];
