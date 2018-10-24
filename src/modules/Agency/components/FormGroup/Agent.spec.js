import React from 'react';
import { shallow } from 'enzyme';

import Agent from './Agent';

describe('Testing Agent component', () => {
  it('should render', () => {
    const wrapper = shallow(<Agent />);
    expect(wrapper).toBeTruthy();
  });
});
