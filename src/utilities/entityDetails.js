import moment from 'moment-timezone';
import { normalize } from '@exzeo/core-ui/lib';

import { STANDARD_DATE_FORMAT } from '../constants/dates';

export const CANCELLATION_DATE = 'Cancellation Effective Date';
export const EXPIRATION_DATE = 'Expiration Date';
export const FINAL_PAYMENT_DATE = 'Final Payment Date';

export const isNonPaymentNotice = (billingStatus, policyStatus) =>
  policyStatus === 'In Force' && billingStatus === 'Non-Payment Notice Issued';

export const expirationPolicyStatuses = [
  'Policy Issued',
  'In Force',
  'Not In Force'
];

export const expirationBillingStatus = [
  'No Payment Received',
  'Full Payment Received',
  'Over Payment Received',
  'Partial Payment Received',
  'Payment Invoice Issued',
  'Policy Expired'
];

export const canceledPolicyStatuses = [
  'Cancelled',
  'Pending Voluntary Cancellation',
  'Pending Underwriting Cancellation',
  'Cancellation',
  'Pending Underwriting Non-Renewal'
];

export const canceledBillingStatuses = [
  'Non-Payment Notice Issued',
  'No Payment Received',
  'Full Payment Received',
  'Over Payment Received',
  'Partial Payment Received',
  'Payment Invoice Issued',
  'Non-Payment Cancellation'
];
/**
 * Determine product display name based on type
 * @param {string} product
 * @returns {string}
 */
export function getProductName(product) {
  return product === 'HO3' ? `${product} Homeowners` : product;
}

/**
 * Build query string for Google Maps
 * @param {object} address
 * @returns {string}
 */
export function getMapQuery(address) {
  return encodeURIComponent(`${address.address1} ${address.address2} ${address.city}, ${address.state} ${address.zip}`);
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
 * Determine whether or not to show Reinstatement link
 * @param {string} status
 * @param {string} code
 * @returns {boolean}
 */
export function shouldShowReinstatement(status, code) {
  return status === 'Cancelled' && [12, 13, 14, 15].includes(code);
}

/**
 * Determine cancellation date to display
 * @param {object} summaryLedger
 * @param {string} [endDate]
 * @param {string} [cancelDate]
 * @returns {string}
 */
export function getCancellationDate(summaryLedger, policyStatus, endDate, cancelDate) {
  const { equityDate, status: { displayText } } = summaryLedger;

  if (displayText === 'Policy Expired' && endDate) {
    return moment.utc(endDate).format(STANDARD_DATE_FORMAT);
  }

  const isCanceled = getEntityDetailsDateLabel(displayText, policyStatus) === CANCELLATION_DATE;
  const isNonPaymentCancellation = isNonPaymentNotice(displayText, policyStatus);

  if (isNonPaymentCancellation && equityDate) {
    return moment.utc(equityDate).format(STANDARD_DATE_FORMAT);
  } else if (isCanceled && cancelDate) {
    return moment.utc(cancelDate).format(STANDARD_DATE_FORMAT);
  }

  return '';
}

/**
 * Determine final Payment date to display
 * @param {object} summaryLedger
 * @param {string} [endDate]
 * @param {string} [cancelDate]
 * @returns {string}
 */
export function getFinalPaymentDate(summaryLedger, policyStatus) {
  const { invoiceDueDate, status: { displayText } } = summaryLedger;

  const isNonPaymentCancellation = isNonPaymentNotice(displayText, policyStatus);

  if (isNonPaymentCancellation && invoiceDueDate) {
    return {
      date: moment.utc(invoiceDueDate).format(STANDARD_DATE_FORMAT),
      label: FINAL_PAYMENT_DATE
    };
  }
  return {};
}

export function getEntityDetailsDateLabel(billingStatus, policyStatus) {
  if (expirationPolicyStatuses.some(s => policyStatus.includes(s)) &&
    expirationBillingStatus.some(s => billingStatus.includes(s))) return EXPIRATION_DATE;
  else if (isNonPaymentNotice(billingStatus, policyStatus) ||
    (canceledPolicyStatuses.some(s => policyStatus.includes(s)) &&
    canceledBillingStatuses.some(s => billingStatus.includes(s)))) return CANCELLATION_DATE;
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
  return premium
    ? `$ ${normalize.numbers(premium)}`
    : '--';
}