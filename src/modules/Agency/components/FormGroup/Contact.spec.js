import React from 'react';
import { shallow } from 'enzyme';

import Contact from './Contact';

describe('Testing Contact component', () => {
  it('should render', () => {
    const wrapper = shallow(<Contact />);
    expect(wrapper).toBeTruthy();
  });
});
