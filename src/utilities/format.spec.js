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
