export const fields = [
  {
    name: 'searchType',
    type: 'select',
    label: 'Search Context',
    selected: 'agency',
    options: ['Agent Search', 'Agency Search']
  },
  {
    name: 'agencyCode',
    type: 'text',
    label: 'Agency ID',
    placeholder: 'Agency ID Search'
  },
  {
    name: 'displayName',
    type: 'text',
    label: 'Agency Name',
    placeholder: 'Agency Name Search'
  },
  {
    name: 'address',
    type: 'text',
    label: 'Agency Address',
    placeholder: 'Agency Address Search'
  },
  {
    name: 'licenseNumber',
    type: 'text',
    label: 'Lic Number',
    placeholder: 'Lic No Search'
  },
  {
    name: 'fein',
    type: 'text',
    label: 'FEIN Number',
    placeholder: 'FEIN No Search'
  },
  {
    name: 'phone',
    type: 'text',
    label: 'Agency Phone Number',
    placeholder: 'Phone No Search'
  }
];

export const agencyCard = {
  icon: 'fa fa-address-book',
  cardData: ['20532', '1ST ADVANTAGE INSURANCE INC', '1ST ADVANTAGE INSURANCE INC', 'L070378'],
  address: '2945 EAST BAY DR',
  status: 'Active',
  website: 'HTTP://WWW.1STADVANTAGE-INSURANCE.COM/',
  additionalContacts: [{
    name: 'AGNES',
    primaryPhone: '(727) 535-0189',
    secondaryPhone: '(123) 456-7890',
    fax: '(727) 824-7976',
    email: 'test@typtap.com'
  }]
};
