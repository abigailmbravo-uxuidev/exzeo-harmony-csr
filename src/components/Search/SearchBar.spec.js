import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp from './SearchBar';

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
      form: {
        SearchBar: {
          values: {
            searchType: 'address'
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
      fieldValues: {
        searchType: 'address'
      },
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false,
          searchType: 'address'
        }
      },
      ...propTypes
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
  });
});
