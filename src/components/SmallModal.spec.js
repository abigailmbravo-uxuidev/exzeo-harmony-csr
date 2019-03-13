import React from 'react';
import { shallow } from 'enzyme';

import SmallModal from './SmallModal';

describe('Testing SmallModal component', () => {
  it('should render', () => {
    const props = {
      handleSubmit() {},
      handleOnSubmit() {},
      handleCancel() {},
      header: 'Save',
      headerIcon: 'fa-circle',
      text: 'Save Data',
      modalClassName: 'Save'
    };
    const wrapper = shallow(<SmallModal {...props} />);
    expect(wrapper.exists()).toBeTruthy();
    wrapper.find('Button').everyWhere((x) => {
      x.simulate('click');
      return x;
    });
  });
});
