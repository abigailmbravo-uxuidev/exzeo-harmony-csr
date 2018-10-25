import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import * as types from './actionTypes';
import * as tmActions from './territoryManagers.actions';

const middlewares = [];
const mockStore = configureStore(middlewares);
describe('Terrritory Manager Actions', () => {
  it('should call setTerritoryManagers', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const inputProps = {
      state: 'FL',
      territoryManagers: [{
        _id: '5b7db9f6ff54fd6a5c619ee8',
        territory: 'Northeast',
        name: 'Jodi Kelley',
        phoneNumber: '8134195220',
        emailAddress: 'jkelley@hcpci.com',
        states: [
          {
            state: 'FL',
            counties: [
              {
                county: 'NASSAU'
              }
            ]
          }
        ]
      }]
    };

    const stateObj = [{
      type: types.SET_TERRITORY_MANAGERS,
      territoryManagers: inputProps.territoryManagers
    }];

    store.dispatch(tmActions.setTerritoryManagers(inputProps.territoryManagers));

    expect(store.getActions()).toEqual(stateObj);
  });

  it('should call getTerritoryManagers', () => {
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
        service: 'territory-manager-service',
        method: 'GET',
        path: 'territoryManagers/FL'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });
    tmActions.getTerritoryManagers(store.dispatch);

    return tmActions.getTerritoryManagers('FL')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.SET_TERRITORY_MANAGERS);
      });
  });

  it('should fail getTerritoryManagers', () => {
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
        service: 'territory-manager-service',
        method: 'GET',
        path: 'territoryManagers/FL'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });
    tmActions.getTerritoryManagers(store.dispatch);

    return tmActions.getTerritoryManagers(null)(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.APP_ERROR);
      });
  });
});
