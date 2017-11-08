import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp, { NoteList, filterNotesByType } from './NotesFiles';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing NotesFiles component', () => {
  it('should test connected app', () => {
    const initialState = {
      service: {
        notes: []
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

  it('should test NoteList app', () => {
    const initialState = {
      service: {
        notes: []
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
      handleSubmit() { },
      fieldValues: {},
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      }
    };
    const wrapper = shallow(<NoteList {...props} />);
    expect(wrapper);
  });

  it('test filterNotesByType', () => {
    expect(filterNotesByType(null, true)).toEqual([]);
    expect(filterNotesByType([], true)).toEqual([]);
  });
});
