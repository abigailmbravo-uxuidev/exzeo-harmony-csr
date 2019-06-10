export const fields = [
  {
    name: 'searchType',
    type: 'select',
    label: 'Search Context',
    selected: 'agent',
    options: ['Agent Search', 'Agency Search']
  },
  {
    name: 'agentCode',
    type: 'text',
    label: 'Agent ID',
    placeholder: 'Agent ID Search'
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
    label: 'Agent Address',
    placeholder: 'Agent Address Search'
  },
  {
    name: 'licenseNumber',
    type: 'text',
    label: 'Lic Number',
    placeholder: 'Lic No Search'
  }
];

export const agentCard = {
  icon: 'fa fa-address-card margin bottom',
  cardData: ['60033', 'BRIAN GLENN CHAPMAN JR', 'E079822', 'Open Agency'],
  status: 'Active',
  address: '2455 TAMIAMI TRAIL',
  additionalContacts: [{
    primaryPhone: '(941) 979-8426',
    secondaryPhone: '(123) 456-7890',
    fax: '(888) 552-7641',
    email: 'test@typtap.com'
  }]
};
