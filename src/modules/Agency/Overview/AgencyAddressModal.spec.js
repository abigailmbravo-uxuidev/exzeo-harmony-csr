import React from 'react';
import { shallow } from 'enzyme';

import mockAgency from '../mockAgency';

import { AgencyAddressModal } from './AgencyAddressModal';

describe('Testing AgencyAddressModal component', () => {
  it('should render', () => {
    const props = {
      closeModal() {},
      updateAgency() {},
      agency: mockAgency,
      branchCode: '1',
      change() {},
      handleSubmit() {}
    };
    const wrapper = shallow(<AgencyAddressModal {...props} />);
    expect(wrapper).toBeTruthy();
    const wi = wrapper.instance();
    wi.handleSaveAgency(mockAgency);
  });

  it('should test handleSaveAgency with branchCode 0', () => {
    const props = {
      closeModal() {},
      updateAgency() {},
      agency: mockAgency,
      branchCode: 0,
      change() {},
      handleSubmit() {}
    };
    const wrapper = shallow(<AgencyAddressModal {...props} />);
    expect(wrapper).toBeTruthy();
    const wi = wrapper.instance();
    wi.handleSaveAgency(mockAgency);
  });
});
