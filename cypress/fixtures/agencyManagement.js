// Calculate and format new policy Effective Date
let today = new Date();
const addExpirationDays = 100;
today.setDate(today.getDate() + addExpirationDays);
const yyyy = today.getFullYear();
const dd = today.getDate().toLocaleString('en-US', {
  minimumIntegerDigits: 2
});
const mm = (today.getMonth() + 1).toLocaleString('en-US', {
  minimumIntegerDigits: 2
});
const eoExpirationDate = `${yyyy}-${mm}-${dd}`;

let today2 = new Date();
const subtractLicenseStartDays = 5;
today2.setDate(today2.getDate() - subtractLicenseStartDays);
const yyyy2 = today2.getFullYear();
const dd2 = today2.getDate().toLocaleString('en-US', {
  minimumIntegerDigits: 2
});
const mm2 = (today2.getMonth() + 1).toLocaleString('en-US', {
  minimumIntegerDigits: 2
});
const licenseEffectiveDate = `${yyyy2}-${mm2}-${dd2}`;

today2.setDate(today2.getDate() - subtractLicenseStartDays);
const yyyy3 = today2.getFullYear();
const dd3 = today2.getDate().toLocaleString('en-US', {
  minimumIntegerDigits: 2
});
const mm3 = (today2.getMonth() + 1).toLocaleString('en-US', {
  minimumIntegerDigits: 2
});
const licenseEffectiveDate1 = `${yyyy3}-${mm3}-${dd3}`;
const licenseEffectiveDate2 = `${mm3}/${dd3}/${yyyy3}`;

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
  eoExpirationDate: eoExpirationDate,
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
  primaryPhoneNumberExtension: '1111'
};

export const ADD_LICENSE = {
  licenses: [
    {
      licenseEffectiveDate: licenseEffectiveDate,
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
      licenseEffectiveDate1: licenseEffectiveDate1,
      licenseEffectiveDate2: licenseEffectiveDate2,
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
  displayName: 'Cypress Agency updated'
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
  fileType: 'Finance'
};
