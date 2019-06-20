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
import { EDITING_ENABLED } from '../../constants/quoteState';

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

export const getQuoteSelector = createSelector(
    [getQuote],
    (quoteData) => {
      if (!quoteData || !quoteData.quoteNumber) return {};

      quoteData.effectiveDate = formatDate(quoteData.effectiveDate, FORMATS.SECONDARY);
      quoteData.removeSecondary = false;
      quoteData.hasActiveExceptions = quoteData.underwritingExceptions.filter(uw => !uw.overridden).length > 0;
      quoteData.hasUWError = quoteData.underwritingExceptions.filter(uw =>
        !uw.overridden && uw.action !== 'Missing Info'
      ).length > 0;

      quoteData.editingDisabled = EDITING_ENABLED.indexOf(quoteData.quoteState) === -1;

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
