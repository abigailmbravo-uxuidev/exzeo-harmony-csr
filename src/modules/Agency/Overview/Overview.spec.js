import React from 'react';
import { shallow } from 'enzyme';

import mockAgency from '../mockAgency';

import { Overview } from './Overview';

describe('Testing Overview component', () => {
  it('should test onHandleSaveAgency', () => {
    const props = {
      agencyBranchData: mockAgency,
      agentOfRecord: { agentCode: 1000 },
      updateAgent() {},
      closeModal() {},
      updateAgency() {},
      agency: mockAgency,
      branchCode: 1,
      change() {},
      handleSubmit() {}
    };
    const wrapper = shallow(<Overview {...props} />);
    expect(wrapper).toBeTruthy();
    const wi = wrapper.instance();
    wi.onHandleEditAgent(mockAgency);
    wi.onHandleToggleEditDetailsModal();
    wi.onHandleToggleEditAddressModal();
    wi.onHandleToggleEditContactModal();
    wi.onHandleToggleEditPrincipalModal();
    wi.onHandleToggleSwitchAgentOfRecordModal({})();
    wi.handleSwitchAOR({});
  });
});
