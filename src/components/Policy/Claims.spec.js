import React from 'react';
import { shallow } from 'enzyme';
import Claims from './Claims';

describe('Test the Claims Component', () => {
  it('Should Render', () => {
    const wrapper = shallow(<Claims />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
