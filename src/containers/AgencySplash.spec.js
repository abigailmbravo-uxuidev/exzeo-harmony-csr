import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow, mount } from 'enzyme';
import localStorage from 'localStorage';
import ConnectedApp, { AgencySplash } from './AgencySplash';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing AgencySplash component', () => {
  it('should test handleNewTab agency', () => {
    const taskData = {
      firstName: '',
      lastName: '',
      address: '',
      licNumber: '',
      fein: '',
      agencyCode: '',
      agentCode: '',
      phone: '',
      searchType: 'agency'
    };

    localStorage.setItem('lastSearchData', JSON.stringify(taskData));
  });


  it('should test mount', () => {
    const initialState = {
      service: {
        agencies: []
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
          searchType: 'address'
        },
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      actions: {
        appStateActions: {
          setAppState() {}
        },
        questionsActions: {
          getUIQuestions() { }
        },
        cgActions: {
          batchCompleteTask() { return Promise.resolve(); },
          startWorkflow() { }
        }
      },
      searchType: 'address',
      auth: {
        isAuthenticated() { return true; }
      },
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          searchType: 'address',
          submitting: false
        }
      }
    };
    const wrapper = mount(<Provider store={store}><Router>
      <AgencySplash {...props} />
    </Router>
    </Provider>);
    expect(wrapper.find(AgencySplash).props()).toEqual(props);

    const wrapperComponent = shallow(<AgencySplash {...props} />);
    wrapper.setProps({});

    const wrapper2 = shallow(<AgencySplash store={store} {...props} />);
  });
});
