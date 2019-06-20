import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import { Policy } from './index';

const mockStore = configureStore([thunk]);

describe('Testing Policy component', () => {
  it('should test connected app', () => {
    const initialState = {
      service: {
        latestPolicy: {},
        getZipcodeSettings: { timezone: '' }
      },
      policyState: {
        policy: {
          policyID: '1234',
          rating: { worksheet: { fees: {} } },
          policyNumber: '1234',
          property: {
            physicalAddress: {}
          }
        },
        summaryLedger: {
          _id: '1234',
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
      authState: {
        userProfile: {}
      },
      appState: {
        modelName: 'bb',
        data: {
          submitting: false
        }
      },
      diaries: [],
      quoteState: {
        quote: {}
      }
    };
    const store = mockStore(initialState);
    const props = {
      match: { params: {}, path: '/quote', url: '/test' },
      batchCompleteTask() {
        return Promise.resolve();
      },
      createTransaction() {
        return Promise.resolve();
      },
      getAgents() {},
      getAgency() {},
      getBillingOptionsForPolicy() {},
      getCancelOptions() {},
      getEndorsementHistory() {},
      getNotes() {},
      getPaymentHistory() {},
      getPaymentOptionsApplyPayments() {},
      getPolicy() {},
      getSummaryLedger() {
        return Promise.resolve();
      },
      getZipCodeSettings() {
        return Promise.resolve();
      },
      getEffectiveDateChangeReasons() {},
      setAppState() {},
      startWorkflow() {
        return Promise.resolve({
          payload: [
            {
              workflowData: {
                effectiveDateChangeModel: { data: {} },
                endorsePolicyModelCalculate: { data: {} }
              }
            }
          ]
        });
      },
      appState: initialState.appState,
      dispatch: store.dispatch,
      policy: initialState.policyState.policy,
      policyState: initialState.policyState,
      summaryLedger: initialState.policyState.summaryLedger,
      tasks: initialState.cg,
      zipCodeSettings: initialState.service.getZipcodeSettings,
      initialized: true
    };

    const instance = shallow(
      <Policy store={{ dispatch: x => x }} {...props} />
    ).instance();
    expect(instance);
    instance.componentDidMount();
    instance.componentDidUpdate(props);

    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Policy {...props} />
        </Router>
      </Provider>
    );
    expect(wrapper);
  });
});
