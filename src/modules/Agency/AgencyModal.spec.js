import React from 'react';
import { shallow } from 'enzyme';
import { AgencyModal, copyAddress } from './AgencyModal';
import mockAgency from './mockAgency';

describe('Testing Agency Base component', () => {
  it('should render', () => {
    const props = {
      change() {},
      sameAsMailingValue: true,
      agency: mockAgency,
      handleSubmit() {},
      fieldValues: {
        sameAsMailing: true
      }
    };
    const wrapper = shallow(<AgencyModal initialValues={mockAgency} {...props} />);
    expect(wrapper).toBeTruthy;
    wrapper.find('[name="mailingAddress.address1"]').simulate('change', {});
    wrapper.find('[name="mailingAddress.address2"]').simulate('change', {});
    wrapper.find('[name="mailingAddress.city"]').simulate('change', {});
    wrapper.find('[name="mailingAddress.state"]').simulate('change', {});
    wrapper.find('[name="mailingAddress.zip"]').simulate('change', {});
    const wrapperInstance = wrapper.instance();
    expect(wrapperInstance.handleSameAsMailing(true, false, props.agency)).toEqual(true);
    expect(wrapperInstance.handleSameAsMailing(false, true, props.agency)).toEqual(false);
    expect(wrapperInstance.resetSameAsMailing(true)).toEqual(true);
    expect(wrapperInstance.resetSameAsMailing(false)).toEqual(false);
  });
});
