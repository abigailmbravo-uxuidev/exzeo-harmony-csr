import React from 'react';
import { shallow } from 'enzyme';

import SearchDiaries from './SearchDiaries';

describe('Policy Search', () => {
  it('renders Policy Search container', () => {
    const wrapper = shallow(<SearchDiaries />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
