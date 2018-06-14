import React from 'react';
import { shallow } from 'enzyme';
import Agency from './index';

export const mockAgency = {
  _id: '5af966605cc74408e4fbd905',
  agencyCode: 20532,
  contactEmailAddress: 'test@typtap.com',
  contactFirstName: 'AGNES',
  contactLastName: 'BROCKUS',
  createdAt: '2016-11-14T15:52:55.683Z',
  createdBy: 'lperkins',
  customerServiceEmailAddress: 'test@typtap.com',
  displayName: '1ST ADVANTAGE INSURANCE INC',
  faxNumber: '7278247976',
  legalName: '1ST ADVANTAGE INSURANCE INC',
  mailingAddress: {
    address1: '2945 EAST BAY DR',
    address2: 'UNIT D',
    city: 'LARGO',
    state: 'FL',
    zip: '33771'
  },
  okToPay: true,
  physicalAddress: {
    address1: '2945 EAST BAY DR',
    address2: 'UNIT D',
    city: 'LARGO',
    county: 'PINELLAS',
    state: 'FL',
    zip: '33771',
    latitude: null,
    longitude: null
  },
  primaryPhoneNumber: '7275350189',
  principalEmailAddress: 'test@typtap.com',
  principalFirstName: 'AGNES',
  principalLastName: 'BROCKUS',
  secondaryPhoneNumber: null,
  status: 'Active',
  taxClassification: 'S-Corporation',
  taxIdNumber: '593696750',
  territoryManager: 'VICTOR FERDINANDI',
  territoryManagerEmailAddress: 'test@typtap.com',
  territoryManagerPhoneNumber: '813-419-5245',
  tier: 0,
  tpaid: 0,
  updatedAt: '2018-02-01T19:40:57.570Z',
  updatedBy: 'mrichardson',
  websiteUrl: 'HTTP://WWW.1STADVANTAGE-INSURANCE.COM/',
  companyCode: 'TTIC',
  state: 'FL',
  licenseNumber: 'L070378',
  addendum: '',
  contract: 'Flood 03 16',
  eoExpirationDate: '2018-12-29T00:00:00.000Z',
  licenseEffectiveDate: '2010-12-07T00:00:00.000Z',
  primaryAgentCode: 60562,
  affiliation: null,
  licenseExpirationDate: null
};

describe('Testing Agency Base component', () => {
  it('should render', () => {
    const props = {
      agency: mockAgency,
      match: { url: '/agency' }
    };
    const wrapper = shallow(<Agency {...props} />);
    expect(wrapper).toBeTruthy;
  });
});
