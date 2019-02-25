import React from 'react';
import { shallow } from 'enzyme';

import { TransferModal } from './TransferModal';
import mockAgency from '../mockAgency';

describe('Testing Transfer Modal', () => {
  it('should render Transfer Modal', () => {
    const props = {
      agencyCode: 123,
      clearSelectedPolicies(){},
      getAgentsByAgencyCode(){},
      handleSubmit(){},
      toggleModal(){},
      agencies: [mockAgency],
      agents: [{"agentCode": 234, "displayText": "TestFirst TestLast", "firstName": "TestFirst", "lastName": "TestLast"}]
    };
    const wrapper = shallow(<TransferModal {...props} />);
    expect(wrapper).toBeTruthy();
    const wi = wrapper.instance();

    wi.submitTransfer({}, fn => fn, props);
  });
});
