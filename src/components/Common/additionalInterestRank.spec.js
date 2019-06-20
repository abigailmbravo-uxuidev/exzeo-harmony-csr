import additionalInterestRank from '../Common/additionalInterestRank';

const additionalInterests = [
  {
    type: 'Mortgagee',
    name1: 'BB1',
    name2: 'CC1',
    active: true,
    referenceNumber: '1001',
    phoneNumber: '1234567890',
    mailingAddress: {
      address1: '123 this way dr',
      city: 'Tampa',
      state: 'FL',
      zip: '33611',
      country: {
        code: 'US',
        displayText: 'United States'
      }
    }
  },
  {
    type: 'Additional Insured',
    name1: 'BB2',
    name2: 'CC2',
    active: true,
    referenceNumber: '1001',
    phoneNumber: '1234567890',
    mailingAddress: {
      address1: '123 this way dr',
      city: 'Tampa',
      state: 'FL',
      zip: '33611',
      country: {
        code: 'US',
        displayText: 'United States'
      }
    }
  },
  {
    type: 'Bill Payer',
    name1: 'BB2',
    name2: 'CC2',
    active: true,
    referenceNumber: '1001',
    phoneNumber: '1234567890',
    mailingAddress: {
      address1: '123 this way dr',
      city: 'Tampa',
      state: 'FL',
      zip: '33611',
      country: {
        code: 'US',
        displayText: 'United States'
      }
    }
  },
  {
    type: 'Lienholder',
    name1: 'BB3',
    referenceNumber: '1001',
    phoneNumber: '1234567890',
    name2: 'CC3',
    active: true,
    mailingAddress: {
      address1: '123 this way dr',
      city: 'Tampa',
      state: 'FL',
      zip: '33611',
      country: {
        code: 'US',
        displayText: 'United States'
      }
    }
  },
  {
    type: 'Additional Interest',
    name1: 'BB3',
    referenceNumber: '1001',
    phoneNumber: '1234567890',
    name2: 'CC3',
    active: true,
    mailingAddress: {
      address1: '123 this way dr',
      city: 'Tampa',
      state: 'FL',
      zip: '33611',
      country: {
        code: 'US',
        displayText: 'United States'
      }
    }
  }
];

describe('Testing additionalInterestRank function', () => {
  it('test additionalInterestRank', () => {
    additionalInterestRank(additionalInterests);
    expect(
      additionalInterests.find(ai => ai.type === 'Mortgagee').rank
    ).toEqual(1);
    expect(
      additionalInterests.find(ai => ai.type === 'Additional Insured').rank
    ).toEqual(2);
    expect(
      additionalInterests.find(ai => ai.type === 'Additional Interest').rank
    ).toEqual(3);
    expect(
      additionalInterests.find(ai => ai.type === 'Lienholder').rank
    ).toEqual(4);
    expect(
      additionalInterests.find(ai => ai.type === 'Bill Payer').rank
    ).toEqual(5);
  });
});
