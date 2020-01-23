export const detailsFields = [
  {
    dataTest: 'agencyCode',
    type: 'text',
    label: 'Agency ID',
    placeholder: 'Generate if left blank'
  },
  {
    dataTest: 'displayName',
    type: 'text',
    required: true,
    label: 'Agency Name',
    value: 'Test Agency'
  },
  {
    type: 'text',
    required: true,
    label: 'Entity Name',
    dataTest: 'legalName',
    value: 'Test Agency'
  },
  {
    dataTest: 'status',
    required: true,
    type: 'select',
    label: 'Status',
    value: 'Active'
  },
  {
    dataTest: 'tpaid',
    required: true,
    type: 'text',
    label: 'TPAID',
    value: 1
  },
  {
    dataTest: 'okToPay',
    type: 'radio',
    label: 'Ok to Pay',
    type: 'radio',
    values: ['No', 'Yes']
  },
  {
    type: 'text',
    required: true,
    label: 'Web Address',
    dataTest: 'websiteUrl',
    value: 'https://www.google.com'
  },
  {
    dataTest: 'taxIdNumber',
    required: true,
    type: 'text',
    label: 'Tax ID',
    value: '100'
  },
  {
    dataTest: 'taxClassification',
    required: true,
    type: 'select',
    label: 'Tax Classification',
    value: 'Corporation'
  },
  {
    dataTest: 'eoExpirationDate',
    type: 'text',
    required: true,
    label: 'EO Expiration Date',
    value: '2019-07-01'
  },
  {
    dataTest: 'primaryPhoneNumber',
    type: 'text',
    required: true,
    label: 'Phone 1',
    value: '(999) 888-1231'
  },
  {
    dataTest: 'secondaryPhoneNumber',
    type: 'text',
    label: 'Phone 2',
    value: '(999) 888-1222'
  },
  {
    dataTest: 'faxNumber',
    type: 'text',
    label: 'Fax',
    value: '(543) 543-5345'
  },
  {
    dataTest: 'csrEmail',
    type: 'email',
    label: 'Email Address',
    value: 'batman@exzeo.com'
  }
];

export const addressFields = [
  {
    type: 'text',
    required: true,
    label: 'Address 1',
    dataTest: 'mailingAddress.address1',
    value: '123 Maple ST'
  },
  {
    type: 'text',
    label: 'Address 2',
    dataTest: 'mailingAddress.address2',
    value: 'APT # 1234'
  },
  {
    type: 'text',
    label: 'City',
    required: true,
    dataTest: 'mailingAddress.city',
    value: 'Tampa'
  },
  {
    type: 'select',
    label: 'State',
    required: true,

    dataTest: 'mailingAddress.state',
    value: 'FL'
  },
  {
    type: 'text',
    label: 'Zip Code',
    required: true,
    dataTest: 'mailingAddress.zip',
    value: '33626'
  },
  {
    type: 'text',
    required: true,
    label: 'Address 1',
    dataTest: 'physicalAddress.address1',
    value: '123 Main ST'
  },
  {
    type: 'text',
    label: 'Address 2',
    dataTest: 'physicalAddress.address2',
    value: 'APT # 456'
  },
  {
    type: 'text',
    label: 'City',
    required: true,
    dataTest: 'physicalAddress.city',
    value: 'Miami'
  },
  {
    type: 'select',
    label: 'State',
    required: true,
    dataTest: 'physicalAddress.state',
    value: 'OH'
  },
  {
    type: 'text',
    label: 'Zip Code',
    required: true,
    dataTest: 'physicalAddress.zip',
    value: '22222'
  },
  {
    type: 'text',
    label: 'County',
    required: true,

    dataTest: 'physicalAddress.county',
    value: 'HILLSBOROUGH'
  }
];

