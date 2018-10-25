import React from 'react';
import { shallow } from 'enzyme';

import { LicenseModal } from './LicenseModal';

describe('Testing ContractsCard component', () => {
  it('should render', () => {
    Array.prototype.remove = x => x; //eslint-disable-line

    const props = {
      array: [],
      closeModal() {},
      handleSubmit() {},
      agentValue: [],
      handleAddAgent() {},
      handleRemoveAgent() {}
    };
    const wrapper = shallow(<LicenseModal {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
