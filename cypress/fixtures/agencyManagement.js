export const ADD_AGENCY = {
  ////only keep things here that we are verifying, anything that will not change from test to test
  status: 'Service Only',
  okToPay: false,
  mailingAddress: {
    address1: 'Test Mailing Address 1',
    address2: 'Test Mailing Address 2',
    city: 'Tampa',
    state: 'FL',
    zip: '33607',
    country: {
      code: 'USA',
      displayText: 'United States of America'
    }
  },
  physicalAddress: {
    address1: 'Test Mailing Address 1',
    address2: 'Test Mailing Address 2',
    city: 'Tampa',
    state: 'FL',
    county: 'HILLSBOROUGH',
    zip: '33607'
  },
  displayName: 'Cypress Agency',
  legalName: 'Company',
  tpaid: 1,
  websiteUrl: 'https://agency.harmony-ins.com/',
  taxIdNumber: '9999',
  taxClassification: 'Corporation',
  eoExpirationDate: '2020-11-20T00:00:00.000Z',
  primaryPhoneNumber: '4445556666',
  secondaryPhoneNumber: '4445556667',
  faxNumber: '4445556668',
  customerServiceEmailAddress: 'exzeoqa@exzeo.com',
  territoryManagerId: '5b7db9f6ff54fd6a5c619eec',
  principal: {
    firstName: 'Cypress',
    lastName: 'Officer',
    emailAddress: 'exzeoqa@exzeo.com',
    primaryPhoneNumber: '4445556666',
    primaryPhoneNumberExtension: '7777'
  },
  contact: {
    title: 'Dr.',
    firstName: 'Cypress',
    lastName: 'Contact',
    emailAddress: 'exzeoqa@exzeo.com',
    primaryPhoneNumber: '4445556667',
    primaryPhoneNumberExtension: '8888'
  },
  contracts: [],
  licenses: [],
  branches: [],
  agentOfRecord: '90057'
};

export const ADD_AGENT = {
  status: 'Active',
  licenses: [
    {
      state: 'FL',
      licenseType: 'Resident',
      appointed: true,
      licenseNumber: '12345'
    },
    {
      appointed: false,
      state: 'FL',
      licenseType: 'Non-Resident',
      licenseNumber: '23456'
    }
  ],
  firstName: 'Cypress',
  lastName: 'Agent',
  emailAddress: 'exzeoqa@exzeo.com',
  primaryPhoneNumber: '4445556666',
  secondaryPhoneNumber: '4445556667',
  faxNumber: '4445556668',
  mailingAddress: {
    address1: 'Test Mailing Address 1',
    address2: 'Test Mailing Address 2',
    city: 'Tampa',
    state: 'FL',
    zip: '33607',
    country: {
      code: 'USA',
      displayText: 'United States of America'
    }
  },
  physicalAddress: {
    address1: 'Test AOR Mailing Address 1',
    address2: 'Test AOR Mailing Address 2',
    city: 'Tampa',
    state: 'FL',
    zip: '33607'
  },
  agencies: [
    {
      branchCode: null ////should this be a value?
    }
  ],
  primaryPhoneNumberExtension: '1111'
};

export const ADD_LICENSE = {
  licenses: [
    {
      licenseEffectiveDate: '2019-11-22T00:00:00.000Z',
      state: 'FL',
      licenseNumber: '99990',
      licenseType: 'Resident'
    }
  ]
};

export const ADD_CONTRACT = {
  contracts: [
    {
      stateProducts: [
        {
          state: 'FL',
          product: 'AF3'
        },
        {
          state: 'FL',
          product: 'HO3'
        }
      ],
      companyCode: 'TTIC',
      contractNumber: 'TT FL 01 19',
      addendum: 'TT 01 19'
    }
  ]
};

export const EDIT_LICENSE = {
  licenses: [
    {
      licenseEffectiveDate: '11/24/2019',
      state: 'FL',
      licenseNumber: '99991',
      licenseType: 'Non-Resident'
    }
  ]
};

export const EDIT_CONTRACT = {
  contracts: [
    {
      stateProducts: [
        {
          state: 'FL',
          product: 'AF3'
        },
        {
          state: 'FL',
          product: 'HO3'
        }
      ],
      companyCode: 'TTIC',
      contractNumber: 'TT FL 03 16',
      addendum: 'TT 03 16'
    }
  ]
};

