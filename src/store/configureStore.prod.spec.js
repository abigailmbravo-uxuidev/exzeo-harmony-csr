import initialState from '../reducers/initialState';
import configureStoreProd from './configureStore.prod';

describe('configure store prod', () => {
  it('shoule initialize store', () => {
    const newStore = configureStoreProd(initialState);
    expect(newStore);
  });
});
