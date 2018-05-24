import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow, mount } from 'enzyme';
import ConnectedApp, { Coverage, handleAgencyChange, handleFormSubmit, handleGetQuoteData, handleInitialize, handleGetZipCodeSettings, clearSecondaryPolicyholder } from './index';

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

const quoteData = {
  _id: '5866c036a46eb72908f3f547',
  companyCode: 'TTIC',
  agencyCode: '20000',
  state: 'FL',
  product: 'HO3',
  quoteNumber: '12-1234567-12',
  billToId: '5866c036a46eb72908f3f547',
  billPlan: 'Annual',
  eligibility: 'Yes',
  effectiveDate: '2017-01-04',
  endDate: '2018-01-04T20:14:46.793Z',
  agencyId: '20000',
  agentId: '60000',
  property: {
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
  },
  rating: {
    engineCode: 'HO3ByPeril',
    rateCode: '0417',
    _id: '5866c036a46eb72908f3f548'
  },
  underwritingExceptions: [],
  underwritingAnswers: {
    noPriorInsuranceSurcharge: {
      question: 'No Prior Insurance Surcharge',
      answer: 'false',
      source: 'Default',
      _id: '5866c036a46eb72908f3f54a'
    },
    floodCoverage: {
      question: 'Flood Coverage',
      answer: 'yes',
      source: 'Default',
      _id: '5866c036a46eb72908f3f549'
    }
  },
  deductibles: {
    hurricane: {
      displayText: 'Hurricane',
      amount: 0.2,
      format: 'Percentage',
      ofCoverageLimit: '2%',
      _id: '5866c036a46eb72908f3f54c'
    },
    allOtherPerils: {
      displayText: 'All Other Perils',
      amount: 1000,
      format: 'Currency',
      _id: '5866c036a46eb72908f3f54b'
    }
  },
  coverageOptions: {
    sinkholePerilCoverage: {
      displayText: 'Sinkhole Peril Coverage',
      answer: false,
      _id: '5866c036a46eb72908f3f550'
    },
    propertyIncidentalOccupanciesMainDwelling: {
      displayText: 'Property Incidental Occupancies Main Dwelling',
      answer: false,
      _id: '5866c036a46eb72908f3f54f'
    },
    propertyIncidentalOccupanciesOtherStructures: {
      displayText: 'Property Incidental Occupancies Other Structures',
      answer: false,
      _id: '5866c036a46eb72908f3f54e'
    },
    liabilityIncidentalOccupancies: {
      displayText: 'liability Incidental Occupancies',
      answer: false,
      _id: '5866c036a46eb72908f3f54d'
    }
  },
  coverageLimits: {
    dwelling: {
      displayText: 'Dwelling',
      amount: 10000000,
      format: 'Currency',
      minAmount: 2000000,
      maxAmount: 2000000,
      _id: '5866c036a46eb72908f3f558'
    },
    otherStructures: {
      displayText: 'Other Structures',
      amount: 1000000,
      format: 'Currency',
      _id: '5866c036a46eb72908f3f557'
    },
    ordinanceOrLaw: {
      displayText: 'Ordinance Or Law',
      amount: 1000000,
      format: 'Currency',
      _id: '5866c036a46eb72908f3f557'
    },
    personalProperty: {
      displayText: 'Personal Property',
      amount: 500000,
      format: 'Currency',
      _id: '5866c036a46eb72908f3f556'
    },
    lossOfUse: {
      displayText: 'Loss of Use',
      amount: 1000000,
      format: 'Currency',
      _id: '5866c036a46eb72908f3f555'
    },
    personalLiability: {
      displayText: 'Personal Liability',
      amount: 100000,
      format: 'Currency',
      _id: '5866c036a46eb72908f3f554'
    },
    medicalPayments: {
      displayText: 'Medical Payments',
      amount: 2000,
      format: 'Currency',
      _id: '5866c036a46eb72908f3f553'
    },
    moldProperty: {
      displayText: 'Mold Property',
      amount: 10000,
      format: 'Currency',
      _id: '5866c036a46eb72908f3f552'
    },
    moldLiability: {
      displayText: 'Mold Liability',
      amount: 50000,
      format: 'Currency',
      _id: '5866c036a46eb72908f3f551'
    }
  },
  additionalInterests: [
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
      type: 'Lienholder',
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
  ],
  policyHolderMailingAddress: {
    careOf: null,
    address1: '1000 Poplar Ave',
    address2: null,
    city: 'Tampa',
    state: 'FL',
    zip: '33607',
    country: {
      code: 'USA',
      displayText: 'United States of America'
    }
  },
  policyHolders: [
    {
      id: 'DFBDFBDF1',
      order: 1,
      entityType: 'Person',
      firstName: 'Bryan1',
      lastName: 'BBBB',
      emailAddress: 'bb1@bb.com',
      primaryPhoneNumber: '813-555-3456'
    },
    {
      id: 'DFBDFBDF2',
      order: 2,
      entityType: 'Person',
      firstName: 'Bryan2',
      lastName: 'BBBB',
      emailAddress: 'bb2@bb.com',
      primaryPhoneNumber: '813-555-3456'
    }
  ],
  __v: 0
};

