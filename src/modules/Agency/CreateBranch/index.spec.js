import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import mockAgency from '../mockAgency';

import CreateBranch from './index';

describe('Testing CreateBranch index component', () => {
  it('should render', () => {
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    const store = mockStore({
      agencyState: {},
      questions: { territoryManagers: [] }
    });

    const props = {
      territoryManagers: [],
      agency: mockAgency
    };
    const wrapper = shallow(<CreateBranch store={store} {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
