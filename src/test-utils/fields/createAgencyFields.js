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
    value: '1'
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
    type: 'date',
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
    dataTest: 'address1',
    value: '123 Maple ST'
  },
  {
    type: 'text',
    label: 'Address 2',
    dataTest: 'address2',
    value: 'APT # 1234'
  },
  {
    type: 'text',
    label: 'City',
    required: true,
    dataTest: 'city',
    value: 'Tampa'
  },
  {
    type: 'select',
    label: 'State',
    required: true,
    dataTest: 'state',
    value: 'FL'
  },
  {
    type: 'text',
    label: 'Zip Code',
    required: true,
    dataTest: 'zip',
    value: '33626'
  }
];

export const contactFields = [
  {
    type: 'text',
    label: 'Title',
    dataTest: 'title',
    value: 'Mr.'
  },
  {
    type: 'text',
    required: true,
    label: 'First Name',
    dataTest: 'firstName',
    value: 'First'
  },
  {
    type: 'text',
    required: true,
    label: 'Last Name',
    dataTest: 'lastName',
    value: 'Last'
  },
  {
    type: 'text',
    required: true,
    label: 'Email Address',
    dataTest: 'emailAddress',
    value: 'exzeo@exzeo.com'
  },
  {
    type: 'text',
    label: 'Phone 1',
    dataTest: 'primaryPhoneNumber',
    value: '(999) 888-1231'
  },
  {
    type: 'text',
    label: 'Phone Number Extension',
    dataTest: 'primaryPhoneNumberExtension',
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
