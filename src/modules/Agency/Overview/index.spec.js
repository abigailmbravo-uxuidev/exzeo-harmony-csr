import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import mockAgency from '../mockAgency';

import Overview from './index';

describe('Testing Overview index component', () => {
  it('should render', () => {
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    const store = mockStore({
      agencyState: {},
      questions: { territoryManagers: [] }
    });

    const props = {
      agency: mockAgency,
      territoryManagers: []
    };
    const wrapper = shallow(<Overview store={store} {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
