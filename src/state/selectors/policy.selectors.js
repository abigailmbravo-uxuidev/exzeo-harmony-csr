import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';
import cloneDeep from 'lodash/cloneDeep';
import orderBy from 'lodash/orderBy';

import { applyAdditionalInterestRanking } from '../../utilities/additionalInterests';

import { getPaymentHistory, getPaymentOptions, getPolicy } from './entity.selectors';

export const getCashDescriptionOptions = createSelector(
  [getPaymentOptions],
  (paymentOptions) => {
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
  (paymentOptions) => {
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
  (policy) => {
    if (!policy.additionalInterests) return defaultArr;

    const additionalInterests = cloneDeep(policy.additionalInterests);

    applyAdditionalInterestRanking(additionalInterests, true);

    return sortBy(additionalInterests, ['sortInactive', 'rank', 'order']);
  }
);

export const getFormattedPaymentHistory = createSelector(
  [getPaymentHistory],
  (paymentHistory) => {
    if (!Array.isArray(paymentHistory) || !paymentHistory.length) return defaultArr;

    const orderedPaymentHistory = orderBy(paymentHistory, ['date', 'createdAt'], ['desc', 'desc']);
    return orderedPaymentHistory.map(payment => ({
      ...payment,
      amountDisplay: payment.amount.$numberDecimal
    }));
  }
);

