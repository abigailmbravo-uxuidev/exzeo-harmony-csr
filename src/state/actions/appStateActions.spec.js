import configureStore from 'redux-mock-store';
import * as types from './actionTypes';
import * as appStateActions from './appStateActions';
import axios from "axios/index";
import * as serviceActions from "./serviceActions";

const middlewares = [];
const mockStore = configureStore(middlewares);
describe('App State Actions', () => {
  it('should call setAppState', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const inputProps = {
      modelName: 'bb',
      instanceId: '123',
      data: { bb: '123' }
    }

    const stateObj = [{
      type: types.APPSTATE_SET,
      appState: { ...inputProps }
    }];

    store.dispatch(appStateActions.setAppState(inputProps.modelName, inputProps.instanceId, inputProps.data));

    expect(store.getActions()).toEqual(stateObj);
  });
  it('should call setAppStateError', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const inputProps = {
      modelName: 'bb',
      instanceId: '123',
      error: 'my error'
    }

    const stateObj = [{
      type: types.APPSTATE_ERROR,
      appState: { ...inputProps }
    }];

    store.dispatch(appStateActions.setAppStateError(inputProps.modelName, inputProps.instanceId, inputProps.error));
    expect(store.getActions()).toEqual(stateObj);
  });
  it('should call dispatchAppState', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const inputProps = {
      modelName: 'bb',
      instanceId: '123',
      data: { bb: '123' }
    }

    const stateObj = [{
      type: types.APPSTATE_SET,
      appState: { ...inputProps }
    }];

    appStateActions.dispatchAppState(inputProps.modelName, inputProps.instanceId, inputProps.data)(store.dispatch);
  });

  // it('should call start getAgencies', () => {
  //   const mockAdapter = new MockAdapter(axios);
  //
  //   const axiosOptions = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     url: `${process.env.REACT_APP_API_URL}/svc`,
  //     data: {
  //       service: 'agency',
  //       method: 'GET',
  //       path: 'v1/agencies/TTIC/FL?pageSize=1000&sort=displayName&SortDirection=asc'
  //     }
  //   };
  //
  //   mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
  //     data: []
  //   });
  //
  //   const initialState = {};
  //   const store = mockStore(initialState);
  //   serviceActions.getAgencies(store.dispatch);
  //
  //   return serviceActions.getAgencies('TTIC', 'FL')(store.dispatch)
  //     .then(() => {
  //       expect(store.getActions()[0].type).toEqual(types.SERVICE_REQUEST);
  //     });
  // });
  //
  // it('should fail start getAgencies', () => {
  //   const mockAdapter = new MockAdapter(axios);
  //
  //   const axiosOptions = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     url: `${process.env.REACT_APP_API_URL}/svc`,
  //     data: {
  //       service: 'agency',
  //       method: 'GET',
  //       path: 'v1/agencies/TTIC/FL'
  //     }
  //   };
  //
  //   mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
  //     data: []
  //   });
  //
  //   const initialState = {};
  //   const store = mockStore(initialState);
  //   serviceActions.getAgencies(store.dispatch);
  //
  //   return serviceActions.getAgencies(null, 'FL')(store.dispatch)
  //     .then(() => {
  //       expect(store.getActions()[0].type).toEqual(types.APP_ERROR);
  //     });
  // });
});
