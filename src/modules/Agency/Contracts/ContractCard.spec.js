import React from 'react';
import { shallow } from 'enzyme';
import ContractCard from './ContractCard';
import mockAgency from '../mockAgency';

describe('Testing ContractsCard component', () => {
  it('should render', () => {
    const contract = mockAgency.contracts[0];
    const wrapper = shallow(
      <ContractCard
        key={contract.contractNumber}
        contract={contract}
        editContract={() => {}}
      />
    );
    expect(wrapper).toBeTruthy();
  });

  it('should render contract info', () => {
    const contract = mockAgency.contracts[0];
    const wrapper = shallow(
      <ContractCard
        key={contract.contractNumber}
        contract={contract}
        editContract={() => {}}
      />
    );
    expect(wrapper.find('.contract-info')).toHaveLength(1);
    expect(wrapper.find('.contract-title')).toHaveLength(1);
    expect(wrapper.find('h4').text()).toEqual('TTIC | FL • HO3 | FL • AF3');
  });
});
