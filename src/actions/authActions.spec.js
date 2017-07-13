import configureStore from 'redux-mock-store';
import * as types from './actionTypes';
import * as authActions from './authActions';

const middlewares = [];
const mockStore = configureStore(middlewares);
describe('authActions', () => {
  it('should call setUserPofile', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const stateObj = [{
      type: types.AUTH,
      authState: {
        userProfile: {}
      }
    }];

    store.dispatch(authActions.setUserProfile({}));

    expect(store.getActions()).toEqual(stateObj);
  });

  it('should dispatchUserProfile', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const stateObj = [{
      type: types.AUTH,
      authState: {
        userProfile: {}
      }
    }];

    authActions.dispatchUserProfile({});
    store.dispatch(authActions.setUserProfile({}));

    expect(store.getActions()).toEqual(stateObj);
  });
});
