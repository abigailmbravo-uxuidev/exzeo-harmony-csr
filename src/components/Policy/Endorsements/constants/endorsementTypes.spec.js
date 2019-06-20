import React from 'react';
import { premiumEndorsementList } from './endorsementTypes';

describe('Testing WindMitigation component', () => {
  it('should test valid endorsement Types', () => {
    expect(premiumEndorsementList.length).toEqual(7);
    expect(premiumEndorsementList).toContain('Coverage Endorsement');
    expect(premiumEndorsementList).toContain('Deductible Endorsement');
    expect(premiumEndorsementList).toContain('Surcharge Endorsement');
    expect(premiumEndorsementList).toContain('Discount Endorsement');
    expect(premiumEndorsementList).toContain('Wind Mitigation Endorsement');
    expect(premiumEndorsementList).toContain('Home / Location Endorsement');
    expect(premiumEndorsementList).toContain(
      'Multiple Endorsements Endorsement'
    );
  });
});
