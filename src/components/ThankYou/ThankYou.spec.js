import React from 'react';
import { shallow } from 'enzyme';

import ThankYou from './ThankYou';

describe('Testing ThankYou component', () => {
  it('should test props and render', () => {
    const wrapper = shallow(<ThankYou />);
    expect(wrapper);
  });
});
