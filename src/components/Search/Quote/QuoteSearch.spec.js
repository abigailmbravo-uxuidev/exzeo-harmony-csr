import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import QuoteSearch from './index';

const mockStore = configureStore([]);
const store = mockStore({
  service: {}
});

describe('Quote Search', () => {
  it('renders Quote Search', () => {
    const wrapper = shallow(<QuoteSearch store={store} />);
    expect(wrapper);
  });
});

