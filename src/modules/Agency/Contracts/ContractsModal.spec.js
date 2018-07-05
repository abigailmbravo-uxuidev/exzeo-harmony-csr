import React from 'react';
import { shallow } from 'enzyme';
import { ContractsModal } from './ContractsModal';

describe('Testing ContractsCard component', () => {
  it('should render', () => {
    const props = {
      toggleModal() {},
      handleSubmit() {}
    };
    const wrapper = shallow(<ContractsModal {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
