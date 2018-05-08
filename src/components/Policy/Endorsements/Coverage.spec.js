import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import CoverageComponent from './Coverage';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing Coverage component', () => {
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
    const wrapper = shallow(<CoverageComponent store={store} {...props} />);

    wrapper.find('[name="otherStructuresNew"]').simulate('change', { target: { value: '4,540' } });
    wrapper.update();
    // console.log(wrapper.props().fieldValues);
    wrapper.find('[name="personalPropertyNew"]').simulate('change', { target: { value: '4,540' } });
    wrapper.find('[name="personalLiabilityNew"]').simulate('change', { target: { value: '4,540' } });
    wrapper.find('[name="moldPropertyNew"]').simulate('change', { target: { value: '10,000' } });
    wrapper.find('[name="moldLiabilityNew"]').simulate('change', { target: { value: '50,000' } });
    wrapper.find('[name="allOtherPerilsNew"]').simulate('change', { target: { value: '1,000' } });
    wrapper.find('[name="hurricaneNew"]').simulate('change', { target: { value: '2,000' } });
    wrapper.find('[name="sinkholePerilCoverageNew"]').simulate('change', { target: { value: true } });
    wrapper.find('[name="personalPropertyReplacementCostCoverageNew"]').simulate('change', { target: { value: true } });
    wrapper.find('[name="ordinanceOrLawNew"]').simulate('change', { target: { value: 25 } });
    wrapper.find('[name="propertyIncidentalOccupanciesMainDwellingNew"]').simulate('change', { target: { value: true } });
    wrapper.find('[name="propertyIncidentalOccupanciesOtherStructuresNew"]').simulate('change', { target: { value: true } });

    wrapper.find('[name="liabilityIncidentalOccupanciesNew"]').simulate('change', { target: { value: true } });
    wrapper.find('[name="townhouseRowhouseNew"]').simulate('change', { target: { value: true } });
    wrapper.find('[name="rentedNew"]').simulate('change', { target: { value: true } });
    wrapper.find('[name="monthsOccupiedNew"]').simulate('change', { target: { value: '10+' } });
    wrapper.find('[name="noPriorInsuranceNew"]').simulate('change', { target: { value: 'Yes' } });
    wrapper.find('[name="burglarAlarmNew"]').simulate('change', { target: { value: true } });
    wrapper.find('[name="fireAlarmNew"]').simulate('change', { target: { value: true } });
    wrapper.find('[name="sprinklerNew"]').simulate('change', { target: { value: 'N' } });
  });
});
