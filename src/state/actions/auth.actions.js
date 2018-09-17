import * as types from './actionTypes';

/**
 *
 * @param userProfile
 * @returns {{type: string, authState: {userProfile: *}}}
 */
export function setUserProfile(userProfile) {
  return {
    type: types.AUTH,
    authState: {
      userProfile
    }
  };
}
