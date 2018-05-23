import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import { Policy, changeEffectiveDate, showEffectiveDatePopUp, hideEffectiveDatePopUp, reinstatePolicySubmit } from './Policy';

const middlewares = [];
const mockStore = configureStore([]);

describe('Testing Policy component', () => {
  it('should test connected app', () => {
    const initialState = {
      service: {
        latestPolicy: {},
        getZipcodeSettings: {}
      },
      policyState: {
        policy: {
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
      getPolicy() {},
      startWorkflow() { return Promise.resolve({ payload: [{ workflowData: { effectiveDateChangeModel: { data: {} }, endorsePolicyModelCalculate: { data: {} } } }] }); },
      batchCompleteTask() { return Promise.resolve(); },
      setAppState() {},
      createTransaction() { return Promise.resolve(); },
      getZipcodeSettings() { return Promise.resolve(); },
      getSummaryLedger() { return Promise.resolve(); },
      dispatch: store.dispatch,
      zipCodeSetting: initialState.service.getZipcodeSettings,
      appState: initialState.appState,
      policyState: initialState.policyState,
      policy: initialState.policyState.policy,
      summaryLedger: initialState.policyState.summaryLedger,
      tasks: initialState.cg,
    };

    const wrapper = shallow(<Policy store={store} {...props} />);
    expect(wrapper);
    wrapper.instance().componentWillReceiveProps();
    changeEffectiveDate({}, props.dispatch, props);
    reinstatePolicySubmit({}, props.dispatch, props);
    showEffectiveDatePopUp(props);
    hideEffectiveDatePopUp(props)
  });
});
