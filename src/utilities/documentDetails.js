import { date, normalize } from '@exzeo/core-ui';

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
 * @returns {object}
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
      value: date.formatDate(cancelDate, date.FORMATS.PRIMARY),
      label: 'Cancellation Date',
      showReinstatement: true
    };
  } else if (
    policyStatus === 'Pending Voluntary Cancellation' &&
    pendingBillingStatuses.includes(billingStatus) &&
    cancelDate
  ) {
    return {
      value: date.formatDate(cancelDate, date.FORMATS.PRIMARY),
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
      value: date.formatDate(cancelDate, date.FORMATS.PRIMARY),
      label: 'UW Cancellation Date',
      showRescindCancel: true
    };
  } else if (
    expirationPolicyStatuses.includes(policyStatus) &&
    expirationBillingStatuses.includes(billingStatus) &&
    endDate
  ) {
    return {
      value: date.formatDate(endDate, date.FORMATS.PRIMARY),
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
    equityDate,
    status: { displayText: billingStatus }
  } = summaryLedger;

  const isNonPaymentCancellation = isNonPaymentNotice(
    billingStatus,
    policyStatus
  );

  if (isNonPaymentCancellation && equityDate) {
    return date.formatDate(equityDate, date.FORMATS.PRIMARY);
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
    return date.formatDate(nonPaymentNoticeDueDate, date.FORMATS.PRIMARY);
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
    displayName: `${primaryPolicyHolder.firstName ||
      ''} ${primaryPolicyHolder.lastName || ''}`,
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
