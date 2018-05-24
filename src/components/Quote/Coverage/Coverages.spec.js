import React from 'react';
import { shallow } from 'enzyme';
import CoveragesComponent from './Coverages';

describe('Testing Quote Coverages component', () => {
  it('should test app render', () => {
    const props = {
      fieldValues: { dwellingMin: 1, dwellingMax: 2 },
      normalizeDwellingAmount: value => value,
      normalizeDwellingDependencies: value => value,
      normalizePersonalPropertyPercentage: value => value,
      normalizeIncidentalOccupancies: value => value,
      normalizeSinkholeAmount: value => value,
      questions: {}
    };
    const wrapper = shallow(<CoveragesComponent {...props} />);
    expect(wrapper);
  });
});
