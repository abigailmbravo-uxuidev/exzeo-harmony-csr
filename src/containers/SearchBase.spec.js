import { shallow } from 'enzyme';
import React from 'react';
import { SearchBase } from './SearchBase';

describe('Policy Search', () => {
  it('renders Policy Search container', () => {
    const props = {
      getUIQuestions() {
        x => x;
      },
      location: { pathName: 'test' },
      auth: {},
      userProfile: {},
      loading: false
    };
    const wrapper = shallow(<SearchBase {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
