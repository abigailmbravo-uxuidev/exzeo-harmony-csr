import { createSelector } from 'reselect';
import { normalize } from '@exzeo/core-ui/lib/InputLifecycle/index';
import moment from 'moment-timezone';

const baseMapUri = 'https://www.google.com/maps/search/?api=1&query=';
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
      cancelDate,
      effectiveDate,
      endDate,
      policyHolders,
      policyHolderMailingAddress: pHMA,
      policyNumber,
      product,
      property,
      sourceNumber,
      status
    } = policy;
    const {
      nonPaymentNoticeDueDate,
      currentPremium,
      status: { displayText, code }
    } = summaryLedger;

    const primaryPolicyHolder = policyHolders[0];

    const {
      constructionType,
      physicalAddress,
      territory
    } = property;

    const mapQuery = encodeURIComponent(`${physicalAddress.address1} ${physicalAddress.address2} ${physicalAddress.city}, ${physicalAddress.state} ${physicalAddress.zip}`);

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
        displayName: `${primaryPolicyHolder.firstName} ${primaryPolicyHolder.lastName}`,
        primaryPhoneNumber: normalize.phone(primaryPolicyHolder.primaryPhoneNumber)
      },
      mailingAddress: {
        address1: pHMA.address1,
        address2: pHMA.address2,
        csz: `${pHMA.city}, ${pHMA.state} ${pHMA.zip}`
      },
      propertyAddress: {
        address1: physicalAddress.address1,
        address2: physicalAddress.address2,
        csz: `${physicalAddress.city}, ${physicalAddress.state} ${physicalAddress.zip}`,
      },
      mapURI: `${baseMapUri}${mapQuery}`,
      property: {
        territory,
        constructionType,
        sourceNumber
      },
      premium: {
        currentPremium: normalize.numbers(currentPremium)
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
      product,
      quoteNumber,
      quoteState,
      policyHolders,
      policyHolderMailingAddress: pHMA,
      property,
      effectiveDate,
      rating
    } = quote;
    const primaryPolicyHolder = policyHolders[0];

    const {
      constructionType,
      physicalAddress,
      territory
    } = property;

    const currentPremium = (rating && rating.totalPremium) ?
      normalize.numbers(rating.totalPremium) : '--';

    const mapQuery = encodeURIComponent(`${physicalAddress.address1} ${physicalAddress.address2} ${physicalAddress.city}, ${physicalAddress.state} ${physicalAddress.zip}`);

    return {
      details: {
        product: getProductName(product),
        entityNumber: quoteNumber,
        status: quoteState
      },
      policyHolder: {
        displayName: `${primaryPolicyHolder.firstName} ${primaryPolicyHolder.lastName}`,
        primaryPhoneNumber: normalize.phone(primaryPolicyHolder.primaryPhoneNumber)
      },
      mailingAddress: {
        address1: pHMA.address1,
        address2: pHMA.address2,
        csz: `${pHMA.city}, ${pHMA.state} ${pHMA.zip}`
      },
      propertyAddress: {
        address1: physicalAddress.address1,
        address2: physicalAddress.address2,
        csz: `${physicalAddress.city}, ${physicalAddress.state} ${physicalAddress.zip}`,
        mapURI: `${baseMapUri}${mapQuery}`
      },
      county: physicalAddress.county,
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

