import React from 'react';
import { shallow } from 'enzyme';
import { AgencyContacts } from './AgencyContacts';
import mockAgency from '../index.spec';

describe('Testing Agency Base component', () => {
  it('should render', () => {
    const wrapper = shallow(<AgencyContacts agency={mockAgency} editContact={x => x} />);
    expect(wrapper).toBeTruthy;
  });
});
