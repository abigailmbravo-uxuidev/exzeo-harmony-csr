import { createSelector } from 'reselect';
import { normalize } from '@exzeo/core-ui/lib/InputLifecycle/index';


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
      product, policyNumber, status, policyHolders, policyHolderMailingAddress, property
    } = policy;
    const { status: { displayText } } = summaryLedger;
    const primaryPolicyHolder = policyHolders[0];
    const { physicalAddress, territory } = property;
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
        territory
      },
      premium: {}
    };
  }
);

export default { getPolicyDetails };

