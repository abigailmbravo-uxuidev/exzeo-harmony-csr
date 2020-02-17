import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-dom/extend-expect';
import '@testing-library/jest-dom/extend-expect';
import { configure as reactTestingConfigure } from '@testing-library/react';

configure({ adapter: new Adapter() });
reactTestingConfigure({ testIdAttribute: 'data-test' });

// TODO: Upgrade to react-dom@16.9 and then remove this
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
//

const storage = {};

const localStorageMock = {
  setItem(key, value) {
    storage[key] = String(value) || '';
  },
  getItem(key) {
    return key in storage ? String(storage[key]) : null;
  },
  removeItem(key) {
    storage[key] = null;
  }
};

global.localStorage = localStorageMock;

export default localStorageMock;
