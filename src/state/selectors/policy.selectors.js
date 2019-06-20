import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';
import cloneDeep from 'lodash/cloneDeep';
import orderBy from 'lodash/orderBy';

import { applyAdditionalInterestRanking } from '../../utilities/additionalInterests';

import {
  getPaymentHistory,
  getPaymentOptions,
  getPolicy,
  getAgencyPolicies
} from './entity.selectors';
import { formattedDate } from '@exzeo/core-ui/src/Utilities';

export const getCashDescriptionOptions = createSelector(
  [getPaymentOptions],
  paymentOptions => {
    if (!paymentOptions) {
      return {};
    }

    return paymentOptions.reduce((optionMap, option) => {
      optionMap[option.paymentType] = option.paymentDescription.map(option => ({
        answer: option,
        label: option
      }));

      return optionMap;
    }, {});
  }
);

export const getCashTypeAnswers = createSelector(
  [getPaymentOptions],
  paymentOptions => {
    if (!paymentOptions) {
      return [];
    }

    return paymentOptions.map(option => ({
      answer: option.paymentType,
      label: option.paymentType
    }));
  }
);

const defaultArr = [];
export const getSortedAdditionalInterests = createSelector(
  [getPolicy],
  policy => {
    if (!policy.additionalInterests) return defaultArr;

    const additionalInterests = cloneDeep(policy.additionalInterests);

    applyAdditionalInterestRanking(additionalInterests, true);

    return sortBy(additionalInterests, ['sortInactive', 'rank', 'order']);
  }
);

export const getFormattedPaymentHistory = createSelector(
  [getPaymentHistory],
  paymentHistory => {
    if (!Array.isArray(paymentHistory) || !paymentHistory.length)
      return defaultArr;

    const orderedPaymentHistory = orderBy(
      paymentHistory,
      ['date', 'createdAt'],
      ['desc', 'desc']
    );
    return orderedPaymentHistory.map(payment => ({
      ...payment,
      amountDisplay: payment.amount.$numberDecimal
    }));
  }
);

export const getPoliciesByAgencyCode = createSelector(
  [getAgencyPolicies],
  policies => {
    if (!Array.isArray(policies) || !policies.length) return defaultArr;

    return policies.map(p => {
      const {
        policyHolders,
        property: {
          physicalAddress: { address1, address2, state, city, zip }
        }
      } = p;
      return {
        policyNumber: p.policyNumber,
        companyCode: p.companyCode,
        state: p.state,
        product: p.product,
        propertyAddress: `${address1}, ${
          address2 ? `${address2},` : ''
        } ${city}, ${state} ${zip}`,
        policyHolder1: `${policyHolders[0].firstName} ${policyHolders[0].lastName}`,
        effectiveDate: formattedDate(p.effectiveDate),
        policyVersion: p.policyVersion,
        agencyCode: p.agencyCode,
        agentCode: p.agentCode
      };
    });
  }
);

export const getPolicyNumberList = createSelector(
  [getAgencyPolicies],
  policies => {
    if (!Array.isArray(policies) || !policies.length) return defaultArr;
    return policies.map(p => {
      return { answer: p.policyNumber, label: p.policyNumber };
    });
  }
);
