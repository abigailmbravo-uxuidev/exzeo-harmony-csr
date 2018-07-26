import React from 'react';
import { shallow } from 'enzyme';
import AgencySearch from './AgencySearch';

describe('Test AgencySearch component', () => {
  it('renders without props being passed', () => {
    const wrapper = shallow(<AgencySearch />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
