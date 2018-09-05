import * as types from '../actions/actionTypes';

import initialState from './initialState';
import uiReducer from './ui.reducer';

describe('Ui Reducer', () => {
  it('should toggle note on', () => {
    const state = initialState.ui;
    const noteMeta = {
      noteType: 'PolicyNote',
      documentId: '12345',
      sourceId: '67891'
    };
    const action = {
      type: types.TOGGLE_NOTE,
      noteMeta
    };

    expect(uiReducer(state, action)).toEqual({ note: { ...noteMeta } });
  });

   it('should toggle note off', () => {
    const state = initialState.ui;
    const noteMeta = {};
    const action = {
      type: types.TOGGLE_NOTE,
      noteMeta
    };

    expect(uiReducer(state, action)).toEqual({ note: { ...noteMeta } });
  });
});
