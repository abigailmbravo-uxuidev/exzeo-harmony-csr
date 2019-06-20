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
    expect(uiReducer(state, action)).toEqual({
      ...state,
      note: { ...noteMeta }
    });
  });

  it('should toggle note off', () => {
    const state = initialState.ui;
    const noteMeta = {};
    const action = {
      type: types.TOGGLE_NOTE,
      noteMeta
    };
    expect(uiReducer(state, action)).toEqual({
      ...state,
      note: { ...noteMeta }
    });
  });

  it('should toggle diary on', () => {
    const state = initialState.ui;
    const diaryMeta = {
      companyCode: 'TTIC',
      state: 'FL',
      product: 'HO3',
      resourceType: 'Quote',
      resourceId: '12-5160129-01',
      entityEndDate: '2020-04-05T04:00:00.000Z'
    };
    const action = {
      type: types.TOGGLE_DIARY,
      diaryMeta
    };
    expect(uiReducer(state, action)).toEqual({
      ...state,
      diary: { ...diaryMeta }
    });
  });

  it('should toggle diary off', () => {
    const state = initialState.ui;
    const diaryMeta = {};
    const action = {
      type: types.TOGGLE_DIARY,
      diaryMeta
    };
    expect(uiReducer(state, action)).toEqual({
      ...state,
      diary: { ...diaryMeta }
    });
  });

  it('should set minimizeNote true', () => {
    const state = initialState.ui;
    const action = {
      type: types.TOGGLE_MINIMIZE_NOTE,
      minimizeNote: true
    };
    expect(uiReducer(state, action)).toEqual({ ...state, minimizeNote: true });
  });

  it('should set minimizeNote false', () => {
    const state = initialState.ui;
    const action = {
      type: types.TOGGLE_MINIMIZE_NOTE,
      minimizeNote: false
    };
    expect(uiReducer(state, action)).toEqual({ ...state, minimizeNote: false });
  });

  it('should set minimizeDiary true', () => {
    const state = initialState.ui;
    const action = {
      type: types.TOGGLE_MINIMIZE_DIARY,
      minimizeDiary: true
    };
    expect(uiReducer(state, action)).toEqual({ ...state, minimizeDiary: true });
  });

  it('should set minimizeDiary false', () => {
    const state = initialState.ui;
    const action = {
      type: types.TOGGLE_MINIMIZE_DIARY,
      minimizeDiary: false
    };
    expect(uiReducer(state, action)).toEqual({
      ...state,
      minimizeDiary: false
    });
  });
});
