import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import * as serviceRunner from '../../utilities/serviceRunner';
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

    const stateObj = [{
      type: types.SET_NOTES,
      notes
    }];

    store.dispatch(setNotes(notes));

    expect(store.getActions())
      .toEqual(stateObj);
  });

  
  describe('Test notes.actions async actions', () => {
    // create sandbox for stubs/mocks/spies
    const sandbox = sinon.sandbox.create();
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    let initialState;
    let store;
    let httpStub;

    beforeEach(() => {
      initialState = {};
      store = mockStore(initialState);
      httpStub = sinon.stub();
      sandbox.stub(serviceRunner, 'callService').callsFake((...args) => httpStub(...args));
    });

    afterEach(() => {
      // restore to original state for next test
      sandbox.restore();
      sandbox.reset();
    });

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

      const stateObj = [{
        type: types.SET_NOTES,
        notes
      }];

      httpStub.onCall(0)
        .returns(Promise.resolve({ data: { result: notes } }));

      await store.dispatch(fetchNotes([12345], 'agencyCode'));
      const action = store.getActions();
      expect([action[0]])
        .toEqual(stateObj);
    });
  });
});
