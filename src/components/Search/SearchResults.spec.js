import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';
import localStorage from 'localStorage';
import ConnectedApp, { SearchResults } from './SearchResults';
import NoPolicyResultsConnect from './NoPolicyResults';
import policyTestData from '../Common/policyTestData';
import quoteTestData from '../Common/quoteTestData';

const middlewares = [];
const mockStore = configureStore(middlewares);

const quoteData = quoteTestData;

const policy = policyTestData;

describe('Testing SearchBar component', () => {
  it('should test connected app', () => {
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
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      },
      ...propTypes
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
  });

  it('should test props for SearchResults address', () => {
    const initialState = {
      cg: {
        bb: {
          data: {
            previousTask: {
              name: 'searchAddress',
              value: {
                result: {
                  IndexResult: [{
                    id: '120955882646A1E36',
                    source: 'casaclue',
                    residenceType: 'N/A',
                    physicalAddress: {
                      city: 'ORLANDO', latitude: '28.614350', zip: '32810', state: 'FL', address2: '', longitude: '-81.393340', county: 'ORANGE', address1: '234 AMADOR CIR'
                    }
                  }]
                }
              }
            },
            modelInstanceId: '123',
            model: {},
            uiQuestions: []
          }
        }
      },
      appState: {
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      handleNewTab(address, prop) { },
      tasks: { ...initialState.cg },
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        modelName: 'bb',
        data: {
          submitting: false
        }
      },
      ...propTypes
    };
    SearchResults(props);
  });

  it('should test props for SearchResults quote', () => {
    const initialState = {
      cg: {
        bb: {
          data: {
            previousTask: {
              name: 'searchQuote',
              value: {
                result: {
                  quotes: [quoteData]
                }
              }
            },
            activeTask: {
              name: 'chooseQuote',
              value: {
                result: {
                }
              }
            },
            modelInstanceId: '123',
            model: {},
            uiQuestions: []
          }
        }
      },
      appState: {
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      handleNewTab(address, prop) { },
      tasks: { ...initialState.cg },
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        modelName: 'bb',
        data: {
          submitting: false
        }
      },
      ...propTypes
    };
    SearchResults(props);
  });

  it('should test props for SearchResults policy', () => {
    const initialState = {
      service: {},
      search: {
        searchType: 'policy'
      },
      cg: {
        bb: {
          data: {
            previousTask: {
              name: 'searchPolicy',
              value: {
                result: {
                  policies: [{
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
                  }]
                }
              }
            },
            activeTask: {
              name: 'choosePolicy',
              value: {
                result: {
                }
              }
            },
            modelInstanceId: '123',
            model: {},
            uiQuestions: []
          }
        }
      },
      appState: {
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      tasks: {
        bb: {
          data: {}
        }
      },
      defaultPolicyResults: { policies: [policy] },
      search: {
        searchType: 'policy'
      },
      handleNewTab(address, prop) { },
      tasks: { ...initialState.cg },
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        modelName: 'bb',
        data: {
          submitting: false
        }
      },
      ...propTypes
    };
    localStorage.setItem('lastSearchData', JSON.stringify({ searchType: 'policy' }));
    SearchResults(props);

    const wrapper = shallow(<SearchResults props={props} {...props} store={store} />);
    const wrapper2 = shallow(<ConnectedApp {...props} store={store} />);

    props.defaultPolicyResults.policies = [];
    wrapper2.instance().componentWillReceiveProps({ ...props });

    const wrapper3 = shallow(<NoPolicyResultsConnect />);
  });

  it('should test props for SearchResults agency', () => {
    const initialState = {
      cg: {
        bb: {
          data: {
            previousTask: {
              name: 'searchPolicy',
              value: {
                result: {
                  policies: [{
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
                  }]
                }
              }
            },
            activeTask: {
              name: 'choosePolicy',
              value: {
                result: {
                }
              }
            },
            modelInstanceId: '123',
            model: {},
            uiQuestions: []
          }
        }
      },
      appState: {
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      handleNewTab(address, prop) { },
      tasks: { ...initialState.cg },
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        modelName: 'bb',
        data: {
          submitting: false
        }
      },
      ...propTypes
    };
    localStorage.setItem('lastSearchData', JSON.stringify({ searchType: 'agency' }));
    SearchResults(props);
  });
  it('should test props for SearchResults agents', () => {
    const initialState = {
      cg: {
        bb: {
          data: {
            previousTask: {
              name: 'searchPolicy',
              value: {
                result: {
                  policies: [{
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
                  }]
                }
              }
            },
            activeTask: {
              name: 'choosePolicy',
              value: {
                result: {
                }
              }
            },
            modelInstanceId: '123',
            model: {},
            uiQuestions: []
          }
        }
      },
      appState: {
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      handleNewTab(address, prop) { },
      tasks: { ...initialState.cg },
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        modelName: 'bb',
        data: {
          submitting: false
        }
      },
      ...propTypes
    };
    localStorage.setItem('lastSearchData', JSON.stringify({ searchType: 'agent' }));
    SearchResults(props);
  });
});
