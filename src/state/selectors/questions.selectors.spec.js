import { getTopAnswers } from './questions.selectors';

describe('Test questions selectors', () => {
  describe('Test getTopAnswers', () => {
    it('should return an empty array if there are no questions', () => {
      const state = {};

      const answerFunc = getTopAnswers('mortgagee');
      const result = answerFunc(state);
      expect(result).toEqual([]);
    });


    it('should return an empty array if it can\'t find mortgagee questions', () => {
      const state = {
        questions: {}
      };
      const answerFunc = getTopAnswers('mortgagee');
      const result = answerFunc(state);
      expect(result).toEqual([]);
    });

    it('should test getTopAnswers', () => {
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

      const answerFunc = getTopAnswers('mortgagee');
      const result = answerFunc(state);
      expect(result.length).toEqual(1);
    });
  });
});
