import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import PropertyAddressComponent from './PropertyAddress';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing PropertyAddress component', () => {
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
    const wrapper = shallow(<PropertyAddressComponent store={store} {...props} />);

    wrapper.find('[name="property.physicalAddress.address1"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="property.physicalAddress.address2"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="property.physicalAddress.city"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="property.physicalAddress.state"]').simulate('change', { target: { value: 'FL' } });
    wrapper.find('[name="property.physicalAddress.zip"]').simulate('change', { target: { value: '33627' } });
  });
});
