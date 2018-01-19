import React from 'react';
import thunk from 'redux-thunk';
import localStorage from 'localStorage';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow, mount } from 'enzyme';
import ConnectedApp, { Staff, handleInitialize } from './Staff';

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

describe('Testing Staff component', () => {
  it('should test connected app', () => {
    const initialState = {
      service: {
        agency: {},
        agents: {}
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
      initialValues: {},
      agents: {

      },
      agency: {
      },
      actions: {
        policyStateActions: {
          updatePolicy() {}
        },
        appStateActions: {
          setAppState() { }
        },
        serviceActions: {
          getAgency() {},
          getAgentsByAgency() {}
        },
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

    localStorage.setItem('lastSearchData', JSON.stringify({
      searchType: 'agency'
    }));

    const wrapper2 = shallow(<Staff store={store} {...props} />);
    wrapper2.instance().componentDidMount();
    handleInitialize(initialState);
  });
});
