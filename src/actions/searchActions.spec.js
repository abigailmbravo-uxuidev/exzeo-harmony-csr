import configureStore from 'redux-mock-store';
import * as types from './actionTypes';
import * as searchActions from './searchActions';

const middlewares = [];
const mockStore = configureStore(middlewares);
describe('policyStateActions', () => {
  it('should setSearch', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const stateObj = [{
      type: types.SEARCH,
      search: {

      }
    }];

    store.dispatch(searchActions.setSearch({}));

    expect(store.getActions()).toEqual(stateObj);
  });

});
