import { getTopMortgageeAnswers } from './questions.selectors';

describe('Test questions selectors', () => {
  describe('Test getTopMortgageeAnswers', () => {
    it('should return an empty array if there are no questions', () => {
      const state = {};

      const result = getTopMortgageeAnswers(state);
      expect(result).toEqual([]);
    });


    it('should return an empty array if it can\'t find mortgagee questions', () => {
      const state = {
        questions: {}
      };

      const result = getTopMortgageeAnswers(state);
      expect(result).toEqual([]);
    });

    it('should test getTopMortgageeAnswers', () => {
      const state = {
        questions: {
            mortgagee: {
              answers: [{
                AIName1: 'test',
                AIAddress1: 'address',
                AICity: 'city',
                AIState: 'FL',
                AIZip: 435435
              }]
            }
          }
      };

      const result = getTopMortgageeAnswers(state);
      expect(result.length).toEqual(1);
    });

  });
});
