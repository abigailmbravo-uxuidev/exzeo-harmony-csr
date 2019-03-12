import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import { QuoteBase } from './index';

const mockStore = configureStore([thunk]);

describe('Testing Policy component', () => {
  it('should test connected app', () => {
    const initialState = {
        authState:{
            userProfile: {}
        },
        appState: {
            data: {}
        },
        service: {
            getZipcodeSettings: { timezone: '' }
        },
        quoteState: {
            quote: {
                policyHolders: [],
                quoteNumber: '12-3432453-01',
                rating: { worksheet: { fees: {} } },
                policyNumber: '1234',
                property: {
                physicalAddress: {}
                }
            },
            summaryLedger: {
                _id: '1234',
                status: {
                    code: 13
                }
            }
        },
        diaries: []
    };
    const store = mockStore(initialState);
    const props = {
      match: { params: {}, path: '/quote', url: '/test' },
      batchCompleteTask() { return Promise.resolve(); },
      createTransaction() { return Promise.resolve(); },
      getAgents() {},
      getAgency() {},
      getNotes() {},
      getZipCodeSettings() { return Promise.resolve(); },
      setAppState() {},
      startWorkflow() { return Promise.resolve({}); },
      appState: initialState.appState,
      dispatch: store.dispatch,
      quoteData: initialState.quoteState.quote,
      zipCodeSettings: initialState.service.getZipcodeSettings,
      initialized: true
    };

    const instance = shallow(<QuoteBase store={{ dispatch: x => x }} {...props} />).instance();
    expect(instance);

    instance.updateQuote('csrCoverage', {}, 'coverage');
    instance.handleToggleDiaries();

     const wrapper = mount(
       <Provider store={store}>
         <Router>
           <QuoteBase {...props} />
         </Router>
       </Provider>);
    expect(wrapper);
  });
});
