import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp, { handleFormSubmit } from './Application';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing Coverage component', () => {
  it('should test connected app', () => {
    const initialState = {
      service: {
        transactions: {}
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
          showQuoteSummaryModal: true
        },
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
  it('should test handleFormSubmit', () => {
    const initialState = {
      cg: {
        bb: {
          data: {
            modelInstanceId: '123',
            model: {
              variables: [
                { name: 'retrieveQuote',
                  value: {
                    result: {}
                  } }, { name: 'getQuoteBeforePageLoop',
                    value: {
                      result: {}
                    } }]
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
      fieldQuestions: [],
      dispatch: store.dispatch,
      actions: {
        appStateActions: {
          setAppState() { }
        },
        cgActions: {
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

    handleFormSubmit({}, store.dispatch, props);
  });
});
