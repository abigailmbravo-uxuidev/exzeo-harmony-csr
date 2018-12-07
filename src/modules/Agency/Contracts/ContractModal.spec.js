import React from 'react';
import { shallow } from 'enzyme';
import { ContractModal, RenderProducts } from './ContractModal';
import mockAgency from '../mockAgency';

const contracts = mockAgency.contracts;

describe('Testing Contract Modal component', () => {
  it('should render ContractModal', () => {
    const props = {
      saveContract() {},
      closeModal() {},
      handleSubmit() {},
      initialValues: contracts[0]
    };
    const wrapper = shallow(<ContractModal {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render Contract Modal', () => {
    const props = {
      saveContract() {},
      closeModal() {},
      handleSubmit() {},
      initialValues: contracts[0]
    };
    const wrapper = shallow(<ContractModal {...props} />);
    expect(wrapper.find('Field')).toHaveLength(3);
    expect(wrapper.find('FieldArray')).toHaveLength(1);
    expect(wrapper.find('button')).toHaveLength(2);
  });

  it('should render RenderProducts', () => {
    const props = {
      fields: contracts
    };
    const wrapper = shallow(<RenderProducts {...props} />);
    expect(wrapper.find('.csp-wrapper')).toHaveLength(2);
  });
});
