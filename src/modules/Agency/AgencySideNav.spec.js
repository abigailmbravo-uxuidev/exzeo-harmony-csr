import React from 'react';
import { shallow } from 'enzyme';
import { SideNav } from './AgencySideNav';
import mockAgency from './mockAgency';

describe('Testing SideNav component', () => {
  it('should render', () => {
    const wrapper = shallow(<SideNav agency={mockAgency} />);
    expect(wrapper).toBeTruthy;
  });
});
