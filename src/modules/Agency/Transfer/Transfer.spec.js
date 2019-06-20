import React from 'react';
import { shallow } from 'enzyme';

import { Transfer } from './Transfer';

import mockAgency from '../mockAgency';

describe('Testing Transfer', () => {
  it('should render Transfer', () => {
    const props = {
      agency: mockAgency,
      agentsList: [{ agentCode: 123, agencyCode: mockAgency.agencyCode }],
      policies: [
        { policyNumber: '12-2333344-01' },
        { policyNumber: '12-2333355-01' }
      ],
      policyNumberList: [{ label: '12-2333344-01', answer: '12-2333344-01' }],
      listAnswersAsKey: [],
      getPoliciesForAgency() {}
    };
    const wrapper = shallow(<Transfer {...props} />);
    expect(wrapper).toBeTruthy();

    const instance = wrapper.instance();

    instance.handleToggleModal();
    instance.handleCheckPolicy('12-2333344-01', {});
    instance.handleUncheckPolicy('12-2333344-01', {});
    instance.handleCheckAllPolicies();
    instance.clearSelectedPolicies();

    instance.unCheckPolicy('12-2333344-01');
    instance.checkPolicy('12-2333344-01');
  });
});
