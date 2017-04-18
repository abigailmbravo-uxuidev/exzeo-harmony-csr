import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp, { Underwriting } from './Underwriting';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing Underwriting component', () => {
  it('should test props and render', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const props = {
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        },
        modelName: 'bb'
      },
      tasks: {
        bb: {
          data: {
            modelInstanceId: '123',
            model: {
              variables: [
                {
                  name: 'quote',
                  value: {
                    result: {}
                  }
                }
              ]
            },
            uiQuestions: [],
            activeTask: {},
            previousTask: {
              value: {
                result: []
              }
            }
          }
        }
      },
      ...propTypes
    };
    const wrapper = shallow(<Underwriting {...props} />);
    expect(wrapper);
  });

  it('should test connected app', () => {
    const initialState = {
      cg: {
        bb: {
          data: {
            modelInstanceId: '123',
            model: {
              variables: [
                {
                  name: 'quote',
                  value: {
                    result: []
                  }
                }
              ]
            },
            uiQuestions: [],
            activeTask: {},
            previousTask: {
              value: {
                result: []
              }
            }
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
      tasks: {
        bb: {
          data: {
            modelInstanceId: '123',
            model: {
              variables: [
                {
                  name: 'quote',
                  value: {
                    result: []
                  }
                }
              ]
            },
            uiQuestions: [],
            activeTask: {},
            previousTask: {
              value: {
                result: []
              }
            }
          }
        }
      },
      ...propTypes
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
  });
});
