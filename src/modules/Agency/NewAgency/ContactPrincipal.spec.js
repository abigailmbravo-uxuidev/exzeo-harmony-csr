import React from 'react';
import { shallow } from 'enzyme';
import { ContactPrincipal } from './ContactPrincipal';
import mockAgency from '../mockAgency';

describe('Testing ContactCard component', () => {
  it('should render', () => {
    const wrapper = shallow(<ContactPrincipal agency={mockAgency} />);
    expect(wrapper).toBeTruthy;
  });
});
