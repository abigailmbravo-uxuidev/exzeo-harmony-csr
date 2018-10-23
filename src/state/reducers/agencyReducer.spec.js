
import * as types from '../actions/actionTypes';

import initialState from './initialState';
import agencyStateReducer from './agencyReducer';

describe('Agency State Reducer', () => {
  it('should call agencyStateReducer SET_AGENCIES', () => {
    const state = initialState.agencyState;
    const inputProps = [{ id: '1234' }, { id: '4321' }];
    const action = {
      type: types.SET_AGENCIES,
      agencies: inputProps
    };

    expect(agencyStateReducer(state, action)).toEqual({ ...initialState.agencyState, agencies: inputProps });
  });
});
