import * as types from './actionTypes';

describe('ActionTypes', () => {
  it('should contain the action types', () => {
    expect(types.CG_START).toEqual('CG_START');
    expect(types.CG_ACTIVE_TASK).toEqual('CG_ACTIVE_TASK');
    expect(types.CG_COMPLETE).toEqual('CG_COMPLETE');
    expect(types.CG_ERROR).toEqual('CG_ERROR');
    expect(types.APPSTATE_SET).toEqual('APPSTATE_SET');
    expect(types.APPSTATE_ERROR).toEqual('APPSTATE_ERROR');
    expect(types.APP_ERROR).toEqual('APP_ERROR');
    expect(types.APP_ERROR_CLEAR).toEqual('APP_ERROR_CLEAR');
  });
});
