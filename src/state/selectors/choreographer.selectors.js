import { createSelector } from 'reselect';
import { formatDate, FORMATS } from '@exzeo/core-ui/src/Utilities/date';

export const getQuote = state => state.quoteState.quote || {};

export const getQuoteSelector = createSelector(
    [getQuote],
    (quoteData) => {
      if (!quoteData || !quoteData.quoteNumber) return {};
      quoteData.effectiveDate = formatDate(quoteData.effectiveDate, FORMATS.SECONDARY);
      
      if (quoteData.product === 'AF3') {
        return quoteData;
      }
      quoteData.removeSecondary = false;
      // do some kind of transformation then it all works form here. Just a thought
      quoteData.coverageLimits.otherStructures.value = Math.ceil((quoteData.coverageLimits.otherStructures.amount * 100) / quoteData.coverageLimits.dwelling.amount);
      quoteData.coverageLimits.personalProperty.value = Math.ceil((quoteData.coverageLimits.personalProperty.amount * 100) / quoteData.coverageLimits.dwelling.amount);
      quoteData.coverageLimits.lossOfUse.value = Math.ceil(((quoteData.coverageLimits.lossOfUse.amount * 100) / quoteData.coverageLimits.dwelling.amount));
      quoteData.deductibles.hurricane.value = quoteData.deductibles.hurricane.amount;
      
      if(!quoteData.deductibles.sinkhole) quoteData.deductibles.sinkhole = { amount: 0, value: 0 }
      if(quoteData.policyHolders.length > 1 && !quoteData.policyHolders[1].secondaryPhoneNumber) delete quoteData.policyHolders[1].secondaryPhoneNumber
      quoteData.sameAsPropertyAddress = ((quoteData.policyHolderMailingAddress || {}).address1 === (quoteData.property.physicalAddress || {}).address1);
      return quoteData;
    }
  );
