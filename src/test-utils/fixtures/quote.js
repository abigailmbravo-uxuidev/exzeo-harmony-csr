import policyHolder from './policyHolder';

export default {
  additionalInterests: [],
  agencyCode: 20000,
  agentCode: 60000,
  companyCode: 'TTIC',
  coverageLimits: {
    dwelling: { amount: 100 },
    lossOfUse: { amount: 666 },
    medicalPayments: { amount: 88 },
    moldLiability: { amount: 22 },
    moldProperty: { amount: 44 },
    ordinanceOrLaw: { amount: 29 },
    otherStructures: { amount: 50 },
    personalProperty: { amount: 999 },
    personalLiability: { amount: 55 }
  },
  coverageOptions: {
    personalPropertyReplacementCost: { answer: true }
  },
  createdAt: 'yyyy-mm-ddT00:00:00.0000',
  createdBy: {
    userId: 'test'
  },
  quoteInputState: 'Initial Data',
  underwritingExceptions: [],
  quoteNumber: '12-345-67',
  product: 'HO3',
  effectiveDate: '2019-05-23T04:00:00.000Z',

  deductibles: {
    allOtherPerils: {
      amount: 22,
      value: 22,
      name: 'allOtherPerils'
    },
    sinkhole: {
      amount: 32,
      calculatedAmount: 2468,
      name: 'sinkhole'
    },
    hurricane: {
      amount: 11,
      calculatedAmount: 12345,
      name: 'hurricane',
      displaytext: 'Hurricane',
      format: 'Currency'
    }
  },
  property: {
    physicalAddress: {
      address1: '4131 TEST ADDRESS',
      city: 'WINTER FELL',
      state: 'WS',
      zip: '11111'
    },
    yearBuilt: 1958,
    floodZone: 'A'
  },
  policyHolderMailingAddress: {
    address1: '6666 mailing address',
    city: 'TAMPA',
    state: 'FL',
    zip: '98765',
    country: { displayText: 'test country' }
  },
  policyHolders: [policyHolder],
  blockQuoteSummary: false,
  blockSendApplication: false,
  removeSecondary: false,
  editingDisabled: false
};
