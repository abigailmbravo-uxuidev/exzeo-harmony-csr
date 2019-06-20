import React from 'react';
import { shallow } from 'enzyme';

import { TransferFilter } from './TransferFilter';
import mockAgency from '../mockAgency';

describe('Testing TransferFilter', () => {
  it('should render TransferFilter', () => {
    const props = {
      getPoliciesForAgency() {},
      policyNumberList: [
        { answer: '12-1014145-01', label: '12-1014145-01' },
        { answer: '12-1014144-01', label: '12-1014144-01' }
      ],
      agentsList: [
        { answer: '60000', label: 'WALLY WAGONER' },
        { answer: '70000', label: 'AGENT TWO' }
      ],
      reset() {},
      listAnswersAsKey: {
        Products: [{ answer: 'HO3', label: 'HO3' }],
        US_states: [{ answer: 'FL', label: 'FL' }]
      }
    };
    const wrapper = shallow(<TransferFilter {...props} />);
    expect(wrapper).toBeTruthy();
    const instance = wrapper.instance();
    instance.handleFilterChange('12', '1', {
      policyNumber: '12',
      state: 'FL',
      product: 'HO3'
    });
  });
});
