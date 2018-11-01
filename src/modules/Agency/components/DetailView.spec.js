import React from 'react';
import { shallow } from 'enzyme';

import mockAgency from '../mockAgency';

import { DetailView } from './DetailView';

describe('Testing DetialView component', () => {
  it('should render', () => {
    const props = {
      agency: mockAgency,
      agencyBranchData: mockAgency
    };
    const wrapper = shallow(<DetailView {...props} />);
    expect(wrapper).toBeTruthy();
  });
});
