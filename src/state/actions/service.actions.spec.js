import configureStore from 'redux-mock-store';
import { http as axios } from '@exzeo/core-ui';
import MockAdapter from 'axios-mock-adapter';
import * as types from './actionTypes';
import * as serviceActions from './service.actions';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Service Actions', () => {
  it('should call serviceRequest', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const stateObj = [
      {
        type: types.SERVICE_REQUEST,
        undefined
      }
    ];

    store.dispatch(serviceActions.serviceRequest());
    expect(store.getActions()).toEqual(stateObj);
  });

  it('should call start getZipcodeSettings', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      url: `${process.env.REACT_APP_API_URL}/svc?getZipcodeSettings`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        exchangeName: 'harmony.crud',
        routingKey: 'harmony.crud.zipcode-data.getZipCode',
        data: {
          companyCode: 'TTIC',
          state: 'FL',
          product: 'AF3',
          zip: '00001',
          propertyId: '12000000000000001'
        }
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: { message: 'Ok' }
    });

    const initialState = {};
    const store = mockStore(initialState);
    serviceActions.getZipcodeSettings(store.dispatch);

    return serviceActions
      .getZipcodeSettings(
        'TTIC',
        'FL',
        'AF3',
        '00001',
        '12000000000000001'
      )(store.dispatch)
      .then(result => {
        expect(store.getActions()[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });

  it('should fail start getZipcodeSettings', () => {
    const mockAdapter = new MockAdapter(axios);
    const axiosOptions = {
      url: `${process.env.REACT_APP_API_URL}/svc?getZipcodeSettings`,
      method: 'POST',
      data: {
        exchangeName: 'harmony.crud',
        routingKey: 'harmony.crud.zipcode-data.getZipCode',
        data: {
          companyCode: 'TTIC',
          state: 'FL',
          product: 'HO3',
          zip: '33607',
          propertyId: '10000000000000003'
        }
      },
      headers: {
        'Content-Type': 'application/json'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);
    serviceActions.getZipcodeSettings(store.dispatch);

    return serviceActions
      .getZipcodeSettings(null)(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.APP_ERROR);
      });
  });
});
