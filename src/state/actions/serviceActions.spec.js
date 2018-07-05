import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as types from './actionTypes';
import * as serviceActions from './serviceActions';

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

  it('should call start getNotes', () => {
    const mockAdapter = new MockAdapter(axios);
    const note = {
      noteType: 'test',
      noteContent: 'test',
      contactType: 'Agent',
      createdAt: new Date().getTime(),
      noteAttachments: [],
      createdBy: {},
      updatedBy: {}
    };
    const axiosNotesOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'transaction-logs',
        method: 'GET',
        path: 'history?number=test'
      }
    };

    const axiosDocsOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'file-index',
        method: 'GET',
        path: 'v1/fileindex/test'
      }
    };

    mockAdapter
      .onPost(axiosNotesOptions.url).reply(200, { result: [note] })
      .onPost(axiosDocsOptions.url).reply(200, { result: [note] });

    const initialState = {};
    const store = mockStore(initialState);

    return serviceActions.getNotes('test')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });

  it('should call start addNotes', () => {
    const mockAdapter = new MockAdapter(axios);
    const createdAt = new Date().getTime();
    const note = {
      noteType: 'quoteNote',
      noteContent: 'test',
      contactType: 'Agent',
      createdAt,
      noteAttachments: [],
      createdBy: {},
      updatedBy: {}
    };

    const form = new FormData();

    Object.keys(note).forEach((key) => {
      const value = note[key];
      const fieldValue = key === 'createdBy' ? JSON.stringify(value) : value;
      form.append(key, fieldValue);
    });

    const url = `${process.env.REACT_APP_API_URL}/upload`;

    mockAdapter.onPost(url, form, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${form._boundary}`
      }
    }).reply(200, {
      data: [note]
    });

    const initialState = {};
    const store = mockStore(initialState);
    serviceActions.addNote(store.dispatch);

    const result = serviceActions.addNote(note, [])(store.dispatch);
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

    return serviceActions.getAgents('TTIC', 'FL', '', '', '', '', '', '')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.SERVICE_REQUEST);
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
        expect(store.getActions()[0].payload[0].type).toEqual(types.APP_ERROR);
      });
  });

  it('should call start searchAgents', () => {
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
        path: 'v1/agents/TTIC/FL?firstName=Test&lastName=Test&agentCode=003&mailingAddress=123Main&licenseNumber=licNumber'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);

    return serviceActions.searchAgents('TTIC', 'FL', 'Test', 'Test', '003', '123Main', 'licNumber')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });

  it('should call start searchAgencies', () => {
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
        path: 'v1/agencies/TTIC/FL?displayName=&agencyCode=&mailingAddress=&licenseNumber=&taxIdNumber=&primaryPhoneNumber='
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);
    serviceActions.searchAgencies(store.dispatch);

    return serviceActions.searchAgencies('TTIC', 'FL', '', '', '', '', '', '')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });

  it('should fail start searchAgencies', () => {
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
    serviceActions.searchAgencies(store.dispatch);

    return serviceActions.searchAgencies('454545', 'FL')(store.dispatch)
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

    return serviceActions.getUnderwritingQuestions('TTIC', 'FL', 'HO3', property)(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.SERVICE_REQUEST);
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
        expect(store.getActions()[0].payload[0].type).toEqual(types.APP_ERROR);
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
      url: `${process.env.REACT_APP_API_URL}/svc`,
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
        expect(store.getActions()[0].payload[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });

  it('should save underwritingExceptions', () => {
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
          underwritingExceptions: [{
            code: '101',
            displayText: 'Property in Do Not Write List',
            category: 'Property',
            action: 'Fatal Error',
            internalMessage: 'Address is not eligible for a stand alone flood policy based on the underwriting information.',
            agentMessage: 'Address is not eligible for a stand alone flood policy based on the underwriting information.',
            customerMessage: 'Address is not eligible for a stand alone flood policy based on the underwriting information.',
            active: true,
            canOverride: false,
            overridden: true
          }]
        }
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);

    return serviceActions.saveUnderwritingExceptions(123, [{
      code: '101',
      displayText: 'Property in Do Not Write List',
      category: 'Property',
      action: 'Fatal Error',
      internalMessage: 'Address is not eligible for a stand alone flood policy based on the underwriting information.',
      agentMessage: 'Address is not eligible for a stand alone flood policy based on the underwriting information.',
      customerMessage: 'Address is not eligible for a stand alone flood policy based on the underwriting information.',
      active: true,
      canOverride: false,
      overridden: true
    }])(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });

  it('should fail save underwritingExceptions', () => {
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
        path: '',
        data: {
          _id: 123,
          underwritingExceptions: [{
            code: '101',
            displayText: 'Property in Do Not Write List',
            category: 'Property',
            action: 'Fatal Error',
            internalMessage: 'Address is not eligible for a stand alone flood policy based on the underwriting information.',
            agentMessage: 'Address is not eligible for a stand alone flood policy based on the underwriting information.',
            customerMessage: 'Address is not eligible for a stand alone flood policy based on the underwriting information.',
            active: true,
            canOverride: false,
            overridden: true
          }]
        }
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);

    return serviceActions.saveUnderwritingExceptions(123, null)(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.APP_ERROR);
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

    return serviceActions.getBillingOptions(paymentOptions)(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.SERVICE_REQUEST);
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
        expect(store.getActions()[0].payload[0].type).toEqual(types.APP_ERROR);
      });
  });

  it('should call start getQuote', () => {
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
        expect(store.getActions()[0].payload[0].type).toEqual(types.SERVICE_REQUEST);
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
        expect(store.getActions()[0].payload[0].type).toEqual(types.APP_ERROR);
      });
  });

  it('should call start getZipcodeSettings', () => {
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

    return serviceActions.getZipcodeSettings('TTIC', 'FL', 'HO3', '33607')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.SERVICE_REQUEST);
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
        expect(store.getActions()[0].payload[0].type).toEqual(types.APP_ERROR);
      });
  });

  it('should call searchPolicy', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'policy-data',
        method: 'GET',
        path: '/transactions?companyCode=TTIC&state=FL&product=HO3&policyNumber=123&firstName=gfdgfd&lastName=fhnhyn&propertyAddress=123&page=1&pageSize=25&resultStart=1&sort=policyNumber&sortDirection=desc&effectiveDate=2017-01-02&agencyCode=2000&status=0'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);

    const taskData = {
      policyNumber: '123',
      address: '123',
      firstName: 'gfdgfd',
      lastName: 'fhnhyn',
      propertyAddress: '123',
      pageNumber: '1',
      pageSize: '25',
      resultStart: '1',
      effectiveDate: '2017-01-02',
      policyStatus: 0,
      agencyCode: 2000
    };

    return serviceActions.searchPolicy(taskData, 'policyNumber')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });

  it('should fail searchPolicy', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'policy-data',
        method: 'GET',
        path: '/transactions?companyCode=TTIC&state=FL&product=HO3&policyNumber=123&firstName=gfdgfd&lastName=fhnhyn&propertyAddress=123&page=1&pageSize=25&resultStart=1&sort=policyNumber&sortDirection=desc'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);
    //serviceActions.getAgencies(store.dispatch);

    const taskData = {
      policyNumber: '123'
    };

    return serviceActions.searchPolicy(taskData, 'policyNumber')(store.dispatch)
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
        expect(store.getActions()[0].payload[0].type).toEqual(types.APP_ERROR);
      });
  });
});
