import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';
import _ from 'lodash';
import ConnectedApp, { NotesFiles, NoteList, isExpandableRow, Files, BSTable } from './NotesFiles';

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
      notes: [],
      actions: {
        quoteStateActions: {
          getLatestQuote() {}
        },
        serviceActions: {
          getNotes() {}
        },
        appStateActions: {
          setAppState() { }
        },
        cgActions: {
          batchCompleteTask() { return Promise.resolve(() => {}); }
        }
      },
      handleSubmit() { },
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
    const wrapper = shallow(<NoteList {...props} />);
    expect(wrapper);

    const notesFiles = shallow(<NotesFiles store={store} {...props} />);
    expect(notesFiles);
    notesFiles.instance().componentDidMount();

    notesFiles.instance().componentWillReceiveProps({ quoteData: { quoteNumber: '1234' } });

    Files(props);

    BSTable(props);
  });
  it('test isExpandableRow true', () => {
    const result = isExpandableRow({
      id: 5
    });
    expect(result).toEqual(true);
  });

  it('test isExpandableRow', () => {
    const result = isExpandableRow({
      id: 1
    });
    expect(result).toEqual(true);
  });
});
