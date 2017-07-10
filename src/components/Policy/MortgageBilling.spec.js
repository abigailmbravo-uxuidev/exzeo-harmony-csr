import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';
import _ from 'lodash';
import ConnectedApp, { setRank } from './MortgageBilling';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing MortgageBilling component', () => {
  it('should test connected app', () => {
    const initialState = {
      service: {
      },
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
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
  });

  it('test setRank', () => {
    const additionalInterests = [
      {
        type: 'Mortgagee',
        name1: 'BB1',
        name2: 'CC1',
        active: true,
        referenceNumber: '1001',
        phoneNumber: '1234567890',
        mailingAddress: {
          address1: '123 this way dr',
          city: 'Tampa',
          state: 'FL',
          zip: '33611',
          country: {
            code: 'US',
            displayText: 'United States'
          }
        }
      },
      {
        type: 'Additional Insured',
        name1: 'BB2',
        name2: 'CC2',
        active: true,
        referenceNumber: '1001',
        phoneNumber: '1234567890',
        mailingAddress: {
          address1: '123 this way dr',
          city: 'Tampa',
          state: 'FL',
          zip: '33611',
          country: {
            code: 'US',
            displayText: 'United States'
          }
        }
      },
      {
        type: 'Bill Payer',
        name1: 'BB2',
        name2: 'CC2',
        active: true,
        referenceNumber: '1001',
        phoneNumber: '1234567890',
        mailingAddress: {
          address1: '123 this way dr',
          city: 'Tampa',
          state: 'FL',
          zip: '33611',
          country: {
            code: 'US',
            displayText: 'United States'
          }
        }
      },
      {
        type: 'Lienholder',
        name1: 'BB3',
        referenceNumber: '1001',
        phoneNumber: '1234567890',
        name2: 'CC3',
        active: true,
        mailingAddress: {
          address1: '123 this way dr',
          city: 'Tampa',
          state: 'FL',
          zip: '33611',
          country: {
            code: 'US',
            displayText: 'United States'
          }
        }
      },
      {
        type: 'Additional Interest',
        name1: 'BB3',
        referenceNumber: '1001',
        phoneNumber: '1234567890',
        name2: 'CC3',
        active: true,
        mailingAddress: {
          address1: '123 this way dr',
          city: 'Tampa',
          state: 'FL',
          zip: '33611',
          country: {
            code: 'US',
            displayText: 'United States'
          }
        }
      }
    ];
    setRank(additionalInterests);
    expect(_.find(additionalInterests, ai => ai.type === 'Mortgagee').rank).toEqual(1);
    expect(_.find(additionalInterests, ai => ai.type === 'Additional Insured').rank).toEqual(2);
    expect(_.find(additionalInterests, ai => ai.type === 'Additional Interest').rank).toEqual(3);
    expect(_.find(additionalInterests, ai => ai.type === 'Lienholder').rank).toEqual(4);
    expect(_.find(additionalInterests, ai => ai.type === 'Bill Payer').rank).toEqual(5);
  });
});
