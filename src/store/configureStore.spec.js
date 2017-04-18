import configureStore from './configureStore';

describe('configure store', () => {
  it('shoule initialize store dev', () => {
    const newStore = configureStore();
    expect(newStore);
  });
  it('shoule initialize store prod', () => {
    process.env.NODE_ENV = 'production';
    const newStore = configureStore();
    expect(newStore);
  });
});
