import { createSelector } from 'reselect';
import cloneDeep from 'lodash/cloneDeep';
import sortBy from 'lodash/sortBy';
import { emptyArray } from '@exzeo/core-ui';
import { formatDate, FORMATS } from '@exzeo/core-ui/src/Utilities/date';

import { applyAdditionalInterestRanking } from '../../utilities/additionalInterests';
import {
  ADDITIONAL_INTERESTS,
  DEFAULT_ADDITIONAL_INTERESTS_MAP
} from '../../constants/additionalInterests';
import { EDITING_ENABLED } from '../../constants/quoteState';

import { getQuote } from './entity.selectors';

export const getSortedAdditionalInterests = createSelector(
  [getQuote],
  quoteData => {
    if (!quoteData.additionalInterests) return emptyArray;

    const additionalInterests = cloneDeep(quoteData.additionalInterests);
    // mutate copy of additionalInterests from quote and add a rank value
    applyAdditionalInterestRanking(additionalInterests);

    return sortBy(additionalInterests, ['rank', 'order']);
  }
);

export const getGroupedAdditionalInterests = createSelector(
  [getQuote],
  quoteData => {
    if (!quoteData.additionalInterests) return DEFAULT_ADDITIONAL_INTERESTS_MAP;

    return quoteData.additionalInterests.reduce(
      (aiMap, ai) => {
        if (aiMap[ai.type]) {
          aiMap[ai.type].push(ai);
        }
        return aiMap;
      },
      {
        [ADDITIONAL_INTERESTS.mortgagee]: [],
        [ADDITIONAL_INTERESTS.premiumFinance]: [],
        [ADDITIONAL_INTERESTS.billPayer]: [],
        [ADDITIONAL_INTERESTS.additionalInterest]: [],
        [ADDITIONAL_INTERESTS.additionalInsured]: []
      }
    );
  }
);

export const getQuoteSelector = createSelector([getQuote], quoteData => {
  if (!quoteData || !quoteData.quoteNumber) return {};

  if (quoteData.policyHolders.length === 0) {
    quoteData.policyHolders.push({
      firstName: '',
      lastName: '',
      emailAddress: '',
      primaryPhoneNumber: '',
      order: 0,
      entityType: 'Person',
      electronicDelivery: false
    });
  }

  quoteData.sameAsPropertyAddress =
    quoteData.property.physicalAddress.address1 ===
      quoteData.policyHolderMailingAddress?.address1 &&
    quoteData.property.physicalAddress.address2 ===
      quoteData.policyHolderMailingAddress?.address2 &&
    quoteData.property.physicalAddress.city ===
      quoteData.policyHolderMailingAddress?.city &&
    quoteData.property.physicalAddress.state ===
      quoteData.policyHolderMailingAddress?.state &&
    quoteData.property.physicalAddress.zip ===
      quoteData.policyHolderMailingAddress?.zip;

  quoteData.effectiveDate = formatDate(
    quoteData.effectiveDate,
    FORMATS.SECONDARY
  );
  quoteData.removeSecondary = false;
  quoteData.blockSendApplication =
    quoteData.underwritingExceptions.filter(
      uw =>
        (uw.canOverride && !uw.overridden) ||
        (!uw.canOverride && !['Informational'].includes(uw.action))
    ).length > 0;
  quoteData.blockQuoteSummary =
    quoteData.underwritingExceptions.filter(
      uw =>
        !uw.overridden && !['Missing Info', 'Informational'].includes(uw.action)
    ).length > 0;

  quoteData.editingDisabled =
    EDITING_ENABLED.indexOf(quoteData.quoteState) === -1;

  if (quoteData.product === 'AF3') {
    quoteData.deductibles.personalPropertyDeductible.value =
      quoteData.deductibles.buildingDeductible.value;
    return quoteData;
  }

  if (quoteData.product === 'HO3') {
    return quoteData;
  }

  // just in case
  return quoteData;
});
