import policyHolder from './policyHolder';

export default {
  quoteInputState: 'Initial Data',
  underwritingExceptions: [],
  quoteNumber: '12-345-67',
  effectiveDate: '2019-05-23T04:00:00.000Z',
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
    physicalAddress: { address1: '4131 TEST ADDRESS' },
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
  policyHolders: [
    policyHolder
  ]
};
