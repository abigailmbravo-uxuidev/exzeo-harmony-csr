import * as policySelectors from './policy.selectors';

describe('Test policy selectors', () => {
  describe('Test getCashDescriptionOptions', () => {
    it('should return an empty object when no payment options exist', () => {
      const state = {
        policyState: {
          paymentOptions: null
        }
      };
      const result = policySelectors.getCashDescriptionOptions(state);
      expect(result).toEqual({});
    });

    it('should return an array of formatted options', () => {
      const state = {
        policyState: {
          paymentOptions: [
            {
              paymentType: 'test',
              paymentDescription: ['test 1', 'test 2']
            }
          ]
        }
      };

      const expectedResult = {
        test: [
          { answer: 'test 1', label: 'test 1' },
          { answer: 'test 2', label: 'test 2' }
        ]
      };
      const result = policySelectors.getCashDescriptionOptions(state);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('Test getCashTypeAnswers', () => {
    it('should return an empty array when no payment options exist', () => {
      const state = {
        policyState: {
          paymentOptions: null
        }
      };
      const result = policySelectors.getCashTypeAnswers(state);
      expect(result).toEqual([]);
    });

    it('should test getCashTypeAnswers', () => {
      const state = {
        policyState: {
          paymentOptions: [
            {
              paymentType: 'test',
              paymentDescription: [{}]
            }
          ]
        }
      };
      const result = policySelectors.getCashTypeAnswers(state);
      const expectedResult = [{ answer: 'test', label: 'test' }];
      expect(result).toEqual(expectedResult);
    });
  });

  describe('Test getSortedAdditionalInterests', () => {
    it('should return an empty array if there is no policy', () => {
      const state = {
        policyState: {
          policy: { _id: '1234-5678' }
        }
      };

      const result = policySelectors.getSortedAdditionalInterests(state);
      expect(result).toEqual([]);
    });

    it('should return sorted additionalInterests', () => {
      const additionalInterest1 = {
        active: true,
        type: 'Additional Interest',
        order: 0
      };
      const additionalInterest2 = { active: true, type: 'Mortgagee', order: 2 };
      const additionalInterest3 = {
        active: false,
        type: 'Mortgagee',
        order: 1
      };
      const additionalInterest4 = { active: true, type: 'Mortgagee', order: 0 };
      const state = {
        policyState: {
          policy: {
            _id: '1234',
            additionalInterests: [
              { ...additionalInterest1 },
              { ...additionalInterest2 },
              { ...additionalInterest3 },
              { ...additionalInterest4 }
            ]
          }
        }
      };

      // Mortgagees should be first, Additional Interest after (rank: 3)
      const expectedResult = [
        { ...additionalInterest4, rank: 1, sortInactive: false },
        { ...additionalInterest2, rank: 1, sortInactive: false },
        { ...additionalInterest1, rank: 3, sortInactive: false },
        { ...additionalInterest3, rank: 1, sortInactive: true }
      ];

      const result = policySelectors.getSortedAdditionalInterests(state);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('Test getFormattedPaymentHistory', () => {
    it('should return an empty array if there is no paymentHistory', () => {
      const state = {
        policyState: {}
      };

      const result = policySelectors.getFormattedPaymentHistory(state);
      expect(result).toEqual([]);
    });

    it('should return paymentHistory ordered and formatted', () => {
      const state = {
        policyState: {
          paymentHistory: [
            {
              date: '01072017',
              createdAt: '125',
              amount: 2003
            },
            {
              date: '01072018',
              createdAt: '126',
              amount: 2003
            },
            {
              date: '01072018',
              createdAt: '123',
              amount: 2000
            }
          ]
        }
      };

      const expectedResult = [
        {
          date: '01072018',
          createdAt: '126',
          amount: 2003,
          amountDisplay: 2003
        },
        {
          date: '01072018',
          createdAt: '123',
          amount: 2000,
          amountDisplay: 2000
        },
        {
          date: '01072017',
          createdAt: '125',
          amount: 2003,
          amountDisplay: 2003
        }
      ];

      const result = policySelectors.getFormattedPaymentHistory(state);
      expect(result).toEqual(expectedResult);
    });
  });
});
