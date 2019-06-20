import React from 'react';
import { mount } from 'enzyme';

import SmallModal from './SmallModal';

describe('Testing SmallModal component', () => {
  it('should render', () => {
    const props = {
      handleSubmit() {},
      handleCancel() {},
      header: 'Save',
      headerIcon: 'fa-circle',
      text: 'Save Data',
      modalClassName: 'Save'
    };
    const wrapper = mount(<SmallModal {...props} />);
    expect(wrapper.exists()).toBeTruthy();
    wrapper.find('Button').everyWhere(x => {
      x.simulate('click');
      return x;
    });
  });
});
