import React from 'react';
import { shallow } from 'enzyme';

import { TransferList } from './TransferList';

describe('Testing TransferFilter', () => {
  it('should render TransferFilter', () => {
    const props = {
      policies: [{ poilcyNumber: '123' }, { poilcyNumber: '456' }],
      filteredPolicies: [{ poilcyNumber: '456' }],
      toggleTransferModal() {},
      checkPolicy() {},
      uncheckPolicy() {},
      checkAllPolicies() {},
      selectedPolicies: [{ poilcyNumber: '123' }],
      clearSelectedPolicies() {},
      fadePolicy: false
    };
    const wrapper = shallow(<TransferList {...props} />);
    expect(wrapper).toBeTruthy();
  });
});
