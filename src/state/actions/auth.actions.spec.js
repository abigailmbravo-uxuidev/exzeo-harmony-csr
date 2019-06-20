import configureStore from 'redux-mock-store';
import * as types from './actionTypes';
import * as authActions from './auth.actions';

const middlewares = [];
const mockStore = configureStore(middlewares);
describe('authActions', () => {
  it('should call setUserPofile', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const userProfile = {
      name: 'tester'
    };

    const stateObj = [
      {
        type: types.AUTH,
        authState: {
          userProfile
        }
      }
    ];

    store.dispatch(authActions.setUserProfile(userProfile));

    expect(store.getActions()).toEqual(stateObj);
  });
});
