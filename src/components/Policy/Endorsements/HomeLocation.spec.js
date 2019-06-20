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
      questions: {},
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
        personalProperty: ''
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
    wrapper
      .find('[name="property.buildingCodeEffectivenessGrading"]')
      .simulate('change', { target: { value: '04' } });
    wrapper
      .find('[name="property.familyUnits"]')
      .simulate('change', { target: { value: '1-2' } });
    wrapper
      .find('[name="property.floodZone"]')
      .simulate('change', { target: { value: 'A' } });
    wrapper
      .find('[name="property.distanceToTidalWater"]')
      .simulate('change', { target: { value: '686.5' } });
    wrapper
      .find('[name="property.distanceToFireHydrant"]')
      .simulate('change', { target: { value: '1000' } });
    wrapper
      .find('[name="property.distanceToFireStation"]')
      .simulate('change', { target: { value: '0.4' } });
    wrapper
      .find('[name="property.residenceType"]')
      .simulate('change', { target: { value: 'SINGLE FAMILY' } });
    wrapper
      .find('[name="property.squareFeet"]')
      .simulate('change', { target: { value: '2000' } });
    wrapper
      .find('[name="property.yearOfRoof"]')
      .simulate('change', { target: { value: '2000' } });
  });
});
