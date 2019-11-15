export const mockAgency = {
  _id: '5b97e677968a4b75eea8241f',
  agencyCode: 20532,
  displayName: '4th ADVANTAGE INSURANCE INC',
  legalName: '1ST ADVANTAGE INSURANCE INC',
  taxIdNumber: '3333333',
  taxClassification: 'S-Corporation',
  mailingAddress: {
    careOf: null,
    address1: '2955 EAST BAY DR',
    address2: 'UNIT D',
    city: 'LARGO',
    state: 'FL',
    zip: '32258',
    country: {
      code: 'USA',
      displayText: 'United States of America'
    }
  },
  physicalAddress: {
    address1: '2955 EAST BAY DR',
    address2: 'UNIT D',
    city: 'LARGO',
    state: 'FL',
    county: 'DUVAL',
    zip: '32258'
  },
  customerServiceEmailAddress: 'test@typtap.com',
  primaryPhoneNumber: '4444444444',
  secondaryPhoneNumber: null,
  faxNumber: '7278247976',
  websiteUrl: 'HTTP://WWW.1STADVANTAGE-INSURANCE.COM/',
  status: 'Active',
  okToPay: true,
  tpaid: 0,
  eoExpirationDate: '2018-12-29T00:00:00.000Z',
  agentOfRecord: '60033',
  principal: {
    firstName: 'ELITE',
    lastName: 'INC.',
    emailAddress: 'test@typtap.com'
  },
  contact: {
    emailAddress: 'test@typtap.com',
    firstName: 'A',
    lastName: 'BROCKUS',
    title: 'officer'
  },
  territoryManagerId: '5b7db9f6ff54fd6a5c619eec',
  contracts: [
    {
      companyCode: 'TTIC',
      stateProducts: [
        { state: 'FL', product: 'HO3' },
        { state: 'FL', product: 'AF3' }
      ],
      contractNumber: 'Flood 03 16',
      addendum: null
    },
    {
      companyCode: 'ABC',
      stateProducts: [
        { state: 'FL', product: 'HO3' },
        { state: 'FL', product: 'AF3' }
      ],
      contractNumber: 'Flood 03 18',
      addendum: null
    }
  ],
  licenses: [
    {
      state: 'TX',
      licenseNumber: 'test040b',
      licenseType: 'Non-Resident',
      licenseEffectiveDate: '2018-10-27T00:00:00.000Z'
    },
    {
      licenseNumber: 'test040bz',
      state: 'FL',
      licenseType: 'Resident',
      licenseEffectiveDate: '2018-10-27T00:00:00.000Z'
    }
  ],
  branches: [
    {
      displayName: '2nd ADVANTAGE INSURANCE INC',
      mailingAddress: {
        careOf: null,
        address1: '2955 EAST BAY DR',
        address2: 'UNIT D',
        city: 'LARGO',
        state: 'FL',
        zip: '33771',
        country: {
          code: 'USA',
          displayText: 'United States of America'
        }
      },
      physicalAddress: {
        address1: '2955 EAST BAY DR',
        address2: 'UNIT D',
        city: 'LARGO',
        state: 'FL',
        county: 'PINELLAS',
        zip: '33771'
      },
      primaryPhoneNumber: '7275350189',
      secondaryPhoneNumber: null,
      faxNumber: '7278247976',
      websiteUrl: 'HTTP://WWW.1STADVANTAGE-INSURANCE.COM/',
      status: 'Active',
      principal: 'Test Principal',
      agentOfRecord: '60562',
      contact: {
        emailAddress: 'test@typtap.com',
        firstName: 'ccc',
        lastName: 'BROCKUS',
        title: 'officer'
      },
      territoryManagerId: '5b7db9f6ff54fd6a5c619eec',
      mailCommissionChecksToBranch: true,
      mailPolicyDocsToBranch: true,
      branchCode: 0
    },
    {
      displayName: '2nd ADVANTAGE INSURANCE INC',
      mailingAddress: {
        careOf: null,
        address1: '2955 EAST BAY DR',
        address2: 'UNIT D',
        city: 'LARGO',
        state: 'FL',
        zip: '33771',
        county: 'PINELLAS',
        country: {
          code: 'USA',
          displayText: 'United States of America'
        }
      },
      physicalAddress: {
        address1: '2955 EAST BAY DR',
        address2: 'UNIT D',
        city: 'LARGO',
        state: 'FL',
        county: 'PINELLAS',
        zip: '33771'
      },
      primaryPhoneNumber: '7275350189',
      secondaryPhoneNumber: '7275350181',
      faxNumber: '7278247976',
      websiteUrl: 'HTTP://WWW.1STADVANTAGE-INSURANCE.COM/',
      status: 'Active',
      principal: {
        firstName: 'Test',
        lastName: 'Principal',
        emailAddress: 'test@typtap.com',
        primaryPhoneNumber: '7275350189',
        primaryPhoneNumberExtension: '123'
      },
      agentOfRecord: 60562,
      contact: {
        emailAddress: 'test@typtap.com',
        firstName: 'ccc',
        lastName: 'BROCKUS',
        title: 'officer',
        primaryPhoneNumber: '7275350180',
        primaryPhoneNumberExtension: '124'
      },
      territoryManagerId: '5b7db9f6ff54fd6a5c619eec',
      mailCommissionChecksToBranch: true,
      mailPolicyDocsToBranch: true,
      branchCode: 1
    }
  ],
  createdAt: '2016-11-14T15:52:55.683Z',
  createdBy: 'lperkins',
  updatedAt: '2018-10-22T17:17:32.822Z',
  updatedBy: 'TESTUSER',
  tier: 0
};
