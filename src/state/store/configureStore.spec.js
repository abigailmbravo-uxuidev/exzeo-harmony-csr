import initialState from '../../state/reducers/initialState';
import configureStore from './configureStore';

describe('configure store', () => {
  it('should initialize store', () => {
    const newStore = configureStore(initialState);
    expect(newStore);
  });
});
