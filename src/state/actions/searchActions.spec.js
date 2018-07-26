import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import * as types from './actionTypes';
import * as serviceRunner from '../../utilities/serviceRunner';
import * as searchActions from './searchActions';

describe('Search Actions', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  let initialState;
  let store;

  beforeEach(() => {
    initialState = { loading: false };
    store = mockStore(initialState)
  });

  it('should call toggleLoading', () => {
    const stateObj = [{
      type: types.TOGGLE_LOADING,
      loading: true
    }];

    store.dispatch(searchActions.toggleLoading(true));

    expect(store.getActions()).toEqual(stateObj);
  });

  it('should call resetSearch', () => {
    const stateObj = [{
      type: types.RESET_SEARCH
    }];

    store.dispatch(searchActions.resetSearch());

    expect(store.getActions()).toEqual(stateObj);
  });

  it('should call setSearchResults', () => {
    const payload = {
      currentPage: 1,
      pageSize: 25,
      sortBy: 'policyNumber',
      sortDirection: 'desc',
      results: [{
        policyID: '1234'
      }],
      totalRecords: 1,
      noResults: false
    };
    const stateObj = [{
      type: types.SET_SEARCH_RESULTS,
      ...payload
    }];

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
      sandbox.stub(serviceRunner, 'callService').callsFake((...args) => httpStub(...args));
      sandbox.stub(localStorage, 'setItem').callsFake(() => null)
    });

    afterEach(() => {
      // restore to original state for next test
      sandbox.restore();
      sandbox.reset();
    });

    it('should call dispatch on handleAddressSearch', async () => {
      const addressSearch = '1234';
      const addresses = [{id: '1234'}, {id: '4321'}];
      const stubAddressData = { data: { result: { IndexResult: addresses, TotalCount: addresses.length } } };
      const payload = {
        results: addresses,
        totalRecords: 2,
        noResults: false
      };
      const stateObj = [{
        type: types.SET_SEARCH_RESULTS,
        ...payload,
        currentPage: 1,
        pageSize: 0,
        sortBy: '',
        sortDirection: '',
      }];


      httpStub.onCall(0).returns(Promise.resolve(stubAddressData));

      await store.dispatch(searchActions.handleAddressSearch(addressSearch));

      sinon.assert.calledOnce(serviceRunner.callService);
      expect(store.getActions()).toEqual(stateObj);
    });


    it('should call dispatch on searchQuotes', async () => {
      const quoteSearch = { quoteNumber: '1234' };
      const quotes = [{id: '1234'}, {id: '4321'}];
      const payload = {
        results: quotes,
        totalRecords: 2,
        noResults: false
      };
      const stateObj = [{
        type: types.SET_SEARCH_RESULTS,
        ...payload,
        currentPage: 1,
        pageSize: 0,
        sortBy: '',
        sortDirection: 'desc',
      }];

      const stubReturnData = {data: {result: {quotes, sortDirection: -1, totalNumberOfRecords: quotes.length}}};
      httpStub.onCall(0).returns(Promise.resolve(stubReturnData));

      await store.dispatch(searchActions.handleQuoteSearch(quoteSearch));

      sinon.assert.calledOnce(serviceRunner.callService);
      expect(store.getActions()).toEqual(stateObj);
    });

  });

});
