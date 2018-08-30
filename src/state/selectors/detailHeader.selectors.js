import { createSelector } from 'reselect';
import { normalize } from '@exzeo/core-ui/lib/InputLifecycle/index';
import moment from 'moment-timezone';

const getPolicy = state => state.policyState.policy;
const getSummaryLedger = state => state.policyState.summaryLedger;

const defaultObj = {
  details: {},
  policyHolder: {},
  mailingAddress: {},
  propertyAddress: {},
  property: {},
  premium: {}
};
export const getPolicyDetails = createSelector(
  [getPolicy, getSummaryLedger],
  (policy, summaryLedger) => {
    if (!policy || !policy.policyNumber) return defaultObj;
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
        product: product === 'HO3' ? `${product} Homeowners` : product,
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
      premium: {},
      effectiveDate: moment.utc(effectiveDate).format('MM/DD/YYYY'),
      cancellationDate,
      showReinstatement,
      currentPremium
    };
  }
);

export default { getPolicyDetails };

