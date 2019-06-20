import rules, { combineRules } from './Rules';

describe('Rules', () => {
  describe('required', () => {
    it('should return undefined when value is not undefined', () => {
      expect(rules.required('test')).toBeUndefined();
    });
    it('should return "Field Required" if value is undefined', () => {
      expect(rules.required('')).toEqual('Field Required');
    });
  });
  describe('email', () => {
    it('should return undefined for a valid email', () => {
      expect(rules.email('something@mail.com')).toBeUndefined();
    });
    it('should return "Not a valid email address"', () => {
      expect(rules.email('something')).toEqual('Not a valid email address');
    });
  });
  describe('optionalEmail', () => {
    it('should return undefined for an empty field', () => {
      expect(rules.optionalEmail('')).toBeUndefined();
    });
    it('should return undefined for a valid email', () => {
      expect(rules.optionalEmail('something@mail.com')).toBeUndefined();
    });
    it('should return "Not a valid email address" for invalid email', () => {
      expect(rules.optionalEmail('something')).toEqual(
        'Not a valid email address'
      );
    });
  });
  describe('phone', () => {
    it('should return undefined for a valid phone', () => {
      expect(rules.phone('888-888-8888')).toBeUndefined();
    });
    it('should return "is not a valid Phone Number." on invalid phone', () => {
      expect(rules.phone('vcxvxcvxcv')).toEqual('is not a valid Phone Number.');
    });
  });
  describe('date', () => {
    it('should return undefined for a valid date', () => {
      expect(rules.date('2017-04-27')).toBeUndefined();
    });
    it('should return "is not a valid Date."', () => {
      expect(rules.date('')).toEqual('is not a valid Date.');
    });
  });

  describe('range', () => {
    it('should return undefined when value is not undefined', () => {
      const ruleArray = combineRules(['range'], { min: 100, max: 20000 });
      expect(ruleArray[0].length).toEqual(1);
    });
  });

  describe('minLength3', () => {
    it('should return undefined for min of 3', () => {
      expect(rules.minLength3('456')).toBeUndefined();
    });
    it('should return "is not a valid Date."', () => {
      expect(rules.minLength3('4')).toEqual(
        'Please enter at least 3 characters'
      );
    });
  });

  describe('onlyAlphaNumeric', () => {
    it('should return undefined for onlyAlphaNumeric', () => {
      expect(rules.onlyAlphaNumeric('456')).toBeUndefined();
    });
    it('should return Invalid characters', () => {
      expect(rules.onlyAlphaNumeric('4ds4&')).toEqual('Invalid characters');
    });
    it('should return undefined for onlyAlphaNumeric with a space', () => {
      expect(rules.onlyAlphaNumeric('Batman Robin')).toBeUndefined();
    });
  });

  describe('invalidCharacters', () => {
    it('should return undefined for invalidCharacters', () => {
      expect(rules.invalidCharacters('456')).toBeUndefined();
    });
    it('should return Invalid characters', () => {
      expect(rules.invalidCharacters('|/&')).toEqual('Invalid characters');
    });
  });

  describe('numberDashesOnly', () => {
    it('should return undefined for numberDashesOnly', () => {
      expect(rules.numberDashesOnly('456')).toBeUndefined();
    });
    it('should return Only numbers and dashes allowed', () => {
      expect(rules.numberDashesOnly('|/&')).toEqual(
        'Only numbers and dashes allowed'
      );
    });
  });

  describe('zipNumbersOnly', () => {
    it('should return undefined for zipNumbersOnly', () => {
      expect(rules.zipNumbersOnly('456')).toBeUndefined();
    });
    it('should return Not a valid zip code', () => {
      expect(rules.zipNumbersOnly('|/&')).toEqual('Not a valid zip code');
    });
  });

  describe('numbersOnly', () => {
    it('should return undefined for numbersOnly', () => {
      expect(rules.numbersOnly('543543456')).toBeUndefined();
    });
    it('should return Not a valid number', () => {
      expect(rules.numbersOnly('|/&')).toEqual('Not a valid number');
    });
  });

  describe('date', () => {
    it('should return undefined when value is not undefined', () => {
      const ruleArray = combineRules(['date'], {
        min: '12-12-2005',
        max: '12-12-2099'
      });
      expect(ruleArray[0].length).toEqual(1);
    });
  });

  describe('dateString', () => {
    it('should return undefined when value is not undefined', () => {
      const ruleArray = combineRules(['matchDateMin10'], {
        dateString: '20170802'
      });
      expect(ruleArray[0].length).toEqual(1);
    });
  });

  describe('dateCheck', () => {
    it('should return undefined when date is at least 08/01/2017', () => {
      expect(rules.dateCheck('2017-08-01')).toBeUndefined();
    });
    it('should return error when date is less than 08/01/2017', () => {
      expect(rules.dateCheck('2017-07-31')).toEqual(
        'Date must be at least 08/01/2017'
      );
    });
  });
});
