import React from 'react';
import { shallow } from 'enzyme';
import { Agency } from './index';
import mockAgency from './mockAgency';

describe('Testing Agency Base component', () => {
  it('should render', () => {
    const props = {
      getAgency() {},
      getAgentsByAgencyCode() {},
      getListOfOrphanedAgents() {},
      searchSettingsByCSPAndZip() {},
      match: { params: { agencyCode: '123', branchCode: '0' } },
      agency: mockAgency
    };
    const wrapper = shallow(<Agency {...props} />);
    expect(wrapper).toBeTruthy();
  });

  it('should render without agency', () => {
    const props = {
      getAgency() {},
      getAgentsByAgencyCode() {},
      getListOfOrphanedAgents() {},
      searchSettingsByCSPAndZip() {},
      match: { params: { agencyCode: '123', branchCode: '0' } },
      agency: null
    };
    const wrapper = shallow(<Agency {...props} />);
    expect(wrapper).toBeTruthy();
  });
});
