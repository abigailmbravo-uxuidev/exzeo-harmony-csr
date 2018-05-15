import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { Endorsements, calculatePercentage, handleInitialize, setPercentageOfValue,
  updateDependencies, calculate, save, setCalculate, updateCalculatedSinkhole,
  getNewPolicyNumber, setEndorsementDate, clearSecondaryPolicyholder } from './index';

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

describe('Testing Endorsements component', () => {
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
        data: { activateRedirect: false },
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      change() {},
      zipcodeSettings: {},
      summaryLedger: {},
      reset() {},
      getRate: {},
      actions: {
        errorActions: { dispatchClearAppError() { } },
        serviceActions: {
          getZipcodeSettings() {},
          getUnderwritingQuestions() {},
          getEndorsementHistory() {},
          getBillingOptionsForPolicy() { },
          addTransaction() { return Promise.resolve(); },
          getRate() { return Promise.resolve({ rating: {} }); },
          getTransactionHistory() {},
          getSummaryLedger() {},
          getPaymentHistory() {},
          getPaymentOptionsApplyPayments() {},
          clearRate() {}
        },
        cgActions: {
          startWorkflow() { return Promise.resolve({ payload: [{ workflowData: { endorsePolicyModelSave: { data: {} }, endorsePolicyModelCalculate: { data: {} } } }] }); },
          batchCompleteTask() { return Promise.resolve(); }
        },
        questionsActions: {
          getUIQuestions() {}
        },
        appStateActions: {
          setAppState() {}
        }
      },
      initialValues: {},
      fieldValues: {},
      policy: {
        policyNumber: '112',
        rating: {},
        property: {},
        policyHolderMailingAddress: {}
      },
      handleSubmit() {},
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          isCalculated: true,
          isSubmitting: true,
          submitting: false
        }
      },
      userProfile: {
        resources: [
          {
            right: 'UPDATE',
            uri: 'TTIC:FL:HO3:PolicyData:PremiumEndorse'
          }
        ]
      }
    };

    localStorage.setItem('isNewTab', true);
    localStorage.setItem('lastSearchData', JSON.stringify({
      searchType: 'policy'
    }));

    const wrapper = shallow(<Endorsements store={store} {...props} />);
    expect(wrapper);

    handleInitialize(initialState);
    wrapper.instance().updateDwellingAndDependencies('5000', '100', {});

    props.getRate = { worksheet: {} };
    wrapper.instance().componentWillReceiveProps(props);


    getNewPolicyNumber(initialState);
  });
});

describe('Testing Endorsements component', () => {
  it('should test connected app without permission', () => {
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
        data: { activateRedirect: false },
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      zipcodeSettings: {},
      summaryLedger: {},
      reset() {},
      getRate: {},
      actions: {
        errorActions: { dispatchClearAppError() { } },
        serviceActions: {
          getZipcodeSettings() {},
          getUnderwritingQuestions() {},
          getEndorsementHistory() {},
          getBillingOptionsForPolicy() { },
          addTransaction() { return Promise.resolve(); },
          getRate() { return Promise.resolve({ rating: {} }); },
          getTransactionHistory() {},
          getSummaryLedger() {},
          getPaymentHistory() {},
          getPaymentOptionsApplyPayments() {},
          clearRate() {}
        },
        cgActions: {
          startWorkflow() { return Promise.resolve({ payload: [{ workflowData: { endorsePolicyModelSave: { data: {} }, endorsePolicyModelCalculate: { data: {} } } }] }); },
          batchCompleteTask() { return Promise.resolve(); }
        },
        questionsActions: {
          getUIQuestions() {}
        },
        appStateActions: {
          setAppState() {}
        }
      },
      initialValues: {},
      fieldValues: {},
      policy: {
        policyNumber: '112',
        rating: {},
        property: {},
        policyHolderMailingAddress: {}
      },
      handleSubmit() {},
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          isCalculated: true,
          isSubmitting: true,
          submitting: false
        }
      },
      userProfile: {
        resources: [
          {
            right: 'UPDATE',
            uri: 'TTIC:FL:HO3:PolicyData:Transaction'
          }
        ]
      }
    };

    localStorage.setItem('isNewTab', true);
    localStorage.setItem('lastSearchData', JSON.stringify({
      searchType: 'policy'
    }));

    const wrapper = shallow(<Endorsements store={store} {...props} />);
    wrapper.instance().componentWillReceiveProps(props);
    expect(wrapper.find('.error').text()).toEqual(' Endorsement page cannot be accessed due to User Permissions.');
    expect(wrapper);
  });
});
