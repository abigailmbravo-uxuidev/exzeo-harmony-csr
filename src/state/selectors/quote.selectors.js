import { createSelector } from 'reselect';
import cloneDeep from 'lodash/cloneDeep';
import sortBy from 'lodash/sortBy';
import { emptyArray } from '@exzeo/core-ui';
import { formatDate, FORMATS } from '@exzeo/core-ui/src/Utilities/date';

import { applyAdditionalInterestRanking } from '../../utilities/additionalInterests';
import {
  ADDITIONAL_INTERESTS,
  DEFAULT_ADDITIONAL_INTERESTS_MAP,
} from '../../constants/additionalInterests';
import { CAN_QUOTE_STATES } from '../../constants/quoteState';

import { getQuote } from './entity.selectors';

export const getSortedAdditionalInterests = createSelector(
  [getQuote],
  (quoteData) => {
    if (!quoteData.additionalInterests) return emptyArray;

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
      if (aiMap[ai.type]) {
        aiMap[ai.type].push(ai);
      }
      return aiMap;
    }, {
      [ADDITIONAL_INTERESTS.mortgagee]: [],
      [ADDITIONAL_INTERESTS.premiumFinance]: [],
      [ADDITIONAL_INTERESTS.billPayer]: [],
      [ADDITIONAL_INTERESTS.additionalInterest]: [],
      [ADDITIONAL_INTERESTS.additionalInsured]: []
    });
  }
);

export const blockQuote = createSelector(
  [getQuote],
  (quoteData) => {
    return !CAN_QUOTE_STATES.some(state => state === quoteData.quoteState);
  }
);

export const getQuoteSelector = createSelector(
    [getQuote],
    (quoteData) => {
      if (!quoteData || !quoteData.quoteNumber) return {};

      quoteData.effectiveDate = formatDate(quoteData.effectiveDate, FORMATS.SECONDARY);
      quoteData.removeSecondary = false;

      if (quoteData.product === 'AF3') {
        return quoteData;
      }

      if (quoteData.product === 'HO3') {
        return quoteData;
      }

      // just in case
      return quoteData;
    }
  );


  export const getGroupedUnderwritingExceptions = createSelector(
    [getQuote],
    (quoteData) => {
      if (!quoteData || !Array.isArray(quoteData.underwritingExceptions)) return [];

      return quoteData.underwritingExceptions.reduce((data, exception) => {
        if (exception.action === 'Missing Info') {
          return {
            ...data,
            warnings: [...data.warnings, exception]
          };
        }
        return exception.canOverride ?
          ({ ...data, overridableExceptions: [...data.overridableExceptions, exception] }) :
          ({ ...data, nonOverridableExceptions: [...data.nonOverridableExceptions, exception] });
      }, { warnings: [], overridableExceptions: [], nonOverridableExceptions: [] });
    }
  );

  export const getUnderwritingInitialValues = createSelector(
    [getQuote],
    (quoteData) => {
      const values = {};
      if (!quoteData) return values;

      const underwritingExceptions = quoteData && quoteData.underwritingExceptions ? quoteData.underwritingExceptions : [];
      
      for (let i = 0; i < underwritingExceptions.length; i += 1) {
        const uwException = underwritingExceptions[i];
        if (uwException.canOverride) {
          values[uwException._id] = uwException.overridden;
        }
      }
      return values;
    }
  );
