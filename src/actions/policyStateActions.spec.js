import configureStore from 'redux-mock-store';
import * as types from './actionTypes';
import * as policyStateActions from './policyStateActions';

const middlewares = [];
const mockStore = configureStore(middlewares);
describe('Policy State Actions', () => {
  it('should call updatePolicy', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const inputProps = {
      update: true,
      policyNumber: '123'
    };

    const stateObj = [{
      type: types.GET_POLICY,
      policyState: inputProps
    }];

    store.dispatch(policyStateActions.updatePolicy(inputProps.update, inputProps.policyNumber));

    expect(store.getActions()).toEqual(stateObj);
  });

  it('should call dispatch updatePolicy', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const inputProps = {
      update: true,
      policyNumber: '123'
    };

    const stateObj = [{
      type: types.GET_POLICY,
      policyState: inputProps
    }];

    policyStateActions.dispatchGetLatestPolicy(true, '123')(store.dispatch);
    expect(store.getActions()).toEqual(stateObj);
  });
});
