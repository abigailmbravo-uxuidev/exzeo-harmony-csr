import { createSelector } from 'reselect';
import { normalize } from '@exzeo/core-ui/lib/InputLifecycle/index';
import moment from 'moment-timezone';

const defaultObject = {};

const getPolicy = state => state.policyState.policy;
const getSummaryLedger = state => state.policyState.summaryLedger;
const getQuote = state => state.service.quote || defaultObject;

const getProductName = product => (product === 'HO3' ? `${product} Homeowners` : product);

const defaultEntity = {
  details: {},
  policyHolder: {},
  mailingAddress: {},
  propertyAddress: {},
  property: {},
  premium: {},
  cancellation: {}
};
export const getPolicyDetails = createSelector(
  [getPolicy, getSummaryLedger],
  (policy, summaryLedger) => {
    if (!policy || !policy.policyNumber) return defaultEntity;
    const {
      product, policyNumber, status, policyHolders, policyHolderMailingAddress, property,
      sourceNumber, effectiveDate, endDate, cancelDate
    } = policy;
    const { nonPaymentNoticeDueDate, currentPremium, status: { displayText, code } } = summaryLedger;
    const primaryPolicyHolder = policyHolders[0];
    const {
      physicalAddress, territory, constructionType
    } = property;

    let cancellationDate = '';

    const billingStatusCode = code || null;

    if (policy && status && (status.includes('Pending') || status.includes('Cancel') || billingStatusCode > 8) && summaryLedger) {
      cancellationDate = cancelDate
        ? moment.utc(cancelDate).format('MM/DD/YYYY')
        : moment.utc(nonPaymentNoticeDueDate).format('MM/DD/YYYY');
    }
    if (policy && endDate && billingStatusCode === 99) {
      cancellationDate = moment.utc(endDate).format('MM/DD/YYYY');
    }
    const showReinstatement = status === 'Cancelled' && [12, 13, 14, 15].includes(billingStatusCode);

    return {
      details: {
        product: getProductName(product),
        entityNumber: policyNumber,
        status: `${status} / ${displayText}`
      },
      policyHolder: {
        firstName: primaryPolicyHolder.firstName,
        lastName: primaryPolicyHolder.lastName,
        primaryPhoneNumber: normalize.phone(primaryPolicyHolder.primaryPhoneNumber)
      },
      mailingAddress: {
        ...policyHolderMailingAddress
      },
      propertyAddress: {
        ...physicalAddress
      },
      property: {
        territory,
        constructionType,
        sourceNumber
      },
      premium: {
        currentPremium
      },
      cancellation: {
        cancellationDate,
        showReinstatement
      },
      effectiveDate: moment.utc(effectiveDate).format('MM/DD/YYYY')
    };
  }
);

export const getQuoteDetails = createSelector(
  [getQuote],
  (quote) => {
    if (!quote || !quote.quoteNumber) return defaultEntity;
    const {
      product, quoteNumber, quoteState, policyHolders, policyHolderMailingAddress, property, effectiveDate, rating
    } = quote;
    const primaryPolicyHolder = policyHolders[0];
    const {
      physicalAddress, territory, constructionType
    } = property;
    const currentPremium = (rating && rating.totalPremium) ?
      rating.totalPremium.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '--';

    return {
      details: {
        product: getProductName(product),
        entityNumber: quoteNumber,
        status: quoteState
      },
      policyHolder: {
        firstName: primaryPolicyHolder.firstName,
        lastName: primaryPolicyHolder.lastName,
        primaryPhoneNumber: normalize.phone(primaryPolicyHolder.primaryPhoneNumber)
      },
      mailingAddress: {
        ...policyHolderMailingAddress
      },
      propertyAddress: {
        ...physicalAddress
      },
      property: {
        territory,
        constructionType
      },
      premium: {
        currentPremium
      },
      effectiveDate: moment.utc(effectiveDate).format('MM/DD/YYYY')
    };
  }
);
export default { getPolicyDetails };

