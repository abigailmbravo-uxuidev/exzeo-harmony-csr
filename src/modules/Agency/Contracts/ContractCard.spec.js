import React from 'react';
import { shallow } from 'enzyme';
import ContractCard from './ContractCard';
import mockAgency from '../mockAgency';

describe('Testing ContractsCard component', () => {
  it('should render', () => {
    const wrapper = shallow(<ContractCard contract={mockAgency.contracts[0]} editContract={x => x} />);
    expect(wrapper).toBeTruthy();
  });
});
