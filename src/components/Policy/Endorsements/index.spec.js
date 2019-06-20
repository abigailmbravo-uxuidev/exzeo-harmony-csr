import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { Endorsements, getNewPolicyNumber } from './index';

const middlewares = [thunk];
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
        windMitigationFactors: {}
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
  initialize() {},
  errorActions: { clearAppError() {} },
  getZipcodeSettings() {},
  getUnderwritingQuestions() {},
  getEndorsementHistory() {},
  submitEndorsementForm() {
    return Promise.resolve();
  },
  getRate() {
    return Promise.resolve({ rating: {} });
  },
  getNewRate() {},
  clearRate() {},
  getUIQuestions() {},
  userProfile: {
    resources: [
      {
        right: 'UPDATE',
        uri: 'TTIC:FL:HO3:PolicyData:PremiumEndorse'
      }
    ]
  },
  questions: {},
  zipcodeSettings: {},
  summaryLedger: {},
  quoteData: {},
  selectedValues: {
    clearFields: false,
    coverageLimits: { personalProperty: { amount: 0 } }
  },
  initialValues: policy,
  policy
};

describe('Test the Endorsements form component', () => {
  beforeEach(() => {
    localStorage.setItem('isNewTab', true);
    localStorage.setItem(
      'lastSearchData',
      JSON.stringify({
        searchType: 'policy'
      })
    );
  });

  it('should test connected app', () => {
    const wrapper = shallow(<Endorsements {...baseProps} />);
    expect(wrapper);

    baseProps.getRate = { worksheet: {} };
    getNewPolicyNumber(initialState);
  });

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
    localStorage.setItem(
      'lastSearchData',
      JSON.stringify({
        searchType: 'policy'
      })
    );

    const wrapper = shallow(<Endorsements {...props} />);
    // wrapper.instance().componentWillReceiveProps(props);
    expect(wrapper.find('.error').text()).toEqual(
      ' Endorsement page cannot be accessed due to User Permissions.'
    );
    expect(wrapper);
  });

  it('Should allow for instance methods to be called', () => {
    const wrapper = shallow(<Endorsements {...baseProps} />);
    const inst = wrapper.instance();
    const fn = () => {};

    inst.clearCalculate();
    inst.setCalculate();
    inst.setPHToggle();
    inst.setSecondaryPolicyHolder(true);
    inst.normalizeSinkholeAmount(false, false, policy);
    inst.normalizeSinkholeAmount(true, false, policy);
    inst.normalizeDwellingAmount(1000, 1100, policy);
    inst.normalizeIncidentalOccupancies(true, true, policy);
    inst.normalizePersonalPropertyPercentage(10, 10, policy, 'test');
  });
});
