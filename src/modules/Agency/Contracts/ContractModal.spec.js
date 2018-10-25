import React from 'react';
import { shallow } from 'enzyme';

import mockAgency from '../mockAgency';

import { ContractModal, RenderProducts } from './ContractModal';

describe('Testing AgentsModal component', () => {
  it('should render ContractModal', () => {
    const props = {
      agency: mockAgency,
      handleSubmit() {},
      initialValues: {},
      closeModal() {}
    };
    const wrapper = shallow(<ContractModal {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render renderProducts', () => {
    const props = {
      fields: [{}, {}],
      agency: mockAgency,
      handleSubmit() {},
      initialValues: {},
      closeModal() {}
    };
    const wrapper = shallow(<RenderProducts {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
