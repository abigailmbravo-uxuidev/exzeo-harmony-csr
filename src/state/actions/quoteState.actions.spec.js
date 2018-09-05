import configureStore from 'redux-mock-store';
import * as types from './actionTypes';
import * as quoteStateActions from './quoteState.actions';

const middlewares = [];
const mockStore = configureStore(middlewares);
describe('Error Actions', () => {
  it('should call getLatestQuote', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const inputProps = {
      quoteId: '234',
      update: true
    };

    const stateObj = [{
      type: types.GET_QUOTE,
      quoteState: inputProps
    }];

    store.dispatch(quoteStateActions.getLatestQuote(inputProps.update, inputProps.quoteId));

    expect(store.getActions()).toEqual(stateObj);
  });
});
