import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp, { NewNoteFileUploaderPopup, closeNewNoteFileUploader, SideNav } from './PolicySideNav';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing PolicySideNav component', () => {
  const initialState = {
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
        },
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

    it('should test connected app', () => {
    const wrapper = shallow(<ConnectedApp store={store} {...props} />).dive().instance();
    expect(wrapper).toBe.instanceOf(SideNav);
  });

    it('should test connected app', () => {
    const wrapper = shallow(<ConnectedApp store={store} {...props} />).dive();
    //wrapper.instance().find('button[data-test="newNote"]').simulate('click');
    wrapper.instance().generateDoc();
    console.log(wrapper.instance().state)
    const state = wrapper.instance().state;
    expect(state.showDocsForm).toBe(true);
    expect(wrapper);
  });
});
