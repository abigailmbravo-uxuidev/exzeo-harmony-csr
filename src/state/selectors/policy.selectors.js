import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';
import cloneDeep from 'lodash/cloneDeep';
import {applyAdditionalInterestRanking} from "../../utilities/additionalInterests";
import {DEFAULT_ADDITIONAL_INTERESTS_MAP} from "../../constants/additionalInterests";
import orderBy from "lodash/orderBy";

const getPolicy = state => state.policyState.policy;
const getPaymentOptions = state => state.policyState.paymentOptions;
const getPaymentHistory = state => state.policyState.paymentHistory;

export const getCashDescriptionOptions = createSelector(
  [getPaymentOptions],
  (paymentOptions) => {
    if (!paymentOptions) {
      return {}
    }

    return paymentOptions.reduce((optionMap, option) => {
      optionMap[option.paymentType] = option.paymentDescription.map(option => ({
        answer: option,
        label: option
      }));

      return optionMap;
    }, {})
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
    }))
  }
);

