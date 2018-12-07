import React from 'react';
import { shallow } from 'enzyme';

import mockAgency from '../mockAgency';

import { AgencyModal } from './AgencyModal';

describe('Testing AgencyModal component', () => {
  it('should test onHandleSaveAgency', () => {
    const props = {
      closeModal() {},
      updateAgency() {},
      agency: mockAgency,
      branchCode: 0,
      change() {},
      handleSubmit() {}
    };
    const wrapper = shallow(<AgencyModal {...props} />);
    expect(wrapper).toBeTruthy();
    const wi = wrapper.instance();
    wi.saveAgency(mockAgency);
  });
});
