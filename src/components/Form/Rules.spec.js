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
      expect(rules.optionalEmail('something')).toEqual('Not a valid email address');
    });
  });
  describe('phone', () => {
    it('should return undefined for a valid phone', () => {
      expect(rules.phone('888-888-8888')).toBeUndefined();
    });
    it('should return "is not a valid Phone Number." on invalid phone', () => {
      expect(rules.phone('')).toEqual('is not a valid Phone Number.');
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
});
