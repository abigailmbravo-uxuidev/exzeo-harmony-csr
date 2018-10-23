import React from 'react';
import { shallow } from 'enzyme';

import mockAgency from '../mockAgency';

import { AgencyContacts } from './AgencyContacts';

describe('Testing Agency Base component', () => {
  it('should render', () => {
    const wrapper = shallow(<AgencyContacts agency={mockAgency} editContact={x => x} />);
    expect(wrapper).toBeTruthy();
  });
});
