export const BULK_MORTGAGE_TYPE = {
  policy: 'policy',
  mortgagee: 'mortgagee',
  job: 'job'
};

export const BULK_TYPE_LABEL = {
  [BULK_MORTGAGE_TYPE.policy]: 'By Policy',
  [BULK_MORTGAGE_TYPE.mortgagee]: 'By Mortgagee',
  [BULK_MORTGAGE_TYPE.job]: 'By Job'
};

export const INSTRUCTION_ANSWERS = [
  { answer: 'Mail Notice', label: 'Mail Notice' },
  { answer: 'Suppress Notice', label: 'Suppress Notice' }
];

export const PRODUCTS = [
  { answer: 'AF3', label: 'Flood' },
  { answer: 'HO3', label: 'HO3' }
];

export const SEARCH_TYPES = {
  policyNumber: 'policyNumber',
  lastName: 'lastName',
  propertyAddress: 'propertyAddress'
};

export const SEARCH_TYPE_PLACEHOLDER = {
  policyNumber: 'Search By Policy Number (partial)',
  lastName: 'Search By Policyholder last name (partial)',
  propertyAddress: 'Search By Property Address (partial)'
};

export const SEARCH_TYPE_ANSWERS = [
  { answer: SEARCH_TYPES.policyNumber, label: 'Policy Number' },
  { answer: SEARCH_TYPES.lastName, label: 'Last Name' },
  { answer: SEARCH_TYPES.propertyAddress, label: 'Property Address' }
];