export const contactFields = [
  {
    type: 'text',
    label: 'Title',
    dataTest: 'contact.title',
    value: 'Mr.'
  },
  {
    type: 'text',
    required: true,
    label: 'First Name',
    dataTest: 'contact.firstName',
    value: 'First'
  },
  {
    type: 'text',
    required: true,
    label: 'Last Name',
    dataTest: 'contact.lastName',
    value: 'Last'
  },
  {
    type: 'text',
    required: true,
    label: 'Email Address',
    dataTest: 'contact.emailAddress',
    value: 'exzeo@exzeo.com'
  },
  {
    type: 'text',
    label: 'Phone Number',
    dataTest: 'contact.primaryPhoneNumber',
    value: '(999) 888-1231'
  },
  {
    type: 'text',
    label: 'Phone Number Extension',
    dataTest: 'contact.primaryPhoneNumberExtension',
    value: '444'
  },
  {
    type: 'text',
    required: true,
    label: 'First Name',
    dataTest: 'principal.firstName',
    value: 'First'
  },
  {
    type: 'text',
    required: true,
    label: 'Last Name',
    dataTest: 'principal.lastName',
    value: 'Last'
  },
  {
    type: 'text',
    required: true,
    label: 'Email Address',
    dataTest: 'principal.emailAddress',
    value: 'exzeo@exzeo.com'
  },
  {
    type: 'text',
    label: 'Phone Number',
    dataTest: 'principal.primaryPhoneNumber',
    value: '(999) 888-1231'
  },
  {
    type: 'text',
    label: 'Phone Number Extension',
    dataTest: 'principal.primaryPhoneNumberExtension',
    value: '444'
  }
];

export const agentOfRecordFields = [
  {
    dataTest: 'agentCode',
    type: 'text',
    label: 'Agent ID',
    placeholder: 'Generate if left blank'
  },
  {
    dataTest: 'agentFirstName',
    type: 'text',
    required: true,
    label: 'Agent First Name',
    value: 'Test Agent'
  },
  {
    dataTest: 'agentLastName',
    type: 'text',
    required: true,
    label: 'Agent Last Name',
    value: 'Test Agent'
  },
  {
    dataTest: 'emailAddress',
    type: 'email',
    label: 'Email Address',
    value: 'batman@exzeo.com'
  },
  {
    dataTest: 'primaryPhoneNumber',
    type: 'text',
    required: true,
    label: 'Phone 1',
    value: '(999) 888-1231'
  },
  {
    dataTest: 'secondaryPhoneNumber',
    type: 'text',
    label: 'Phone 2',
    value: '(999) 888-1222'
  },
  {
    dataTest: 'faxNumber',
    type: 'text',
    label: 'Fax',
    value: '(543) 543-5345'
  },
  {
    type: 'text',
    required: true,
    label: 'Address 1',
    dataTest: 'agentOfRecord.mailingAddress.address1',
    value: '123 Maple ST'
  },
  {
    type: 'text',
    label: 'Address 2',
    dataTest: 'agentOfRecord.mailingAddress.address2',
    value: 'APT # 1234'
  },
  {
    type: 'text',
    label: 'City',
    required: true,
    dataTest: 'agentOfRecord.mailingAddress.city',
    value: 'Tampa'
  },
  {
    type: 'select',
    label: 'State',
    required: true,

    dataTest: 'agentOfRecord.mailingAddress.state',
    value: 'FL'
  },
  {
    type: 'text',
    label: 'Zip Code',
    required: true,
    dataTest: 'agentOfRecord.mailingAddress.zip',
    value: '33626'
  },
  {
    type: 'text',
    required: true,
    label: 'Address 1',
    dataTest: 'agentOfRecord.physicalAddress.address1',
    value: '123 Maple ST'
  },
  {
    type: 'text',
    label: 'Address 2',
    dataTest: 'agentOfRecord.physicalAddress.address2',
    value: 'APT # 1234'
  },
  {
    type: 'text',
    label: 'City',
    required: true,
    dataTest: 'agentOfRecord.physicalAddress.city',
    value: 'Tampa'
  },
  {
    type: 'select',
    label: 'State',
    required: true,
    dataTest: 'agentOfRecord.physicalAddress.state',
    value: 'FL'
  },
  {
    type: 'text',
    label: 'Zip Code',
    required: true,
    dataTest: 'agentOfRecord.physicalAddress.zip',
    value: '33626'
  }
];

export const licenseFields = [
  {
    type: 'select',
    required: true,
    label: 'State',
    dataTest: 'agentOfRecord.licenses[0].state',
    value: 'FL'
  },
  {
    type: 'select',
    required: true,
    label: 'Type',
    dataTest: 'agentOfRecord.licenses[0].licenseType',
    value: 'Resident'
  },
  {
    type: 'text',
    label: 'License',
    required: true,
    dataTest: 'agentOfRecord.licenses[0].licenseNumber',
    value: '1ABC'
  }
];
