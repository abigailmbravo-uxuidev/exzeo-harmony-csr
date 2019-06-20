import React from 'react';
import { shallow } from 'enzyme';

import mockAgency from '../mockAgency';

import { BranchDetails } from './BranchDetails';

describe('Testing BranchDetails Base component', () => {
  it('should render', () => {
    const wrapper = shallow(
      <BranchDetails agency={mockAgency} editContact={x => x} />
    );
    expect(wrapper).toBeTruthy();
  });
});