export const EDIT_AGENCY = {
  status: 'Active',
  okToPay: true,
  displayName: 'Cypress Agency updated',
  legalName: 'Company updated',
  tpaid: 2,
  websiteUrl: 'https://csr.harmony-ins.com/',
  taxIdNumber: '99999',
  taxClassification: 'Partnership',
  eoExpirationDate: '2020-11-22T00:00:00.000Z',
  primaryPhoneNumber: '4445557777',
  secondaryPhoneNumber: '4445557778',
  faxNumber: '4445557779',
  customerServiceEmailAddress: 'exzeoqa2@exzeo.com',
  branches: [], ////shouldn't we have the branch name here?
  agentOfRecord: null ////is this supposed to be null????
};

export const EDIT_AGENCY_ADDRESS = {
  mailingAddress: {
    address1: 'Test Mailing Address 1 Updated',
    address2: 'Test Mailing Address 2 Updated',
    city: 'Clearwater',
    state: 'FL',
    zip: '33624',
    country: {
      code: 'USA',
      displayText: 'United States of America'
    }
  },
  physicalAddress: {
    address1: 'Test Mailing Address 1 Updated',
    address2: 'Test Mailing Address 2 Updated',
    city: 'Clearwater',
    state: 'FL',
    county: 'HILLSBOROUGH',
    zip: '33624'
  },
  territoryManagerId: '5b7db9f6ff54fd6a5c619eec'
};

export const EDIT_OFFICER = {
  principal: {
    firstName: 'Cypress2',
    lastName: 'Officer2',
    emailAddress: 'exzeoqa2@exzeo.com',
    primaryPhoneNumber: '4445556677',
    primaryPhoneNumberExtension: '5555'
  }
};

export const EDIT_CONTACT = {
  contact: {
    title: 'Jr.',
    firstName: 'Cypress2',
    lastName: 'Contact2',
    emailAddress: 'exzeoqa2@exzeo.com',
    primaryPhoneNumber: '4445556688',
    primaryPhoneNumberExtension: '9999'
  }
};

export const EDIT_AGENT = {
  status: 'Active',
  licenses: [
    {
      state: 'FL',
      licenseType: 'Non-Resident',
      appointed: false,
      licenseNumber: '23456'
    }
  ],
  firstName: 'Cypress2',
  lastName: 'Agent2',
  emailAddress: 'exzeoqa2@exzeo.com',
  primaryPhoneNumber: '4445556699',
  secondaryPhoneNumber: '4445556667',
  faxNumber: '4445556668',
  mailingAddress: {
    address1: 'Test Mailing Address 1 Updated',
    address2: 'Test Mailing Address 2 Updated',
    city: 'Clearwater',
    state: 'FL',
    zip: '33624',
    country: {
      code: 'USA',
      displayText: 'United States of America'
    }
  },
  physicalAddress: {
    address1: 'Test Mailing Address 1 Updated',
    address2: 'Test Mailing Address 2 Updated',
    city: 'Clearwater',
    state: 'FL',
    zip: '33624',
    county: 'HILLSBOROUGH'
  },
  createdBy: 'tticcsr',
  updatedBy: 'tticcsr',
  agencies: [
    {
      branchCode: null
    }
  ],
  primaryPhoneNumberExtension: '1111'
};

export const ADD_ANOTHER_AGENT = {
  status: 'Service Only',
  agencies: [
    {
      branchCode: 0
    }
  ],
  mailingAddress: {
    country: {
      code: 'USA',
      displayText: 'United States of America'
    },
    address1: 'Test Mailing Address 3',
    address2: 'Test Mailing Address 4',
    city: 'Tampa',
    state: 'FL',
    zip: '33624'
  },
  licenses: [
    {
      state: 'FL',
      licenseType: 'Resident',
      appointed: false,
      licenseNumber: '34567'
    },
    {
      appointed: false,
      state: 'FL',
      licenseType: 'Non-Resident',
      licenseNumber: '45678'
    }
  ],
  firstName: 'Cypress3',
  lastName: 'Agent3',
  primaryPhoneNumber: '4445556600',
  primaryPhoneNumberExtension: '1110',
  secondaryPhoneNumber: '4445556660',
  faxNumber: '4445556000',
  emailAddress: 'exzeoqa@exzeo.com',
  physicalAddress: {
    address1: 'Test Mailing Address 3',
    address2: 'Test Mailing Address 4',
    city: 'Tampa',
    state: 'FL',
    county: 'HILLSBOROUGH',
    zip: '33624'
  }
};

export const ADD_NOTE = {
  noteType: 'Agency Note',
  noteContent: 'This is a note content for Other Contact',
  contactType: 'Other',
  createdBy: {
    userId: 'auth0|59419e3a43e76f16f68c3349'
  },
  createdDate: '2019-12-23T17:20:57.776Z',
  noteAttachments: []
};
