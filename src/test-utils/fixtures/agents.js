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
    agencies: [
      {
        agencyCode: 20000,
        branchCode: null
      }
    ],
    licenses: [
      {
        appointed: true,
        licenseType: 'Resident',
        licenseNumber: 'A177580',
        state: 'FL'
      }
    ],
    status: 'Active',
    primaryPhoneNumber: '4444444444',
    secondaryPhoneNumber: '4444444446',
    primaryPhoneNumberExtension: '123',
    faxNumber: '7278247972',
    emailAddress: 'test@typtap.com',
    websiteUrl: 'HTTP://WWW.1STADVANTAGE-INSURANCE.COM/'
  },
  {
    agentCode: 60563,
    branchCode: 0,
    firstName: 'Test 2',
    lastName: 'Agent 2',
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
    agencies: [
      {
        agencyCode: 20000,
        branchCode: null
      }
    ],
    licenses: [
      {
        appointed: false,
        licenseType: 'Resident',
        licenseNumber: 'A177580',
        state: 'GA'
      }
    ],
    status: 'Active',
    primaryPhoneNumber: '4444444444',
    secondaryPhoneNumber: '4444444446',
    primaryPhoneNumberExtension: '123',
    faxNumber: '7278247972',
    emailAddress: 'test@typtap.com',
    websiteUrl: 'HTTP://WWW.1STADVANTAGE-INSURANCE.COM/'
  }
];
