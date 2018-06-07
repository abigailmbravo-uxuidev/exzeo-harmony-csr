import configureStore from 'redux-mock-store';
import * as types from './actionTypes';
import * as searchActions from './searchActions';

const middlewares = [];
const mockStore = configureStore(middlewares);
describe('policyStateActions', () => {
  it('should call reset search', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const stateObj = [{
      type: types.RESET_SEARCH
    }];

    store.dispatch(searchActions.resetSearch({}));

    expect(store.getActions()).toEqual(stateObj);
  });
});
