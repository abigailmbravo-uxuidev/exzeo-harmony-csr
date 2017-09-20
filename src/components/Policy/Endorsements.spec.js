import React from 'react';
import thunk from 'redux-thunk';
import localStorage from 'localStorage';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow, mount } from 'enzyme';
import { Endorsements, handleGetPolicy, calculatePercentage, handleInitialize, setPercentageOfValue, updateDependencies, calculate } from './Endorsements';

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

describe('Testing Endorsements component', () => {
  it('should test connected app', () => {
    const initialState = {
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
      actions: {
        errorActions: { dispatchClearAppError() { } },
        serviceActions: {
          getEndorsementHistory() {},
          getBillingOptions() { },
          addTransaction() { return Promise.resolve(); },
          getTransactionHistory() {},
          getSummaryLedger() {},
          getPaymentHistory() {},
          getPaymentOptionsApplyPayments() {}
        },
        cgActions: {
          batchCompleteTask() { return Promise.resolve(); }
        },
        appStateActions: {
          setAppState() {}
        }
      },
      initialValues: {},
      fieldValues: {},
      policy: {},
      handleSubmit() {},
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      }
    };

    localStorage.setItem('isNewTab', true);
    localStorage.setItem('lastSearchData', JSON.stringify({
      searchType: 'policy'
    }));

    const wrapper = shallow(<Endorsements store={store} {...props} />);
    expect(wrapper);

    handleGetPolicy(initialState);
    calculatePercentage(100, 200);
    handleInitialize(initialState);
    setPercentageOfValue(234, 1);
    updateDependencies({ target: { value: '' } }, 'ds', 'sdf', props);
    calculate({}, props.dispatch, props);
  });
});
