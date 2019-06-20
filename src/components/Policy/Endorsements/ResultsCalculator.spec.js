import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import ResultsCalculatorComponent from './ResultsCalculator';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing ResultsCalculator component', () => {
  it('should test app render', () => {
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
          clearRate() {}
        }
      },
      fieldValues: {
        personalPropertyNew: ''
      },
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      },
      ...propTypes
    };
    const wrapper = shallow(
      <ResultsCalculatorComponent store={store} {...props} />
    );

    wrapper
      .find('[name="newEndorsementAmount"]')
      .simulate('change', { target: { value: 'ABC' } });
    wrapper
      .find('[name="newEndorsementPremium"]')
      .simulate('change', { target: { value: 'ABC' } });
    wrapper
      .find('[name="newAnnualPremium"]')
      .simulate('change', { target: { value: 'ABC' } });
  });
});
