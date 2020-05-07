// Calculate and format new policy Effective Date
let today = new Date(); // eslint-disable-line prefer-const
const addEffectiveDays = 35;
today.setDate(today.getDate() + addEffectiveDays);
const yyyy = today.getFullYear();
const dd = today.getDate().toLocaleString('en-US', {
  minimumIntegerDigits: 2
});
const mm = (today.getMonth() + 1).toLocaleString('en-US', {
  minimumIntegerDigits: 2
});
const policyEffectiveDate = `${yyyy}-${mm}-${dd}`;
const policyEffectiveDateAlternate = `${mm}/${dd}/${yyyy}`;

export const MODIFY_EFFECTIVE_DATE = {
  effectiveDate: policyEffectiveDate,
  effectiveDateAlternate: policyEffectiveDateAlternate
};

export const ADD_ENDORSEMENTS = {
  policyHolders: [
    {
      primaryPhoneNumber: '2224445555',
      secondaryPhoneNumber: '3337778888'
    },
    {
      firstName: 'Batman 2',
      lastName: 'Robin 2',
      emailAddress: 'exzeoqa@exzeo.com',
      primaryPhoneNumber: '9994445555',
      secondaryPhoneNumber: '3337776543'
    }
  ],
  policyHolderMailingAddress: {
    address2: 'APT 101'
  },
  property: {
    burglarAlarm: true,
    physicalAddress: {
      address2: 'APT 101'
    }
  },
  transactionType: 'Multiple Endorsements Endorsement',
  dwelling: {
    value: 400000
  },
  personalProperty: {
    value: 50
  },
  windMitigation: {
    roofCovering: 'FBC',
    roofGeometry: 'Hip'
  },
  protectionClass: 7,
  protectionClassText: '07',
  sinkholePerilCoverageAnswerText: 'Coverage Excluded'
};

export const ADD_MORTGAGEE = {
  additionalInterests: [
    {
      name2: 'Robin',
      type: 'Mortgagee',
      name1: 'Batman',
      phoneNumber: '4445556666',
      referenceNumber: '12345678',
      mailingAddress: {
        address1: '4131 TEST ADDRESS',
        address2: 'APT 101',
        city: 'SARASOTA',
        state: 'FL',
        zip: '00001'
      }
    }
  ]
};

export const ADD_PAYMENT = {
  cashReceived: {
    $numberDecimal: '100.00'
  },
  status: {
    displayText: 'Payment Received',
    type: 'Electronic Deposit'
  }
};

export const SWITCH_AOR = {
  firstName: 'ANDRES',
  lastName: 'G VILLALON JR',
  agencyName: 'TYPTAP MANAGEMENT COMPANY',
  mailingAddress: {
    address1: '5300 W CYPRESS ST'
  },
  agencies: [
    {
      agencyCode: 20000
    }
  ]
};
