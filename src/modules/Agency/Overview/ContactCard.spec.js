import React from 'react';
import { shallow } from 'enzyme';
import { ContactCard } from './ContactCard';
import mockAgency from '../mockAgency';

describe('Testing ContactCard component', () => {
  it('should render', () => {
    const wrapper = shallow(<ContactCard agency={mockAgency} type="CSR" editContact={x => x} />);
    expect(wrapper).toBeTruthy;
  });
});
