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

  describe('Test getQuoteDataFromCgState', () => {
    it('Should return an empty object if there is no quote in state', () => {
      const state = {
        appState: {
          modelName: ''
        },
        cg: {}
      };

      const result = quoteSelectors.getQuoteDataFromCgState(state);
      expect(result).toEqual({});

    });

    it('Should check for quote in multiple places in model', () => {
      const quoteData = { _id: '1357' };
      const state = {
        appState: {
          modelName: 'test'
        },
        cg: {
          'test': { data: { model: { variables: [{ name: 'retrieveQuote', value: { result: quoteData } }] } } }
        }
      };

      const result = quoteSelectors.getQuoteDataFromCgState(state);
      expect(result).toEqual(quoteData)

    });
  })
});
