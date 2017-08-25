import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import { UnderwritingValidationBar } from './UnderwritingValidationBar';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing UnderwritingValidationBar component', () => {
  it('should test connected app', () => {
    const initialState = {
      authState: {},
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
      handleSubmit() { },
      quoteData: {
        underwritingExceptions: [{ canOverride: true, fields: [{ name: 'rating.netPremium', value: 'null' }] }],
        policyHolders: []
      },
      userProfile: '',
      fieldQuestions: [],
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      }
    };
    const wrapper = shallow(<UnderwritingValidationBar store={store} {...props} />);
    expect(wrapper);
  });
});
