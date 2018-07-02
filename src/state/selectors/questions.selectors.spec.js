import { getTopMortgageeAnswers } from './questions.selectors';

describe('Testing getTopMortgageeAnswers', () => {
  it('should test getTopMortgageeAnswers', () => {
    const state = {
      questions: [
        {
          mortgagee: true,
          answers: [{
            AIName1: 'test',
            AIAddress1: 'address',
            AICity: 'city',
            AIState: 'FL',
            AIZip: '435435'
          }]
        }
      ]
    };
    const result = getTopMortgageeAnswers(state);
    expect(result).toEqual([]);
  });
});
