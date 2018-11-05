import React from 'react';
import { shallow } from 'enzyme';

import mockAgency from '../mockAgency';

import { ContactView } from './ContactView';

describe('Testing ContactView component', () => {
  it('should render', () => {
    const props = {
      agency: mockAgency,
      agencyBranchData: mockAgency
    };
    const wrapper = shallow(<ContactView {...props} />);
    expect(wrapper).toBeTruthy();
  });
});
