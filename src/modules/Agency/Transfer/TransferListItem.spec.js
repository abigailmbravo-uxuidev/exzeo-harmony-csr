import React from 'react';
import { shallow } from 'enzyme';

import TransferListItem from './TransferListItem';
import mockAgency from '../mockAgency';

describe('Testing Transfer Modal', () => {
  it('should render Transfer Modal', () => {
    const props = {
      policy: {}
    };
    const wrapper = shallow(<TransferListItem {...props} />);
    expect(wrapper).toBeTruthy();
  });
});
