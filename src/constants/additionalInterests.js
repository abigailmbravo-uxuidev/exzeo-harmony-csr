export const ADDITIONAL_INTERESTS = {
  mortgagee: 'Mortgagee',
  additionalInsured: 'Additional Insured',
  additionalInterest: 'Additional Interest',
  premiumFinance: 'Premium Finance',
  billPayer: 'Bill Payer'
};

export const DEFAULT_ADDITIONAL_INTERESTS_MAP = {
  [ADDITIONAL_INTERESTS.mortgagee]: [],
  [ADDITIONAL_INTERESTS.additionalInsured]: [],
  [ADDITIONAL_INTERESTS.additionalInterest]: [],
  [ADDITIONAL_INTERESTS.billPayer]: [],
  [ADDITIONAL_INTERESTS.premiumFinance]: []
};

export const AVAILABLE_QUOTE_STATES = ['Policy Issued', 'Documents Recieved'];

export const PREMIUM_FINANCE_BILL_PAYER_TYPES = [
  ADDITIONAL_INTERESTS.premiumFinance,
  ADDITIONAL_INTERESTS.billPayer
];
