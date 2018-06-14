import React from 'react';
import { shallow } from 'enzyme';
import { SideNav } from './AgencySideNav';

describe('Testing AgencyHeader component', () => {
  it('should render', () => {
    const wrapper = shallow(<SideNav />);
    expect(wrapper).toBeTruthy;
  });
});
