import configureStore from 'redux-mock-store';
import { http as axios} from '@exzeo/core-ui';
import MockAdapter from 'axios-mock-adapter';
import * as types from './actionTypes';
import * as serviceActions from './service.actions';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Service Actions', () => {
  const baseProps = {
    endorsementDate: '2017-02-02',
    zipcodeSettings: { timezone: 'America/New_York' },
    policy: {
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
        totalPremium: '1',
        worksheet: {
          elements: {
            windMitigationFactors: {

            }
          }
        }
      }
    },
    summaryLedger: { currentPremium: '1' }
  };

  it('should call serviceRequest', () => {
    const initialState = {};
    const store = mockStore(initialState);


    const stateObj = [{
      type: types.SERVICE_REQUEST,
      undefined
    }];

    store.dispatch(serviceActions.serviceRequest());
    expect(store.getActions()).toEqual(stateObj);
  });

  it('should clear agent', () => {
    const initialState = { service: { agents: ['Test Agent'] } };
    const store = mockStore(initialState);
    const agent = serviceActions.clearAgent()(store.dispatch);
    expect(store.getActions()[0].type).toEqual(types.SERVICE_REQUEST);
    expect(store.getActions()[0].data).toEqual({ agents: [] });
  });

  it('should call start getAgents', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc?getAgents`,
      data: {
        service: 'agency',
        method: 'GET',
        path: 'v1/agents/TTIC/FL'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);
    serviceActions.getAgents(store.dispatch);

    return serviceActions.getAgents('TTIC', 'FL', '', '', '', '', '', '')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });

  it('should fail start getAgents', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'agency',
        method: 'GET',
        path: 'v1/agents/TTIC/FL'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);
    serviceActions.getAgents(store.dispatch);

    return serviceActions.getAgents('4534', 'FL')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.APP_ERROR);
      });
  });

  it('should call start underwritingQuestions', () => {
    const mockAdapter = new MockAdapter(axios);

    const uw = [
      {
        _id: '11b1cd9f28479a0a989faa08',
        name: 'floodCoverage',
        model: 'quote',
        step: 'customizeDefaultQuote',
        question: 'Do you want Flood?',
        group: [
          'coverageLimits'
        ],
        order: 5,
        answerType: 'bool',
        answers: [
          {
            answer: 'Yes'
          },
          {
            answer: 'No'
          }
        ]
      }
    ];

    const property = {
      id: '12089DF01D986BF1A',
      source: 'CasaClue',
      physicalAddress: {
        address1: '95155 STINGRAY LN',
        address2: '',
        city: 'FERNANDINA BEACH',
        state: 'FL',
        county: 'NASSAU',
        zip: '32034',
        latitude: 30.57729,
        longitude: -81.50374,
        _id: '5866c036a46eb72908f3f55b'
      },
      residenceType: 'Single Family',
      yearBuilt: 2005,
      constructionType: 'Frame',
      territory: '892-0',
      protectionClass: 'A',
      buildingCodeEffectivenessGrading: 99,
      familyUnits: '1-2',
      squareFeet: 2066,
      sprinkler: 'no',
      floodZone: 'V',
      windMitigation: {
        roofGeometry: 'Other',
        roofDeckAttachment: 'A',
        secondaryWaterResistance: false,
        windBorneDebrisRegion: false,
        terrain: 'B',
        _id: '5866c036a46eb72908f3f55a'
      },
      _id: '5866c036a46eb72908f3f559',
      gatedCommunity: false,
      burglarAlarm: false,
      fireAlarm: false,
      trampoline: false,
      divingBoard: false,
      poolSecured: false,
      pool: false
    };

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc?getUnderwritingQuestions`,
      data: {
        service: 'questions',
        method: 'POST',
        path: 'questions/uw',
        data: {
          model: 'quote',
          step: 'askUWAnswers',
          quote: {
            companyCode: 'TTIC',
            state: 'FL',
            product: 'HO3',
            property
          }
        }
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: uw
    });

    const initialState = {};
    const store = mockStore(initialState);
    serviceActions.getUnderwritingQuestions(store.dispatch);

    return serviceActions.getUnderwritingQuestions('TTIC', 'FL', 'HO3', property)(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });

  it('should fail start underwritingQuestions', () => {
    const mockAdapter = new MockAdapter(axios);

    const uw = [
      {
        _id: '11b1cd9f28479a0a989faa08',
        name: 'floodCoverage',
        model: 'quote',
        step: 'customizeDefaultQuote',
        question: 'Do you want Flood?',
        group: [
          'coverageLimits'
        ],
        order: 5,
        answerType: 'bool',
        answers: [
          {
            answer: 'Yes'
          },
          {
            answer: 'No'
          }
        ]
      }
    ];

    const property = {
      id: '12089DF01D986BF1A',
      source: 'CasaClue',
      physicalAddress: {
        address1: '95155 STINGRAY LN',
        address2: '',
        city: 'FERNANDINA BEACH',
        state: 'FL',
        county: 'NASSAU',
        zip: '32034',
        latitude: 30.57729,
        longitude: -81.50374,
        _id: '5866c036a46eb72908f3f55b'
      },
      residenceType: 'Single Family',
      yearBuilt: 2005,
      constructionType: 'Frame',
      territory: '892-0',
      protectionClass: 'A',
      buildingCodeEffectivenessGrading: 99,
      familyUnits: '1-2',
      squareFeet: 2066,
      sprinkler: 'no',
      floodZone: 'V',
      windMitigation: {
        roofGeometry: 'Other',
        roofDeckAttachment: 'A',
        secondaryWaterResistance: false,
        windBorneDebrisRegion: false,
        terrain: 'B',
        _id: '5866c036a46eb72908f3f55a'
      },
      _id: '5866c036a46eb72908f3f559',
      gatedCommunity: false,
      burglarAlarm: false,
      fireAlarm: false,
      trampoline: false,
      divingBoard: false,
      poolSecured: false,
      pool: false
    };

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'questions',
        method: 'POST',
        path: 'questions/uw',
        data: {
          model: 'quote',
          step: 'askUWAnswers',
          quote: {
            companyCode: 'TTIC',
            state: 'FL',
            product: 'HO3',
            property
          }
        }
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: uw
    });

    const initialState = {};
    const store = mockStore(initialState);
    serviceActions.getUnderwritingQuestions(store.dispatch);

    return serviceActions.getUnderwritingQuestions('55', '55', '543', property)(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.APP_ERROR);
      });
  });

  it('should add transaction', () => {
    const props = {
      policy: {
        state: 'FL',
        product: 'HO3',
        policyTerm: 'A',
        policyAccountCode: '123',
        policyNumber: '123'
      },
      auth: {
        userProfile: {
          groups: [{
            companyCode: 'TTIC'
          }]
        }
      }
    };

    const submitData = {};

    submitData.cashDate = '2017-07-27';
    submitData.batchNumber = String('2017072701');
    submitData.amount = Number(String('400').replace(/[^\d.-]/g, ''));
    submitData.cashType = String('Electronic Deposit');
    submitData.cashDescription = String('Payment Received');
    submitData.companyCode = 'TTIC';
    submitData.policy = props.policy;
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc?addTransaction`,
      data: {
        service: 'billing',
        method: 'POST',
        path: 'post-payment-transaction',
        data: {
          companyCode: submitData.companyCode,
          state: submitData.policy.state,
          product: submitData.policy.product,
          policyNumber: submitData.policy.policyNumber,
          policyTerm: submitData.policy.policyTerm,
          policyAccountCode: submitData.policy.policyAccountCode,
          date: submitData.cashDate,
          type: submitData.cashType,
          description: submitData.cashDescription,
          batch: submitData.batchNumber,
          amount: submitData.amount
        }
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);

    return serviceActions.addTransaction(submitData)(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });

  it('should call start getBillingOptions', () => {
    const mockAdapter = new MockAdapter(axios);

    const paymentOptions = {
      effectiveDate: '2017-08-08',
      policyHolders: [
        {
          id: '523abc231c049a02e',
          order: 1,
          entityType: 'Person',
          firstName: 'John',
          lastName: 'Smith',
          primaryPhoneNumber: '8135551234',
          emailAddress: 'john.smith@google.com'
        }],
      additionalInterests: [],
      netPremium: 123,
      fees: {
        empTrustFee: 123,
        mgaPolicyFee: 123
      },
      totalPremium: 123
    };

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc?getBillingOptions`,
      data: {
        service: 'billing',
        method: 'POST',
        path: 'payment-options-for-quoting',
        data: paymentOptions
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);

    return serviceActions.getBillingOptions(paymentOptions)(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });

  it('should fail start getBillingOptions', () => {
    const mockAdapter = new MockAdapter(axios);

    const paymentOptions = {
      effectiveDate: '2017-08-08',
      policyHolders: [
        {
          id: '523abc231c049a02e',
          order: 1,
          entityType: 'Person',
          firstName: 'John',
          lastName: 'Smith',
          primaryPhoneNumber: '8135551234',
          emailAddress: 'john.smith@google.com'
        }],
      additionalInterests: [],
      netPremium: 123,
      fees: {
        empTrustFee: 123,
        mgaPolicyFee: 123
      },
      totalPremium: 123
    };

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'billing',
        method: 'POST',
        path: 'payment-options-for-quoting',
        data: paymentOptions
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);

    return serviceActions.getBillingOptions('43543534')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.APP_ERROR);
      });
  });

  it('should call start getQuote', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc?getQuote`,
      data: {
        service: 'quote-data',
        method: 'GET',
        path: '1234'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);
    serviceActions.getQuote(store.dispatch);

    return serviceActions.getQuote('1234')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });

  it('should fail start getQuote', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'quote-data',
        method: 'GET',
        path: '543543543'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);
    serviceActions.getQuote(store.dispatch);

    return serviceActions.getQuote(null)(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.APP_ERROR);
      });
  });

  it('should call start getZipcodeSettings', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc?getZipcodeSettings`,
      data: {
        service: 'underwriting',
        method: 'GET',
        path: 'zip-code?companyCode=TTIC&state=FL&product=HO3&zip=33607'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);
    serviceActions.getZipcodeSettings(store.dispatch);

    return serviceActions.getZipcodeSettings('TTIC', 'FL', 'HO3', '33607')(store.dispatch)
      .then((result) => {
        expect(store.getActions()[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });

  it('should fail start getZipcodeSettings', () => {
    const mockAdapter = new MockAdapter(axios);
    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'underwriting',
        method: 'GET',
        path: 'zip-code?companyCode=TTIC&state=FL&product=HO3&zip=33607'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);
    serviceActions.getZipcodeSettings(store.dispatch);

    return serviceActions.getZipcodeSettings(null)(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.APP_ERROR);
      });
  });

  it('should call start getAgencies', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc?getAgencies`,
      data: {
        service: 'agency',
        method: 'GET',
        path: 'v1/agencies/TTIC/FL?pageSize=1000&sort=displayName&SortDirection=asc'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);
    serviceActions.getAgencies(store.dispatch);

    return serviceActions.getAgencies('TTIC', 'FL')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });

  it('should fail start getAgencies', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'agency',
        method: 'GET',
        path: 'v1/agencies/TTIC/FL'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);
    serviceActions.getAgencies(store.dispatch);

    return serviceActions.getAgencies(null, 'FL')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.APP_ERROR);
      });
  });

  it('should fail saveBillingInfo', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'quote-data',
        method: 'put',
        path: ' ',
        data: {
          _id: 123,
          billToType: 'Policyholder',
          billToId: '123456',
          billPlan: 'Annual'
        }
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);

    return serviceActions.saveBillingInfo(null)(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.APP_ERROR);
      });
  });

  it('should call start getAgency', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc?getAgency`,
      data: {
        service: 'agency',
        method: 'GET',
        path: 'v1/agency/TTIC/FL/HO3'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);

    return serviceActions.getAgency('TTIC', 'FL', 'HO3')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });

  it('should fail start getAgency', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'agency',
        method: 'GET',
        path: 'v1/agency/TTIC/FL/HO3'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);
    return serviceActions.getAgency(null)(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.APP_ERROR);
      });
  });

  it('should call start getAgentsByAgency', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc?getAgentsByAgency`,
      data: {
        service: 'agency',
        method: 'GET',
        path: 'v1/agents/TTIC/FL?agencyCode=2'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);

    return serviceActions.getAgentsByAgency('TTIC', 'FL', 2)(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });

  it('should fail start getAgentsByAgency', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'agency',
        method: 'GET',
        path: 'v1/agents/TTIC/FL?agencyCode=2'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);
    return serviceActions.getAgentsByAgency(null)(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.APP_ERROR);
      });
  });
});
