import React from 'react';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';

import AIDeleteReinstateModal from './AIDeleteReinstateModal';

const middlewares = [];
const mockStore = configureStore(middlewares);

const mockAI = {
  _id: '5c798e3384a0c9000e572864',
  active: true,
  mailingAddress: {
    _id: '5c798e3384a0c9000e572866',
    address1: 'PO BOX 5954',
    address2: '',
    city: 'SPRINGFIELD',
    country: {
      _id: '5c798e3384a0c9000e572867',
      code: 'USA',
      displayText: 'United States of America'
    },
    state: 'OH',
    zip: '45501'
  },
  name1: 'BANK OF AMERICA, NA',
  name2: 'ISAOA/ATIMA',
  order: 0,
  phoneNumber: null,
  referenceNumber: '',
  type: 'Mortgagee'
};

describe('Testing AIDeleteReinstateModal component', () => {
  it('should test AIDeleteReinstateModal Delete', () => {
    const store = mockStore({});
    const props = {
      handleSubmit() {},
      actionType: 'Delete',
      closeModal() {},
      selectedAI: mockAI,
      handleAction() {
        return Promise.resolve({});
      }
    };
    const wrapper = mount(<AIDeleteReinstateModal store={store} {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should test AIDeleteReinstateModal Reinstate', () => {
    const store = mockStore({});
    const props = {
      handleSubmit() {},
      actionType: 'Reinstate',
      closeModal() {},
      selectedAI: mockAI,
      handleAction() {
        return Promise.resolve({});
      }
    };
    const wrapper = mount(<AIDeleteReinstateModal store={store} {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
