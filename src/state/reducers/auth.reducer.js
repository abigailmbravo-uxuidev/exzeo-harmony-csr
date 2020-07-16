import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.authState, action) {
  switch (action.type) {
    case types.AUTH:
      // There are lots of resources in this array that are included for backwards compat, remove those so we don't have to loop over them again.
      const resources = action.authState.userProfile?.resources?.filter(
        r => !Boolean(r.conditions)
      );
      const userProfile = {
        ...action.authState.userProfile,
        resources
      };
      return { ...state, userProfile };
    default:
      return state;
  }
}
