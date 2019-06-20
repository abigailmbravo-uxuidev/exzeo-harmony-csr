import React from 'react';
import { shallow } from 'enzyme';

import { Bootstrap } from './Bootstrap';

describe('Test the Bootstrap Component', () => {
  it('Should Render', () => {
    const props = {
      getAssignees: x => x,
      userProfile: {}
    };
    const wrapper = shallow(<Bootstrap {...props} />);

    expect(wrapper.exists()).toBeTruthy();
    wrapper.instance().componentDidMount();
  });
});
