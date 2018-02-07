import React from 'react';
import { shallow } from 'enzyme';
import NoResults from './NoResultsForService';

describe('Testing No Results component', () => {
  it('renders NoResults', () => {
    const wrapper = shallow(<NoResults />);
    expect(wrapper);
  });
});
