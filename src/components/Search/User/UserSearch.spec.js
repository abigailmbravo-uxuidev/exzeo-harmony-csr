import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import UserSearch from './UserSearch';

describe('User Search', () => {
  it('renders User Search', () => {
    const wrapper = shallow(<UserSearch />);
    expect(wrapper);
  });
});

