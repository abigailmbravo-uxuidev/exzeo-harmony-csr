import dependencyHelper from './dependencyHelper';

let data = {};

data = {
  _id: '5866c036a46eb72908f3f547',
  companyCode: 'TTIC',
  state: 'FL',
  product: 'HO3',
  quoteNumber: '12-1234567-12',
  billToId: '5866c036a46eb72908f3f547',
  billPlan: 'Annual',
  eligibility: 'Yes',
  effectiveDate: '2017-01-04T20:14:46.793Z',
  endDate: '2018-01-04T20:14:46.793Z',
  agencyId: '20000',
  agentId: '60000',
  property: {
    id: '12089DF01D986BF1A',
    source: 'CasaClue',
    physicalAddress: {
      address1: '95155 STINGRAY LN',
      address2: '',
      city: 'FERNANDINA BEACH',
      state: 'FL',
      county: 'NASSAU',
      zip: '32034',
      latitude: 30.57729,
      longitude: -81.50374,
      _id: '5866c036a46eb72908f3f55b'
    },
    residenceType: 'Single Family',
    yearBuilt: 2005,
    constructionType: 'Frame',
    territory: '892-0',
    protectionClass: 'A',
    buildingCodeEffectivenessGrading: 99,
    familyUnits: '1-2',
    squareFeet: 2066,
    sprinkler: 'no',
    floodZone: 'V',
    windMitigation: {
      roofGeometry: 'Other',
      roofDeckAttachment: 'A',
      secondaryWaterResistance: false,
      windBorneDebrisRegion: false,
      terrain: 'B',
      _id: '5866c036a46eb72908f3f55a'
    },
    _id: '5866c036a46eb72908f3f559',
    gatedCommunity: false,
    burglarAlarm: false,
    fireAlarm: false,
    trampoline: false,
    divingBoard: false,
    poolSecured: false,
    pool: false
  },
  rating: {
    engineCode: 'HO3ByPeril',
    rateCode: '0417',
    _id: '5866c036a46eb72908f3f548'
  },
  underwritingExceptions: [],
  underwritingAnswers: {
    noPriorInsuranceSurcharge: {
      question: 'No Prior Insurance Surcharge',
      answer: 'false',
      source: 'Default',
      _id: '5866c036a46eb72908f3f54a'
    },
    floodCoverage: {
      question: 'Flood Coverage',
      answer: 'yes',
      source: 'Default',
      _id: '5866c036a46eb72908f3f549'
    }
  },
  deductibles: {
    hurricane: {
      displayText: 'Hurricane',
      amount: 0.2,
      format: 'Percentage',
      ofCoverageLimit: '2%',
      _id: '5866c036a46eb72908f3f54c'
    },
    allOtherPerils: {
      displayText: 'All Other Perils',
      amount: 1000,
      format: 'Currency',
      _id: '5866c036a46eb72908f3f54b'
    }
  },
  coverageOptions: {
    sinkholePerilCoverage: {
      displayText: 'Sinkhole Peril Coverage',
      answer: false,
      _id: '5866c036a46eb72908f3f550'
    },
    propertyIncidentalOccupanciesMainDwelling: {
      displayText: 'Property Incidental Occupancies Main Dwelling',
      answer: false,
      _id: '5866c036a46eb72908f3f54f'
    },
    propertyIncidentalOccupanciesOtherStructures: {
      displayText: 'Property Incidental Occupancies Other Structures',
      answer: false,
      _id: '5866c036a46eb72908f3f54e'
    },
    liabilityIncidentalOccupancies: {
      displayText: 'liability Incidental Occupancies',
      answer: false,
      _id: '5866c036a46eb72908f3f54d'
    }
  },
  coverageLimits: {
    dwelling: {
      displayText: 'Dwelling',
      amount: 10000000,
      format: 'Currency',
      minAmount: 2000000,
      maxAmount: 2000000,
      _id: '5866c036a46eb72908f3f558'
    },
    otherStructures: {
      displayText: 'Other Structures',
      amount: 1000000,
      format: 'Currency',
      _id: '5866c036a46eb72908f3f557'
    },
    ordinanceOrLaw: {
      displayText: 'Ordinance Or Law',
      amount: 1000000,
      format: 'Currency',
      _id: '5866c036a46eb72908f3f557'
    },
    personalProperty: {
      displayText: 'Personal Property',
      amount: 500000,
      format: 'Currency',
      _id: '5866c036a46eb72908f3f556'
    },
    lossOfUse: {
      displayText: 'Loss of Use',
      amount: 1000000,
      format: 'Currency',
      _id: '5866c036a46eb72908f3f555'
    },
    personalLiability: {
      displayText: 'Personal Liability',
      amount: 100000,
      format: 'Currency',
      _id: '5866c036a46eb72908f3f554'
    },
    medicalPayments: {
      displayText: 'Medical Payments',
      amount: 2000,
      format: 'Currency',
      _id: '5866c036a46eb72908f3f553'
    },
    moldProperty: {
      displayText: 'Mold Property',
      amount: 10000,
      format: 'Currency',
      _id: '5866c036a46eb72908f3f552'
    },
    moldLiability: {
      displayText: 'Mold Liability',
      amount: 50000,
      format: 'Currency',
      _id: '5866c036a46eb72908f3f551'
    }
  },
  additionalInterests: [
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
      type: 'Mortgagee',
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
      type: 'Mortgagee',
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
  ],
  policyHolderMailingAddress: {
    careOf: null,
    address1: '1000 Poplar Ave',
    address2: null,
    city: 'Tampa',
    state: 'FL',
    zip: '33607',
    country: {
      code: 'USA',
      displayText: 'United States of America'
    }
  },
  policyHolders: [
    {
      id: 'DFBDFBDF1',
      order: 1,
      entityType: 'Person',
      firstName: 'Bryan1',
      lastName: 'BBBB',
      emailAddress: 'bb1@bb.com',
      primaryPhoneNumber: '813-555-3456'
    },
    {
      id: 'DFBDFBDF2',
      order: 2,
      entityType: 'Person',
      firstName: 'Bryan2',
      lastName: 'BBBB',
      emailAddress: 'bb2@bb.com',
      primaryPhoneNumber: '813-555-3456'
    }
  ],
  __v: 0
};

