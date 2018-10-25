import moment from 'moment-timezone';

import { STANDARD_DATE_FORMAT } from '../constants/dates';
import { normalize } from '@exzeo/core-ui/lib';

const cancellationStatuses = ['Pending', 'Cancel'];
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
export function getCancellationDate(summaryLedger, endDate, cancelDate) {
  const { code: billingStatusCode, nonPaymentNoticeDueDate, status } = summaryLedger;

  if (endDate && billingStatusCode === 99) {
    return moment.utc(endDate).format(STANDARD_DATE_FORMAT);
  }

  if (Array.isArray(status) && (billingStatusCode > 8 || cancellationStatuses.some(s => status.includes(s)))) {
    return cancelDate
      ? moment.utc(cancelDate).format(STANDARD_DATE_FORMAT)
      : nonPaymentNoticeDueDate
        ? moment.utc(nonPaymentNoticeDueDate).format(STANDARD_DATE_FORMAT)
        : '';
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
