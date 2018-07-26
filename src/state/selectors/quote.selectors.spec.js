import { checkQuoteState } from './quote.selectors';
import { DISABLED_AI_STATES } from '../../constants/additionalInterests';

describe('Test Quote selectors', () => {
  describe('checkQuoteState', () => {

    it('should return an empty array when there are no agencies', () => {
      const state = {
        service: {
          quote: {
            quoteState: DISABLED_AI_STATES[0]
          }
        }
      };

      const result = checkQuoteState(state);
      expect(result).toBeTruthy();

    });
  });

});
