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
