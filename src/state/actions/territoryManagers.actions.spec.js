import configureStore from 'redux-mock-store';
import * as types from './actionTypes';
import * as tmActions from './territoryManagers.actions';

const middlewares = [];
const mockStore = configureStore(middlewares);
describe('Terrritory Manager Actions', () => {
  it('should call setTerritoryManagers', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const inputProps = {
      state: 'FL',
      territoryManagers: [{
        _id: '5b7db9f6ff54fd6a5c619ee8',
        territory: 'Northeast',
        name: 'Jodi Kelley',
        phoneNumber: '8134195220',
        emailAddress: 'jkelley@hcpci.com',
        states: [
          {
            state: 'FL',
            counties: [
              {
                county: 'NASSAU'
              }
            ]
          }
        ]
      }]
    };

    const stateObj = [{
      type: types.SET_TERRITORY_MANAGERS,
      territoryManagers: inputProps.territoryManagers
    }];

    store.dispatch(tmActions.setTerritoryManagers(inputProps.territoryManagers));

    expect(store.getActions()).toEqual(stateObj);
  });
});
