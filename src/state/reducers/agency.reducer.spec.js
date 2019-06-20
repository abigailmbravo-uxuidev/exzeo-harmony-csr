import * as types from '../actions/actionTypes';

import initialState from './initialState';
import agencyStateReducer from './agency.reducer';

describe('Agency State Reducer', () => {
  it('should call agencyStateReducer SET_AGENCIES', () => {
    const state = initialState.agencyState;
    const inputProps = [{ id: '1234' }, { id: '4321' }];
    const action = {
      type: types.SET_AGENCIES,
      agencies: inputProps
    };

    expect(agencyStateReducer(state, action)).toEqual({
      ...initialState.agencyState,
      agencies: inputProps
    });
  });

  it('should call agencyStateReducer SET_AGENCY', () => {
    const state = initialState.agencyState;
    const inputProps = [{ id: '1234' }, { id: '4321' }];
    const action = {
      type: types.SET_AGENCY,
      agency: inputProps
    };

    expect(agencyStateReducer(state, action)).toEqual({
      ...initialState.agencyState,
      agency: inputProps
    });
  });

  it('should call agencyStateReducer SET_AGENTS', () => {
    const state = initialState.agencyState;
    const inputProps = [{ id: '1234' }, { id: '4321' }];
    const action = {
      type: types.SET_AGENTS,
      agents: inputProps
    };

    expect(agencyStateReducer(state, action)).toEqual({
      ...initialState.agencyState,
      agents: inputProps
    });
  });

  it('should call agencyStateReducer SET_AGENTS_LIST', () => {
    const state = initialState.agencyState;
    const inputProps = [{ id: '1234' }, { id: '4321' }];
    const action = {
      type: types.SET_AGENTS_LIST,
      agentList: inputProps
    };

    expect(agencyStateReducer(state, action)).toEqual({
      ...initialState.agencyState,
      agentList: inputProps
    });
  });

  it('should call agencyStateReducer SET_ORPHANED_AGENTS', () => {
    const state = initialState.agencyState;
    const inputProps = [{ id: '1234' }, { id: '4321' }];
    const action = {
      type: types.SET_ORPHANED_AGENTS,
      orphans: inputProps
    };

    expect(agencyStateReducer(state, action)).toEqual({
      ...initialState.agencyState,
      orphans: inputProps
    });
  });
});
