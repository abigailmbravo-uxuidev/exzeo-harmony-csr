import * as quoteSelectors from './quote.selectors';


describe('Test quote selectors', () => {
  describe('Test blockQuote', () => {
    it('Should return true if quoteState is not a valid state to quote', () => {
      const state = {
        quoteState: {
          quote: { status: 'Policy Issued' }
        }
      };

      const result = quoteSelectors.blockQuote(state);
      expect(result).toBeTruthy();
    });

    it('Should return false if quoteState does not match a disabled enum', () => {
      const state = {
        quoteState: {
          quote: {}
        },
        service: {
          quote: { quoteState: 'Quote Started' }
        }
      };

      const result = quoteSelectors.blockQuote(state);
      expect(result).toBeFalsy();
    });

  });
});
