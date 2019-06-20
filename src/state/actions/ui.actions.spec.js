import configureStore from 'redux-mock-store';
import * as types from './actionTypes';
import * as newNoteActions from './ui.actions';

const middlewares = [];
const mockStore = configureStore(middlewares);
describe('New Note Actions', () => {
  it('should toggle note on when passed a note', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const noteMeta = {
      noteType: 'PolicyNote',
      documentId: '12345',
      sourceId: '67891'
    };

    const stateObj = [
      {
        type: types.TOGGLE_NOTE,
        noteMeta
      }
    ];

    store.dispatch(newNoteActions.toggleNote(noteMeta));

    expect(store.getActions()).toEqual(stateObj);
  });

  it('should toggle note off when passed an empty note object', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const noteMeta = {};

    const stateObj = [
      {
        type: types.TOGGLE_NOTE,
        noteMeta
      }
    ];

    store.dispatch(newNoteActions.toggleNote(noteMeta));

    expect(store.getActions()).toEqual(stateObj);
  });
});
