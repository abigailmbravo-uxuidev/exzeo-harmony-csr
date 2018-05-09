import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import HomeLocationComponent from './HomeLocation';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing HomeLocation component', () => {
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
    const wrapper = shallow(<HomeLocationComponent store={store} {...props} />);
    wrapper.find('[name="buildingCodeEffectivenessGradingNew"]').simulate('change', { target: { value: '04' } });
    wrapper.find('[name="familyUnitsNew"]').simulate('change', { target: { value: '1-2' } });
    wrapper.find('[name="floodZoneNew"]').simulate('change', { target: { value: 'A' } });
    wrapper.find('[name="distanceToTidalWaterNew"]').simulate('change', { target: { value: '686.5' } });
    wrapper.find('[name="distanceToFireHydrantNew"]').simulate('change', { target: { value: '1000' } });
    wrapper.find('[name="distanceToFireStationNew"]').simulate('change', { target: { value: '0.4' } });
    wrapper.find('[name="residenceTypeNew"]').simulate('change', { target: { value: 'SINGLE FAMILY' } });
    wrapper.find('[name="squareFeetNew"]').simulate('change', { target: { value: '2000' } });
    wrapper.find('[name="yearOfRoofNew"]').simulate('change', { target: { value: '2000' } });
  });
});
