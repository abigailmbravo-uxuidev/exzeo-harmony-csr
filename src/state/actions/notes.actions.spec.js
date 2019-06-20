import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

import * as types from './actionTypes';
import { setNotes, fetchNotes } from './notes.actions';

describe('Test notes.actions', () => {
  const mockStore = configureStore([]);
  let initialState;
  let store;

  beforeEach(() => {
    initialState = {};
    store = mockStore(initialState);
  });

  it('should call setNotes', () => {
    const notes = [
      {
        noteType: 'test',
        noteContent: 'test',
        contactType: 'Agent',
        createdAt: new Date().getTime(),
        noteAttachments: [],
        createdBy: {},
        updatedBy: {}
      }
    ];

    const stateObj = [
      {
        type: types.SET_NOTES,
        notes
      }
    ];

    store.dispatch(setNotes(notes));

    expect(store.getActions()).toEqual(stateObj);
  });

  describe('Test fetchNotes action', () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const initialState = {};
    const store = mockStore(initialState);

    it('Should call dispatch on fetchNotes', async () => {
      const notes = [
        {
          noteType: 'test',
          noteContent: 'test',
          contactType: 'Agent',
          createdAt: new Date().getTime(),
          noteAttachments: [],
          createdBy: {},
          updatedBy: {}
        }
      ];

      const stateObj = [
        {
          type: types.SET_NOTES,
          notes
        }
      ];

      serviceRunner.callService = jest
        .fn()
        .mockReturnValue(Promise.resolve({ data: { result: notes } }));

      await store.dispatch(fetchNotes([12345], 'agencyCode'));
      const action = store.getActions();
      expect([action[0]]).toEqual(stateObj);
    });
  });
});
