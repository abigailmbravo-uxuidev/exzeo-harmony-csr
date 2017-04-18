import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp, { Verify } from './Verify';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing Verify component', () => {
  it('should test props and render', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const props = {
      fieldQuestions: [],
      fieldValues: {
        confirmQuoteDetails: false,
        confirmPolicyHolderDetails: false,
        confirmAdditionalInterestsDetails: false
      },
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false,
          showScheduleDateModal: true
        },
        modelName: 'bb'
      },
      tasks: {
        bb: {
          data: {
            modelInstanceId: '123',
            model: {
              variables: [{
                name: 'getFinalQuote',
                value: {
                  result: {
                    quoteNumber: '12',
                    property: {
                      physicalAddress: {}
                    },
                    rating: {
                      totalPremium: 1
                    },
                    coverageLimits: {
                      dwelling: {},
                      otherStructures: {},
                      personalProperty: {},
                      lossOfUse: {},
                      personalLiability: {},
                      medicalPayments: {},
                      moldProperty: {},
                      moldLiability: {},
                      ordinanceOrLaw: {}
                    },
                    coverageOptions: {
                      personalPropertyReplacementCost: {}
                    }
                  }
                }
              }]
            },
            uiQuestions: [],
            activeTask: {}
          }
        }
      },
      ...propTypes
    };
    const wrapper = shallow(<Verify {...props} />);
    expect(wrapper);
  });

  it('should test connected app', () => {
    const initialState = {
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
        modelName: 'bb',
        data: {
          submitting: false,
          showScheduleDateModal: true
        }
      }
    };
    const store = mockStore(initialState);
    const props = {
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false,
          showScheduleDateModal: true
        }
      },
      ...propTypes
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
  });
});
