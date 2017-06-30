import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp, { SearchResults } from './SearchResults';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing SearchBar component', () => {
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

  it('should test props for SearchResults', () => {
    const initialState = {
      cg: {
        bb: {
          data: {
            previousTask: {
              name: 'searchAddress',
              value: {
                result: {
                  IndexResult: [{ id: '120955882646A1E36', source: 'casaclue', residenceType: 'N/A', physicalAddress: { city: 'ORLANDO', latitude: '28.614350', zip: '32810', state: 'FL', address2: '', longitude: '-81.393340', county: 'ORANGE', address1: '234 AMADOR CIR' } }]
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
});
