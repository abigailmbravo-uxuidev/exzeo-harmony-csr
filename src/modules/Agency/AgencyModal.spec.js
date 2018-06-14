import React from 'react';
import { shallow } from 'enzyme';
import { AgencyModal, copyAddress } from './AgencyModal';
import mockAgency from './index.spec';

describe('Testing Agency Base component', () => {
  it('should render', () => {
    const props = {
      dispatch() {},
      agency: mockAgency,
      handleSubmit() {},
      fieldValues: {
        sameAsMailing: true
      }
    };
    const wrapper = shallow(<AgencyModal initialValues={props.agency} {...props} />);
    expect(wrapper).toBeTruthy;
    wrapper.find('[name="mailingAddress.address1"]').simulate('change', {});
    wrapper.find('[name="mailingAddress.address2"]').simulate('change', {});
    wrapper.find('[name="mailingAddress.city"]').simulate('change', {});
    wrapper.find('[name="mailingAddress.state"]').simulate('change', {});
    wrapper.find('[name="mailingAddress.zip"]').simulate('change', {});

    expect(copyAddress(true, props.agency, props.dispatch)).toEqual(true);
    expect(copyAddress(false, props.agency, props.dispatch)).toEqual(false);
  });
});
