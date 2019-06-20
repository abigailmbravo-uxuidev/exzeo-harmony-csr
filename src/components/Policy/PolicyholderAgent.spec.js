import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow, mount } from 'enzyme';

import { PolicyholderAgent } from './PolicyholderAgent';

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

const policy = {
  companyCode: 'TTIC',
  state: 'FL',
  agentCode: 100209,
  agencyCode: 100011,
  policyHolderMailingAddress: {
    careOf: null,
    address1: '1000 Poplar Ave',
    address2: '324234',
    city: 'Tampa',
    state: 'FL',
    zip: '33607',
    country: {
      code: 'USA',
      displayText: 'United States of America'
    }
  },
  policyHolders: [
    {
      id: '523abc231c049a02e',
      order: 1,
      entityType: 'Person',
      firstName: 'John',
      lastName: 'Smith',
      primaryPhoneNumber: '8135551234',
      emailAddress: 'john.smith@google.com'
    }
  ]
};

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
      service: {
        getAgents() {}
      },
      appState: {
        data: { activateRedirect: false },
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      getAgentsByAgencyCode() {},
      getAgencyAction() {},
      actions: {
        agencyActions: {
          getAgents() {},
          getAgency() {}
        },
        appStateActions: {
          setAppState() {}
        }
      },
      agency: {
        _id: '3a5ba179de46e8f2c',
        companyCode: 'TTIC',
        state: 'FL',
        agencyCode: 100011,
        displayName: 'ABC Agency',
        legalName: 'ABC Agency',
        taxIdNumber: '123456789',
        taxClassification: 'S-Corporation',
        tier: 932,
        primaryAgentCode: 100209,
        mailingAddress: {
          address1: '1000 Kennedy Blvd',
          address2: 'Suite 200',
          city: 'Tampa',
          state: 'FL',
          zip: '33607'
        },
        physicalAddress: {
          address1: '1000 Kennedy Blvd',
          address2: 'Suite 200',
          city: 'Tampa',
          county: 'Hillsborough',
          state: 'FL',
          zip: '33607',
          latitude: 27.9513556,
          longitude: -82.5354029
        },
        principalFirstName: 'John',
        principalLastName: 'Doe',
        contact: {
          firstName: 'Jane',
          lastName: 'Doe',
          emailAddress: 'contact@abcagency.com'
        },
        primaryPhoneNumber: '8135551234',
        secondaryPhoneNumber: '813777777',
        faxNumber: '8135555555',
        principalEmailAddress: 'principal@abcagency.com',
        customerServiceEmailAddress: 'customerservice@abcagency.com',
        websiteUrl: 'www.abcagency.com',
        licenses: [
          {
            licenseNumber: 'A50922',
            licenseExpirationDate: '2018-02-02T00:00:00Z'
          }
        ],
        contract: 'STD REV 06-01-15',
        addendum: 'STD REV 12-01-15',
        eoExpirationDate: '2017-02-02T00:00:00Z',
        affiliation: 'Independent',
        status: 'Active',
        createdAt: '2017-02-20T00:00:00Z',
        createdBy: 'JDoe',
        updatedAt: '2017-03-07T00:00:00Z',
        updatedBy: 'JDoe'
      },
      agents: [
        {
          _id: '3a5ba179de46e8f2c',
          companyCode: 'TTIC',
          state: 'FL',
          agentCode: 100209,
          agencyCode: 100011,
          firstame: 'John',
          lastName: 'Smith',
          mailingAddress: {
            address1: '1000 Kennedy Blvd',
            address2: 'Suite 200',
            city: 'Tampa',
            state: 'FL',
            zip: '33607'
          },
          primaryPhoneNumber: '8135555555',
          secondaryPhoneNumber: '8137777777',
          faxNumber: '8135551234',
          emailAddress: 'john.smith@abcagency.com',
          licenses: [{ licenseNumber: 'A000010' }],
          appointed: true,
          agentOfRecord: true,
          status: 'Active',
          createdAt: '2017-02-20T00:00:00Z',
          createdBy: 'JDoe',
          updatedAt: '2017-03-07T00:00:00Z',
          updatedBy: 'JDoe'
        }
      ],
      policy,
      fieldQuestions: [],
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      }
    };

    const shallowWrapper = shallow(
      <PolicyholderAgent store={store} {...props} />
    );
    expect(shallowWrapper);
  });
});
