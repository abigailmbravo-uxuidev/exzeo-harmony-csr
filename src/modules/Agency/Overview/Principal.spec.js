import React from 'react';
import { shallow } from 'enzyme';
import { PrincipalFields } from './Principal';

describe('Testing ContactCard component', () => {
  it('should render', () => {
    const wrapper = shallow(<PrincipalFields />);
    expect(wrapper).toBeTruthy;
  });
});
