import React from 'react';
import { shallow } from 'enzyme';

import { Create } from './Create';

describe('Testing Create Base component', () => {
  it('should render', () => {
    const props = {
      reset() {},
      createAgency() {},
      handleSubmit() {},
      licenseValue: '',
      sameAsMailingValue: false,
      submitting: false,
      pristine: false,
      change() {},
      agency: {},
      orphans: [{ _id: '123' }]
    };
    const wrapper = shallow(<Create {...props} />);
    expect(wrapper.exists()).toBeTruthy();
    const wi = wrapper.instance();
    wi.applyOrphanedAgent({ selectedAgentId: '123' });
    wi.handleSameAsMailing(true, false, { mailingAddress: {} });
    wi.handleSameAsMailing(false, true, { mailingAddress: {} });
    wi.handleResetForm();
    wi.createAgency({
      agentOfRecord: {},
      mailingAddress: { country: {} },
      physicalAddress: { country: {} }
    });
  });
});
