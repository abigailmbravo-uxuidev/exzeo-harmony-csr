import { normalizePhone } from './index';

describe('normalizePhone', () => {
  it('should handle empty string', () => {
    const result = normalizePhone('');
    expect(result);
  });

  it('should not throw on undefined input', () => {
    const fn = normalizePhone.bind(null, undefined);
    expect(fn).not.toThrow();
  });

  it('should format string into correct format for phone numbers', () => {
    const result = normalizePhone('1');
    expect(result).toEqual('1');

    const result2 = normalizePhone('12');
    expect(result2).toEqual('12');

    const result3 = normalizePhone('123');
    expect(result3).toEqual('123-');

    const result4 = normalizePhone('1234');
    expect(result4).toEqual('123-4');

    const result5 = normalizePhone('12345');
    expect(result5).toEqual('123-45');

    const result6 = normalizePhone('123456');
    expect(result6).toEqual('123-456-');

    const result7 = normalizePhone('123456789');
    expect(result7).toEqual('(123) 456-789');
  });
});
