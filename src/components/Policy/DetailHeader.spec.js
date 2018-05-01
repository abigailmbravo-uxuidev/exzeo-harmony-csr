import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import ConnectedApp, { DetailHeader, showEffectiveDatePopUp } from './DetailHeader';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing DetailHeader component', () => {
  it('should test app', () => {
    const store = mockStore();
    const props = {
      policyState: {},
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
      actions: {
        appStateActions: {
          setAppState() {}
        },
        policyStateActions: {
          updatePolicy() {}
        },
        serviceActions: {
          getEffectiveDateChangeReasons() {},
          getLatestPolicy() {},
          getTransactionHistory() {}
        }
      },
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      },
      ...propTypes
    };
    const wrapper = shallow(<DetailHeader store={store} {...props} />);
    expect(wrapper);
    wrapper.instance().componentDidMount();
    wrapper.instance().componentWillReceiveProps({ 
      policy: {
        policyID: '234',
        product: 'HO3',
        cancelDate: '2018-04-04'
      },
      policyState: { update: true, policyNumber: '123'} , ...props });
    wrapper.find('button#effective-date').simulate('click');
  });

  it('should test connected app', () => {
    const middlewares = [thunk]
    const mockStore = configureStore(middlewares);
    const initialState = {
      service: {
      },
      appState: {
        modelName: 'bb',
        data: {}
      }
    };
    const store = mockStore(initialState);
    const props = {
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      actions: {
        appStateActions: {
          setAppState: () => {}
        },
        policyStateActions: {
          updatePolicy: () => {}
        },
        serviceActions: {
          getEffectiveDateChangeReasons: () => {},
          getLatestPolicy: () => {},
          getTransactionHistory: () => {},
          getSummaryLedger: () => {}
        }
      },
      appState: {
        data: {
          submitting: false
        }
      },
      ...propTypes
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    
    expect(wrapper.dive());
  });
});
