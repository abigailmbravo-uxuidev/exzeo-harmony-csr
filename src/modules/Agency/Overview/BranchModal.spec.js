import React from 'react';
import { shallow } from 'enzyme';

import mockAgency from '../mockAgency';

import { BranchModal } from './BranchModal';

describe('Testing BranchModal component', () => {
  it('should test onHandleSaveAgency', () => {
    const props = {
      closeModal() {},
      updateAgency() {},
      agency: mockAgency,
      branchCode: 1,
      change() {},
      handleSubmit() {}
    };
    const wrapper = shallow(<BranchModal {...props} />);
    expect(wrapper).toBeTruthy();
    const wi = wrapper.instance();
    wi.handleBranchSubmit(mockAgency);
  });
});
