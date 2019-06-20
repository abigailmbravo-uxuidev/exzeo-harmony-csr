import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { MortgageBilling, handleInitialize } from './MortgageBilling';

const middlewares = [];
const mockStore = configureStore(middlewares);

const additionalInterests = [
  {
    type: 'Mortgagee',
    name1: 'BB1',
    name2: 'CC1',
    active: true,
    referenceNumber: '1001',
    phoneNumber: '1234567890',
    mailingAddress: {
      address1: '123 this way dr',
      city: 'Tampa',
      state: 'FL',
      zip: '33611',
      country: {
        code: 'US',
        displayText: 'United States'
      }
    }
  },
  {
    type: 'Additional Insured',
    name1: 'BB2',
    name2: 'CC2',
    active: true,
    referenceNumber: '1001',
    phoneNumber: '1234567890',
    mailingAddress: {
      address1: '123 this way dr',
      city: 'Tampa',
      state: 'FL',
      zip: '33611',
      country: {
        code: 'US',
        displayText: 'United States'
      }
    }
  },
  {
    type: 'Bill Payer',
    name1: 'BB2',
    name2: 'CC2',
    active: true,
    referenceNumber: '1001',
    phoneNumber: '1234567890',
    mailingAddress: {
      address1: '123 this way dr',
      city: 'Tampa',
      state: 'FL',
      zip: '33611',
      country: {
        code: 'US',
        displayText: 'United States'
      }
    }
  },
  {
    type: 'Premium Finance',
    name1: 'BB3',
    referenceNumber: '1001',
    phoneNumber: '1234567890',
    name2: 'CC3',
    active: true,
    mailingAddress: {
      address1: '123 this way dr',
      city: 'Tampa',
      state: 'FL',
      zip: '33611',
      country: {
        code: 'US',
        displayText: 'United States'
      }
    }
  },
  {
    type: 'Additional Interest',
    name1: 'BB3',
    referenceNumber: '1001',
    phoneNumber: '1234567890',
    name2: 'CC3',
    active: true,
    mailingAddress: {
      address1: '123 this way dr',
      city: 'Tampa',
      state: 'FL',
      zip: '33611',
      country: {
        code: 'US',
        displayText: 'United States'
      }
    }
  }
];

const body = {
  service: 'billing',
  method: 'POST',
  path: 'post-payment-transaction',
  data: {
    companyCode: 'TTIC',
    state: 'FL',
    product: 'HO3',
    policyNumber: 10000,
    policyTerm: 1,
    policyAccountCode: '1234567',
    date: new Date(),
    type: 'Cash',
    description: 'Annual Payment',
    batch: '239484-333838',
    amount: 100.0
  }
};

const policy = {
  additionalInterests,
  policyTerm: 1,
  updatedAt: '2017-06-30T14:59:40.455Z',
  policyHolders: [
    {
      _id: '5956661c34e29b001392cb14',
      emailAddress: 'sangramp@exzeo.com',
      primaryPhoneNumber: '7878787878',
      lastName: 'Pundir',
      firstName: 'Sangram',
      entityType: 'Person',
      order: 0,
      electronicDelivery: false
    }
  ],
  state: 'FL',
  companyCode: 'TTIC',
  policyNumber: '12-1001692-01',
  policyID: '5956675cfbb0bc00128146df',
  effectiveDate: '2017-07-05T00:00:00.000Z',
  property: {
    fireAlarm: false,
    windMitigation: {
      roofGeometry: 'Other',
      floridaBuildingCodeWindSpeed: 110,
      _id: '5956662034e29b001392cb2e',
      secondaryWaterResistance: true,
      internalPressureDesign: 'Other',
      roofCovering: 'Other',
      openingProtection: 'Other',
      terrain: 'B',
      floridaBuildingCodeWindSpeedDesign: 110,
      roofDeckAttachment: 'Other',
      windBorneDebrisRegion: true,
      roofToWallConnection: 'Other'
    },
    floodZone: 'X',
    source: 'CasaClue',
    squareFeet: 1859,
    poolSecured: true,
    gatedCommunity: false,
    residenceType: 'SINGLE FAMILY',
    _id: '5956662034e29b001392cb2d',
    distanceToTidalWater: 249480,
    buildingCodeEffectivenessGrading: 99,
    familyUnits: '1-2',
    burglarAlarm: false,
    constructionType: 'MASONRY',
    trampoline: false,
    divingBoard: false,
    distanceToFireStation: 0.82,
    id: '120955451A785575A',
    yearBuilt: 2007,
    territory: '090-0',
    sprinkler: 'N',
    pool: false,
    yearOfRoof: null,
    physicalAddress: {
      city: 'WINTER GARDEN',
      latitude: 28.53985,
      zip: '34787',
      state: 'FL',
      _id: '595665f934e29b001392ca68',
      address2: '',
      longitude: -81.59015,
      county: 'ORANGE',
      address1: '344 WINTER NELLIS CIR'
    },
    distanceToFireHydrant: 1000,
    protectionClass: 5,
    townhouseRowhouse: false
  },
  product: 'HO3',
  rating: {
    worksheet: {
      fees: {}
    }
  }
};

describe('Testing MortgageBilling component', () => {
  it('should test connected app', () => {
    const initialState = {
      service: {},
      policyState: {},
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
    const props = {
      sortedAdditionalInterests: [],
      cashDescriptionOptions: { test: [] },
      cashTypeValue: 'test',
      paymentOptions: [],
      batchActions() {},
      getPaymentHistory() {},
      getPaymentOptionsApplyPayments() {},
      getBillingOptionsForPolicy() {},
      getSummaryLedger() {},
      addTransaction() {
        return Promise.resolve();
      },
      createTransaction() {
        return Promise.resolve();
      },
      getUIQuestions() {},
      updatePolicy() {},
      getPolicy() {},
      billingOptions: {},
      change() {},
      reset() {},
      auth: {
        userProfile: {
          groups: [{ companyCode: 'TTIC' }]
        }
      },
      policy,
      handleSubmit() {},
      fieldValues: {},
      summaryLedger: {
        currentPremium: '123',
        cashReceived: '1'
      },
      quoteData: {},
      dispatch() {},
      appState: {
        data: {
          submitting: false
        }
      }
    };
    const wrapper = shallow(<MortgageBilling {...props} />);
    expect(wrapper);

    handleInitialize(initialState);
    wrapper.instance().addAdditionalInterest('Mortgagee');
    wrapper.instance().editAI(additionalInterests[0]);
    wrapper.instance().hideAdditionalInterestModal(props);

    wrapper.instance().handleFormSubmit({ body });
    wrapper.instance().handleBillingEdit();
    wrapper.instance().setBatch('');

    wrapper.instance().amountFormatter(100);
    wrapper.instance().dateFormatter('123');
    wrapper
      .instance()
      .handleAISubmit({ type: 'Mortgagee' }, props.dispatch, props);
    wrapper.instance().toggleAIState(additionalInterests[1], props);
  });
});
