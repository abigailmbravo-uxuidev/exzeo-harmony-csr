import * as types from './actionTypes';

export const setUserProfile = (userProfile) => {
  return {
    type: types.AUTH,
    authState: {
      userProfile
    }
  };
};
