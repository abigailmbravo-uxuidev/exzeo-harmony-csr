import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow, mount } from 'enzyme';
import localStorage from 'localStorage';
import ConnectedApp, { Splash, handleNewTab } from './Splash';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const quoteData = {
  _id: '5866c036a46eb72908f3f547',
  companyCode: 'TTIC',
  state: 'FL',
  product: 'HO3',
  quoteNumber: '12-1234567-12',
  billToId: '5866c036a46eb72908f3f547',
  billPlan: 'Annual',
  eligibility: 'Yes',
  effectiveDate: '2017-01-04T20:14:46.793Z',
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

const policy = {
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
  product: 'HO3'
};

describe('Testing Splash component', () => {
  it('should test handleNewTab address', () => {
    const taskData = {
      firstName: '',
      lastName: '',
      address: '',
      quoteNumber: '',
      policyNumber: '',
      zip: '',
      searchType: 'address'
    };

    const address = { id: '120955882646A1E36', source: 'casaclue', residenceType: 'N/A', physicalAddress: { city: 'ORLANDO', latitude: '28.614350', zip: '32810', state: 'FL', address2: '', longitude: '-81.393340', county: 'ORANGE', address1: '234 AMADOR CIR' } };

    localStorage.setItem('lastSearchData', JSON.stringify(taskData));

    handleNewTab(address);

    expect(localStorage.getItem('stateCode')).toEqual(address.physicalAddress.state);
    expect(localStorage.getItem('igdID')).toEqual(address.id);
  });

  it('should test handleNewTab quote', () => {
    const taskData = {
      firstName: '',
      lastName: '',
      address: '',
      quoteNumber: '',
      policyNumber: '',
      zip: '',
      searchType: 'quote'
    };

    localStorage.setItem('lastSearchData', JSON.stringify(taskData));

    handleNewTab(quoteData);
    expect(localStorage.getItem('quoteId')).toEqual(quoteData._id);
  });

  it('should test handleNewTab policy', () => {
    const taskData = {
      firstName: '',
      lastName: '',
      address: '',
      quoteNumber: '',
      policyNumber: '',
      zip: '',
      searchType: 'policy'
    };


    localStorage.setItem('lastSearchData', JSON.stringify(taskData));

    handleNewTab(policy);
    expect(localStorage.getItem('policyNumber')).toEqual(policy.policyNumber);
  });

  it('should test mount', () => {
    const initialState = {
      service: {
        agencies: []
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
          searchType: 'address'
        },
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      actions: {
        appStateActions: {
          setAppState() {}
        },
        questionsActions: {
          getUIQuestions() { }
        },
        cgActions: {
          batchCompleteTask() { return Promise.resolve(); },
          startWorkflow() { }
        }
      },
      searchType: 'address',
      auth: {
        isAuthenticated() { return true; }
      },
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          searchType: 'address',
          submitting: false
        }
      }
    };
    const wrapper = mount(<Provider store={store}>
      <Splash {...props} />
    </Provider>);
    expect(wrapper.find(Splash).props()).toEqual(props);

    wrapper.setProps({});

    const wrapper2 = shallow(<Splash store={store} {...props} />)

    wrapper2.instance().handleSelectQuote(quoteData, props);
    wrapper2.instance().handleSelectAddress({ physicalAddress: {
      state: 'FL'
    }}, props)
    wrapper2.instance().handleSelectPolicy(policy, props);


  });
});