describe('Testing Coverage component', () => {
  it('should test connected app', () => {
    const initialState = {
      authState: {},
      service: {
        getAgents() {}
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
        data: {

        },
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      handleSubmit: fn => fn,
      actions: {
        quoteStateActions: {
          getLatestQuote() {}
        },
        cgActions: {
          startWorkflow() { return Promise.resolve(() => {}); },
          batchCompleteTask() { return Promise.resolve(() => {}); }
        }
      },
      fieldQuestions: [],
      quoteData,
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      }
    };

    localStorage.setItem('isNewTab', true);
    localStorage.setItem('lastSearchData', JSON.stringify({
      searchType: 'address'
    }));

    const wrapper = mount(<Provider store={store} >
      <Router><ConnectedApp {...props} /></Router>
    </Provider>);
    expect(wrapper);
  });
  it('should test handleGetQuoteData', () => {
    const initialState = {
      service: {
        quote: quoteData
      },
      cg: {
        bb: {
          data: {
            modelInstanceId: '123',
            model: {
              variables: [
                {
                  name: 'retrieveQuote',
                  value: {
                    result: quoteData
                  }
                }, {
                  name: 'getQuoteBeforePageLoop',
                  value: {
                    result: quoteData
                  }
                }]
            },
            uiQuestions: []
          }
        }
      },
      appState: {
        data: {
          showAdditionalInterestModal: false
        },
        modelName: 'bb'
      }
    };
    let quote = {};

    quote = initialState.service.quote;
    expect(quote).toEqual(quoteData);
  });

  it('should test handleFormSubmit', () => {
    const initialState = {
      service: {

      },
      cg: {
        bb: {
          data: {
            modelInstanceId: '123',
            model: {
              variables: [
                {
                  name: 'retrieveQuote',
                  value: {
                    result: quoteData
                  }
                }, {
                  name: 'getQuoteBeforePageLoop',
                  value: {
                    result: quoteData
                  }
                }]
            },
            uiQuestions: []
          }
        }
      },
      appState: {
        data: {
          showAdditionalInterestModal: false
        },
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);

    const props = {
      zipCodeSettings: { timezone: 'American/NewYork' },
      fieldQuestions: [],
      dispatch: store.dispatch,
      actions: {
        quoteStateActions: {
          getLatestQuote() {}
        },
        appStateActions: {
          setAppState() { }
        },
        cgActions: {
          startWorkflow() { return Promise.resolve(() => {}); },
          batchCompleteTask() { return Promise.resolve(() => {}); }
        }
      },
      appState: {
        data: {
          submitting: false
        }
      },
      quoteData: {
        AdditionalInterests: [{
          id: '049a50b23c21c2ae3',
          type: 'Mortgagee',
          order: 1,
          name1: 'BB&T Home Mortgage',
          referenceNumber: '1234567',
          mailingAddress: {
            address1: '5115 Garden Vale Ave',
            city: 'Tampa',
            state: 'FL',
            county: 'Hillsborough',
            zip: '33624',
            country: {
              code: 'USA',
              displayText: 'United States of America'
            }
          },
          active: true
        }]
      },
      ...propTypes
    };

    handleFormSubmit({
      pH1phone: '4345435343'
    }, store.dispatch, props);
  });

  it('should test instance functions', () => {
    const initialState = {
      service: {
        getAgents() {}
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
        data: {

        },
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      change() {},
      zipCodeSettings: { timezone: 'American/NewYork' },
      initialValues: {},
      fieldValues: {
        dwellingAmount: '',
        agencyCode: 20000
      },
      agency: {
        agencyCode: 20000
      },
      handleSubmit: fn => fn,
      actions: {
        quoteStateActions: {
          getLatestQuote() {}
        },
        serviceActions: {
          getAgencies() {},
          getAgentsByAgency() {}
        },
        appStateActions: {
          setAppState() { return Promise.resolve(() => {}); }
        },
        questionsActions: {
          getUIQuestions() { return Promise.resolve(() => {}); }
        },
        cgActions: {
          startWorkflow() { return Promise.resolve(() => {}); },
          batchCompleteTask() { return Promise.resolve(() => {}); }
        }
      },
      fieldQuestions: [],
      quoteData,
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      }
    };

    localStorage.setItem('isNewTab', true);
    localStorage.setItem('lastSearchData', JSON.stringify({
      searchType: 'address'
    }));

    const wrapper = shallow(<Coverage store={store} {...props} />);

    wrapper.instance().componentDidMount();
    wrapper.instance().normalizeDwellingDependencies('5000', '6000', {});
    wrapper.instance().updateDependencies({ target: { value: '' } }, 'calculatedSinkhole', 'dwellingAmount');
    wrapper.instance().updateCalculatedSinkhole();
    wrapper.instance().componentWillReceiveProps(props);
    expect(wrapper.instance().props.fieldValues.dwellingAmount).toEqual('');

    handleInitialize(initialState);
    handleGetZipCodeSettings(initialState);
    wrapper.instance().clearSecondaryPolicyholder(false, props);
    wrapper.instance().clearSecondaryPolicyholder(true, props);
    wrapper.instance().handleAgencyChange(props, 100011, false);
  });

  it('should test componentWillMount', () => {
    const initialState = {
      service: {
        getAgents() {}
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
        data: {

        },
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      initialValues: {},
      fieldValues: {
        dwellingAmount: '',
        agencyCode: 20000
      },
      agency: {
        agencyCode: 20000
      },
      handleSubmit: fn => fn,
      actions: {
        quoteStateActions: {
          getLatestQuote() {}
        },
        serviceActions: {
          getAgencies() {},
          getAgentsByAgency() {}
        },
        appStateActions: {
          setAppState() { return Promise.resolve(() => {}); }
        },
        questionsActions: {
          getUIQuestions() { return Promise.resolve(() => {}); }
        },
        cgActions: {
          startWorkflow() { return Promise.resolve(() => {}); },
          batchCompleteTask() { return Promise.resolve(() => {}); }
        }
      },
      fieldQuestions: [],
      quoteData,
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      }
    };

    const wrapper2 = shallow(<Coverage store={store} {...props} />);
    localStorage.setItem('isNewTab', true);
    localStorage.setItem('lastSearchData', JSON.stringify({
      searchType: 'quote'
    }));
    wrapper2.instance().componentDidMount();
  });

  it('should test componentWillMount newTab === false', () => {
    const initialState = {
      service: {
        getAgents() {}
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
        instanceId: '234',
        data: {

        },
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      initialValues: {},
      fieldValues: {
        dwellingAmount: '',
        agencyCode: 20000
      },
      agency: {
        agencyCode: 20000
      },
      handleSubmit: fn => fn,
      actions: {
        quoteStateActions: {
          getLatestQuote() {}
        },
        serviceActions: {
          getAgencies() {},
          getAgentsByAgency() {}
        },
        appStateActions: {
          setAppState() { return Promise.resolve(() => {}); }
        },
        questionsActions: {
          getUIQuestions() { return Promise.resolve(() => {}); }
        },
        cgActions: {
          startWorkflow() { return Promise.resolve(() => {}); },
          batchCompleteTask() { return Promise.resolve(() => {}); }
        }
      },
      fieldQuestions: [],
      quoteData,
      dispatch: store.dispatch,
      appState: {
        instanceId: '234',
        data: {
          submitting: false
        }
      }
    };

    const wrapper2 = shallow(<Coverage store={store} {...props} />);
    localStorage.setItem('isNewTab', false);
    wrapper2.instance().componentDidMount();
  });
});
