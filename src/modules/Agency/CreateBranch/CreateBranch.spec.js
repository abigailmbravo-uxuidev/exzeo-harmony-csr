import React from 'react';
import { shallow } from 'enzyme';

import { CreateBranch } from './CreateBranch';

describe('Testing CreateBranch Base component', () => {
  it('should render', () => {
    const props = {
      reset() {},
      handleSubmit() {},
      createBranch() {
        return Promise.resolve({ branchCode: '1' });
      },
      licenseValue: '',
      sameAsMailingValue: false,
      submitting: false,
      pristine: false,
      change() {},
      agency: {},
      orphans: [{ _id: '123' }],
      listAnswersAsKey: []
    };
    const wrapper = shallow(<CreateBranch {...props} />);
    expect(wrapper.exists()).toBeTruthy();
    const wi = wrapper.instance();
    wi.applyOrphanedAgent({ selectedAgentId: '123' });
    wi.handleResetForm();
    wi.handleCreateBranch({
      mailingAddress: { country: {} },
      physicalAddress: { country: {} }
    });
  });
});
