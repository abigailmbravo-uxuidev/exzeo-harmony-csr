import normalizeNumbers from './normalizeNumbers';

describe('normalizeNumbers', () => {
  it('should normalizeNumbers', () => {
    const result2 = normalizeNumbers('1000');
    expect(result2).toEqual('1,000');

    const result3 = normalizeNumbers('100000');
    expect(result3).toEqual('100,000');

    const result4 = normalizeNumbers('100000');
    expect(result4).toEqual('100,000');

    const result5 = normalizeNumbers('1,100,000');
    expect(result5).toEqual('1,100,000');

    const result6 = normalizeNumbers('15559');
    expect(result6).toEqual('15,559');
  });
});
