import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import PolicySearch from './index';

const mockStore = configureStore([]);
const store = mockStore({
  service: {}
});

describe('Policy Search', () => {
  it('renders Policy Search', () => {
    const wrapper = shallow(<PolicySearch store={store} />);
    expect(wrapper);
  });
});

