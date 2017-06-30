import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp, { populateUnderwritingQuestions } from './Underwriting';

const middlewares = [];
const mockStore = configureStore(middlewares);

const underwritingQuestions = [
  {
    _id: '11b1cd9f28479a0a989faa08',
    name: 'personalPropertyreplacementcostcoverage',
    model: 'quote',
    step: 'customizeDefaultQuote',
    question: 'Do you want Personal Property Replacement Cost Coverage?',
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

describe('Testing Underwriting component', () => {
  it('should test connected app', () => {
    const initialState = {
      getUWQuestions: {
        data: {
          modelInstanceId: '123',
          model: {
            variables: [
              { name: 'getListOfUWQuestions',
                value: {
                  result: underwritingQuestions
                } }]
          }
        }
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
        data: { activateRedirect: false },
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

  it('should test UW questions', () => {
    const initialState = {
      cg: {
        getUWQuestions: {
          data: {
            modelInstanceId: '123',
            model: {
              variables: [
                { name: 'getListOfUWQuestions',
                  value: {
                    result: underwritingQuestions
                  } }]
            }
          }
        },
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
    const questions = populateUnderwritingQuestions(initialState);
    expect(questions).toEqual(underwritingQuestions);
  });
});
