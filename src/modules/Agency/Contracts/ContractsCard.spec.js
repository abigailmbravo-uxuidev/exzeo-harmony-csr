import React from 'react';
import { shallow } from 'enzyme';
import { ContractsCard } from './ContractsCard';
import mockAgency from '../mockAgency';

describe('Testing ContractsCard component', () => {
  it('should render', () => {
    const wrapper = shallow(<ContractsCard agency={mockAgency} editContract={x => x} />);
    expect(wrapper).toBeTruthy();
  });
});
