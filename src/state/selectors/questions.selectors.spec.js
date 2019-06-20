import {
  getTopAnswers,
  getListAnswers,
  getListAnswersAsKey
} from './questions.selectors';

describe('Test questions selectors', () => {
  describe('Test getTopAnswers', () => {
    it('should return an empty array if there are no questions', () => {
      const state = {};

      const answerFunc = getTopAnswers('mortgagee');
      const result = answerFunc(state);
      expect(result).toEqual([]);
    });

    it("should return an empty array if it can't find mortgagee questions", () => {
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
            answers: [
              {
                AIName1: 'test',
                AIAddress1: 'address',
                AICity: 'city',
                AIState: 'FL',
                AIZip: 435435
              }
            ]
          }
        }
      };

      const answerFunc = getTopAnswers('mortgagee');
      const result = answerFunc(state);
      expect(result.length).toEqual(1);
    });

    it('should return an getListAnswers', () => {
      const state = {
        questions: {
          lists: {
            US_States: [
              {
                displayText: 'Florida',
                key: 'FL',
                type: 'string',
                isActive: true
              },
              {
                displayText: 'Georgia',
                key: 'GA',
                type: 'string',
                isActive: true
              }
            ],
            Agency_Addendum: [
              {
                displayText: 'TT 03 16',
                key: 'TT 03 16',
                type: 'string',
                isActive: true
              },
              {
                displayText: 'TT 02 18',
                key: 'TT 02 18',
                type: 'string',
                isActive: true
              },
              {
                displayText: 'HC REV 120115',
                key: 'HC REV 120115',
                type: 'string',
                isActive: true
              },
              {
                displayText: 'HC SAF PACS 05 18',
                key: 'HC SAF PACS 05 18',
                type: 'string',
                isActive: true
              }
            ]
          }
        }
      };

      const result = getListAnswers(state);
      expect(result).toEqual({
        Agency_Addendum: [
          {
            answer: 'TT 03 16',
            label: 'TT 03 16'
          },
          {
            answer: 'TT 02 18',
            label: 'TT 02 18'
          },
          {
            answer: 'HC REV 120115',
            label: 'HC REV 120115'
          },
          {
            answer: 'HC SAF PACS 05 18',
            label: 'HC SAF PACS 05 18'
          }
        ],
        US_States: [
          {
            answer: 'FL',
            label: 'Florida'
          },
          {
            answer: 'GA',
            label: 'Georgia'
          }
        ]
      });
    });

    it('should return an getListAnswersAsKey', () => {
      const state = {
        questions: {
          lists: {
            US_States: [
              {
                displayText: 'Florida',
                key: 'FL',
                type: 'string',
                isActive: true
              },
              {
                displayText: 'Georgia',
                key: 'GA',
                type: 'string',
                isActive: true
              }
            ],
            Agency_Addendum: [
              {
                displayText: 'TT 03 16',
                key: 'TT 03 16',
                type: 'string',
                isActive: true
              },
              {
                displayText: 'TT 02 18',
                key: 'TT 02 18',
                type: 'string',
                isActive: true
              },
              {
                displayText: 'HC REV 120115',
                key: 'HC REV 120115',
                type: 'string',
                isActive: true
              },
              {
                displayText: 'HC SAF PACS 05 18',
                key: 'HC SAF PACS 05 18',
                type: 'string',
                isActive: true
              }
            ]
          }
        }
      };
      const result = getListAnswersAsKey(state);
      expect(result).toEqual({
        Agency_Addendum: [
          {
            answer: 'TT 03 16',
            label: 'TT 03 16'
          },
          {
            answer: 'TT 02 18',
            label: 'TT 02 18'
          },
          {
            answer: 'HC REV 120115',
            label: 'HC REV 120115'
          },
          {
            answer: 'HC SAF PACS 05 18',
            label: 'HC SAF PACS 05 18'
          }
        ],
        US_States: [
          {
            answer: 'FL',
            label: 'FL'
          },
          {
            answer: 'GA',
            label: 'GA'
          }
        ]
      });
    });
  });
});
