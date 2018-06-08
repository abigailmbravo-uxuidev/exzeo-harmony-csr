import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import * as types from './actionTypes';
import * as serviceRunner from '../utilities/serviceRunner';
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
    });

    afterEach(() => {
      // restore to original state for next test
      sandbox.restore();
      sandbox.reset();
    });


    it('should call searchAddresses', async () => {


      const stateObj = [];
    });
  });

});
