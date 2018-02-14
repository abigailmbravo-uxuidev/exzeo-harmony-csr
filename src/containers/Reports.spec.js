import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import ConnectedApp from './Reports';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing Reports component', () => {
  it('should test connected app', () => {
    const initialState = {
      authState: {
        userProfile: {
          name: 'Test'
        }
      }
    };
    const store = mockStore(initialState);
    const props = {
      auth: {
        logout() {}
      }
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
  });
});
