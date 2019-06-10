export const fields = [
  {
    name: 'searchType',
    type: 'select',
    label: 'Search Context',
    selected: 'policy',
    options: [
      'New Quote',
      'Quote Search',
      'Policy Search'
    ]
  },
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
    name: 'policyNumber',
    type: 'text',
    label: 'Policy Number',
    placeholder: 'Policy No Search'
  }
];

export const advancedFields = [
  {
    name: 'agencyCode',
    type: 'select-typeahead',
    label: 'Agency Name',
    placeholder: 'Select...'
  },
  {
    name: 'effectiveDate',
    type: 'text',
    label: 'Effective Date',
    placeholder: 'MM/DD/YYYY'
  },
  {
    name: 'policyStatus',
    type: 'select',
    label: 'Policy Status',
    selected: '',
    options: [
      'Please Select...', 'Policy Issued', 'In Force',
      'Pending Voluntary Cancellation', 'Pending Underwriting Cancellation',
      'Pending Underwriting Non-Renewal', 'Cancelled', 'Not In Force'
    ]
  },
  {
    name: 'sortBy',
    type: 'select',
    label: 'Sort By',
    selected: 'policyNumber',
    options: ['Policy Number', 'First Name', 'Last Name']
  },
];

export const resultsCard = {
  icon: 'card-icon fa fa-file-text',
  cardName: 'Batman Robin',
  headerData: ['Policy No.', 'Property Address', 'Policy Status', 'Effective Date'],
  cardData: [
    '12-1013555-01', '726 TEST ADDRESS', 'Policy Issued', '03/02/2019'
  ]
};
