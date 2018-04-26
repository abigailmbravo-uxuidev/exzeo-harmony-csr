import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const storage = {};

const localStorageMock = {
  setItem(key, value) {
    storage[key] = value || '';
  },
  getItem(key) {
    return key in storage ? storage[key] : null;
  }
};
global.localStorage = localStorageMock;
