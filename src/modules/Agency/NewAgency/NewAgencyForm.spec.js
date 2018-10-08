import React from 'react';
import { shallow } from 'enzyme';
import { NewAgencyForm } from './NewAgencyForm';
import mockAgency from '../mockAgency';

describe('Testing Agency Base component', () => {
  it('should render', () => {
    const wrapper = shallow(<NewAgencyForm agency={mockAgency} editAgency={x => x} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
