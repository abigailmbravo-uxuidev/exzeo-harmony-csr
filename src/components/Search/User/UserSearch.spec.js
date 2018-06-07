import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import UserSearch from './index';

const mockStore = configureStore([]);
const store = mockStore({
  service: {}
});

describe('User Search', () => {
  it('renders User Search', () => {
    const wrapper = shallow(<UserSearch store={store} />);
    expect(wrapper);
  });
});

