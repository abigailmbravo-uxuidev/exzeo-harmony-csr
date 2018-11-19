import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import { QuoteApplication, handleFormSubmit, quoteSummaryModal, handleGetUnderwritingExceptions } from './Application';

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
      match: { params: {} },
      setAppStateAction() {},
      getQuoteAction() {},
      actions: {
        quoteStateActions: {
          getLatestQuote(){}
        },
        appStateActions: {
          setAppState() { }
        },
        cgActions: {
          batchCompleteTask() { return Promise.resolve(() => {}); }
        }
      },
      handleSubmit() {},
      underwritingExceptions: [],
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        instanceId: '1223',
        data: {
          submitting: false
        }
      }
    };
    const wrapper = shallow(<QuoteApplication store={store} {...props} />);
    expect(wrapper);

    wrapper.instance().componentDidMount();
  });
  it('should test handleFormSubmit', () => {
    const initialState = {
      service: {
        transactions: {}
      },
      quoteState: { quote: { underwritingExceptions: [] } },
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
      match: { params: {} },
      fieldQuestions: [],
      dispatch: store.dispatch,
      setAppStateAction() {},
      getQuoteAction() {},
      setAppErrorAction() {},
      actions: {
        quoteStateActions: {
          getLatestQuote(){}
        },
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
    };

    handleFormSubmit({}, store.dispatch, props);
    quoteSummaryModal(props);
    handleGetUnderwritingExceptions(initialState);
  });
});
