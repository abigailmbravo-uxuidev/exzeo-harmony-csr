import * as quoteSelectors from './quote.selectors';


describe('Test quote selectors', () => {
  describe('Test checkQuoteState', () => {
    it('Should return true if quoteState matches a disabled enum', () => {
      const state = {
        quoteState: {
          quote: { status: 'Policy Issued' }
        }
      };

      const result = quoteSelectors.checkQuoteState(state);
      expect(result).toBeTruthy();
    });

    it('Should return false if quoteState does not match a disabled enum', () => {
      const state = {
        quoteState: {
          quote: {}
        },
        service: {
          quote: { quoteState: 'Testing' }
        }
      };

      const result = quoteSelectors.checkQuoteState(state);
      expect(result).toBeFalsy();
    });

  });
});
