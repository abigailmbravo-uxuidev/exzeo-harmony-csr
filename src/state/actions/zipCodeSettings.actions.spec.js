import configureStore from 'redux-mock-store';

import * as types from './actionTypes';
import * as actions from './zipCodeSettings.actions';

const middlewares = [];
const mockStore = configureStore(middlewares);
describe('Zipcode Settings Actions', () => {
  it('should call setZipCodeSettings', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const inputProps = {
      zipCodeSettings: []
    };

    const stateObj = [{
      type: types.SET_ZIPCODE_SETTINGS,
      zipCodeSettings: inputProps.zipCodeSettings
    }];

    store.dispatch(actions.setZipCodeSettings(inputProps.zipCodeSettings));

    expect(store.getActions()).toEqual(stateObj);
  });
});
