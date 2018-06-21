import React from 'react';
import { shallow } from 'enzyme';
import { ContractsCard } from './ContractsCard';
import mockAgency from '../mockAgency';

describe('Testing ContractsCard component', () => {
  it('should render', () => {
    const wrapper = shallow(<ContractsCard contract={mockAgency.license[0]} editContract={x => x} />);
    expect(wrapper).toBeTruthy();
  });
});
