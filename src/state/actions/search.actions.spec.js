import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import { SEARCH_TYPES } from '../../constants/search';

import * as types from './actionTypes';
import * as searchActions from './search.actions';

describe('Search Actions', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  let initialState;
  let store;

  beforeEach(() => {
    initialState = { loading: false };
    store = mockStore(initialState);
  });

  it('should call toggleLoading', () => {
    const stateObj = [
      {
        type: types.TOGGLE_LOADING,
        loading: true
      }
    ];

    store.dispatch(searchActions.toggleLoading(true));

    expect(store.getActions()).toEqual(stateObj);
  });

  it('should call resetSearch', () => {
    const stateObj = [
      {
        type: types.RESET_SEARCH
      }
    ];

    store.dispatch(searchActions.resetSearch());

    expect(store.getActions()).toEqual(stateObj);
  });

  it('should call setSearchResults', () => {
    const payload = {
      currentPage: 1,
      pageSize: 25,
      sortBy: 'policyNumber',
      sortDirection: 'desc',
      results: [
        {
          policyID: '1234',
          currentPage: 1
        }
      ],
      totalRecords: 1,
      noResults: false
    };
    const stateObj = [
      {
        type: types.SET_SEARCH_RESULTS,
        ...payload
      }
    ];

    store.dispatch(searchActions.setSearchResults(payload));

    expect(store.getActions()).toEqual(stateObj);
  });

  describe('Test searchActions async actions', () => {
    const sandbox = sinon.sandbox.create();
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    let initialState;
    let store;
    let httpStub;

    beforeEach(() => {
      initialState = {};
      store = mockStore(initialState);
      httpStub = sinon.stub();
      sandbox
        .stub(serviceRunner, 'callService')
        .callsFake((...args) => httpStub(...args));
      sandbox.stub(localStorage, 'setItem').callsFake(() => null);
    });

    afterEach(() => {
      // restore to original state for next test
      sandbox.restore();
      sandbox.reset();
    });

    it('should test handleSearchSubmit for newQuoteSearch', async () => {
      const data = { address: '1234' };
      const props = { searchType: SEARCH_TYPES.newQuote };
      httpStub.onCall(0).returns(Promise.resolve({}));

      await store.dispatch(searchActions.handleSearchSubmit(data, props));

      expect(store.getActions().length).toEqual(3);
    });

    it('should test handleSearchSubmit for quoteSearch', async () => {
      const data = {};
      const props = { searchType: SEARCH_TYPES.quote };
      httpStub.onCall(0).returns(Promise.resolve({}));

      await store.dispatch(searchActions.handleSearchSubmit(data, props));

      expect(store.getActions().length).toEqual(3);
    });

    it('should test handleSearchSubmit for policySearch', async () => {
      const data = {};
      const props = { searchType: SEARCH_TYPES.policy };
      httpStub.onCall(0).returns(Promise.resolve({}));

      await store.dispatch(searchActions.handleSearchSubmit(data, props));

      expect(store.getActions().length).toEqual(3);
    });

    it('should test handleSearchSubmit for agentSearch', async () => {
      const data = {};
      const props = { searchType: SEARCH_TYPES.agent };
      httpStub.onCall(0).returns(Promise.resolve({}));

      await store.dispatch(searchActions.handleSearchSubmit(data, props));

      expect(store.getActions().length).toEqual(3);
    });

    it('should test handleSearchSubmit for agencySearch', async () => {
      const data = {};
      const props = { searchType: SEARCH_TYPES.agency };
      httpStub.onCall(0).returns(Promise.resolve({}));

      await store.dispatch(searchActions.handleSearchSubmit(data, props));

      expect(store.getActions().length).toEqual(3);
    });
  });
});
