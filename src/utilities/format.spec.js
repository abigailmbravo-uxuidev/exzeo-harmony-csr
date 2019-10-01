import * as format from './format';

describe('Test formatUrl', () => {
  it('should append http to URLs', () => {
    const result = format.formatUrl('google.com');
    expect(result).toEqual('http://google.com');
  });

  it('should keep https in th URL', () => {
    const result = format.formatUrl('https://google.com');
    expect(result).toEqual('https://google.com');
  });
});

describe('Test removeTerm', () => {
  it('should return the value if undefined', () => {
    const result = format.removeTerm(undefined);
    expect(result).toEqual(undefined);
  });

  it('should return the value if undefined', () => {
    const result = format.removeTerm();
    expect(result).toEqual(undefined);
  });

  it('should return the value if 0', () => {
    const result = format.removeTerm(0);
    expect(result).toEqual(0);
  });

  it('should return the value if null', () => {
    const result = format.removeTerm(null);
    expect(result).toEqual(null);
  });

  it('should return the value if empty string', () => {
    const result = format.removeTerm('');
    expect(result).toEqual('');
  });

  it('should remove the term from the number 12-1005269-01', () => {
    const result = format.removeTerm('12-1005269-01');
    expect(result).toEqual('12-1005269');
  });

  it('should remove the term from the number 12-1005269-02', () => {
    const result = format.removeTerm('12-1005269-02');
    expect(result).toEqual('12-1005269');
  });

  it('should remove the term from the number TTIC-AF3-1234', () => {
    const result = format.removeTerm('TTIC-AF3-1234-01');
    expect(result).toEqual('TTIC-AF3-1234');
  });
});
