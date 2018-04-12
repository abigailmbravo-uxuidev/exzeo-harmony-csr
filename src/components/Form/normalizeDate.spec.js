import normalizeDate from './normalizeDate';

describe('normalizeDate', () => {
  it('should normalizeDate', () => {
    const result2 = normalizeDate('1');
    expect(result2).toEqual('1');

    const result3 = normalizeDate('10');
    expect(result3).toEqual('10/');

    const result4 = normalizeDate('102');
    expect(result4).toEqual('10/2');

    const result5 = normalizeDate('1024');
    expect(result5).toEqual('10/24/');

    const result6 = normalizeDate('10242');
    expect(result6).toEqual('10/24/2');

    const result7 = normalizeDate('102420');
    expect(result7).toEqual('10/24/20');

    const result8 = normalizeDate('1024201');
    expect(result8).toEqual('10/24/201');

    const result9 = normalizeDate('10242017');
    expect(result9).toEqual('10/24/2017');
  });
});
