export const mockAgencies = [
  {
    _id: '5b9a00b512f835455123e0f9',
    agencyCode: 20532,
    displayName: '1ST ADVANTAGE INSURANCE INC',
    legalName: '1ST ADVANTAGE INSURANCE INC',
    taxIdNumber: '593696750',
    taxClassification: 'S-Corporation',
    mailingAddress: {
      careOf: null,
      address1: '123 Main Street',
      address2: '',
      city: 'Tampa',
      state: 'FL',
      zip: '33301',
      country: {
        code: 'USA',
        displayText: 'United States of America'
      }
    },
    physicalAddress: {
      address1: '123 Main Street',
      address2: '',
      city: 'Tampa',
      state: 'FL',
      county: 'hillsborough',
      zip: '33301'
    },
    customerServiceEmailAddress: 'test@typtap.com',
    primaryPhoneNumber: '7275350189',
    secondaryPhoneNumber: null,
    faxNumber: '7278247976',
    websiteUrl: 'HTTP://WWW.1STADVANTAGE-INSURANCE.COM/',
    status: 'Terminated',
    okToPay: true,
    tpaid: 0,
    eoExpirationDate: '2019-12-29T00:00:00.000Z',
    agentOfRecord: '60562',
    principal: {
      emailAddress: 'test@typtap.com',
      firstName: 'AGNES',
      lastName: 'BROCKUS'
    },
    contact: {
      emailAddress: 'test@typtap.com',
      firstName: 'AGNES',
      lastName: 'BROCKUS',
      title: null
    },
    territoryManagerId: '5b7db9f6ff54fd6a5c619eea',
    contracts: [
      {
        companyCode: 'TTIC',
        stateProducts: [
          {
            state: 'FL',
            product: 'HO3'
          },
          {
            state: 'FL',
            product: 'AF3'
          }
        ],
        contractNumber: 'FL 03 16',
        addendum: 'TT 02 18'
      },
      {
        stateProducts: [
          {
            state: 'AL',
            product: 'HO3'
          },
          {
            state: 'AR',
            product: 'HO3'
          },
          {
            state: 'DE',
            product: 'HO3'
          }
        ],
        companyCode: 'TTIC',
        contractNumber: 'TT FL 03 16',
        addendum: 'TT 02 18'
      },
      {
        stateProducts: [
          {
            state: 'AK',
            product: 'AF3'
          },
          {
            state: 'AL',
            product: 'HO3'
          },
          {
            state: 'AR',
            product: 'HO3'
          },
          {
            state: 'AZ',
            product: 'HO3'
          },
          {
            state: 'CO',
            product: 'AF3'
          },
          {
            state: 'AR',
            product: 'AF3'
          }
        ],
        companyCode: 'TTIC',
        contractNumber: 'TT FL 01 19',
        addendum: 'TT 03 16'
      }
    ],
    licenses: [
      {
        licenseType: 'Resident',
        licenseEffectiveDate: '2010-12-07T00:00:00.000Z',
        licenseNumber: 'L070378',
        state: 'FL'
      }
    ],
    branches: [],
    createdAt: '2016-11-14T15:52:55.683Z',
    createdBy: 'lperkins',
    updatedAt: '2019-11-06T14:44:56.008Z',
    updatedBy: 'af3beta',
    tier: 0
  },
  {
    _id: '5ddee4e5653df85244d4c56e',
    agencyCode: 20414,
    displayName: '1ST BROWARD SERVICE AGENCY LLC',
    legalName: '1ST BROWARD SERVICE AGENCY LLC',
    taxIdNumber: '010824158',
    taxClassification: 'LLC - P',
    mailingAddress: {
      _id: '5ddee4e5653df85244d4c56f',
      address1: '2726 N ANDREW AVE',
      address2: '',
      careOf: '',
      city: 'WILTON MANORS',
      county: 'BROWARD',
      state: 'FL',
      zip: '33311',
      latitude: 0,
      longitude: 0,
      country: {
        _id: '5ddee4e5653df85244d4c570',
        code: '-',
        displayText: '-'
      }
    },
    physicalAddress: {
      _id: '5ddee4e5653df85244d4c571',
      address1: '2726 N ANDREW AVE',
      address2: '',
      careOf: '',
      city: 'WILTON MANORS',
      county: 'BROWARD',
      state: 'FL',
      zip: '33311',
      latitude: 0,
      longitude: 0,
      country: null
    },
    customerServiceEmailAddress: 'DataMigration@typtap.com',
    primaryPhoneNumber: '9545616501',
    secondaryPhoneNumber: '',
    faxNumber: '9545616502',
    websiteUrl: 'HTTP://WWW.FIRSTBROWARDINS.COM/',
    status: 'Terminated',
    okToPay: false,
    tpaid: 99,
    eoExpirationDate: '2018-10-21T04:00:00.000Z',
    agentOfRecord: null,
    principal: {
      firstName: 'RYANE',
      lastName: 'CARDOSO',
      emailAddress: 'DataMigration@typtap.com',
      primaryPhoneNumber: '9545616501',
      primaryPhoneNumberExtension: null
    },
    contact: {
      firstName: 'DIEGO',
      lastName: 'REY',
      emailAddress: 'DataMigration@typtap.com',
      primaryPhoneNumber: '9545616501',
      primaryPhoneNumberExtension: null,
      title: 'PRINCIPAL'
    },
    territoryManagerId: '5b7db9f6ff54fd6a5c619eea',
    contracts: [
      {
        companyCode: 'TTIC',
        stateProducts: [
          {
            state: 'FL',
            product: 'AF3'
          }
        ],
        contractNumber: 'Flood 03 16',
        addendum: ''
      }
    ],
    licenses: [
      {
        licenseType: 'Resident',
        licenseNumber: 'L015747',
        state: 'FL',
        licenseEffectiveDate: '2006-09-11T04:00:00.000Z'
      }
    ],
    branches: null,
    createdAt: '2016-10-05T17:30:25.570Z',
    createdBy: 'LPERKINS',
    updatedAt: '2018-12-04T20:19:08.527Z',
    updatedBy: 'MMEDEIROS',
    tier: 0
  }
];
