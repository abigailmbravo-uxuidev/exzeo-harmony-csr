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
    const wrapper = shallow(<WindMitigationComponent store={store} {...props} />);

    wrapper.find('[name="roofDeckAttachmentNew"]').simulate('change', { target: { value: 'Other' } });
    wrapper.find('[name="roofToWallConnectionNew"]').simulate('change', { target: { value: 'Other' } });
    wrapper.find('[name="secondaryWaterResistanceNew"]').simulate('change', { target: { value: 'Other' } });
    wrapper.find('[name="openingProtectionNew"]').simulate('change', { target: { value: 'Other' } });
    wrapper.find('[name="floridaBuildingCodeWindSpeedNew"]').simulate('change', { target: { value: '140' } });
    wrapper.find('[name="floridaBuildingCodeWindSpeedDesignNew"]').simulate('change', { target: { value: '140' } });
    wrapper.find('[name="terrainNew"]').simulate('change', { target: { value: 'C' } });
    wrapper.find('[name="internalPressureDesignNew"]').simulate('change', { target: { value: 'Other' } });
    wrapper.find('[name="windBorneDebrisRegionNew"]').simulate('change', { target: { value: 'Other' } });
  });
});
