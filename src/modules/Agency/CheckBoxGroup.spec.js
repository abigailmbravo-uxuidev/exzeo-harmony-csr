import React from 'react';
import { shallow } from 'enzyme';

import CheckBoxGroup from './CheckBoxGroup';

describe('Test the Input Component', () => {
  it('Should Render', () => {
    const props = {
      input: { name: 'cbg', value: ['234'], onChange() {} },
      meta: {},
      options: [{ value: '234', label: 'dfdsfsd' }]
    };

    const wrapper = shallow(<CheckBoxGroup {...props} dataTest="test" />);
    expect(wrapper.exists()).toBeTruthy();
    wrapper.find('input').simulate('change', { target: { checked: true } });
    wrapper.find('input').simulate('change', { target: { checked: false } });
  });
});
