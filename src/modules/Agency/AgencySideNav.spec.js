import React from 'react';
import { shallow } from 'enzyme';

import { SideNav } from './AgencySideNav';
import mockAgency from './mockAgency';

describe('Testing SideNav component', () => {
  it('should render', () => {
    const props = {
      agencyCode: '123',
      branchCode: '1',
      branchesList: [],
      match: { url: 'abc.com' }
    };
    const wrapper = shallow(<SideNav {...props} agency={mockAgency} />);
    expect(wrapper).toBeTruthy();
    const wi = wrapper.instance();
    wi.handleBranchSelection({ target: { value: 0 } });
    wi.handleBranchSelection({ target: { value: 1 } });
  });
});
