import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';
import ConnectedApp, { SideNav } from './PolicySideNav';

const middlewares = [];
const mockStore = configureStore(middlewares);
const initialState = {
  policyState: {},
  appState: {
    data: {}
  },
  service: {
    latestPolicy: {}
  }
};
const store = mockStore(initialState);
const props = {
  policy: {

  },
  actions: {
    cgActions: {
      batchCompleteTask() { return Promise.resolve(); }
    },
    newNoteActions: {
      toggleNote() {}
    },
    appStateActions: {
      setAppState() {}
    }
  },
  fieldQuestions: [],
  quoteData: {},
  dispatch: store.dispatch,
  appState: {
    instanceId: 1,
    data: {
      submitting: false
    }
  }
};

describe('Testing PolicySideNav component', () => {
  it('should test connected app', () => {
    const wrapper = shallow(<ConnectedApp store={store} {...props} />).dive().instance();
    expect(wrapper).toBeInstanceOf(SideNav);
  });

  it('should should be true after showDocsForm', () => {
    const wrapper = shallow(<ConnectedApp store={store} {...props} />).dive().instance();
    wrapper.generateDoc();
    expect(wrapper.state.showDocsForm).toBe(true);
  });

  it('should should be true after showDocsForm', () => {
    const wrapper = shallow(<ConnectedApp store={store} {...props} />).dive().instance();
    expect(wrapper.newNote(props));
  });

  it('should have six nav links', () => {
    const wrapper = shallow(<ConnectedApp store={store} {...props} />).dive();
    expect(wrapper.find('NavLink').length).toBe(6);
  });
});