describe('dependencyHelper', () => {
  it('setup dependency info for slider', () => {
    const values = {
      dwellingAmount: '',
      lossOfUseAmount: ''
    };
    let sliderQuestion = {};
    sliderQuestion = {
      _id: '588274ee711411e6b4d3ac5b',
      name: 'dwellingAmount',
      models: [
        'quote',
        'quoteModel-mark',
        'quoteModel-marco',
        'quoteModel-eshu',
        'quoteModelFinalUI',
        'quoteModel',
        'quoteModelUIVishal',
        'quoteModelFinalUIVishal'
      ],
      steps: [
        'askToCustomizeDefaultQuote'
      ],
      question: 'Dwelling Limit',
      group: [
        'coverageLimits'
      ],
      order: 2,
      defaultValueLocation: 'coverageLimits.dwelling.amount',
      answerType: 'slider',
      step: 1000,
      conditional: {
        slider: {
          minLocation: 'coverageLimits.dwelling.minAmount',
          maxLocation: 'coverageLimits.dwelling.maxAmount'
        }
      }
    };
    const result = dependencyHelper(sliderQuestion, data, values);

    expect(result.min).toEqual(2000000);
    expect(result.max).toEqual(2000000);
  });

  it('setup dependency info for value(percent)', () => {
    const values = {
      dwellingAmount: 10000,
      lossOfUseAmount: '',
      personalPropertyAmount: 500,
      sinkhole: 25
    };
    let valueQuestion = {};
    valueQuestion = {
      _id: '586e7f26711411e6b4d392f3',
      name: 'lossOfUseAmount',
      models: [
        'quote',
        'quoteModel-mark',
        'quoteModel-marco',
        'quoteModel-eshu',
        'quoteModelFinalUI',
        'quoteModel',
        'quoteModelUIVishal',
        'quoteModelFinalUIVishal'
      ],
      steps: [
        'askToCustomizeDefaultQuote'
      ],
      question: 'Loss of Use Limit',
      group: [
        'coverageLimits'
      ],
      defaultValueLocation: 'coverageLimits.lossOfUse.amount',
      order: 6,
      answerType: 'display',
      conditional: {
        value: {
          type: 'percent',
          parent: 'dwellingAmount',
          value: 10
        }
      }
    };
    const result = dependencyHelper(valueQuestion, data, values);

    expect(result.displayValue).toEqual('$ 1,000');
  });
  it('setup dependency info for value(no percent)', () => {
    const values = {
      dwellingAmount: 10000,
      lossOfUseAmount: '',
      personalPropertyAmount: 500,
      sinkhole: 25
    };
    let valueQuestion = {};
    valueQuestion = {
      _id: '586e7f26711411e6b4d392f3',
      name: 'lossOfUseAmount',
      models: [
        'quote',
        'quoteModel-mark',
        'quoteModel-marco',
        'quoteModel-eshu',
        'quoteModelFinalUI',
        'quoteModel',
        'quoteModelUIVishal',
        'quoteModelFinalUIVishal'
      ],
      steps: [
        'askToCustomizeDefaultQuote'
      ],
      question: 'Loss of Use Limit',
      group: [
        'coverageLimits'
      ],
      defaultValueLocation: 'coverageLimits.lossOfUse.amount',
      order: 6,
      answerType: 'display',
      conditional: {
        value: {
          type: 'currency',
          parent: 'dwellingAmount',
          value: 10
        }
      }
    };
    const result = dependencyHelper(valueQuestion, data, values);

    expect(result.displayValue).toEqual('$ 100,000');
  });


  it('setup dependency info for dependency(percent)', () => {
    const values = {
      dwellingAmount: 10000,
      lossOfUseAmount: '',
      personalPropertyAmount: 500,
      sinkhole: 25
    };
    let dependencyQuestion = {};
    dependencyQuestion = {
      _id: '586d7218711411e6b4d3926a',
      name: 'personalPropertyAmount',
      defaultValueLocation: 'coverageLimits.personalProperty.amount',
      models: [
        'quote',
        'quoteModel-mark',
        'quoteModel-marco',
        'quoteModel-eshu',
        'quoteModelFinalUI',
        'quoteModel',
        'quoteModelUIVishal',
        'quoteModelFinalUIVishal'
      ],
      steps: [
        'askToCustomizeDefaultQuote'
      ],
      question: 'Personal Property Limit',
      group: [
        'coverageLimits'
      ],
      order: 4,
      answerType: 'radio',
      answerFormat: 'currency',
      answers: [
        {
          answer: 0,
          label: '0%'
        },
        {
          answer: 25,
          label: '25%'
        },
        {
          answer: 35,
          label: '35%'
        },
        {
          answer: 50,
          label: '50%'
        }
      ],
      conditional: {
        dependency: {
          type: 'percent',
          parent: 'dwellingAmount'
        }
      }
    };
    const result = dependencyHelper(dependencyQuestion, data, values);

    expect(result.displayValue).toEqual('$ 50,000');
  });

  it('setup dependency info for dependency(no percent)', () => {
    const values = {
      dwellingAmount: 10000,
      lossOfUseAmount: '',
      personalPropertyAmount: 500,
      sinkhole: 25
    };
    let dependencyQuestion = {};
    dependencyQuestion = {
      _id: '586d7218711411e6b4d3926a',
      name: 'personalPropertyAmount',
      defaultValueLocation: 'coverageLimits.personalProperty.amount',
      models: [
        'quote',
        'quoteModel-mark',
        'quoteModel-marco',
        'quoteModel-eshu',
        'quoteModelFinalUI',
        'quoteModel',
        'quoteModelUIVishal',
        'quoteModelFinalUIVishal'
      ],
      steps: [
        'askToCustomizeDefaultQuote'
      ],
      question: 'Personal Property Limit',
      group: [
        'coverageLimits'
      ],
      order: 4,
      answerType: 'radio',
      answerFormat: 'currency',
      answers: [
        {
          answer: 0,
          label: '0%'
        },
        {
          answer: 25,
          label: '25%'
        },
        {
          answer: 35,
          label: '35%'
        },
        {
          answer: 50,
          label: '50%'
        }
      ],
      conditional: {
        dependency: {
          type: 'number',
          parent: 'dwellingAmount'
        }
      }
    };
    const result = dependencyHelper(dependencyQuestion, data, values);

    expect(result.displayValue).toEqual('$ 5,000,000');
  });

  it('setup dependency info for display', () => {
    const values = {
      dwellingAmount: 10000,
      lossOfUseAmount: '',
      personalPropertyAmount: 500,
      sinkhole: 25
    };
    let displayQuestion = {};
    displayQuestion = {
      _id: '586d7218711411e6b4d3926a',
      name: 'sinkhole',
      models: [
        'quote',
        'quoteModel-mark',
        'quoteModel-marco',
        'quoteModel-eshu',
        'quoteModelFinalUI',
        'quoteModel',
        'quoteModelUIVishal',
        'quoteModelFinalUIVishal'
      ],
      steps: [
        'askToCustomizeDefaultQuote'
      ],
      question: 'Sinkhole Deductible',
      group: [
        'deductibles'
      ],
      order: 18,
      defaultValueLocation: 'deductibles.hurricane.amount',
      answerType: 'radio',
      answerFormat: 'currency',
      answers: [
        {
          label: '2% of Dwelling Limit',
          answer: 2
        },
        {
          label: '5% of Dwelling Limit',
          answer: 5
        }
      ],
      conditional: {
        dependency: {
          type: 'percent',
          parent: 'dwellingAmount'
        },
        display: [
          {
            type: 'hidden',
            operator: 'equal',
            trigger: true,
            parent: 'sinkholeCoverage'
          }
        ]
      }
    };
    let result = dependencyHelper(displayQuestion, data, values);

    expect(result.displayValue).toEqual('$ 2,500');

    displayQuestion.conditional.display = [
      {
        type: 'hidden',
        operator: 'notEqual',
        trigger: true,
        parent: 'sinkholeCoverage'
      }
    ];

    result = dependencyHelper(displayQuestion, data, values);

    expect(result.hidden).toEqual(false);
    expect(result.displayValue).toEqual('$ 2,500');

    displayQuestion.conditional.display = [
      {
        type: 'hidden',
        operator: 'greaterThan',
        trigger: true,
        parent: 'sinkholeCoverage'
      }
    ];

    result = dependencyHelper(displayQuestion, data, values);

    expect(result.hidden).toEqual(true);
    expect(result.displayValue).toEqual('$ 2,500');

    displayQuestion.conditional.display = [
      {
        type: 'hidden',
        operator: 'lessThan',
        trigger: true,
        parent: 'sinkholeCoverage'
      }
    ];

    result = dependencyHelper(displayQuestion, data, values);

    expect(result.hidden).toEqual(true);
    expect(result.displayValue).toEqual('$ 2,500');

    displayQuestion.conditional.display = [
      {
        type: 'hidden',
        operator: 'noop',
        trigger: true,
        parent: 'sinkholeCoverage'
      }
    ];

    result = dependencyHelper(displayQuestion, data, values);

    expect(result.hidden).toBeUndefined();
    expect(result.displayValue).toEqual('$ 2,500');

    displayQuestion.conditional.display = [{
      type: 'hidden',
      operator: 'greaterThan',
      trigger: true,
      parent: 'sinkholeCoverage'
    }, {
      type: 'hidden',
      operator: 'notEqual',
      trigger: true,
      parent: 'sinkholeCoverage'
    }];

    result = dependencyHelper(displayQuestion, data, values);
    expect(result.hidden).toEqual(true);
  });
});
