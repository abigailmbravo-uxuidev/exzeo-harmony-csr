import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';
import cloneDeep from 'lodash/cloneDeep';
import { applyAdditionalInterestRanking } from "../../utilities/additionalInterests";
import { ADDITIONAL_INTERESTS, DEFAULT_ADDITIONAL_INTERESTS_MAP, DISABLED_AI_STATES } from "../../constants/additionalInterests";

const defaultObject = {};
const defaultArr = [];
const getQuote = state => state.service.quote || defaultObject;

export const getSortedAdditionalInterests = createSelector(
  [getQuote],
  (quoteData) => {
    if (!quoteData.additionalInterests) return defaultArr;

    const additionalInterests = cloneDeep(quoteData.additionalInterests);
    // mutate copy of additionalInterests from quote and add a rank value
    applyAdditionalInterestRanking(additionalInterests);

    return sortBy(additionalInterests, ['rank', 'order']);
  }
);

export const getGroupedAdditionalInterests = createSelector(
  [getQuote],
  (quoteData) => {
    if (!quoteData.additionalInterests) return DEFAULT_ADDITIONAL_INTERESTS_MAP;

    return quoteData.additionalInterests.reduce((aiMap, ai) => {
      aiMap[ai.type].push(ai);
      return aiMap;
    }, {
      [ADDITIONAL_INTERESTS.mortgagee]: [],
      [ADDITIONAL_INTERESTS.premiumFinance]: [],
      [ADDITIONAL_INTERESTS.billPayer]: [],
      [ADDITIONAL_INTERESTS.additionalInterest]: [],
      [ADDITIONAL_INTERESTS.additionalInsured]: []
    })
  }
);

export const checkQuoteState = createSelector(
  [getQuote],
  (quoteData) => {
    return DISABLED_AI_STATES.some(state => state === quoteData.quoteState);
  }
);
