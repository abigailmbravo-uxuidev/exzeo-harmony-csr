import * as types from '../actions/actionTypes';
import authReducer from './auth.reducer';

describe('auth Reducer', () => {
  it('should call authState reducer AUTH', () => {
    const inputProps = { userProfile: { resources: [] } };
    const action = {
      type: types.AUTH,
      authState: inputProps
    };

    expect(authReducer(inputProps, action)).toEqual(inputProps);
  });
});
