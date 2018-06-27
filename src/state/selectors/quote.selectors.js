import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';
import { DEFAULT_ADDITIONAL_INTERESTS_MAP, DISABLED_AI_STATES } from "../../constants/quote";

const defaultObject = {};
const getQuote = state => state.service.quote || defaultObject;

export const getSortedAdditionalInterests = createSelector(
  [getQuote],
  (quoteData) => {
    if (!quoteData.additionalInterests) return [];

    return sortBy(quoteData.additionalInterests, ['rank', 'order']);
  }
);

export const getGroupedAdditionalInterests = createSelector(
  [getQuote],
  (quoteData) => {
    if (!quoteData.additionalInterests) return DEFAULT_ADDITIONAL_INTERESTS_MAP;

    return quoteData.additionalInterests.reduce((aiMap, ai) => {
      aiMap[ai.type].push(ai);
      return aiMap
    }, DEFAULT_ADDITIONAL_INTERESTS_MAP)
  }
);

export const checkQuoteState = createSelector(
  [getQuote],
  (quoteData) => {
    return DISABLED_AI_STATES.some(state => state === quoteData.quoteState);
  }
);
