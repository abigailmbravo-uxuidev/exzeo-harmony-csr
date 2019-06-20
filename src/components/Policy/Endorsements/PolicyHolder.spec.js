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

    wrapper
      .find('[name="policyHolders[0].firstName"]')
      .simulate('change', { target: { value: 'ABC' } });
    wrapper
      .find('[name="policyHolders[0].lastName"]')
      .simulate('change', { target: { value: 'ABC' } });
    wrapper
      .find('[name="policyHolders[0].primaryPhoneNumber"]')
      .simulate('change', { target: { value: 'ABC' } });
    wrapper
      .find('[name="policyHolders[0].secondaryPhoneNumber"]')
      .simulate('change', { target: { value: 'ABC' } });
    wrapper
      .find('[name="policyHolders[0].emailAddress"]')
      .simulate('change', { target: { value: 'ABC' } });
    wrapper
      .find('[name="policyHolders[1].firstName"]')
      .simulate('change', { target: { value: 'ABC' } });
    wrapper
      .find('[name="policyHolders[1].lastName"]')
      .simulate('change', { target: { value: 'ABC' } });
    wrapper
      .find('[name="policyHolders[1].primaryPhoneNumber"]')
      .simulate('change', { target: { value: 'ABC' } });
    wrapper
      .find('[name="policyHolders[1].secondaryPhoneNumber"]')
      .simulate('change', { target: { value: 'ABC' } });
    wrapper
      .find('[name="policyHolders[1].emailAddress"]')
      .simulate('change', { target: { value: 'ABC' } });
  });
});
