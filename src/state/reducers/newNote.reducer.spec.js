import * as types from '../actions/actionTypes';
import initialState from './initialState';
import newNoteReducer from './newNote.reducer';

describe('Error Reducer', () => {
  it('should toggle note on', () => {
    const state = initialState.appState;
    const noteMeta = {
      noteType: 'PolicyNote',
      documentId: '12345',
      sourceId: '67891'
    };
    const action = {
      type: types.TOGGLE_NOTE,
      noteMeta
    };

    expect(newNoteReducer(state, action)).toEqual(noteMeta);
  });

   it('should toggle note off', () => {
    const state = initialState.appState;
    const noteMeta = {};
    const action = {
      type: types.TOGGLE_NOTE,
      noteMeta
    };

    expect(newNoteReducer(state, action)).toEqual(noteMeta);
  });
});
