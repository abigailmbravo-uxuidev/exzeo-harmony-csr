import React from 'react';
import thunk from 'redux-thunk';
import localStorage from 'localStorage';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow, mount } from 'enzyme';
import ConnectedApp from './Endorsements';

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

describe('Testing Endorsements component', () => {
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
        data: { activateRedirect: false },
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      actions: {
        errorActions: { dispatchClearAppError() { } }
      },
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

    localStorage.setItem('isNewTab', true);
    localStorage.setItem('lastSearchData', JSON.stringify({
      searchType: 'policy'
    }));

    const wrapper = mount(
      <Provider store={store} >
        <ConnectedApp {...props} />
      </Provider>);
    expect(wrapper);
  });
});
