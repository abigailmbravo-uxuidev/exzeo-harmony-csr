import configureStore from 'redux-mock-store';
import axios from 'axios';
import moment from 'moment';
import MockAdapter from 'axios-mock-adapter';
import * as types from './actionTypes';
import * as serviceActions from './serviceActions';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Service Actions', () => {
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
    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'transaction-logs.services',
        method: 'GET',
        path: 'history?number=test'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: [note]
    });

    const initialState = {};
    const store = mockStore(initialState);
    serviceActions.getNotes(store.dispatch);

    return serviceActions.getNotes('test')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });

  it('should fail start getNotes', () => {
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
    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'transaction-logs.services',
        method: 'GET',
        path: 'history?number=test'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: [note]
    });

    const initialState = {};
    const store = mockStore(initialState);
    serviceActions.getNotes(store.dispatch);

    return serviceActions.getNotes('4435')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.APP_ERROR);
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
    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'notes.services',
        method: 'POST',
        path: 'v1/note/',
        data: note
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: [note]
    });

    const initialState = {};
    const store = mockStore(initialState);
    serviceActions.addNote(store.dispatch);

    return serviceActions.addNote(2, 'quoteNote', {})(store.dispatch)
      .then(() => {
        expect(note).toEqual(axiosOptions.data.data);
      });
  });

  it('should fail start addNotes', () => {
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
    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'notes.services',
        method: 'POST',
        path: 'v1/note/',
        data: note
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: [note]
    });

    const initialState = {};
    const store = mockStore(initialState);
    serviceActions.addNote(store.dispatch);

    return serviceActions.addNote(543543, 'quot43eNote', {})(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.APP_ERROR);
      });
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
        service: 'agency.services',
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

    return serviceActions.getAgents('TTIC', 'FL')(store.dispatch)
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
        service: 'agency.services',
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

  it('should call start getAgencies', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'agency.services',
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

    return serviceActions.getAgencies('TTIC', 'FL')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.SERVICE_REQUEST);
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
        service: 'agency.services',
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

    return serviceActions.getAgencies('454545', 'FL')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.APP_ERROR);
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
        service: 'questions.services',
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
        service: 'questions.services',
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

  it('should call start getSummaryLedger', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'billing.services',
        method: 'GET',
        path: 'summary-ledgers/12345'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);
    serviceActions.getSummaryLedger(store.dispatch);

    return serviceActions.getSummaryLedger('12345')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });

  it('should call start getPaymentOptions', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'billing.services',
        method: 'GET',
        path: '/payment-options-apply-payment'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: [
        {
          paymentType: 'Paper Deposit',
          paymentDescription: ['Duplicate Payment Applied in Error', 'Misapplied Payment', 'Misapplied Transfer', 'Payment Received', 'Payment Removed from Deposit', 'Payment Transfer']
        },
        {
          paymentType: 'Electronic Deposit',
          paymentDescription: ['Duplicate Payment Applied in Error', 'Misapplied Payment', 'Misapplied Transfer', 'Payment Received', 'Payment Removed from Deposit', 'Payment Transfer']
        },
        {
          paymentType: 'Paper Deposit Charge Back',
          paymentDescription: ['Account Closed', 'Bank Adjustment', 'Currency Conversion', 'No Account', 'NSF Payment', 'Payment Stopped', 'Refer to Maker', 'Unable to Locate Account']
        },
        {
          paymentType: 'Electronic Deposit Charge Back',
          paymentDescription: ['Account Closed', 'Bank Adjustment', 'Currency Conversion', 'No Account', 'NSF Payment', 'Payment Stopped', 'Refer to Maker', 'Unable to Locate Account']
        }
      ]
    });

    const initialState = {};
    const store = mockStore(initialState);

    return serviceActions.getPaymentOptionsApplyPayments()(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.APP_ERROR);
      });
  });

  it('should call start getPaymentHistory', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'billing.services',
        method: 'GET',
        path: '/payment-history/12345'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);

    return serviceActions.getPaymentHistory('12345')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.APP_ERROR);
      });
  });

  it('should fail start getPaymentHistory', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'billing.services',
        method: 'GET',
        path: '/payment-history/12345'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);

    return serviceActions.getPaymentHistory('43543534')(store.dispatch)
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

    submitData.cashDate = moment.utc('07-27-2017').format('YYYY-MM-DD');
    submitData.batchNumber = String('2017072701');
    submitData.amount = Number(String('400').replace(/[^\d.-]/g, ''));
    submitData.cashType = String('Electronic Deposit');
    submitData.cashDescription = String('Payment Received');

    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'billing.services',
        method: 'POST',
        path: 'post-payment-transaction',
        data: {
          companyCode: props.auth.userProfile.groups[0].companyCode,
          state: props.policy.state,
          product: props.policy.product,
          policyNumber: props.policy.policyNumber,
          policyTerm: props.policy.policyTerm,
          policyAccountCode: props.policy.policyAccountCode,
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

    return serviceActions.addTransaction(props, submitData)(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.SERVICE_REQUEST);
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
        service: 'billing.services',
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
        service: 'billing.services',
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
});
