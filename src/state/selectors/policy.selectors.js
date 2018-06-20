import { createSelector } from 'reselect';

const getPaymentOptions = state => state.policyState.paymentOptions;

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
