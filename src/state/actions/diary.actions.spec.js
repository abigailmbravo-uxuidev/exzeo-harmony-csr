import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import { POLICY_RESOURCE_TYPE } from '../../constants/diaries';

import * as types from './actionTypes';
import * as diaryStateActions from './diary.actions';

describe('Test diary.actions', () => {
  const mockStore = configureStore([]);
  let initialState;
  let store;

  beforeEach(() => {
    initialState = {};
    store = mockStore(initialState);
  });

  it('should call setDiaries', () => {
    const diaries = [{ _id: '1' }, { _id: '2' }, { _id: '3' }];

    const stateObj = [
      {
        type: types.SET_DIARIES,
        diaries
      }
    ];

    store.dispatch(diaryStateActions.setDiaries(diaries));

    expect(store.getActions()).toEqual(stateObj);
  });

  describe('Test diary.actions async actions', () => {
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

    it('Should call dispatch on fetchDiaries', async () => {
      const filter = {
        assignee: 'test|1234'
      };
      const diaries = [{ _id: '1' }, { _id: '2' }, { _id: '3' }];

      const stateObj = [
        {
          type: types.SET_DIARIES,
          diaries
        }
      ];

      httpStub
        .onCall(0)
        .returns(Promise.resolve({ data: { result: diaries } }));

      await store.dispatch(diaryStateActions.fetchDiaries(filter));
      // TODO remove the outer array and sub-0 lookup in stateObj once the serviceRequest action is removed
      const action = store.getActions();
      expect([action[0]]).toEqual(stateObj);
    });

    it('Should call dispatch on submitDiaries', async () => {
      const props = {
        user: { userId: '123', userName: 'Test Guy' },
        resourceType: POLICY_RESOURCE_TYPE,
        resourceId: '12-1005269-02',
        initialValues: {}
      };

      const data = {
        message: 'testing message',
        open: true,
        assignees: []
      };

      const stateObj = [
        {
          type: types.SET_DIARIES,
          diaries: []
        }
      ];

      httpStub.onCall(0).returns(Promise.resolve({ data: {} }));
      httpStub.onCall(1).returns(Promise.resolve({ data: { result: [] } }));

      const returnVal = await store.dispatch(
        diaryStateActions.submitDiary(data, props)
      );

      expect(returnVal).toBeTruthy();
    });
  });
});
