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

// export const getQuoteDataFromCgState = createSelector(
//   [getAppState, getCGState],
//   (appState, cgState) => {
//     const taskData = cgState[appState.modelName] && cgState[appState.modelName].data;
//
//     if (!taskData || !taskData.model || !taskData.model.variables) return {};
//
//     const preferredResult = taskData.model.variables.find(variable => variable.name === 'getQuoteBetweenPageLoop');
//     if (preferredResult && preferredResult.value && preferredResult.value.result) {
//       return preferredResult.value.result;
//     }
//
//     const backupResult = taskData.model.variables.find(variable => variable.name === 'retrieveQuote');
//     if (backupResult && backupResult.value && backupResult.value.result) {
//       return backupResult.value.result;
//     }
//
//     return {};
//   }
// );

// export const getQuoteForCreate = createSelector(
//   [getAppState, getCGState],
//   (appState, cgState) => {
//     const taskData = cgState[appState.modelName] && cgState[appState.modelName].data;

//     if (!taskData || !taskData.model || !taskData.model.variables) return {};

//     const preferredResult = taskData.model.variables.find(variable => variable.name === 'createQuote');
//     if (preferredResult && preferredResult.value && preferredResult.value.result) {
//       return preferredResult.value.result;
//     }

//     const backupResult = taskData.model.variables.find(variable => variable.name === 'retrieveQuote');
//     if (backupResult && backupResult.value && backupResult.value.result) {
//       return backupResult.value.result;
//     }

//     return {};
//   }
// );

export const getQuoteSelector = createSelector(
    [getQuote],
    (quoteData) => {
      if (!quoteData || !quoteData.quoteNumber) return {};
      quoteData.effectiveDate = formatDate(quoteData.effectiveDate, FORMATS.SECONDARY);

      if (quoteData.product === 'AF3') {
        return quoteData;
      }
      // // do some kind of transformation then it all works form here. Just a thought
      // quoteData.coverageLimits.otherStructures.value = Math.ceil((quoteData.coverageLimits.otherStructures.amount * 100) / quoteData.coverageLimits.dwelling.amount);
      // quoteData.coverageLimits.personalProperty.value = Math.ceil((quoteData.coverageLimits.personalProperty.amount * 100) / quoteData.coverageLimits.dwelling.amount);
      // quoteData.coverageLimits.lossOfUse.value = Math.ceil(((quoteData.coverageLimits.lossOfUse.amount * 100) / quoteData.coverageLimits.dwelling.amount));
      // quoteData.deductibles.hurricane.value = quoteData.deductibles.hurricane.amount;

      // if(!quoteData.deductibles.sinkhole) quoteData.deductibles.sinkhole = { amount: 0, value: 0 }
      // if(quoteData.policyHolders.length > 1 && !quoteData.policyHolders[1].secondaryPhoneNumber) delete quoteData.policyHolders[1].secondaryPhoneNumber
      // quoteData.sameAsPropertyAddress = ((quoteData.policyHolderMailingAddress || {}).address1 === (quoteData.property.physicalAddress || {}).address1);
      return quoteData;
    }
  );
