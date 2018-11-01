import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import mockAgency from '../mockAgency';

import Agents from './index';

describe('Testing Agents index component', () => {
  it('should render', () => {
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    const store = mockStore({ agencyState: {} });

    const props = {
      agency: mockAgency,
      handleSubmit() {},
      handleConfirm() {},
      listOfAgents: [],
      initialValues: {},
      handleCancel() {}
    };
    const wrapper = shallow(<Agents store={store} {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
