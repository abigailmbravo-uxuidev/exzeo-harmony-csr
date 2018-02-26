import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp, { Policy, changeEffectiveDate, showEffectiveDatePopUp, hideEffectiveDatePopUp, reinstatePolicySubmit } from './Policy';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing Policy component', () => {
  it('should test connected app', () => {
    const initialState = {
      service: {
        latestPolicy: {}
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
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      summaryLedger: {
        status: {
          code: 13
        }
      },
      zipCodeSetting: {},
      policy: {
        policyNumber: '1234',
        property: {
          physicalAddress: {

          }
        }
      },
      actions: {
        policyStateActions: {
          updatePolicy() {}
        },
        cgActions: {
          startWorkflow() { return Promise.resolve({ payload: [{ workflowData: { effectiveDateChangeModel: { data: {} }, endorsePolicyModelCalculate: { data: {} } } }] }); },
          batchCompleteTask() { return Promise.resolve(); }
        },
        appStateActions: {
          setAppState() {}
        },
        serviceActions: {
          createTransaction() { return Promise.resolve(); },
          getZipcodeSettings() { return Promise.resolve(); },
          getSummaryLedger() { return Promise.resolve(); }
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
    const wrapper = shallow(<Policy store={store} {...props} />);
    expect(wrapper);
    changeEffectiveDate({}, props.dispatch, props);
    wrapper.instance().componentWillReceiveProps();
    reinstatePolicySubmit({}, props.dispatch, props)
  });
});
