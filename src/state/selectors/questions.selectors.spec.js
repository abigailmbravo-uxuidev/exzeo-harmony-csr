import { getTopAnswers, getListAnswers } from './questions.selectors';

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

    it('should return an empty array if it can\'t find mortgagee questions', () => {
      const state = {
        questions: {
          lists: {
            Agency_Addendum: {
              displayText: 'Addendum',
              code: 'Agency_Addendum',
              isActive: true,
              extendedProperties: {
                'TT 03 16': {
                  displayText: 'TT 03 16',
                  type: 'string',
                  isActive: true
                },
                'TT 02 18': {
                  displayText: 'TT 02 18',
                  type: 'string',
                  isActive: true
                },
                'HC REV 120115': {
                  displayText: 'HC REV 120115',
                  type: 'string',
                  isActive: true
                },
                'HC SAF PACS 05 18': {
                  displayText: 'HC SAF PACS 05 18',
                  type: 'string',
                  isActive: true
                }
              }
            }
          }
        }
      };
      const result = getListAnswers(state);
      expect(result).toEqual({
        Agency_Addendum: [
          { answer: 'TT 03 16', label: 'TT 03 16' },
          { answer: 'TT 02 18', label: 'TT 02 18' },
          { answer: 'HC REV 120115', label: 'HC REV 120115' },
          { answer: 'HC SAF PACS 05 18', label: 'HC SAF PACS 05 18' }
        ]
      });
    });
  });
});
