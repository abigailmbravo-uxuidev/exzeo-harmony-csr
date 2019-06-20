import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import TransferAOR from './TransferAOR';
import { Button } from '@exzeo/core-ui';

describe('Testing TransferAOR component', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const store = mockStore({
    agencyState: {
      agencies: [],
      agency: {}
    }
  });

  const props = {
    companyCode: 'test',
    state: 'FL',
    agencyCode: 1234,
    agentCode: 4567,
    toggleModal: jest.fn(),
    handleSubmit: jest.fn(),
    getAgencies: jest.fn(),
    setAppError: jest.fn(),
    policyNumber: '12-3243243-03'
  };

  it('renders without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <TransferAOR {...props} />
      </Provider>
    );
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('Field')).toHaveLength(2);
    expect(wrapper.find('button')).toHaveLength(2);
  });

  it('onchange handlers', () => {
    const wrapper = mount(
      <Provider store={store}>
        <TransferAOR {...props} />
      </Provider>
    );
    wrapper.find('Button').everyWhere(x => {
      x.simulate('click');
      return x;
    });
  });
});
