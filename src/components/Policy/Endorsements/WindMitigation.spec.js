import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import WindMitigationComponent from './WindMitigation';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing WindMitigation component', () => {
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
      <WindMitigationComponent store={store} {...props} />
    );

    wrapper
      .find('[name="property.windMitigation.roofCovering"]')
      .simulate('change', { target: { value: 'Other' } });
    wrapper
      .find('[name="property.windMitigation.roofDeckAttachment"]')
      .simulate('change', { target: { value: 'Other' } });
    wrapper
      .find('[name="property.windMitigation.roofToWallConnection"]')
      .simulate('change', { target: { value: 'Other' } });
    wrapper
      .find('[name="property.windMitigation.roofGeometry"]')
      .simulate('change', { target: { value: 'Other' } });
    wrapper
      .find('[name="property.windMitigation.secondaryWaterResistance"]')
      .simulate('change', { target: { value: '140' } });
    wrapper
      .find('[name="property.windMitigation.openingProtection"]')
      .simulate('change', { target: { value: '140' } });
    wrapper
      .find('[name="property.windMitigation.floridaBuildingCodeWindSpeed"]')
      .simulate('change', { target: { value: 'C' } });
    wrapper
      .find(
        '[name="property.windMitigation.floridaBuildingCodeWindSpeedDesign"]'
      )
      .simulate('change', { target: { value: 'Other' } });
    wrapper
      .find('[name="property.windMitigation.terrain"]')
      .simulate('change', { target: { value: 'Other' } });
    wrapper
      .find('[name="property.windMitigation.internalPressureDesign"]')
      .simulate('change', { target: { value: 'Other' } });

    wrapper
      .find('[name="property.windMitigation.windBorneDebrisRegion"]')
      .simulate('change', { target: { value: 'Other' } });
  });
});
