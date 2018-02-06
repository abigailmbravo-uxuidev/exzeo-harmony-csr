import configureStore from 'redux-mock-store';
import * as types from './actionTypes';
import * as searchActions from './searchActions';

const middlewares = [];
const mockStore = configureStore(middlewares);
describe('policyStateActions', () => {
  it('should setPolicySearch', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const stateObj = [{
      type: types.POLICY_SEARCH,
      search: {

      }
    }];

    store.dispatch(searchActions.setPolicySearch({}));

    expect(store.getActions()).toEqual(stateObj);
  });

  it('should set quote search', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const stateObj = [{
      type: types.QUOTE_SEARCH,
      search: {

      }
    }];

    store.dispatch(searchActions.setQuoteSearch({}));

    expect(store.getActions()).toEqual(stateObj);
  });
});
