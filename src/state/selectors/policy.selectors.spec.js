import { getCashDescriptionOptions, getCashTypeAnswers } from './policy.selectors';

describe('Testing getCashDescriptionOptions', () => {
  it('should test getCashDescriptionOptions', () => {
    const state = {
      service: {
        paymentOptions: [
          { paymentType: 'test', paymentDescription: [{}] }
        ]
      }
    };
    const result = getCashDescriptionOptions(state);
    const res = { test: [{ answer: {}, label: {} }] };
    expect(result).toEqual(res);
  });

  it('should test getCashDescriptionOptions with no payment Options', () => {
    const state = {
      service: {
        paymentOptions: null
      }
    };
    const result = getCashDescriptionOptions(state);
    expect(result).toEqual({});
  });
});

describe('Testing getCashTypeAnswers', () => {
  it('should test getCashTypeAnswers', () => {
    const state = {
      service: {
        paymentOptions: [
          { paymentType: 'test', paymentDescription: [{}] }
        ]
      }
    };
    const result = getCashTypeAnswers(state);
    const res = [{ answer: 'test', label: 'test' }];
    expect(result).toEqual(res);
  });

  it('should test getCashDescriptionOptions with no payment Options', () => {
    const state = {
      service: {
        paymentOptions: null
      }
    };
    const result = getCashTypeAnswers(state);
    expect(result).toEqual([]);
  });
});

