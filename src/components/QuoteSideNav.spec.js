import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import ConnectedApp, {
  SideNav,
  UWconditionsPopup
} from './QuoteSideNav';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing QuoteSideNav component', () => {
  it('should test connected app', () => {
    const initialState = {
      service: {},
      quoteState: {},
      cg: {
        bb: {
          data: {
            modelInstanceId: '123',
            model: {},
            uiQuestions: []
          }
        }
      },
      appState: {
        data: { activateRedirect: false },
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      companyCode: 'TTIC',
      state: 'FL',
      product: 'HO3',
      match: { params: {} },
      actions: {
        uiActions: {
          toggleNote() {}
        },
        cgActions: {
          batchCompleteTask() { return Promise.resolve(); }
        },
        appStateActions: {
          setAppState() {}
        }
      },
      fieldQuestions: [],
      quoteData: {
        quoteNumber: 'test',
        sourceNumber: 'test'
      },
      dispatch: store.dispatch,
      appState: {
        instanceId: 1,
        data: {
          submitting: false
        }
      },
      ...initialState
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);

    const sideNav = SideNav(props);

    UWconditionsPopup(props);
  });
});
