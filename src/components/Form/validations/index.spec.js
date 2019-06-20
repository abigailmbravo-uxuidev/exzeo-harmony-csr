import React from 'react';
import { shallow } from 'enzyme';
import {
  matchDateMin,
  requireField,
  zipNumbersOnly,
  phone,
  range
} from './index';

describe('matchDate', () => {
  it('should match the Date but throw validation error wiuth 8 characters', () => {
    expect(
      matchDateMin(9)(
        '20180430',
        { testName: '20180430' },
        'testName',
        'YYYYMMDD'
      )
    ).toEqual('Field must match date and be at least 9 characters');
  });
  it('should match the Date and return valid with minimum 9', () => {
    expect(
      matchDateMin(9)(
        '2018043000',
        { testName: '20180430' },
        'testName',
        'YYYYMMDD'
      )
    ).toEqual(undefined);
  });
});

describe('requireField', () => {
  it('should pass validation', () => {
    expect(requireField('435')).toEqual(undefined);
  });
  it('should throw a validation error', () => {
    expect(requireField(null)).toEqual('Field Required');
  });
});

describe('zipNumbersOnly', () => {
  it('should return undefined for zipNumbersOnly', () => {
    expect(zipNumbersOnly('456')).toBeUndefined();
  });
  it('should return Not a valid zip code', () => {
    expect(zipNumbersOnly('|/&')).toEqual('Not a valid zip code');
  });
});

describe('phone', () => {
  it('should return undefined for a valid phone', () => {
    expect(phone('888-888-8888')).toBeUndefined();
  });
  it('should return "is not a valid Phone Number." on invalid phone', () => {
    expect(phone('vcxvxcvxcv')).toEqual('Not a valid Phone Number.');
  });
});

describe('range', () => {
  it('should return undefined when value is in the range', () => {
    const rangeResult = range(200, 100, 20000);
    expect(rangeResult).toBeUndefined();
  });
  it('should return validation error when value is not in the range', () => {
    const rangeResult = range(50000, 100, 20000);
    expect(rangeResult).toEqual('Not a valid range');
  });
});
