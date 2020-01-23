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
