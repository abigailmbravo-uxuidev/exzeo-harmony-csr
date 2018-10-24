import React from 'react';
import { shallow } from 'enzyme';

import mockAgency from '../mockAgency';

import { AgencyContactModal } from './AgencyContactModal';

describe('Testing AgencyContactModal component', () => {
  it('should test onHandleSaveAgency', () => {
    const props = {
      closeModal() {},
      updateAgency() {},
      agency: mockAgency,
      branchCode: 0,
      change() {},
      handleSubmit() {}
    };
    const wrapper = shallow(<AgencyContactModal {...props} />);
    expect(wrapper).toBeTruthy();
    const wi = wrapper.instance();
    wi.onHandleSaveAgency(mockAgency);
  });

  it('should test onHandleSaveAgency branch code 1', () => {
    const props = {
      closeModal() {},
      updateAgency() {},
      agency: mockAgency,
      branchCode: 1,
      change() {},
      handleSubmit() {}
    };
    const wrapper = shallow(<AgencyContactModal {...props} />);
    expect(wrapper).toBeTruthy();
    const wi = wrapper.instance();
    wi.onHandleSaveAgency(mockAgency);
  });
});
