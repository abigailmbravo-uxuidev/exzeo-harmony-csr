import configureStore from 'redux-mock-store';
import * as types from './actionTypes';
import * as errorActions from './errorActions';

const middlewares = [];
const mockStore = configureStore(middlewares);
describe('Error Actions', () => {
  it('should call setAppError', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const inputProps = {
      error: 'my error'
    }

    const stateObj = [{
      type: types.APP_ERROR,
      error: inputProps.error
    }];

    store.dispatch(errorActions.setAppError(inputProps.error));

    expect(store.getActions()).toEqual(stateObj);
  });
  it('should call clearAppError', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const stateObj = [{
      type: types.APP_ERROR_CLEAR,
      error: {}
    }];

    store.dispatch(errorActions.clearAppError());
    expect(store.getActions()).toEqual(stateObj);
  });
  it('should call dispatchClearAppError', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const stateObj = [{
      type: types.APP_ERROR_CLEAR,
      error: {}
    }];

    errorActions.dispatchClearAppError()(store.dispatch);
    expect(store.getActions()).toEqual(stateObj);
  });
});
