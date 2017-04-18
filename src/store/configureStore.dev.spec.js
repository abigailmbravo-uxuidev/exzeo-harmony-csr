import initialState from '../reducers/initialState';
import configureStoreDev from './configureStore.dev';

describe('configure store dev', () => {
  it('shoule initialize store', () => {
    const newStore = configureStoreDev(initialState);
    expect(newStore);
  });
});
