import moment from 'moment-timezone';
import { normalize } from '@exzeo/core-ui';

import { STANDARD_DATE_FORMAT } from '../constants/dates';

export const CANCELLATION_DATE = 'Cancellation Effective Date';
export const EXPIRATION_DATE = 'Expiration Date';

export const PRODUCT_DESCRIPTION = {
  HO3: 'Homeowners',
  AF3: 'Flood'
};

export const nonPaymentNoticePolicyStatus = [
  'Pending Voluntary Cancellation',
  'Pending Underwriting Cancellation',
  'Pending Underwriting Non-Renewal',
  'In Force'
];

export const isNonPaymentNotice = (billingStatus, policyStatus) =>
  nonPaymentNoticePolicyStatus.includes(policyStatus) &&
  billingStatus === 'Non-Payment Notice Issued';

export const expirationPolicyStatuses = [
  'Policy Issued',
  'In Force',
  'Not In Force'
];

export const expirationBillingStatuses = [
  'No Payment Received',
  'Full Payment Received',
  'Over Payment Received',
  'Partial Payment Received',
  'Payment Invoice Issued',
  'Policy Expired'
];

export const canceledBillingStatuses = [
  'Non-Payment Cancellation',
  'Underwriting Cancellation',
  'Underwriting Non-Renewal',
  'Voluntary Cancellation'
];

export const pendingBillingStatuses = [
  'Non-Payment Notice Issued',
  'No Payment Received',
  'Full Payment Received',
  'Over Payment Received',
  'Partial Payment Received',
  'Payment Invoice Issued'
];
/**
 * Determine product display name based on type
 * @param {string} product
 * @returns {string}
 */
export function getProductName(product) {
  return product === 'HO3'
    ? `${product} Homeowners`
    : product === 'AF3'
    ? `${product} Flood`
    : product;
}

/**
 * Build query string for Google Maps
 * @param {object} address
 * @returns {string}
 */
export function getMapQuery(address) {
  return encodeURIComponent(
    `${address.address1} ${address.address2} ${address.city}, ${address.state} ${address.zip}`
  );
}

/**
 * Format city, state and zip of an address
 * @param {object} address
 * @returns {string}
 */
export function getCityStateZip({ city = '', state = '', zip = '' }) {
  return `${city}, ${state} ${zip}`;
}

/**
 * Determine cancellation date to display
 * @param {object} summaryLedger
 * @param {string} policyStatus
 * @param {string} cancelDate
 *  * @param {string} endDate
 * @returns {string}
 */
export function getCancellationDate(
  summaryLedger,
  policyStatus,
  cancelDate,
  endDate
) {
  const {
    status: { displayText: billingStatus }
  } = summaryLedger;

  if (
    policyStatus === 'Cancelled' &&
    canceledBillingStatuses.includes(billingStatus) &&
    cancelDate
  ) {
    return {
      value: moment.utc(cancelDate).format(STANDARD_DATE_FORMAT),
      label: 'Cancellation Date',
      showReinstatement: true
    };
  } else if (
    policyStatus === 'Pending Voluntary Cancellation' &&
    pendingBillingStatuses.includes(billingStatus) &&
    cancelDate
  ) {
    return {
      value: moment.utc(cancelDate).format(STANDARD_DATE_FORMAT),
      label: 'Voluntary Cancellation Date',
      showRescindCancel: true
    };
  } else if (
    (policyStatus === 'Pending Underwriting Cancellation' ||
      policyStatus === 'Pending Underwriting Non-Renewal') &&
    pendingBillingStatuses.includes(billingStatus) &&
    cancelDate
  ) {
    return {
      value: moment.utc(cancelDate).format(STANDARD_DATE_FORMAT),
      label: 'UW Cancellation Date',
      showRescindCancel: true
    };
  } else if (
    expirationPolicyStatuses.includes(policyStatus) &&
    expirationBillingStatuses.includes(billingStatus) &&
    endDate
  ) {
    return {
      value: moment.utc(endDate).format(STANDARD_DATE_FORMAT),
      label: 'Expiration Date'
    };
  }
  return {};
}

/**
 * Determine NonPaymentNoticeDate to display
 * @param {object} summaryLedger
 * @param {string} policyStatus
 * @returns {object}
 */
export function getNonPaymentNoticeDate(summaryLedger, policyStatus) {
  const {
    nonPaymentNoticeDate,
    status: { displayText: billingStatus }
  } = summaryLedger;

  const isNonPaymentCancellation = isNonPaymentNotice(
    billingStatus,
    policyStatus
  );

  if (isNonPaymentCancellation && nonPaymentNoticeDate) {
    return moment.utc(nonPaymentNoticeDate).format(STANDARD_DATE_FORMAT);
  }
  return '';
}

/**
 * Determine NonPaymentNoticeDueDate to display
 * @param {object} summaryLedger
 * @param {string} policyStatus
 * @returns {object}
 */
export function getNonPaymentNoticeDueDate(summaryLedger, policyStatus) {
  const {
    nonPaymentNoticeDueDate,
    status: { displayText: billingStatus }
  } = summaryLedger;

  const isNonPaymentCancellation = isNonPaymentNotice(
    billingStatus,
    policyStatus
  );

  if (isNonPaymentCancellation && nonPaymentNoticeDueDate) {
    return moment.utc(nonPaymentNoticeDueDate).format(STANDARD_DATE_FORMAT);
  }
  return '';
}

/**
 * Format primary policyHolder details
 * @param policyHolders
 * @returns {*}
 */
export function getPrimaryPolicyHolder(policyHolders) {
  const primaryPolicyHolder = policyHolders[0];
  if (!primaryPolicyHolder) return { displayName: '', phone: '' };

  return {
    displayName: `${primaryPolicyHolder.firstName} ${primaryPolicyHolder.lastName}`,
    phone: normalize.phone(primaryPolicyHolder.primaryPhoneNumber)
  };
}

/**
 * Format mailing address details
 * @param mailingAddress
 * @returns {*}
 */
export function getMailingAddress(mailingAddress) {
  if (Object.keys(mailingAddress).length === 0) return {};

  return {
    address1: mailingAddress.address1,
    address2: mailingAddress.address2,
    csz: getCityStateZip(mailingAddress)
  };
}

/**
 * Formatting for currentPremium
 * @param premium
 * @returns {string}
 */
export function getCurrentPremium(premium) {
  return premium ? `$ ${normalize.numbers(premium)}` : '--';
}
