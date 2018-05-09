import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import PolicyHolderComponent from './PolicyHolder';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing PolicyHolder component', () => {
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
      }
    };
    const wrapper = shallow(<PolicyHolderComponent store={store} {...props} />);

    wrapper.find('[name="pH1FirstName"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="pH1LastName"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="pH1phone"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="pH1secondaryPhone"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="pH1email"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="pH2FirstName"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="pH2LastName"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="pH2phone"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="pH2secondaryPhone"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="pH2email"]').simulate('change', { target: { value: 'ABC@gmail.com' } });
  });
});
