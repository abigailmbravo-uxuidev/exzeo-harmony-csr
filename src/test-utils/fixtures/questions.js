export const coverageRatingQuestions = {
  territoryManagers: [],
  lists: {},
  buildingCodeEffectivenessGrading: {
    _id: '5bbba314ec85020015b7ddca',
    __v: 0,
    name: 'buildingCodeEffectivenessGrading',
    question: 'BCEG',
    answerType: 'radio',
    answers: [
      {
        label: '01',
        answer: '1'
      },
      {
        label: '02',
        answer: '2'
      },
      {
        label: '03',
        answer: '3'
      },
      {
        label: '04',
        answer: '4'
      },
      {
        label: '05',
        answer: '5'
      },
      {
        label: '06',
        answer: '6'
      },
      {
        label: '07',
        answer: '7'
      },
      {
        label: '08',
        answer: '8'
      },
      {
        label: '09',
        answer: '9'
      },
      {
        label: '98',
        answer: '98'
      },
      {
        label: '99',
        answer: '99'
      }
    ],
    group: [],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  familyUnits: {
    _id: '5bbba314ec85020015b7dd8f',
    __v: 0,
    name: 'familyUnits',
    question: 'Family Units',
    answerType: 'radio',
    answers: [
      {
        label: '1-2',
        answer: '1-2'
      },
      {
        label: '3-4',
        answer: '3-4'
      },
      {
        label: '5-8',
        answer: '5-8'
      },
      {
        label: '9+',
        answer: '9+'
      }
    ],
    group: [],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  residenceType: {
    _id: '5bbba314ec85020015b7dd6d',
    __v: 0,
    name: 'residenceType',
    question: 'Residence Type',
    answerType: 'radio',
    answers: [
      {
        label: 'Single Family',
        answer: 'SINGLE FAMILY'
      },
      {
        label: 'Commercial',
        answer: 'COMMERCIAL'
      }
    ],
    group: [],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  constructionType: {
    _id: '5bbba314ec85020015b7dd88',
    __v: 0,
    name: 'constructionType',
    question: 'Construction',
    answerType: 'radio',
    answers: [
      {
        label: 'Frame',
        answer: 'FRAME'
      },
      {
        label: 'Plastic Siding',
        answer: 'PLASTIC SIDING'
      },
      {
        label: 'Aluminum Siding',
        answer: 'ALUMINUM SIDING'
      },
      {
        label: 'Masonry',
        answer: 'MASONRY'
      },
      {
        label: 'Masonry Veneer',
        answer: 'MASONRY VENEER'
      },
      {
        label: 'Superior',
        answer: 'SUPERIOR'
      }
    ],
    group: [],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  coverageLimits: {
    _id: '5bbba314ec85020015b7ddae',
    __v: 0,
    order: 1,
    name: 'coverageLimits',
    question: 'Coverage Limits',
    answerType: 'heading',
    answers: [],
    group: ['coverageLimits'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  dwellingAmount: {
    _id: '5bbba314ec85020015b7dd74',
    __v: 0,
    name: 'dwellingAmount',
    question: 'Dwelling Limit',
    order: 2,
    defaultValueLocation: 'coverageLimits.dwelling.amount',
    answerType: 'slider',
    conditional: {
      slider: {
        maxLocation: 'coverageLimits.dwelling.maxAmount',
        minLocation: 'coverageLimits.dwelling.minAmount'
      }
    },
    description:
      'This is the dollar amount of coverage for the structure of your home. This amount should represent the total cost to rebuild your home to its current state in the event of a loss. If you have a Declarations Page from your current  policy it may be listed as Coverage A.  (Based on basic information of your home, we provide you a guide for a recommended value. You can move this number up or down based on more detailed information. For example, if you have an upgraded kitchen and bathroom, you may want to increase this number to ensure that you have adequate coverage in the event of a loss.)  ',
    answers: [],
    group: ['coverageLimits'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: ['range']
  },
  otherStructuresAmount: {
    _id: '5bbba314ec85020015b7dd75',
    __v: 0,
    name: 'otherStructuresAmount',
    order: 3,
    question: 'Other Structures Limit',
    answerFormat: 'currency',
    defaultValueLocation: 'coverageLimits.otherStructures.amount',
    answerType: 'radio',
    conditional: {
      dependency: {
        parent: 'dwellingAmount',
        type: 'percent'
      }
    },
    description:
      'This is the dollar amount of coverage for the other structures on your property not attached to your home. This might include a fence, shed, or unattached garage. If you have a Declarations Page from your current  policy it may be listed as Coverage B.',
    answers: [
      {
        label: '0%',
        answer: 0
      },
      {
        label: '2%',
        answer: 2
      },
      {
        label: '5%',
        answer: 5
      },
      {
        label: '10%',
        answer: 10
      }
    ],
    group: ['coverageLimits'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  personalPropertyAmount: {
    _id: '5bbba314ec85020015b7ddb7',
    __v: 0,
    name: 'personalPropertyAmount',
    defaultValueLocation: 'coverageLimits.personalProperty.amount',
    question: 'Personal Property Limit',
    order: 4,
    answerType: 'radio',
    answerFormat: 'currency',
    conditional: {
      dependency: {
        parent: 'dwellingAmount',
        type: 'percent'
      }
    },
    description:
      'This is your personal belongings, or items located inside the home. This could include your furniture, clothing, bedding, dishes, etc. If you choose to have replacement cost coverage on Personal Property, you will be required to carry Personal Property limits at a minimum of 25% of your Dwelling limit.',
    answers: [
      {
        label: '0%',
        answer: 0
      },
      {
        label: '25%',
        answer: 25
      },
      {
        label: '35%',
        answer: 35
      },
      {
        label: '50%',
        answer: 50
      }
    ],
    group: ['coverageLimits'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  personalPropertyReplacementCostCoverage: {
    _id: '5bbba314ec85020015b7dd64',
    __v: 0,
    name: 'personalPropertyReplacementCostCoverage',
    question: 'Do you want Personal Property Replacement Cost Coverage?',
    order: 5,
    answerType: 'bool',
    defaultValueLocation:
      'coverageOptions.personalPropertyReplacementCost.answer',
    conditional: {
      display: [
        {
          parent: 'personalPropertyAmount',
          trigger: '0',
          operator: 'greaterThan',
          type: 'hidden'
        }
      ]
    },
    description:
      "Replacement Cost Coverage replaces your damaged possessions at today's prices without deducting for depreciation. If you choose not to select this coverage, your loss for personal property will be paid out at Actual Cash Value.",
    answers: [],
    group: ['coverageLimits'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  lossOfUseAmount: {
    _id: '5bbba314ec85020015b7dd66',
    __v: 0,
    name: 'lossOfUseAmount',
    question: 'Loss of Use Limit',
    defaultValueLocation: 'coverageLimits.lossOfUse.amount',
    order: 6,
    answerType: 'display',
    conditional: {
      value: {
        value: 10,
        parent: 'dwellingAmount',
        type: 'percent'
      }
    },
    answers: [],
    group: ['coverageLimits'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  personalLiability: {
    _id: '5bbba314ec85020015b7dd7f',
    __v: 0,
    name: 'personalLiability',
    question: 'Personal Liability Limit',
    defaultValueLocation: 'coverageLimits.personalLiability.amount',
    order: 7,
    answerType: 'radio',
    answers: [
      {
        label: '$ 100,000',
        answer: 100000
      },
      {
        label: '$ 300,000',
        answer: 300000
      }
    ],
    group: ['coverageLimits'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  protectionClass: {
    _id: '5bbba314ec85020015b7dd72',
    __v: 0,
    name: 'protectionClass',
    question: 'Protection Class',
    order: 7,
    answerType: 'radio',
    answers: [
      {
        label: '01',
        answer: '1'
      },
      {
        label: '02',
        answer: '2'
      },
      {
        label: '03',
        answer: '3'
      },
      {
        label: '04',
        answer: '4'
      },
      {
        label: '05',
        answer: '5'
      },
      {
        label: '06',
        answer: '6'
      },
      {
        label: '07',
        answer: '7'
      },
      {
        label: '08',
        answer: '8'
      },
      {
        label: '09',
        answer: '9'
      },
      {
        label: '10',
        answer: '10'
      }
    ],
    group: ['coverageLimits'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  medicalPayments: {
    _id: '5bbba314ec85020015b7ddcc',
    __v: 0,
    name: 'medicalPayments',
    defaultValueLocation: 'coverageLimits.medicalPayments.amount',
    question: 'Medical Payments to Others',
    answerType: 'display',
    order: 8,
    answers: [],
    group: ['coverageLimits'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  moldProperty: {
    _id: '5bbba314ec85020015b7dd9d',
    __v: 0,
    name: 'moldProperty',
    question:
      'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Property',
    order: 9,
    defaultValueLocation: 'coverageLimits.moldProperty.amount',
    answerType: 'radio',
    answers: [
      {
        label: '$ 10,000',
        answer: 10000
      },
      {
        label: '$ 25,000',
        answer: 25000
      },
      {
        label: '$ 50,000',
        answer: 50000
      }
    ],
    group: ['coverageLimits'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  moldLiability: {
    _id: '5bbba314ec85020015b7dd6e',
    __v: 0,
    question:
      'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Liability',
    name: 'moldLiability',
    defaultValueLocation: 'coverageLimits.moldLiability.amount',
    answerType: 'radio',
    order: 10,
    answers: [
      {
        label: '$ 50,000',
        answer: 50000
      },
      {
        label: '$ 100,000',
        answer: 100000
      }
    ],
    group: ['coverageLimits'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  ordinanceOrLaw: {
    _id: '5bbba314ec85020015b7ddcb',
    __v: 0,
    name: 'ordinanceOrLaw',
    question: 'Ordinance or Law Coverage Limit',
    defaultValueLocation: 'coverageLimits.ordinanceOrLaw.amount',
    order: 11,
    answerType: 'radio',
    answers: [
      {
        label: '25% of Dwelling Limit',
        answer: 25
      },
      {
        label: '50% of Dwelling Limit',
        answer: 50
      }
    ],
    group: ['coverageLimits'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  coverageOptions: {
    _id: '5bbba314ec85020015b7dd90',
    __v: 0,
    order: 12,
    name: 'coverageOptions',
    question: 'Coverage Options',
    answerType: 'heading',
    answers: [],
    group: ['coverageOptions'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  propertyIncidentalOccupancies: {
    _id: '5bbba314ec85020015b7dd65',
    __v: 0,
    name: 'propertyIncidentalOccupancies',
    question: 'Property Permitted Incidental Occupancies',
    order: 13,
    hidden: true,
    defaultAnswer: 'None',
    answerType: 'radio',
    answers: [
      {
        answer: 'Main Dwelling'
      },
      {
        answer: 'Other Structures'
      },
      {
        answer: 'None'
      }
    ],
    group: ['coverageOptions'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  sinkholePerilCoverage: {
    _id: '5bbba314ec85020015b7dd80',
    __v: 0,
    name: 'sinkholePerilCoverage',
    defaultValueLocation: 'coverageOptions.sinkholePerilCoverage.answer',
    question: 'Do you want Sinkhole Loss Coverage?',
    order: 14,
    answerType: 'bool',
    answers: [],
    group: ['coverageOptions'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  deductibles: {
    _id: '5bbba314ec85020015b7dda4',
    __v: 0,
    order: 15,
    name: 'deductibles',
    question: 'Deductibles',
    answerType: 'heading',
    answers: [],
    group: ['deductibles'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  allOtherPerils: {
    _id: '5bbba314ec85020015b7dd77',
    __v: 0,
    name: 'allOtherPerils',
    question: 'All Other Perils Deductible',
    defaultValueLocation: 'deductibles.allOtherPerils.amount',
    order: 16,
    answerType: 'radio',
    answers: [
      {
        label: '$ 500',
        answer: 500
      },
      {
        label: '$ 1,000',
        answer: 1000
      },
      {
        label: '$ 2,500',
        answer: 2500
      }
    ],
    group: ['deductibles'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  hurricane: {
    _id: '5bbba314ec85020015b7dd76',
    __v: 0,
    name: 'hurricane',
    question: 'Hurricane Deductible',
    order: 17,
    defaultValueLocation: 'deductibles.hurricane.amount',
    answerType: 'radio',
    answerFormat: 'currency',
    conditional: {
      dependency: {
        parent: 'dwellingAmount',
        type: 'percent'
      }
    },
    answers: [
      {
        label: '2% of Dwelling Limit',
        answer: 2
      },
      {
        label: '5% of Dwelling Limit',
        answer: 5
      },
      {
        label: '10% of Dwelling Limit',
        answer: 10
      }
    ],
    group: ['deductibles'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  sinkhole: {
    _id: '5bbba314ec85020015b7dd6f',
    __v: 0,
    name: 'sinkhole',
    question: 'Sinkhole Deductible',
    order: 18,
    defaultAnswer: '10',
    answerType: 'radio',
    answerFormat: 'currency',
    conditional: {
      display: [
        {
          parent: 'sinkholePerilCoverage',
          trigger: true,
          operator: 'equal',
          type: 'hidden'
        }
      ],
      dependency: {
        parent: 'dwellingAmount',
        type: 'percent'
      }
    },
    answers: [
      {
        answer: 10,
        label: '10% of Dwelling Limit'
      }
    ],
    group: ['deductibles'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  windMitigation: {
    _id: '5bbba314ec85020015b7dd5e',
    __v: 0,
    name: 'windMitigation',
    question: 'Wind Mitigation',
    answerType: 'heading',
    order: 30,
    answers: [],
    group: ['windMitigation'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  roofCovering: {
    _id: '5bbba314ec85020015b7dde2',
    __v: 0,
    name: 'roofCovering',
    question: 'Roof Covering:',
    answerType: 'radio',
    defaultValueLocation: 'property.windMitigation.roofCovering',
    order: 31,
    answers: [
      {
        answer: 'Non-FBC'
      },
      {
        answer: 'FBC'
      },
      {
        answer: 'Other'
      }
    ],
    group: ['windMitigation'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  roofDeckAttachment: {
    _id: '5bbba314ec85020015b7ddd7',
    __v: 0,
    name: 'roofDeckAttachment',
    question: 'Roof Deck Attachment:',
    answerType: 'radio',
    defaultValueLocation: 'property.windMitigation.roofDeckAttachment',
    order: 32,
    answers: [
      {
        answer: 'A'
      },
      {
        answer: 'B'
      },
      {
        answer: 'C'
      },
      {
        answer: 'D'
      },
      {
        answer: 'Concrete'
      },
      {
        answer: 'Other'
      }
    ],
    group: ['windMitigation'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  roofToWallConnection: {
    _id: '5bbba314ec85020015b7ddaf',
    __v: 0,
    name: 'roofToWallConnection',
    question: 'Roof to Wall Attachment:',
    answerType: 'radio',
    defaultValueLocation: 'property.windMitigation.roofToWallConnection',
    order: 33,
    answers: [
      {
        answer: 'Toe Nails'
      },
      {
        answer: 'Clips'
      },
      {
        answer: 'Single Wraps'
      },
      {
        answer: 'Double Wraps'
      },
      {
        answer: 'Other'
      }
    ],
    group: ['windMitigation'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  roofGeometry: {
    _id: '5bbba314ec85020015b7dddc',
    __v: 0,
    name: 'roofGeometry',
    question: 'Roof Geometry:',
    answerType: 'radio',
    defaultValueLocation: 'property.windMitigation.roofGeometry',
    order: 34,
    answers: [
      {
        answer: 'Flat'
      },
      {
        answer: 'Gable'
      },
      {
        answer: 'Hip'
      },
      {
        answer: 'Other'
      }
    ],
    group: ['windMitigation'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  secondaryWaterResistance: {
    _id: '5bbba314ec85020015b7ddd8',
    __v: 0,
    name: 'secondaryWaterResistance',
    question: 'Secondary Water Resistance (SWR):',
    answerType: 'radio',
    defaultValueLocation: 'property.windMitigation.secondaryWaterResistance',
    order: 35,
    answers: [
      {
        answer: 'Yes'
      },
      {
        answer: 'No'
      },
      {
        answer: 'Other'
      }
    ],
    group: ['windMitigation'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  openingProtection: {
    _id: '5bbba314ec85020015b7ddd3',
    __v: 0,
    name: 'openingProtection',
    question: 'Opening Protection:',
    answerType: 'radio',
    defaultValueLocation: 'property.windMitigation.openingProtection',
    order: 36,
    answers: [
      {
        answer: 'None'
      },
      {
        answer: 'Basic'
      },
      {
        answer: 'Hurricane'
      },
      {
        answer: 'Other'
      }
    ],
    group: ['windMitigation'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  floridaBuildingCodeWindSpeed: {
    _id: '5bbba314ec85020015b7dddd',
    __v: 0,
    name: 'floridaBuildingCodeWindSpeed',
    question: 'What is the FBC wind speed for this property?',
    answerType: 'number',
    defaultValueLocation:
      'property.windMitigation.floridaBuildingCodeWindSpeed',
    order: 37,
    hidden: true,
    answers: [],
    group: ['windMitigation'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  floridaBuildingCodeWindSpeedDesign: {
    _id: '5bbba314ec85020015b7ddd9',
    __v: 0,
    name: 'floridaBuildingCodeWindSpeedDesign',
    question: 'What is the FBC wind speed design for this property?',
    answerType: 'number',
    defaultValueLocation:
      'property.windMitigation.floridaBuildingCodeWindSpeedDesign',
    order: 38,
    hidden: true,
    answers: [],
    group: ['windMitigation'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  windBorneDebrisRegion: {
    _id: '5bbba314ec85020015b7ddd6',
    __v: 0,
    name: 'windBorneDebrisRegion',
    question: 'Is the property in the wind borne debris region?',
    answerType: 'radio',
    defaultValueLocation: 'property.windMitigation.windBorneDebrisRegion',
    order: 39,
    hidden: true,
    answers: [
      {
        answer: 'Yes'
      },
      {
        answer: 'No'
      },
      {
        answer: 'Other'
      }
    ],
    group: ['windMitigation'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  internalPressureDesign: {
    _id: '5bbba314ec85020015b7ddd4',
    __v: 0,
    name: 'internalPressureDesign',
    question: 'Internal Pressure Design',
    answerType: 'radio',
    defaultValueLocation: 'property.windMitigation.internalPressureDesign',
    order: 40,
    hidden: true,
    answers: [
      {
        answer: 'Enclosed'
      },
      {
        answer: 'Partial'
      },
      {
        answer: 'Other'
      }
    ],
    group: ['windMitigation'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  terrain: {
    _id: '5bbba314ec85020015b7dddb',
    __v: 0,
    name: 'terrain',
    question: 'What terrain is the property located in?',
    answerType: 'radio',
    defaultValueLocation: 'property.windMitigation.terrain',
    order: 41,
    hidden: true,
    answers: [
      {
        answer: 'B'
      },
      {
        answer: 'C'
      },
      {
        answer: 'HVHZ'
      },
      {
        answer: 'Other'
      }
    ],
    group: ['windMitigation'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  discounts: {
    _id: '5bbba314ec85020015b7dd67',
    __v: 0,
    name: 'discounts',
    question: 'Discounts',
    answerType: 'heading',
    order: 50,
    answers: [],
    group: ['discounts'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  burglarAlarm: {
    _id: '5bbba314ec85020015b7ddda',
    __v: 0,
    name: 'burglarAlarm',
    question: 'Does the property have a burglar alarm?',
    answerType: 'bool',
    defaultValueLocation: 'property.burglarAlarm',
    order: 51,
    answers: [],
    group: ['discounts'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  fireAlarm: {
    _id: '5bbba314ec85020015b7dddf',
    __v: 0,
    name: 'fireAlarm',
    question: 'Does the property have a fire alarm?',
    answerType: 'bool',
    defaultValueLocation: 'property.fireAlarm',
    order: 52,
    answers: [],
    group: ['discounts'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  sprinkler: {
    _id: '5bbba314ec85020015b7dde1',
    __v: 0,
    name: 'sprinkler',
    question: 'Sprinkler',
    answerType: 'radio',
    defaultValueLocation: 'property.sprinkler',
    order: 53,
    answers: [
      {
        answer: 'N'
      },
      {
        answer: 'A'
      },
      {
        answer: 'B'
      }
    ],
    group: ['discounts'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  },
  floodZone: {
    _id: '5bbba314ec85020015b7ddde',
    __v: 0,
    name: 'floodZone',
    question: 'Flood zone',
    answerType: 'radio',
    defaultValueLocation: 'property.floodZone',
    order: 54,
    answers: [
      {
        answer: 'V'
      },
      {
        answer: 'A'
      },
      {
        answer: 'B'
      },
      {
        answer: 'C'
      },
      {
        answer: 'X'
      },
      {
        answer: 'U'
      }
    ],
    group: ['discounts'],
    models: ['quote'],
    product: ['HO3'],
    state: ['FL'],
    companyId: ['TTIC'],
    steps: ['askToCustomizeDefaultQuoteCSR'],
    validations: []
  }
};

export const underwritingQuestions = [
  {
    validations: ['required'],
    answers: [
      {
        answer: 'Yes'
      },
      {
        answer: 'Occasionally'
      },
      {
        answer: 'Never'
      }
    ],
    floodZone: [],
    name: 'rented',
    active: true,
    visible: true,
    question: 'Is the home or any structures on the property ever rented?',
    order: 1,
    __v: 0,
    hidden: false
  },
  {
    validations: ['required'],
    answers: [
      {
        answer: 'No claims ever filed'
      },
      {
        answer: 'Less than 3 Years'
      },
      {
        answer: '3-5 Years'
      },
      {
        answer: 'Over 5 Years'
      },
      {
        answer: 'Unknown'
      }
    ],
    floodZone: [],
    name: 'previousClaims',
    active: true,
    visible: true,
    question: 'When was the last claim filed?',
    order: 2,
    __v: 0,
    hidden: false
  },
  {
    validations: ['required'],
    answers: [
      {
        answer: '0-3'
      },
      {
        answer: '4-6'
      },
      {
        answer: '7-9'
      },
      {
        answer: '10+'
      }
    ],
    floodZone: [],
    name: 'monthsOccupied',
    active: true,
    visible: true,
    question: 'How many months a year does the owner live in the home?',
    order: 3,
    __v: 0,
    hidden: false
  },
  {
    validations: ['required'],
    answers: [
      {
        answer: 'Yes',
        default: true
      },
      {
        answer: 'No'
      },
      {
        answer: 'Unknown'
      }
    ],
    floodZone: [],
    name: 'fourPointUpdates',
    active: true,
    visible: true,
    question:
      'Have the wiring, plumbing, and HVAC been updated in the last 35 years?',
    ageOfHome: {
      max: 40
    },
    order: 4,
    __v: 0,
    hidden: false
  },
  {
    validations: ['required'],
    answers: [
      {
        answer: 'Yes'
      },
      {
        answer: 'No'
      }
    ],
    floodZone: [],
    name: 'business',
    active: true,
    visible: true,
    question: 'Is a business conducted on the property?',
    order: 6,
    __v: 0,
    hidden: false
  }
];
