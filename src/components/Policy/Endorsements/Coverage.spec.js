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
        policyHolders: [{}, {}],
        property: { windMitigation: {}, physicalAddress: {} },
        policyHolderMailingAddress: {},
        coverageLimits: {
          dwelling: {},
          otherStructures: {},
          personalProperty: {},
          lossOfUse: {},
          medicalPayments: {},
          moldProperty: {},
          personalLiability: {},
          moldLiability: {},
          ordinanceOrLaw: {}
        },
        deductibles: {
          allOtherPerils: {},
          hurricane: {},
          sinkhole: {}

        },
        coverageOptions: {
          sinkholePerilCoverage: {},
          propertyIncidentalOccupanciesMainDwelling: {},
          propertyIncidentalOccupanciesOtherStructures: {},
          liabilityIncidentalOccupancies: {},
          personalPropertyReplacementCost: {}
        }
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

    wrapper.find('[name="coverageLimits.dwelling.amount"]').simulate('change', { target: { value: '4,540' } });
    wrapper.find('[name="coverageLimits.otherStructures.amount"]').simulate('change', { target: { value: '4,540' } });
    wrapper.find('[name="coverageLimits.otherStructures.percentage"]').simulate('change', { target: { value: '4,540' } });
    wrapper.find('[name="coverageLimits.personalProperty.amount"]').simulate('change', { target: { value: '10,000' } });
    wrapper.find('[name="coverageLimits.personalProperty.percentage"]').simulate('change', { target: { value: '50,000' } });
    wrapper.find('[name="coverageLimits.lossOfUse.amount"]').simulate('change', { target: { value: '1,000' } });
    wrapper.find('[name="coverageLimits.personalLiability.amount"]').simulate('change', { target: { value: '2,000' } });
    wrapper.find('[name="coverageLimits.medicalPayments.amount"]').simulate('change', { target: { value: true } });
    wrapper.find('[name="coverageLimits.moldProperty.amount"]').simulate('change', { target: { value: true } });
    wrapper.find('[name="coverageLimits.moldLiability.amount"]').simulate('change', { target: { value: 25 } });

    wrapper.find('[name="deductibles.allOtherPerils.amount"]').simulate('change', { target: { value: true } });
    wrapper.find('[name="deductibles.hurricane.amount"]').simulate('change', { target: { value: true } });

    wrapper.find('[name="coverageOptions.sinkholePerilCoverage.answer"]').simulate('change', { target: { value: true } });
  });
});
