import React from 'react';
import { shallow } from 'enzyme';
import { AgencyDetails } from './AgencyDetails';
import mockAgency from '../mockAgency';

describe('Testing Agency Base component', () => {
  it('should render', () => {
    const wrapper = shallow(<AgencyDetails agency={mockAgency} editAgency={x => x} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
