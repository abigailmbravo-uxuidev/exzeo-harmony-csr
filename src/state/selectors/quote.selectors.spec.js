import { getQuoteSelector } from './quote.selectors';
import { quote } from '../../test-utils';

describe('Test Quote Selectors', () => {
  describe('getQuoteSelector', () => {
    it('Should return empty with no quoteData', () => {
      const state = {
        quoteState: {}
      };
      const result = getQuoteSelector(state);
      expect(result).toEqual({});
    });

    it('Should return empty with no quoteNumber', () => {
      const state = { quoteState: { quote: { quoteNumber: undefined } } };
      const result = getQuoteSelector(state);
      expect(result).toEqual({});
    });

    it('Confirms all custom fields', () => {
      const state = {
        quoteState: {
          quote: {
            ...quote,
            quoteState: 'Quote Declined',
            effectiveDate: '2001-01-10T14:30Z',
            underwritingExceptions: [
              { overridden: false, action: 'Missing Info' }
            ]
          }
        }
      };
      const {
        editingDisabled,
        effectiveDate,
        removeSecondary,
        hasActiveExceptions,
        hasUWError
      } = getQuoteSelector(state);
      expect(editingDisabled).toEqual(true);
      expect(effectiveDate).toEqual('2001-01-10');
      expect(removeSecondary).toEqual(false);
      expect(hasActiveExceptions).toEqual(true);
      expect(hasUWError).toEqual(false);
    });

    it('Confirms UW Exceptions filters Missing Info', () => {
      const state = {
        quoteState: {
          quote: {
            ...quote,
            underwritingExceptions: [
              {
                canOverride: false,
                overridden: false,
                actions: 'Not Missing Info'
              }
            ]
          }
        }
      };
      const { hasUWError } = getQuoteSelector(state);
      expect(hasUWError).toEqual(true);
    });

    it('Confirms hasActiveExceptions & UW Exception filters overriden', () => {
      const state = {
        quoteState: {
          quote: {
            ...quote,
            underwritingExceptions: [
              { canOverride: true, overridden: true, actions: 'Missing Info' }
            ]
          }
        }
      };
      const { hasUWError, hasActiveExceptions } = getQuoteSelector(state);
      expect(hasUWError).toEqual(false);
      expect(hasActiveExceptions).toEqual(false);
    });
  });
});
