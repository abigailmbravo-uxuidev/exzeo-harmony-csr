import * as types from '../actions/actionTypes';
import authReducer from './auth.reducer';

describe('auth Reducer', () => {
  it('should call quoteStateReducer AUTH', () => {
    const inputProps = { transaction: {} };
    const action = {
      type: types.AUTH,
      data: inputProps
    };

    expect(authReducer(inputProps, action)).toEqual(inputProps);
  });
});
