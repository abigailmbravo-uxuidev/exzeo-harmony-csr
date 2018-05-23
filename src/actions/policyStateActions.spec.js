import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import sinon from 'sinon'
import * as types from './actionTypes';
import * as serviceRunner from '../utilities/serviceRunner';
import * as policyStateActions from './policyStateActions';

describe('Policy State Actions', () => {
  const mockStore = configureStore([]);
  let initialState;
  let store;

  beforeEach(() => {
    initialState = {};
    store = mockStore(initialState);
  });

  it('should call setPolicy', () => {
    const policy = { policyID: '1234' };
    const summaryLedger = {};

    const stateObj = [{
      type: types.SET_POLICY,
      policy,
      summaryLedger
    }];

    store.dispatch(policyStateActions.setPolicy(policy, summaryLedger));

    expect(store.getActions()).toEqual(stateObj);
  });

  it('should call dispatch setSummaryLedger', () => {
    const summaryLedger = { someValue: 'test' };

    const stateObj = [{
      type: types.SET_SUMMARY_LEDGER,
      summaryLedger
    }];

    store.dispatch(policyStateActions.setSummaryLedger(summaryLedger));
    expect(store.getActions()).toEqual(stateObj);
  });

  it('should call dispatch setNewRate', () => {
    const rate = { someVal: 'test'};

    const stateObj = [{
      type: types.SET_RATE,
      rate
    }];

    store.dispatch(policyStateActions.setNewRate(rate));
    expect(store.getActions()).toEqual(stateObj);
  });

  describe('Test policyStateActions async actions', () => {
    // create sandbox for stubs/mocks/spies
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
      sandbox.stub(serviceRunner, 'callService',).callsFake((...args) => httpStub(...args));

    });

    afterEach(() => {
      // restore to original state for next test
      sandbox.restore();
      sandbox.reset();
    });

    it('Should call dispatch on getPolicy', async () => {
      const policyNumber = '1234';
      const policy = { policyNumber };
      const summaryLedger = { someVal: 'true' };

      const stateObj = [{
        type: types.SET_POLICY,
        policy,
        summaryLedger
      }];

      httpStub.onCall(0).returns(Promise.resolve({ data: policy }));
      httpStub.onCall(1).returns(Promise.resolve({ data: { result: summaryLedger} }));

      await store.dispatch(policyStateActions.getPolicy(policyNumber));
      expect(store.getActions()).toEqual(stateObj);
    });

    it('should call dispatch on getSummaryLedger', async () => {
      const policyNumber = '1234';
      const summaryLedger = { someVal: 'true' };

      const stateObj = [{
        type: types.SET_SUMMARY_LEDGER,
        summaryLedger
      }];

      httpStub.onCall(0).returns(Promise.resolve({ data: { result: summaryLedger } }));

      await store.dispatch(policyStateActions.getSummaryLedger(policyNumber));
      sinon.assert.calledOnce(serviceRunner.callService)
      expect(store.getActions()).toEqual(stateObj);

    });

  })
});

