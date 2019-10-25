import policyHolder from './policyHolder';

export const underwritingResult = [
  {
    active: true,
    answers: [
      { answer: 'Yes' },
      { answer: 'Occasionally' },
      { answer: 'Never' }
    ],
    hidden: false,
    name: 'rented',
    order: 1,
    question: 'Is the home or any structures on the property ever rented?',
    validations: ['required'],
    visible: true
  },
  {
    active: true,
    answers: [
      { answer: 'No claims ever filed' },
      { answer: 'Less than 3 Years' },
      { answer: '3-5 Years' },
      { answer: 'Over 5 Years' },
      { answer: 'Unknown' }
    ],
    hidden: false,
    name: 'previousClaims',
    order: 2,
    question: 'When was the last claim filed?',
    validations: ['required'],
    visible: true
  },
  {
    active: true,
    answers: [
      { answer: '0-3' },
      { answer: '4-6' },
      { answer: '7-9' },
      { answer: '10+' }
    ],
    hidden: false,
    name: 'monthsOccupied',
    order: 3,
    question: 'How many months a year does the owner live in the home?',
    validations: ['required'],
    visible: true
  },
  {
    active: true,
    ageOfHome: { max: 40 },
    answers: [
      { answer: 'Yes', default: true },
      { answer: 'No' },
      { answer: 'Unknown' }
    ],
    hidden: false,
    name: 'fourPointUpdates',
    order: 4,
    question:
      'Have the wiring, plumbing, and HVAC been updated in the last 35 years?',
    validations: ['required'],
    visible: true
  },
  {
    active: true,
    answers: [{ answer: 'Yes' }, { answer: 'No' }],
    hidden: false,
    name: 'business',
    order: 6,
    question: 'Is  a business conducted on the property?',
    validations: ['required'],
    visible: true
  }
];

export const mailingBillingResult = {
  options: [
    {
      billToId: 'ab1234',
      billToType: 'Policyholder',
      displayText: 'Policyholder: Fake Nameington',
      payPlans: ['Annual', 'Semi-Annual', 'Quarterly'],
      policyHolder
    }
  ],
  paymentPlans: {
    annual: {
      amount: 2667,
      dueDate: '2019-05-08T04:00:00.000Z'
    },
    quarterly: {
      q1: {
        amount: 1096,
        dueDate: '2019-05-08T04:00:00.000Z'
      },
      q2: {
        amount: 531,
        dueDate: '2019-08-06T04:00:00.000Z'
      },
      q3: {
        amount: 531,
        dueDate: '2019-11-04T05:00:00.000Z'
      },
      q4: {
        amount: 531,
        dueDate: '2020-02-02T05:00:00.000Z'
      }
    },
    semiAnnual: {
      s1: {
        amount: 1624,
        dueDate: '2019-05-08T04:00:00.000Z'
      },
      s2: {
        amount: 1059,
        dueDate: '2019-11-04T05:00:00.000Z'
      }
    }
  }
};

export const notesResult = [
  {
    _id: '1',
    companyCode: 'TTIC',
    createdAt: '2019-03-22T00:00:00.00Z',
    createdBy: { userName: 'AAA user author' },
    noteAttachments: [{ fileUrl: 'foo.com/aaa', fileType: 'AAA filetype' }],
    noteContactType: 'AAA contact',
    noteContent: 'AAA content note',
    noteType: 'Quote Note',
    number: '12-345-67',
    numberType: 'quoteNumber',
    product: 'HO3',
    quoteNumber: '12-345-67',
    state: 'FL'
  },
  {
    _id: '999',
    companyCode: 'TTIC',
    createdAt: '2019-04-22T00:00:00.00Z',
    createdBy: { userName: 'ZZZ user author' },
    noteAttachments: [{ fileUrl: 'foo.com/zzz', fileType: 'ZZZ filetype' }],
    noteContactType: 'ZZZ contact',
    noteContent: 'ZZZ content note',
    noteType: 'Quote Note',
    number: '12-345-67',
    numberType: 'quoteNumber',
    product: 'HO3',
    quoteNumber: '12-345-67',
    state: 'FL'
  }
];

export const searchAgenciesResult = [
  {
    agencyCode: 20000,
    agentOfRecord: '60000',
    displayName: 'TEST DEFAULT AGENCY',
    _id: '5b97e676968a4b75eea823d7',
    status: 'Active',
    contracts: [
      {
        companyCode: 'TTIC',
        stateProducts: [
          {
            state: 'FL',
            product: 'HO3'
          }
        ]
      }
    ]
  },
  {
    agencyCode: 123,
    agentOfRecord: '999',
    displayName: 'TEST NEW AGENCY',
    _id: '987a',
    status: 'Active',
    contracts: [
      {
        companyCode: 'TTIC',
        stateProducts: [
          {
            state: 'FL',
            product: 'HO3'
          }
        ]
      }
    ]
  }
];

export const searchAgentsResult = [
  {
    agencies: [{ agencyCode: 20000 }],
    agentCode: 60000,
    firstName: 'Peregrin',
    lastName: 'Took',
    status: 'Active',
    licenses: [
      {
        appointed: true,
        state: 'FL'
      }
    ]
  },
  {
    agencies: [{ agencyCode: 123 }],
    agentCode: 999,
    firstName: 'Meriadoc',
    lastName: 'Brandybuck',
    status: 'Active',
    licenses: [
      {
        appointed: true,
        state: 'FL'
      }
    ]
  }
];

export const noteOptionsResult = {
  _id: '5ad386cb37d824001cac2acb',
  updatedAt: '2019-03-12T06:37:01.951Z',
  createdAt: '2018-04-17T02:14:56.134Z',
  __v: 0,
  noteType: 'Quote Note',
  companyCode: 'TTIC',
  product: 'HO3',
  state: 'FL',
  numberType: 'quoteNumber',
  validFileTypes: ['File1', 'File2', 'File3', 'File4', 'Other'],
  validContactTypes: ['Contact1', 'Contact2', 'Contact3', 'Contact4']
};
