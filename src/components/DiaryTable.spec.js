import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import { mount } from 'enzyme';

import DiaryTable from './DiaryTable';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing DetailHeader component', () => {
  it('should test connected app', () => {
    const initialState = {
      diaries: [
        {
          resource: {
            type: 'Policy',
            id: '12-1011410-01',
            companyCode: 'TTIC',
            state: 'FL',
            product: 'HO3'
          },
          _id: '1',
          entries: [
            {
              open: true,
              due: '2018-10-22T00:00:00.000Z',
              type: 'billing',
              reason: 'billing',
              message: 'test 1',
              assignee: {
                id: 'auth0|59562fcbc2b5082b9e61301a',
                displayName: 'Mark Eads',
                type: 'user'
              },
              createdBy: {
                userId: 'auth0|CSR1234567890',
                userName: 'TESTUSER'
              },
              createdAt: '2018-10-23T16:30:03.826Z',
              updatedAt: '2018-10-23T16:30:03.826Z'
            }
          ],
          createdAt: '2018-10-23T16:30:03.827Z',
          updatedAt: '2018-10-23T16:30:03.827Z',
          __v: 0
        },
        {
          resource: {
            type: 'Policy',
            id: '12-1011410-01',
            companyCode: 'TTIC',
            state: 'FL',
            product: 'HO3'
          },
          _id: '2',
          entries: [
            {
              open: true,
              due: '2018-10-25T00:00:00.000Z',
              type: 'billing',
              reason: 'billing',
              message: 'Test 2',
              createdBy: {
                userId: 'auth0|CSR1234567890',
                userName: 'TESTUSER'
              },
              createdAt: '2018-10-23T16:30:53.204Z',
              updatedAt: '2018-10-23T16:30:53.204Z',
              assignee: {
                id: 'auth0|59562fcbc2b5082b9e61301a',
                displayName: 'Mark Eads',
                type: 'user'
              }
            },
            {
              open: true,
              due: '2018-10-31T00:00:00.000Z',
              type: 'billing',
              reason: 'billing',
              message: 'Test 2',
              assignee: {
                id: 'auth0|59562fcbc2b5082b9e61301a',
                displayName: 'Mark Eads',
                type: 'user'
              },
              createdBy: {
                userId: 'auth0|CSR1234567890',
                userName: 'TESTUSER'
              },
              createdAt: '2018-10-23T16:30:23.853Z',
              updatedAt: '2018-10-23T16:30:23.853Z'
            }
          ],
          createdAt: '2018-10-23T16:30:23.853Z',
          updatedAt: '2018-10-23T16:30:53.204Z',
          __v: 0
        },
        {
          resource: {
            type: 'Policy',
            id: '12-1011410-01',
            companyCode: 'TTIC',
            state: 'FL',
            product: 'HO3'
          },
          _id: '3',
          entries: [
            {
              open: true,
              due: '2018-10-18T00:00:00.000Z',
              type: 'billing',
              reason: 'billing',
              message: 'Test 3',
              assignee: {
                id: 'auth0|59562fcbc2b5082b9e61301a',
                displayName: 'Mark Eads',
                type: 'user'
              },
              createdBy: {
                userId: 'auth0|CSR1234567890',
                userName: 'TESTUSER'
              },
              createdAt: '2018-10-23T16:30:40.218Z',
              updatedAt: '2018-10-23T16:30:40.218Z'
            }
          ],
          createdAt: '2018-10-23T16:30:40.218Z',
          updatedAt: '2018-10-23T16:30:40.218Z',
          __v: 0
        },
        {
          resource: {
            type: 'Policy',
            id: '12-1011410-01',
            companyCode: 'TTIC',
            state: 'FL',
            product: 'HO3'
          },
          _id: '4',
          entries: [
            {
              open: true,
              due: '2018-10-31T00:00:00.000Z',
              type: 'billing',
              reason: 'billing',
              message: 'Test 4',
              assignee: {
                id: 'auth0|59562fcbc2b5082b9e61301a',
                displayName: 'Mark Eads',
                type: 'user'
              },
              createdBy: {
                userId: 'auth0|CSR1234567890',
                userName: 'TESTUSER'
              },
              createdAt: '2018-10-23T16:31:16.973Z',
              updatedAt: '2018-10-23T16:31:16.973Z'
            }
          ],
          createdAt: '2018-10-23T16:31:16.973Z',
          updatedAt: '2018-10-23T16:31:16.973Z',
          __v: 0
        }
      ]
    };
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <DiaryTable />
      </Provider>);

  });
});
