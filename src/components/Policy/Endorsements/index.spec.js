import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { Endorsements, getNewPolicyNumber } from './index';

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);
const policy = {
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
  },
  underwritingAnswers: {
    rented: {},
    monthsOccupied: {},
    noPriorInsuranceSurcharge: {}

  },
  rating: {
    worksheet: {
      elements: {
        windMitigationFactors: {

        }
      }
    }
  }
};
const initialState = {
  service: {
    latestPolicy: policy
  },
  cg: {
    bb: {
      data: {
        modelInstanceId: '123',
        model: {},
        uiQuestions: []
      }
    }
  },
  appState: {
    data: { activateRedirect: false },
    modelName: 'bb'
  }
};
const store = mockStore(initialState);
const baseProps = {
  change() {},
  reset() {},
  handleSubmit() {},
  zipcodeSettings: {},
  summaryLedger: {},
  errorActions: { dispatchClearAppError() { } },
  getZipcodeSettings() {},
  getUnderwritingQuestions() {},
  getEndorsementHistory() {},
  submitEndorsementForm() { return Promise.resolve(); },
  getRate() { return Promise.resolve({ rating: {} }); },
  clearRate() {},
  getUIQuestions() {},
  initialValues: {},
  quoteData: {},
  userProfile: {
    resources: [
      {
        right: 'UPDATE',
        uri: 'TTIC:FL:HO3:PolicyData:PremiumEndorse'
      }
    ]
  },
  policy
};


describe('Testing Endorsements component', () => {


  beforeEach(() => {
    localStorage.setItem('isNewTab', true);
    localStorage.setItem('lastSearchData', JSON.stringify({
      searchType: 'policy'
    }));
  });

  it('should test connected app', () => {
    const wrapper = shallow(<Endorsements store={store} {...baseProps} />);
    expect(wrapper);

    wrapper.instance().normalizeDwellingDependencies('5000', baseProps.policy, 'coverageLimits.otherStructures.amount');

    baseProps.getRate = { worksheet: {} };
    getNewPolicyNumber(initialState);
  });
});

describe('Testing Endorsements component', () => {
  it('should test connected app without permission', () => {
    const props = {
      ...baseProps,
      userProfile: {
        resources: [
          {
            right: 'UPDATE',
            uri: 'TTIC:FL:HO3:PolicyData:Transaction'
          }
        ]
      }
    };

    localStorage.setItem('isNewTab', true);
    localStorage.setItem('lastSearchData', JSON.stringify({
      searchType: 'policy'
    }));

    const wrapper = shallow(<Endorsements store={store} {...props} />);
    // wrapper.instance().componentWillReceiveProps(props);
    expect(wrapper.find('.error').text()).toEqual(' Endorsement page cannot be accessed due to User Permissions.');
    expect(wrapper);
  });
});
