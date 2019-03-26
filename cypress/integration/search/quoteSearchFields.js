export const fields = [
  {
    name: 'firstName',
    type: 'text',
    label: 'First Name',
    placeholder: 'First Name Search'
  },
  {
    name: 'lastName',
    type: 'text',
    label: 'Last Name',
    placeholder: 'Last Name Search'
  },
  {
    name: 'address',
    type: 'text',
    label: 'Property Street Address',
    placeholder: 'Property Street Address Search'
  },
  {
    name: 'quoteNumber',
    type: 'text',
    label: 'Quote Number',
    placeholder: 'Quote No Search'
  },
  {
    name: 'quoteState',
    type: 'select',
    label: 'Quote Status',
    selected: '',
    placeholder: 'Please Select...',
    options: [
      'Please Select...', 'Quote Started', 'Application Started',
      'Quote Stopped', 'Quote Declined', 'Application Sent DocuSign',
      'Application Sent Manual', 'Application Obstructed', 'Quote Expired',
      'Documents Received', 'Policy Issued'
    ]
  }
];

export const resultsCard = {
  icon: 'card-icon fa fa-quote-left',
  headerData: ['Quote No.', 'Property Address', 'Quote Status',
    'Effective Date', 'Started On', 'Premium'
  ],
  cardData: [
    '12-5161240-01', '4131 TEST ADDRESS', 'Application Sent DocuSign',
    '04/04/2019', '03/25/2019', '$ 1462'
  ]
};
