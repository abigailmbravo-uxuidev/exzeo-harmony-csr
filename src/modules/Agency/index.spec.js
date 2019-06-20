import React from 'react';
import { shallow } from 'enzyme';

import mockAgency from './mockAgency';

import {
  Agency,
  CreateRender,
  CreateBranchRender,
  ContractsRender,
  AgentsRender,
  OverviewRender
} from './index';

describe('Testing Agency Base component', () => {
  it('should render', () => {
    const props = {
      getTerritoryManagers() {},
      getAgency() {},
      getAgentsByAgencyCode() {},
      getListOfOrphanedAgents() {},
      searchSettingsByCSPAndZip() {},
      getPoliciesForAgency() {},
      getAgentListByAgencyCode() {},
      getLists() {},
      match: { params: { agencyCode: '123', branchCode: '0' } },
      agency: mockAgency
    };
    const wrapper = shallow(<Agency {...props} />);
    expect(wrapper).toBeTruthy();
  });

  it('should render without agency', () => {
    const props = {
      getTerritoryManagers() {},
      getAgency() {},
      getAgentsByAgencyCode() {},
      getListOfOrphanedAgents() {},
      searchSettingsByCSPAndZip() {},
      getPoliciesForAgency() {},
      getLists() {},
      getAgentListByAgencyCode() {},
      match: { params: { agencyCode: '123', branchCode: '0' } },
      agency: null
    };
    const wrapper = shallow(<Agency {...props} />);
    expect(wrapper).toBeTruthy();
    const c = CreateRender(props);
    expect(c).toBeTruthy();
    const cb = CreateBranchRender(1)(props);
    expect(cb).toBeTruthy();
    const a = AgentsRender(1)(props);
    expect(a).toBeTruthy();
    const con = ContractsRender(props);
    expect(con).toBeTruthy();
    const o = OverviewRender(1)(props);
    expect(o).toBeTruthy();
  });
});
