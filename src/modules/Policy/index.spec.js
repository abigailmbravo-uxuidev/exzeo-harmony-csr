import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import { Policy } from './index';

const middlewares = [];
const mockStore = configureStore([]);

describe('Testing Policy component', () => {
  it('should test connected app', () => {
    const initialState = {
      service: {
        latestPolicy: {},
        getZipcodeSettings: { timezone: '' }
      },
      policyState: {
        policy: {
          rating: { worksheet: { fees: {} } },
          policyNumber: '1234',
          property: {
            physicalAddress: {}
          }
        },
        summaryLedger: {
          status: {
            code: 13
          }
        }
      },
      cg: {
        bb: {
          data: {
            modelInstanceId: '123',
            model: {},
            uiQuestions: []
          }
        }
      },
      appState: {
        modelName: 'bb',
        data: {
          submitting: false
        }
      }
    };
    const store = mockStore(initialState);
    const props = {
      match: { params: {} },
      batchCompleteTask() { return Promise.resolve(); },
      createTransaction() { return Promise.resolve(); },
      getAgents() {},
      getAgency() {},
      getBillingOptionsForPolicy() {},
      getCancelOptions() {},
      getEndorsementHistory() {},
      getNotes() {},
      getPaymentHistory() {},
      getPaymentOptionsApplyPayments() {},
      getPolicy() {},
      getSummaryLedger() { return Promise.resolve(); },
      getZipCodeSettings() { return Promise.resolve(); },
      setAppState() {},
      startWorkflow() { return Promise.resolve({ payload: [{ workflowData: { effectiveDateChangeModel: { data: {} }, endorsePolicyModelCalculate: { data: {} } } }] }); },
      appState: initialState.appState,
      dispatch: store.dispatch,
      policy: initialState.policyState.policy,
      policyState: initialState.policyState,
      summaryLedger: initialState.policyState.summaryLedger,
      tasks: initialState.cg,
      zipCodeSettings: initialState.service.getZipcodeSettings
    };

    const wrapper = shallow(<Policy store={store} {...props} />);
    expect(wrapper);
    wrapper.instance().componentDidUpdate({ policy: {} });
  });
});
