import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import ConnectedApp from './Error';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing Error component', () => {
  // it('should test props and render', () => {
  //   const initialState = {};
  //   const store = mockStore(initialState);
  //   const props = {
  //     fieldQuestions: [],
  //     quoteData: {},
  //     dispatch: store.dispatch,
  //     appState: {
  //       data: {
  //         submitting: false
  //       },
  //       modelName: 'bb'
  //     },
  //     tasks: {
  //       bb: {
  //         data: {
  //           modelInstanceId: '123',
  //           model: {},
  //           uiQuestions: []
  //         }
  //       }
  //     }
  //   };
  //   const wrapper = shallow(<Error {...props} />);
  //   expect(wrapper);
  // });

  it('should test connected app', () => {
    const initialState = {
      cg: {
        bb: {
          data: {
            modelInstanceId: '123',
            model: {
              variables: [{
                name: 'quote',
                value: {
                  result: {}
                }
              }]
            },
            uiQuestions: [],
            previousTask: {
              name: 'quote'
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
      }
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
  });
});
