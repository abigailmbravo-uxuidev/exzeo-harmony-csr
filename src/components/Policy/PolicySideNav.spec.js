import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp, { NewNoteFileUploaderPopup, closeNewNoteFileUploader, goToPage } from './PolicySideNav';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing PolicySideNav component', () => {
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
        cgActions: {
          batchCompleteTask() { return Promise.resolve(); }
        },
        appStateActions: {
          setAppState() { }
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
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);

    NewNoteFileUploaderPopup(props);
    closeNewNoteFileUploader(props);
    goToPage('test', 'test', props);
  });
});
