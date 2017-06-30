import * as types from './actionTypes';

export const setUserProfile = (userProfile) => {
  const stateObj = {
    type: types.AUTH,
    authState: {
      userProfile
    }
  };
  return stateObj;
};

export const dispatchUserProfile = (userProfile) => dispatch => dispatch(setUserProfile(userProfile));