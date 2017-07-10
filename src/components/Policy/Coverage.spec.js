import React from 'react';
import thunk from 'redux-thunk';
import localStorage from 'localStorage';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow, mount } from 'enzyme';
import ConnectedApp, { getPropertyAppraisialLink } from './Coverage';

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

describe('Testing Coverage component', () => {
  it('should test connected app', () => {
    const initialState = {
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
      actions: {
        errorActions: { dispatchClearAppError() { } }
      },
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      },
      ...propTypes
    };

    localStorage.setItem('isNewTab', true);
    localStorage.setItem('lastSearchData', JSON.stringify({
      searchType: 'policy'
    }));

    const wrapper = mount(
      <Provider store={store} >
        <ConnectedApp {...props} />
      </Provider>);
    expect(wrapper);
  });

  it('should test getPropertyAppraisialLink', () => {
    const policy = {
      property: {
        physicalAddress: {
          county: 'ALACHUA'
        }
      }
    };
    const questions = [
      {
        _id: '32432424234234234',
        name: 'propertyAppraisal',
        steps: [
          'additionalInterestsCSR'
        ],
        models: [
          'quote'
        ],
        question: 'PA',
        answerType: 'radio',
        answers: [
          {
            label: 'ALACHUA',
            answer: 'http://www.acpafl.org/'
          },
          {
            label: 'BAKER',
            answer: 'http://www.bakerpa.com'
          }
        ]
      }
    ];
    expect(getPropertyAppraisialLink(policy.property.physicalAddress.county, questions).label).toEqual('ALACHUA');
    expect(getPropertyAppraisialLink(policy.property.physicalAddress.county, questions).answer).toEqual('http://www.acpafl.org/');
  });
});
