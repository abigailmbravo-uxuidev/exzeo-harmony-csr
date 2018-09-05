import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { mount, shallow } from 'enzyme';
import { Staff, handleInitialize } from './Staff';

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
      match: { params: { agencyCode: 1234 } },
      initialValues: {},
      agents: [{
        name: 'test', status: true, agentOfRecord: true, appointed: true, mailingAddress: {}
      }],
      agency: {
        name: 'Test Agency',
        contactFirstName: 'Test',
        contactLastName: 'Test',
        phone: '555-555-5555',
        primaryPhoneNumber: '555-555-5555',
        secondaryPhoneNumber: '555-555-5555',
        faxNumber: '555-555-5555',
        customerServiceEmailAddress: 'test@test.com'
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
        }
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

    const wrapper2 = shallow(<Staff store={store} {...props} />);
    wrapper2.instance().componentDidMount();
    handleInitialize(initialState);
  });
});
