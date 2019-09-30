import { removeTerm } from './utilities';

describe('Test removeTerm', () => {
  it('should return the value if undefined', () => {
    const result = removeTerm(undefined);
    expect(result).toEqual(undefined);
  });

  it('should return the value if undefined', () => {
    const result = removeTerm();
    expect(result).toEqual(undefined);
  });

  it('should return the value if 0', () => {
    const result = removeTerm(0);
    expect(result).toEqual(0);
  });

  it('should return the value if null', () => {
    const result = removeTerm(null);
    expect(result).toEqual(null);
  });

  it('should return the value if empty string', () => {
    const result = removeTerm('');
    expect(result).toEqual('');
  });

  it('should remove the term from the number 12-1005269-01', () => {
    const result = removeTerm('12-1005269-01');
    expect(result).toEqual('12-1005269');
  });

  it('should remove the term from the number 12-1005269-02', () => {
    const result = removeTerm('12-1005269-02');
    expect(result).toEqual('12-1005269');
  });

  it('should remove the term from the number TTIC-AF3-1234', () => {
    const result = removeTerm('TTIC-AF3-1234-01');
    expect(result).toEqual('TTIC-AF3-1234');
  });
});
