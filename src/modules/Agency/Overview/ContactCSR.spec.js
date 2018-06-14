import React from 'react';
import { shallow } from 'enzyme';
import { ContactCSR } from './ContactCSR';
import mockAgency from '../mockAgency';

describe('Testing ContactCard component', () => {
  it('should render', () => {
    const wrapper = shallow(<ContactCSR agency={mockAgency} />);
    expect(wrapper).toBeTruthy;
  });
});
