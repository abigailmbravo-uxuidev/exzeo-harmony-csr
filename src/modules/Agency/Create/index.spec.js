import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import mockAgency from '../mockAgency';

import Create from './index';

describe('Testing Create index component', () => {
  it('should render', () => {
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    const store = mockStore({ agencyState: {} });

    const props = {
      agency: mockAgency
    };
    const wrapper = shallow(<Create store={store} {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
