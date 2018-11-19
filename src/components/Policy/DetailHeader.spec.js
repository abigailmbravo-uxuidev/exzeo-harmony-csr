import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';

import ConnectedApp, { DetailHeader } from './DetailHeader';

describe('Testing DetailHeader component', () => {
  const props = {
    policy: {
      policyID: '234',
      product: 'HO3',
      status: 'Pending Cancellation',
      endDate: '2018-12-12',
      property: {
        physicalAddress: {
          address1: 'test',
          address2: '',
          city: 'Tampa',
          state: 'FL',
          zip: '33606'
        }
      }
    },
    summaryLedger: {
      status: { code: 99 }
    },
    setAppState() {},
    getEffectiveDateChangeReasons() {},
    fieldQuestions: [],
    quoteData: {},
    appState: {
      data: {
        submitting: false
      }
    },
    policyDetails: { cancellation: {}, finalPayment: { date: '10/12/2018', label: 'Date Label' } }
  };

  it('should render class', () => {
    const wrapper = shallow(<DetailHeader {...props} />);
    expect(wrapper);
    wrapper.instance().componentDidMount();

    wrapper.instance().handleEditEffectiveDate();
    wrapper.instance().handleReinstatePolicy();
  });

  it('should rendered with connected class', () => {
    const initialState = {
      service: {},
      appState: {
        modelName: 'bb',
        data: {}
      },
      policyState: {
        policy: {
          policyID: '234',
          product: 'HO3',
          status: 'Pending Cancellation',
          endDate: '2018-12-12',
          property: {
            physicalAddress: {
              address1: 'test',
              address2: '',
              city: 'Tampa',
              state: 'FL',
              zip: '33606'
            }
          }
        }
      },
      summaryLedger: {
        status: { code: 99 }
      }
    };
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const store = mockStore(initialState);

    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper.instance()).toBeTruthy();
  });
});

