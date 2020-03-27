import configureStore from 'redux-mock-store';
import * as types from './actionTypes';
import * as appStateActions from './appState.actions';

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
    };

    const stateObj = [
      {
        type: types.APPSTATE_SET,
        appState: { ...inputProps }
      }
    ];

    store.dispatch(
      appStateActions.setAppState(
        inputProps.modelName,
        inputProps.instanceId,
        inputProps.data
      )
    );

    expect(store.getActions()).toEqual(stateObj);
  });
});
