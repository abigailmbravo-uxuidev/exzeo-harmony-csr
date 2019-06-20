import configureStore from 'redux-mock-store';
import { http as axios} from '@exzeo/core-ui';
import MockAdapter from 'axios-mock-adapter';

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

  it('should call searchSettingsByCSPAndZip', () => {
    const mockAdapter = new MockAdapter(axios);

    const initialState = {};
    const store = mockStore(initialState);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc?fetchZipCodeSettings`,
      data: {
        service: 'zipcodesettings',
        method: 'GET',
        path: `graphql?query=${actions.generateSearchSettingsByCSPAndZipQuery('33607', 'FL')}`
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });
    actions.searchSettingsByCSPAndZip(store.dispatch);

    return actions.searchSettingsByCSPAndZip('33607', 'FL')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.SET_ZIPCODE_SETTINGS);
      })
      .catch(err => console.error('Error in test: searchSettingsByCSPandZip: ', err));
  });

  it('should fail searchSettingsByCSPAndZip', () => {
    const mockAdapter = new MockAdapter(axios);

    const initialState = {};
    const store = mockStore(initialState);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'zipcodesettings',
        method: 'GET',
        path: `graphql?query=${actions.generateSearchSettingsByCSPAndZipQuery('33607', 'FL')}`
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });
    actions.searchSettingsByCSPAndZip(store.dispatch);

    return actions.searchSettingsByCSPAndZip(null)(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.APP_ERROR);
      });
  });
});
