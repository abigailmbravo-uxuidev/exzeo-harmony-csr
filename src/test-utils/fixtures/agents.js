export const mockAgents = [
  {
    agentCode: 60562,
    branchCode: 2,
    firstName: 'Test',
    lastName: 'Agent',
    licenseNumber: 'L-10000',
    mailingAddress: {
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
    status: 'Active',
    primaryPhoneNumber: '4444444444',
    secondaryPhoneNumber: '4444444446',
    primaryPhoneNumberExtension: '123',
    faxNumber: '7278247972',
    emailAddress: 'test@typtap.com',
    websiteUrl: 'HTTP://WWW.1STADVANTAGE-INSURANCE.COM/'
  },
  {
    _id: '5b9a01d112f835455123e26c',
    agentCode: 60000,
    firstName: 'WALLY',
    lastName: 'WAGONER',
    mailingAddress: {
      careOf: null,
      address1: '3001 S.E. MARICAMP ROAD',
      address2: null,
      city: 'OCALA',
      state: 'FL',
      zip: '34471',
      country: {
        code: 'USA',
        displayText: 'United States of America'
      }
    },
    primaryPhoneNumber: '3525099008',
    secondaryPhoneNumber: '3525099008',
    faxNumber: '3525334073',
    emailAddress: 'test@typtap.com',
    agencies: [
      {
        branchCode: null,
        agencyCode: 20000
      }
    ],
    licenses: [
      {
        licenseType: 'Resident',
        licenseNumber: 'W180087',
        state: 'FL',
        appointed: true
      }
    ],
    createdAt: '2016-02-03T14:44:06.183Z',
    createdBy: 'LOAD',
    updatedAt: '2020-01-21T15:44:04.626Z',
    updatedBy: 'af3beta',
    dbaAgencyName: null,
    status: 'Active',
    physicalAddress: {
      address1: '3001 SE MARICAMP ROAD',
      address2: null,
      city: 'OCALA',
      state: 'FL',
      zip: '34471',
      county: 'MARION'
    }
  }
];
