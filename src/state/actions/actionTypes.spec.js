import * as types from './actionTypes';

describe('ActionTypes', () => {
  it('should contain the action types', () => {
    expect(types.APPSTATE_SET).toEqual('APPSTATE_SET');
    expect(types.APPSTATE_ERROR).toEqual('APPSTATE_ERROR');
    expect(types.APP_ERROR).toEqual('APP_ERROR');
    expect(types.APP_ERROR_CLEAR).toEqual('APP_ERROR_CLEAR');
  });
});
