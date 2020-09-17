import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import * as endorsementUtil from '../../utilities/endorsementModel';
import * as types from './actionTypes';
import * as policyStateActions from './policy.actions';

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

    const stateObj = [
      {
        type: types.SET_POLICY,
        policy,
        summaryLedger
      }
    ];

    store.dispatch(policyStateActions.setPolicy(policy, summaryLedger));

    expect(store.getActions()).toEqual(stateObj);
  });

  it('should call dispatch setSummaryLedger', () => {
    const summaryLedger = { someValue: 'test' };

    const stateObj = [
      {
        type: types.SET_SUMMARY_LEDGER,
        summaryLedger
      }
    ];

    store.dispatch(policyStateActions.setSummaryLedger(summaryLedger));
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
      sandbox
        .stub(serviceRunner, 'callService')
        .callsFake((...args) => httpStub(...args));
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

      const stateObj = [
        {
          type: types.SET_POLICY,
          policy,
          summaryLedger
        }
      ];

      httpStub.onCall(0).returns(Promise.resolve({ data: policy }));
      httpStub
        .onCall(1)
        .returns(Promise.resolve({ data: { result: summaryLedger } }));

      await store.dispatch(policyStateActions.getPolicy(policyNumber));
      // TODO remove the outer array and sub-0 lookup in stateObj once the serviceRequest action is removed
      const action = store.getActions();
      expect([action[0]]).toEqual(stateObj);
    });

    it('should call dispatch on getSummaryLedger', async () => {
      const policyNumber = '1234';
      const summaryLedger = { someVal: 'true' };

      const stateObj = [
        {
          type: types.SET_SUMMARY_LEDGER,
          summaryLedger
        }
      ];

      httpStub
        .onCall(0)
        .returns(Promise.resolve({ data: { result: summaryLedger } }));

      await store.dispatch(policyStateActions.getSummaryLedger(policyNumber));
      sinon.assert.calledOnce(serviceRunner.callService);
      expect(store.getActions()).toEqual(stateObj);
    });

    it('should call getNewRate', async () => {
      const rate = { message: "You're approved" };
      sandbox
        .stub(endorsementUtil, 'convertToRateData')
        .callsFake(() => ({ policyNumber: '1234' }));
      httpStub.onCall(0).returns(Promise.resolve({ data: { result: rate } }));

      const response = await store.dispatch(
        policyStateActions.getNewRate({}, {})
      );
      expect(response).toEqual(rate);
    });

    it('should call setEffectiveDateChangeReasons', () => {
      const effectiveDateReasons = { effectiveDateReasons: '1234' };

      const stateObj = [
        {
          type: types.SET_EFFECTIVE_DATE_CHANGE_REASONS,
          effectiveDateReasons
        }
      ];

      store.dispatch(
        policyStateActions.setEffectiveDateChangeReasons(effectiveDateReasons)
      );

      expect(store.getActions()).toEqual(stateObj);
    });

    it('should call setPaymentHistory', () => {
      const paymentHistory = { setPaymentHistory: '1234' };

      const stateObj = [
        {
          type: types.SET_PAYMENT_HISTORY,
          paymentHistory
        }
      ];

      store.dispatch(policyStateActions.setPaymentHistory(paymentHistory));

      expect(store.getActions()).toEqual(stateObj);
    });

    it('should call setBillingOptions', () => {
      const billingOptions = { billingOptiona: '1234' };

      const stateObj = [
        {
          type: types.SET_BILLING_OPTIONS,
          billingOptions
        }
      ];

      store.dispatch(policyStateActions.setBillingOptions(billingOptions));

      expect(store.getActions()).toEqual(stateObj);
    });

    it('should call setBillingOptions', () => {
      const billingOptions = { billingOptiona: '1234' };

      const stateObj = [
        {
          type: types.SET_BILLING_OPTIONS,
          billingOptions
        }
      ];

      store.dispatch(policyStateActions.setBillingOptions(billingOptions));

      expect(store.getActions()).toEqual(stateObj);
    });

    it('should call setPaymentOptions', () => {
      const paymentOptions = { paymentOptions: '1234' };

      const stateObj = [
        {
          type: types.SET_PAYMENT_OPTIONS,
          paymentOptions
        }
      ];

      store.dispatch(policyStateActions.setPaymentOptions(paymentOptions));

      expect(store.getActions()).toEqual(stateObj);
    });

    it('should call setCancelOptions', () => {
      const cancelOptions = { cancelOptions: '1234' };

      const stateObj = [
        {
          type: types.SET_CANCEL_OPTIONS,
          cancelOptions
        }
      ];

      store.dispatch(policyStateActions.setCancelOptions(cancelOptions));

      expect(store.getActions()).toEqual(stateObj);
    });

    it('should call dispatch on getPaymentHistory', async () => {
      const stateObj = [
        {
          type: types.SET_PAYMENT_HISTORY,
          paymentHistory: []
        }
      ];

      httpStub.onCall(0).returns(Promise.resolve({ data: [] }));

      await store.dispatch(policyStateActions.getPaymentHistory('1234'));
      sinon.assert.calledOnce(serviceRunner.callService);
      expect(store.getActions()).toEqual(stateObj);
    });

    it('should call dispatch on addTransaction', async () => {
      httpStub.onCall(0).returns(Promise.resolve({ data: { result: [] } }));

      await store.dispatch(policyStateActions.addTransaction({ policy: {} }));
      sinon.assert.calledThrice(serviceRunner.callService);
      expect(store.getActions()).toEqual([]);
    });

    it('should call dispatch on getBillingOptionsForPolicy', async () => {
      httpStub.onCall(0).returns(Promise.resolve({ data: { result: [] } }));

      await store.dispatch(
        policyStateActions.getBillingOptionsForPolicy({
          policyNumber: '123',
          additionalInterests: [],
          policyHolders: [{}, {}],
          property: { windMitigation: {}, physicalAddress: {} },
          policyHolderMailingAddress: {},
          coverageLimits: {
            dwelling: {},
            otherStructures: {},
            personalProperty: {},
            lossOfUse: {},
            medicalPayments: {},
            moldProperty: {},
            personalLiability: {},
            moldLiability: {},
            ordinanceOrLaw: {}
          },
          deductibles: {
            allOtherPerils: {},
            hurricane: {},
            sinkhole: {}
          },
          coverageOptions: {
            sinkholePerilCoverage: {},
            propertyIncidentalOccupanciesMainDwelling: {},
            propertyIncidentalOccupanciesOtherStructures: {},
            liabilityIncidentalOccupancies: {},
            personalPropertyReplacementCost: {}
          },
          underwritingAnswers: {
            rented: {},
            monthsOccupied: {},
            noPriorInsuranceSurcharge: {}
          },
          rating: {
            totalPremium: '1',
            worksheet: {
              fees: {},
              elements: {
                windMitigationFactors: {}
              }
            }
          },
          companyCode: 'TTIC',
          state: 'FL',
          product: 'HO3',
          summaryLedger: { currentPremium: '1' }
        })
      );
      sinon.assert.calledOnce(serviceRunner.callService);
      const res = [{ billingOptions: [], type: 'SET_BILLING_OPTIONS' }];
      expect(store.getActions()).toEqual(res);
    });

    it('should call dispatch on getPaymentOptionsApplyPayments', async () => {
      httpStub.onCall(0).returns(Promise.resolve({ data: { result: [] } }));

      await store.dispatch(policyStateActions.getPaymentOptionsApplyPayments());
      sinon.assert.calledOnce(serviceRunner.callService);
      const res = [{ paymentOptions: [], type: 'SET_PAYMENT_OPTIONS' }];
      expect(store.getActions()).toEqual(res);
    });

    it('should call dispatch on createTransaction', async () => {
      httpStub.onCall(0).returns(Promise.resolve({ data: { result: [] } }));

      await store.dispatch(
        policyStateActions.createTransaction({ policy: {} })
      );
      sinon.assert.calledOnce(serviceRunner.callService);
      expect(store.getActions()).toEqual([]);
    });

    it('should call dispatch on updateBillPlan', async () => {
      httpStub.onCall(0).returns(
        Promise.resolve({
          data: { result: { newTransaction: { policyNumber: '23' } } }
        })
      );

      await store.dispatch(policyStateActions.updateBillPlan({}));
      sinon.assert.calledTwice(serviceRunner.callService);
      expect(store.getActions()).toEqual([]);
    });

    it('should call dispatch on getCancelOptions', async () => {
      httpStub
        .onCall(0)
        .returns(Promise.resolve({ data: { result: [{ value: [] }] } }));

      await store.dispatch(policyStateActions.getCancelOptions({}));
      sinon.assert.calledOnce(serviceRunner.callService);
      expect(store.getActions()).toEqual([
        { cancelOptions: [], type: 'SET_CANCEL_OPTIONS' }
      ]);
    });
  });
});
