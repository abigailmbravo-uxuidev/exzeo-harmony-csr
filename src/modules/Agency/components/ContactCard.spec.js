import React from 'react';
import { shallow } from 'enzyme';
import { Contact } from './Contact';
import mockAgency from '../mockAgency';

describe('Testing ContactCard component', () => {
  it('should render', () => {
    const wrapper = shallow(<Contact agency={mockAgency} />);
    expect(wrapper).toBeTruthy;
  });
});
