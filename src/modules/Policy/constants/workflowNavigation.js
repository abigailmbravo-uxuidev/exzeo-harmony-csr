export const PAGE_ROUTING = {
  coverage: 0,
  policyHolder: 1,
  notes: 2,
  billing: 3,
  cancel: 4
};

export const ROUTES_NOT_HANDLED_BY_GANDALF = [
  'policyHolder',
  'cancel',
  'endorsements'
];

export const ROUTES_NOT_USING_FOOTER = ['coverage'];
