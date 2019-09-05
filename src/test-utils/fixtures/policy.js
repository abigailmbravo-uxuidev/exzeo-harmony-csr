export const mockPolicy = {
  issueDate: '2019-09-03T17:36:03.555Z',
  policyNumber: '12-1019690-01',
  __v: 0,
  additionalInterests: [
    {
      name2: '',
      active: false,
      _id: '5d6ea76fbe46880012775c99',
      type: 'Premium Finance',
      order: null,
      name1: 'P1 FINANCE COMPANY',
      mailingAddress: {
        _id: '5d6ea76fbe46880012775c9a',
        country: {
          _id: '5d6ea76fbe46880012775c9b',
          code: 'USA',
          displayText: 'United States of America'
        },
        address1: 'PO BOX 924438',
        city: 'NORCROSS',
        state: 'GA',
        zip: '30010'
      }
    },
    {
      name2: 'Bert',
      active: false,
      _id: '5d6ea7857969440012939d38',
      type: 'Bill Payer',
      order: null,
      name1: 'Q',
      phoneNumber: '8133856080',
      mailingAddress: {
        _id: '5d6ea7857969440012939d39',
        country: {
          _id: '5d6ea7857969440012939d3a',
          code: 'USA',
          displayText: 'United States of America'
        },
        address1: '5300 W Cypress St., Suite 100',
        city: 'Tampa',
        state: 'FL',
        zip: '33607'
      }
    },
    {
      name2: '',
      active: true,
      _id: '5d6ea85fbe46880012775d27',
      type: 'Premium Finance',
      order: 0,
      name1: 'P1 FINANCE COMPANY',
      mailingAddress: {
        _id: '5d6ea85fbe46880012775d28',
        country: {
          _id: '5d6ea85fbe46880012775d29',
          code: 'USA',
          displayText: 'United States of America'
        },
        address1: 'PO BOX 924438',
        city: 'NORCROSS',
        state: 'GA',
        zip: '30010'
      }
    }
  ],
  agencyCode: 20000,
  agentCode: 60000,
  billPlan: 'Annual',
  billToId: '5d6ea460f397660012f9e1c6',
  billToType: 'Policyholder',
  cancelDate: null,
  cancelReason: null,
  companyCode: 'TTIC',
  cost: {
    totalCost: 125,
    worksheet: {
      inputFields: {
        version: '201801',
        currentYear: '2018',
        zip: '00001',
        companyCode: 'TTIC',
        state: 'FL',
        product: 'HO3',
        coverageA: 314000,
        coverageB: 6280,
        coverageC: 78500,
        coverageD: 31400,
        hurricaneDeductible: 2,
        aopDeductible: 1000,
        sinkholeDeductible: 10,
        replacementCost: true,
        yearBuilt: 1998,
        roofGeometry: 'Other',
        openingProtection: 'C',
        constructionType: 'M'
      },
      lookupFields: {
        hurricaneDeductibleFactor: 1,
        hurricaneYearBuiltFactor: 0.516541,
        hurricaneRoofShapeFactor: 1,
        hurricaneOpeningProtectionFactor: 1,
        hurricaneConstructionTypeFactor: 1,
        hurricaneRetentionMult: 1.463338,
        nonCatConstructionLossCost: 0,
        claimCost: 1500,
        baseCost: 125,
        minCoverageA: 150000,
        maxCoverageA: 750000,
        baseCoverageA: 250000
      },
      calculatedFields: {
        hurricaneTEFactor: 430.18,
        coverageAFactor: 1.064,
        nonCatExp: 0,
        catExp: 0,
        retentionExp: 0,
        adminExp: 125
      }
    }
  },
  coverageLimits: {
    dwelling: {
      value: 314000,
      name: 'dwelling',
      required: true,
      amount: 314000,
      letterDesignation: 'A',
      maxAmount: 408000,
      minAmount: 283000,
      initialValue: 314000,
      displayText: 'Dwelling',
      root: true,
      format: 'Currency',
      inflationFactor: 1.04,
      endorsementType: 'Coverage Endorsement'
    },
    moldLiability: {
      value: 50000,
      name: 'moldLiability',
      required: true,
      amount: 50000,
      initialValue: 50000,
      displayText: 'Mold Liability',
      format: 'Currency',
      endorsementType: 'Coverage Endorsement'
    },
    medicalPayments: {
      value: 2000,
      name: 'medicalPayments',
      required: true,
      amount: 2000,
      letterDesignation: 'F',
      initialValue: 2000,
      displayText: 'Medical Payments',
      format: 'Currency'
    },
    lossOfUse: {
      value: 10,
      name: 'lossOfUse',
      required: true,
      amount: 31400,
      letterDesignation: 'D',
      initialValue: 10,
      displayText: 'Loss of Use',
      format: 'Percentage',
      ofCoverageLimit: 'dwelling'
    },
    otherStructures: {
      value: 2,
      name: 'otherStructures',
      required: true,
      amount: 6280,
      letterDesignation: 'B',
      initialValue: 2,
      displayText: 'Other Structures',
      format: 'Currency',
      endorsementType: 'Coverage Endorsement'
    },
    moldProperty: {
      value: 10000,
      name: 'moldProperty',
      required: true,
      amount: 10000,
      initialValue: 10000,
      displayText: 'Mold Property',
      format: 'Currency',
      endorsementType: 'Coverage Endorsement'
    },
    ordinanceOrLaw: {
      value: 25,
      name: 'ordinanceOrLaw',
      required: true,
      amount: 25,
      initialValue: 25,
      displayText: 'Ordinance or Law',
      format: 'Percentage',
      ofCoverageLimit: 'dwelling',
      calculatedAmount: 78500,
      endorsementType: 'Coverage Endorsement'
    },
    personalLiability: {
      value: 300000,
      name: 'personalLiability',
      required: true,
      amount: 300000,
      letterDesignation: 'E',
      initialValue: 300000,
      displayText: 'Personal Liability',
      format: 'Currency',
      endorsementType: 'Coverage Endorsement'
    },
    personalProperty: {
      value: 25,
      name: 'personalProperty',
      required: true,
      amount: 78500,
      letterDesignation: 'C',
      initialValue: 25,
      displayText: 'Personal Property',
      format: 'Currency',
      endorsementType: 'Coverage Endorsement'
    }
  },
  coverageOptions: {
    sinkholePerilCoverage: {
      answer: true,
      name: 'sinkholePerilCoverage',
      displayText: 'Sinkhole Peril Coverage',
      default: true,
      endorsementType: 'Deductible Endorsement'
    },
    propertyIncidentalOccupanciesOtherStructures: {
      answer: false,
      name: 'propertyIncidentalOccupanciesOtherStructures',
      displayText: 'Property Permitted Incidental Occupancies Other Structures',
      default: false,
      endorsementType: 'Coverage Endorsement'
    },
    personalPropertyReplacementCost: {
      answer: true,
      name: 'personalPropertyReplacementCost',
      displayText: 'Personal Property Replacement Cost',
      default: true,
      endorsementType: 'Coverage Endorsement'
    },
    propertyIncidentalOccupanciesMainDwelling: {
      answer: false,
      name: 'propertyIncidentalOccupanciesMainDwelling',
      displayText: 'Property Permitted Incidental Occupancies Main Dwelling',
      default: false,
      endorsementType: 'Coverage Endorsement'
    },
    liabilityIncidentalOccupancies: {
      answer: false,
      name: 'liabilityIncidentalOccupancies',
      displayText: 'Liability Permitted Incidental Occupancies',
      default: false
    }
  },
  createdAt: '2019-09-03T17:36:03.597Z',
  createdBy: {
    _id: '5d6ea483be46880012775c4e',
    userId: 'auth0|59419e3a43e76f16f68c3349',
    userName: 'tticcsr'
  },
  deductibles: {
    hurricane: {
      value: 2,
      name: 'hurricane',
      required: true,
      amount: 2,
      displayText: 'Hurricane',
      initialValue: 2,
      format: 'Currency',
      calculatedAmount: 6280,
      endorsementType: 'Deductible Endorsement'
    },
    allOtherPerils: {
      value: 1000,
      name: 'allOtherPerils',
      required: true,
      amount: 1000,
      displayText: 'All Other Perils',
      initialValue: 1000,
      format: 'Currency',
      endorsementType: 'Deductible Endorsement'
    },
    sinkhole: {
      value: 10,
      name: 'sinkhole',
      required: true,
      amount: 10,
      displayText: 'Sinkhole',
      initialValue: 10,
      format: 'Percentage',
      ofCoverageLimit: 'dwelling',
      calculatedAmount: 31400,
      endorsementType: 'Deductible Endorsement'
    }
  },
  editHash: 'e431e8d49ddccc08cd86c02cd8c3fa2fd9eb5631823e11cadcd7a3fe78ebe3b9',
  effectiveDate: '2019-10-03T04:00:00.000Z',
  endDate: '2020-10-03T04:00:00.000Z',
  policyAccountCode: 10000,
  policyHolderMailingAddress: {
    _id: '5d6ea483be46880012775c62',
    careOf: '',
    address1: '4131 TEST ADDRESS',
    city: 'SARASOTA',
    state: 'FL',
    zip: '00001',
    country: {
      _id: '5d6ea468f397660012f9e1e1',
      code: 'USA',
      displayText: 'United States of America'
    }
  },
  policyHolders: [
    {
      electronicDelivery: false,
      _id: '5d6ea460f397660012f9e1c6',
      order: 0,
      entityType: 'Person',
      firstName: 'Oberyn',
      lastName: 'Martell',
      primaryPhoneNumber: '1234567890',
      emailAddress: 'TheViper@gmail.com'
    }
  ],
  policyTerm: 1,
  policyVersion: 7,
  product: 'HO3',
  property: {
    townhouseRowhouse: false,
    pool: false,
    poolSecured: false,
    divingBoard: false,
    trampoline: false,
    fireAlarm: false,
    burglarAlarm: false,
    sprinkler: 'N',
    gatedCommunity: false,
    baseFloodElevation: null,
    _id: '5d6ea456318af70012227bc8',
    id: '12000000000000001',
    physicalAddress: {
      _id: '5d6ea456318af70012227bc9',
      address1: '4131 TEST ADDRESS',
      address2: '',
      city: 'SARASOTA',
      state: 'FL',
      zip: '00001',
      county: 'SARASOTA',
      latitude: 27.27967,
      longitude: -82.47786
    },
    coverageLimits: {
      dwelling: {
        format: 'Currency',
        amount: '314000',
        displayText: 'Dwelling'
      }
    },
    source: 'CasaClue',
    territory: '715-51',
    protectionClass: 3,
    buildingCodeEffectivenessGrading: 3,
    familyUnits: '1-2',
    squareFeet: 2640,
    yearOfRoof: null,
    timezone: 'AMERICA/NEW_YORK',
    floodZone: 'X',
    distanceToTidalWater: 17740.8,
    distanceToFireHydrant: 264.052744,
    distanceToFireStation: 0.79,
    yearBuilt: 1998,
    constructionType: 'MASONRY',
    residenceType: 'SINGLE FAMILY',
    windMitigation: {
      _id: '5d6ea456318af70012227bca',
      roofToWallConnection: 'Other',
      roofDeckAttachment: 'Other',
      windBorneDebrisRegion: 'Yes',
      secondaryWaterResistance: 'Other',
      openingProtection: 'Other',
      floridaBuildingCodeWindSpeed: 130,
      terrain: 'B',
      roofCovering: 'Other',
      roofGeometry: 'Other',
      floridaBuildingCodeWindSpeedDesign: 130,
      internalPressureDesign: 'Other'
    },
    poolfence: null,
    birdcage: null,
    FEMAfloodZone: 'X',
    relativeElevation: 99,
    relativeElevation1: null,
    relativeElevation2: null,
    diffToBaseFloodElevation: null
  },
  rating: {
    windMitigationDiscount: 0,
    _id: '5d6ea464318af70012227be8',
    engineCode: 'HO3ByPeril',
    rateCode: 201704,
    netPremium: 2640,
    totalFees: 27,
    totalPremium: 2667,
    worksheet: {
      elements: {
        baseRates: {
          fire: 309.05,
          water: 516.56,
          liability: 56.96,
          allOtherPerils: 153.35,
          sinkhole: 7.47,
          hurricane: 613.41,
          otherWind: 22.98
        },
        territoryFactors: {
          code: '715-51',
          name: 'Sarasota,Remainder',
          group: 3,
          minPremium: 0.002,
          fire: 0.205,
          water: 0.205,
          liability: 0.203,
          allOtherPerils: 0.205,
          sinkhole: 1.598,
          hurricane: 1.43,
          otherWind: 1.43
        },
        coverageAFactors: {
          fire: 2.328,
          water: 2.328,
          liability: 1,
          allOtherPerils: 2.328,
          sinkhole: 2.328,
          hurricane: 2.328,
          otherWind: 2.328
        },
        coverageBFactors: {
          fire: 0.97,
          water: 0.97,
          liability: 1,
          allOtherPerils: 0.97,
          sinkhole: 0.97,
          hurricane: 0.97,
          otherWind: 0.97
        },
        coverageCFactors: {
          fire: 0.925,
          water: 0.925,
          liability: 1,
          allOtherPerils: 0.925,
          sinkhole: 0.925,
          hurricane: 0.85,
          otherWind: 0.925
        },
        replacementCostFactors: {
          replacementCost: true,
          fire: 1.125,
          water: 1.125,
          liability: 1,
          allOtherPerils: 1.125,
          sinkhole: 1.125,
          hurricane: 1.125,
          otherWind: 1.125
        },
        ordinanceOrLawFactors: {
          ordinanceOrLaw: false,
          fire: 1,
          water: 1,
          liability: 1,
          allOtherPerils: 1,
          sinkhole: 1,
          hurricane: 1,
          otherWind: 1
        },
        protectionClassFactors: {
          protectionClass: 3,
          constructionType: 'Masonry',
          constructionCode: 'M',
          fire: 0.852,
          water: 0.852,
          liability: 1,
          allOtherPerils: 0.852,
          sinkhole: 0.852,
          hurricane: 0.817,
          otherWind: 0.817
        },
        ageOfHomeFactors: {
          ageOfHome: 21,
          fire: 2.496,
          water: 2.496,
          liability: 2.496,
          allOtherPerils: 2.496,
          sinkhole: 2.496
        },
        ageOfHomeByYearFactors: {
          yearBuilt: 1998,
          hurricane: 1.04,
          otherWind: 1.04
        },
        townRowHouseFactors: {
          protectionClass: 3,
          units: '1-2',
          fire: 1,
          water: 1,
          liability: 1,
          allOtherPerils: 1,
          sinkhole: 1,
          hurricane: 1,
          otherWind: 1
        },
        burglarAlarmFactors: {
          burglarAlarm: false,
          fire: 1,
          water: 1,
          liability: 1,
          allOtherPerils: 1,
          sinkhole: 1,
          hurricane: 1,
          otherWind: 1
        },
        fireAlarmAndSprinklerFactors: {
          sprinkler: 'N',
          fireAlarm: false,
          fire: 1,
          water: 1,
          liability: 1,
          allOtherPerils: 1,
          sinkhole: 1,
          hurricane: 1,
          otherWind: 1
        },
        seasonalFactors: {
          seasonal: false,
          fire: 1,
          water: 1,
          liability: 1,
          allOtherPerils: 1,
          sinkhole: 1,
          hurricane: 1,
          otherWind: 1
        },
        noPriorInsuranceFactors: {
          noPriorInsurance: false,
          fire: 1,
          water: 1,
          liability: 1,
          allOtherPerils: 1,
          sinkhole: 1,
          hurricane: 1,
          otherWind: 1
        },
        deductibleFactors: {
          exWind: false,
          hurricaneDeductible: 2,
          allOtherPerilsDeductible: 1000,
          fire: 1,
          water: 1,
          liability: 1,
          allOtherPerils: 1,
          sinkhole: 1,
          hurricane: 1,
          otherWind: 1
        },
        bcegFactors: {
          grade: 3,
          territoryGroup: 3,
          fire: 1,
          water: 1,
          liability: 1,
          allOtherPerils: 1,
          sinkhole: 1,
          hurricane: 0.911,
          otherWind: 0.911
        },
        windMitigationFactors: {
          fire: 1,
          water: 1,
          liability: 1,
          allOtherPerils: 1,
          sinkhole: 1,
          hurricane: 1,
          otherWind: 1,
          windMitigationDiscount: 0
        }
      },
      perilPremiums: {
        fire: 317,
        water: 529,
        liability: 29,
        allOtherPerils: 157,
        sinkhole: 60,
        hurricane: 1466,
        otherWind: 60
      },
      perilPremiumsSum: 2618,
      additionalCoverages: {
        otherStructIncLimits: 0,
        propertyIncidentalOccupancies: 0,
        liabilityIncidentalOccupancies: 0,
        increasedPersonalLiabilityLimit: 22,
        increasedPropertyMoldFungiLimit: 0,
        increasedLiabilityMoldFungiLimit: 0
      },
      additionalCoveragesSum: 22,
      subtotalPremium: 2640,
      minimumPremiumAdjustment: 0,
      netPremium: 2640,
      fees: {
        empTrustFee: 2,
        mgaPolicyFee: 25,
        fhcfFee: 0,
        figaFee: 0,
        citizensFee: 0
      },
      totalFees: 27,
      totalPremium: 2667,
      bcegAdjustment: -149
    }
  },
  sourceNumber: '12-5179239-01',
  state: 'FL',
  status: 'Policy Issued',
  transactionType: 'AI Addition',
  underwritingAnswers: {
    previousClaims: {
      question: 'When was the last claim filed?',
      answer: 'No claims ever filed'
    },
    business: {
      question: 'Is a business conducted on the property?',
      answer: 'No'
    },
    fourPointUpdates: {
      question:
        'Have the wiring, plumbing, and HVAC been updated in the last 35 years?',
      answer: 'Yes',
      source: 'Default'
    },
    noPriorInsuranceSurcharge: {
      question: 'If not new purchase, please provide proof of prior insurance.',
      answer: 'No',
      source: 'Default'
    },
    rented: {
      question: 'Is the home or any structures on the property ever rented?',
      answer: 'Never'
    },
    monthsOccupied: {
      question: 'How many months a year does the owner live in the home?',
      answer: '10+'
    }
  },
  updatedBy: {
    _id: '5d6ea85fbe46880012775d4a',
    userId: 'auth0|5cace111965e901112a8515b',
    userName: 'af3beta'
  },
  nextActionNeeded: 'Create Dec Page',
  nextActionDate: '2019-09-03T17:52:31.111Z',
  nextActionCancelType: null,
  nextActionPolicyNumber: '12-1019690-01',
  nextStatusActionNeeded: 'Set to In Force',
  nextStatusActionDate: '2019-10-03T04:00:00.000Z',
  shouldUpdatePaymentPlan: true,
  updatedAt: '2019-09-03T17:52:31.042Z',
  policyID: '5d6ea85fbe46880012775d26',
  summaryLedger: {
    status: {
      code: 6,
      displayText: 'Payment Invoice Issued'
    },
    invoice: {
      annual: {
        amount: 2667,
        dueDate: '2019-10-03T04:00:00.000Z',
        invoiceDate: '2019-08-19T04:00:00.000Z'
      }
    },
    _id: '5d6ea8609eb6120011199c78',
    balance: {
      $numberDecimal: '2667.00'
    },
    billPlan: 'Annual',
    billToId: '5d6ea460f397660012f9e1c6',
    billToType: 'Policyholder',
    cashNeeded: {
      $numberDecimal: '2667.00'
    },
    cashReceived: {
      $numberDecimal: '0.00'
    },
    companyCode: 'TTIC',
    currentPremium: 2667,
    effectiveDate: '2019-10-03T04:00:00.000Z',
    equityDate: '2019-10-03T04:00:00.000Z',
    fullyEarnedFees: 27,
    initialPremium: 2667,
    invoiceDate: '2019-09-03T04:00:00.000Z',
    invoiceDueDate: '2019-10-03T04:00:00.000Z',
    nonPaymentNoticeDate: '2019-10-13T04:00:00.000Z',
    nonPaymentNoticeDueDate: '2019-11-02T04:00:00.000Z',
    noticeAmountDue: {
      $numberDecimal: '2667.00'
    },
    paymentPlanFees: 0,
    policyAccountCode: 10000,
    policyNumber: '12-1019690-01',
    policyTerm: 1,
    product: 'HO3',
    refundWriteOffDate: null,
    state: 'FL',
    sumOfEndorsements: 0,
    nextActionDate: '2019-09-03T17:52:32.197Z',
    createdAt: '2019-09-03T17:52:32.197Z',
    createdBy: {
      _id: '5d6ea8609eb6120011199c79',
      userId: 'auth0|RUNNERCSR|0',
      userName: 'RUNNERCSR'
    },
    updatedAt: '2019-09-03T17:52:32.197Z',
    updatedBy: {
      _id: '5d6ea8609eb6120011199c7a',
      userId: 'auth0|RUNNERCSR|0',
      userName: 'RUNNERCSR'
    },
    __v: 0
  },
  cancel: {
    equityDate: '10/03/2019',
    effectiveDate: '2019-10-03'
  }
};

export const mockCancelledPolicy = {
  issueDate: '2019-09-03T17:36:03.555Z',
  policyNumber: '12-1019690-01',
  __v: 0,
  additionalInterests: [
    {
      name2: '',
      active: false,
      _id: '5d6ea76fbe46880012775c99',
      type: 'Premium Finance',
      order: null,
      name1: 'P1 FINANCE COMPANY',
      mailingAddress: {
        _id: '5d6ea76fbe46880012775c9a',
        country: {
          _id: '5d6ea76fbe46880012775c9b',
          code: 'USA',
          displayText: 'United States of America'
        },
        address1: 'PO BOX 924438',
        city: 'NORCROSS',
        state: 'GA',
        zip: '30010'
      }
    },
    {
      name2: 'Bert',
      active: false,
      _id: '5d6ea7857969440012939d38',
      type: 'Bill Payer',
      order: null,
      name1: 'Q',
      phoneNumber: '8133856080',
      mailingAddress: {
        _id: '5d6ea7857969440012939d39',
        country: {
          _id: '5d6ea7857969440012939d3a',
          code: 'USA',
          displayText: 'United States of America'
        },
        address1: '5300 W Cypress St., Suite 100',
        city: 'Tampa',
        state: 'FL',
        zip: '33607'
      }
    },
    {
      name2: '',
      active: true,
      _id: '5d6ea85fbe46880012775d27',
      type: 'Premium Finance',
      order: 0,
      name1: 'P1 FINANCE COMPANY',
      mailingAddress: {
        _id: '5d6ea85fbe46880012775d28',
        country: {
          _id: '5d6ea85fbe46880012775d29',
          code: 'USA',
          displayText: 'United States of America'
        },
        address1: 'PO BOX 924438',
        city: 'NORCROSS',
        state: 'GA',
        zip: '30010'
      }
    }
  ],
  agencyCode: 20000,
  agentCode: 60000,
  billPlan: 'Annual',
  billToId: '5d6ea460f397660012f9e1c6',
  billToType: 'Policyholder',
  cancelDate: null,
  cancelReason: null,
  companyCode: 'TTIC',
  cost: {
    totalCost: 125,
    worksheet: {
      inputFields: {
        version: '201801',
        currentYear: '2018',
        zip: '00001',
        companyCode: 'TTIC',
        state: 'FL',
        product: 'HO3',
        coverageA: 314000,
        coverageB: 6280,
        coverageC: 78500,
        coverageD: 31400,
        hurricaneDeductible: 2,
        aopDeductible: 1000,
        sinkholeDeductible: 10,
        replacementCost: true,
        yearBuilt: 1998,
        roofGeometry: 'Other',
        openingProtection: 'C',
        constructionType: 'M'
      },
      lookupFields: {
        hurricaneDeductibleFactor: 1,
        hurricaneYearBuiltFactor: 0.516541,
        hurricaneRoofShapeFactor: 1,
        hurricaneOpeningProtectionFactor: 1,
        hurricaneConstructionTypeFactor: 1,
        hurricaneRetentionMult: 1.463338,
        nonCatConstructionLossCost: 0,
        claimCost: 1500,
        baseCost: 125,
        minCoverageA: 150000,
        maxCoverageA: 750000,
        baseCoverageA: 250000
      },
      calculatedFields: {
        hurricaneTEFactor: 430.18,
        coverageAFactor: 1.064,
        nonCatExp: 0,
        catExp: 0,
        retentionExp: 0,
        adminExp: 125
      }
    }
  },
  coverageLimits: {
    dwelling: {
      value: 314000,
      name: 'dwelling',
      required: true,
      amount: 314000,
      letterDesignation: 'A',
      maxAmount: 408000,
      minAmount: 283000,
      initialValue: 314000,
      displayText: 'Dwelling',
      root: true,
      format: 'Currency',
      inflationFactor: 1.04,
      endorsementType: 'Coverage Endorsement'
    },
    moldLiability: {
      value: 50000,
      name: 'moldLiability',
      required: true,
      amount: 50000,
      initialValue: 50000,
      displayText: 'Mold Liability',
      format: 'Currency',
      endorsementType: 'Coverage Endorsement'
    },
    medicalPayments: {
      value: 2000,
      name: 'medicalPayments',
      required: true,
      amount: 2000,
      letterDesignation: 'F',
      initialValue: 2000,
      displayText: 'Medical Payments',
      format: 'Currency'
    },
    lossOfUse: {
      value: 10,
      name: 'lossOfUse',
      required: true,
      amount: 31400,
      letterDesignation: 'D',
      initialValue: 10,
      displayText: 'Loss of Use',
      format: 'Percentage',
      ofCoverageLimit: 'dwelling'
    },
    otherStructures: {
      value: 2,
      name: 'otherStructures',
      required: true,
      amount: 6280,
      letterDesignation: 'B',
      initialValue: 2,
      displayText: 'Other Structures',
      format: 'Currency',
      endorsementType: 'Coverage Endorsement'
    },
    moldProperty: {
      value: 10000,
      name: 'moldProperty',
      required: true,
      amount: 10000,
      initialValue: 10000,
      displayText: 'Mold Property',
      format: 'Currency',
      endorsementType: 'Coverage Endorsement'
    },
    ordinanceOrLaw: {
      value: 25,
      name: 'ordinanceOrLaw',
      required: true,
      amount: 25,
      initialValue: 25,
      displayText: 'Ordinance or Law',
      format: 'Percentage',
      ofCoverageLimit: 'dwelling',
      calculatedAmount: 78500,
      endorsementType: 'Coverage Endorsement'
    },
    personalLiability: {
      value: 300000,
      name: 'personalLiability',
      required: true,
      amount: 300000,
      letterDesignation: 'E',
      initialValue: 300000,
      displayText: 'Personal Liability',
      format: 'Currency',
      endorsementType: 'Coverage Endorsement'
    },
    personalProperty: {
      value: 25,
      name: 'personalProperty',
      required: true,
      amount: 78500,
      letterDesignation: 'C',
      initialValue: 25,
      displayText: 'Personal Property',
      format: 'Currency',
      endorsementType: 'Coverage Endorsement'
    }
  },
  coverageOptions: {
    sinkholePerilCoverage: {
      answer: true,
      name: 'sinkholePerilCoverage',
      displayText: 'Sinkhole Peril Coverage',
      default: true,
      endorsementType: 'Deductible Endorsement'
    },
    propertyIncidentalOccupanciesOtherStructures: {
      answer: false,
      name: 'propertyIncidentalOccupanciesOtherStructures',
      displayText: 'Property Permitted Incidental Occupancies Other Structures',
      default: false,
      endorsementType: 'Coverage Endorsement'
    },
    personalPropertyReplacementCost: {
      answer: true,
      name: 'personalPropertyReplacementCost',
      displayText: 'Personal Property Replacement Cost',
      default: true,
      endorsementType: 'Coverage Endorsement'
    },
    propertyIncidentalOccupanciesMainDwelling: {
      answer: false,
      name: 'propertyIncidentalOccupanciesMainDwelling',
      displayText: 'Property Permitted Incidental Occupancies Main Dwelling',
      default: false,
      endorsementType: 'Coverage Endorsement'
    },
    liabilityIncidentalOccupancies: {
      answer: false,
      name: 'liabilityIncidentalOccupancies',
      displayText: 'Liability Permitted Incidental Occupancies',
      default: false
    }
  },
  createdAt: '2019-09-03T17:36:03.597Z',
  createdBy: {
    _id: '5d6ea483be46880012775c4e',
    userId: 'auth0|59419e3a43e76f16f68c3349',
    userName: 'tticcsr'
  },
  deductibles: {
    hurricane: {
      value: 2,
      name: 'hurricane',
      required: true,
      amount: 2,
      displayText: 'Hurricane',
      initialValue: 2,
      format: 'Currency',
      calculatedAmount: 6280,
      endorsementType: 'Deductible Endorsement'
    },
    allOtherPerils: {
      value: 1000,
      name: 'allOtherPerils',
      required: true,
      amount: 1000,
      displayText: 'All Other Perils',
      initialValue: 1000,
      format: 'Currency',
      endorsementType: 'Deductible Endorsement'
    },
    sinkhole: {
      value: 10,
      name: 'sinkhole',
      required: true,
      amount: 10,
      displayText: 'Sinkhole',
      initialValue: 10,
      format: 'Percentage',
      ofCoverageLimit: 'dwelling',
      calculatedAmount: 31400,
      endorsementType: 'Deductible Endorsement'
    }
  },
  editHash: 'e431e8d49ddccc08cd86c02cd8c3fa2fd9eb5631823e11cadcd7a3fe78ebe3b9',
  effectiveDate: '2019-10-03T04:00:00.000Z',
  endDate: '2020-10-03T04:00:00.000Z',
  policyAccountCode: 10000,
  policyHolderMailingAddress: {
    _id: '5d6ea483be46880012775c62',
    careOf: '',
    address1: '4131 TEST ADDRESS',
    city: 'SARASOTA',
    state: 'FL',
    zip: '00001',
    country: {
      _id: '5d6ea468f397660012f9e1e1',
      code: 'USA',
      displayText: 'United States of America'
    }
  },
  policyHolders: [
    {
      electronicDelivery: false,
      _id: '5d6ea460f397660012f9e1c6',
      order: 0,
      entityType: 'Person',
      firstName: 'Oberyn',
      lastName: 'Martell',
      primaryPhoneNumber: '1234567890',
      emailAddress: 'TheViper@gmail.com'
    }
  ],
  policyTerm: 1,
  policyVersion: 7,
  product: 'HO3',
  property: {
    townhouseRowhouse: false,
    pool: false,
    poolSecured: false,
    divingBoard: false,
    trampoline: false,
    fireAlarm: false,
    burglarAlarm: false,
    sprinkler: 'N',
    gatedCommunity: false,
    baseFloodElevation: null,
    _id: '5d6ea456318af70012227bc8',
    id: '12000000000000001',
    physicalAddress: {
      _id: '5d6ea456318af70012227bc9',
      address1: '4131 TEST ADDRESS',
      address2: '',
      city: 'SARASOTA',
      state: 'FL',
      zip: '00001',
      county: 'SARASOTA',
      latitude: 27.27967,
      longitude: -82.47786
    },
    coverageLimits: {
      dwelling: {
        format: 'Currency',
        amount: '314000',
        displayText: 'Dwelling'
      }
    },
    source: 'CasaClue',
    territory: '715-51',
    protectionClass: 3,
    buildingCodeEffectivenessGrading: 3,
    familyUnits: '1-2',
    squareFeet: 2640,
    yearOfRoof: null,
    timezone: 'AMERICA/NEW_YORK',
    floodZone: 'X',
    distanceToTidalWater: 17740.8,
    distanceToFireHydrant: 264.052744,
    distanceToFireStation: 0.79,
    yearBuilt: 1998,
    constructionType: 'MASONRY',
    residenceType: 'SINGLE FAMILY',
    windMitigation: {
      _id: '5d6ea456318af70012227bca',
      roofToWallConnection: 'Other',
      roofDeckAttachment: 'Other',
      windBorneDebrisRegion: 'Yes',
      secondaryWaterResistance: 'Other',
      openingProtection: 'Other',
      floridaBuildingCodeWindSpeed: 130,
      terrain: 'B',
      roofCovering: 'Other',
      roofGeometry: 'Other',
      floridaBuildingCodeWindSpeedDesign: 130,
      internalPressureDesign: 'Other'
    },
    poolfence: null,
    birdcage: null,
    FEMAfloodZone: 'X',
    relativeElevation: 99,
    relativeElevation1: null,
    relativeElevation2: null,
    diffToBaseFloodElevation: null
  },
  rating: {
    windMitigationDiscount: 0,
    _id: '5d6ea464318af70012227be8',
    engineCode: 'HO3ByPeril',
    rateCode: 201704,
    netPremium: 2640,
    totalFees: 27,
    totalPremium: 2667,
    worksheet: {
      elements: {
        baseRates: {
          fire: 309.05,
          water: 516.56,
          liability: 56.96,
          allOtherPerils: 153.35,
          sinkhole: 7.47,
          hurricane: 613.41,
          otherWind: 22.98
        },
        territoryFactors: {
          code: '715-51',
          name: 'Sarasota,Remainder',
          group: 3,
          minPremium: 0.002,
          fire: 0.205,
          water: 0.205,
          liability: 0.203,
          allOtherPerils: 0.205,
          sinkhole: 1.598,
          hurricane: 1.43,
          otherWind: 1.43
        },
        coverageAFactors: {
          fire: 2.328,
          water: 2.328,
          liability: 1,
          allOtherPerils: 2.328,
          sinkhole: 2.328,
          hurricane: 2.328,
          otherWind: 2.328
        },
        coverageBFactors: {
          fire: 0.97,
          water: 0.97,
          liability: 1,
          allOtherPerils: 0.97,
          sinkhole: 0.97,
          hurricane: 0.97,
          otherWind: 0.97
        },
        coverageCFactors: {
          fire: 0.925,
          water: 0.925,
          liability: 1,
          allOtherPerils: 0.925,
          sinkhole: 0.925,
          hurricane: 0.85,
          otherWind: 0.925
        },
        replacementCostFactors: {
          replacementCost: true,
          fire: 1.125,
          water: 1.125,
          liability: 1,
          allOtherPerils: 1.125,
          sinkhole: 1.125,
          hurricane: 1.125,
          otherWind: 1.125
        },
        ordinanceOrLawFactors: {
          ordinanceOrLaw: false,
          fire: 1,
          water: 1,
          liability: 1,
          allOtherPerils: 1,
          sinkhole: 1,
          hurricane: 1,
          otherWind: 1
        },
        protectionClassFactors: {
          protectionClass: 3,
          constructionType: 'Masonry',
          constructionCode: 'M',
          fire: 0.852,
          water: 0.852,
          liability: 1,
          allOtherPerils: 0.852,
          sinkhole: 0.852,
          hurricane: 0.817,
          otherWind: 0.817
        },
        ageOfHomeFactors: {
          ageOfHome: 21,
          fire: 2.496,
          water: 2.496,
          liability: 2.496,
          allOtherPerils: 2.496,
          sinkhole: 2.496
        },
        ageOfHomeByYearFactors: {
          yearBuilt: 1998,
          hurricane: 1.04,
          otherWind: 1.04
        },
        townRowHouseFactors: {
          protectionClass: 3,
          units: '1-2',
          fire: 1,
          water: 1,
          liability: 1,
          allOtherPerils: 1,
          sinkhole: 1,
          hurricane: 1,
          otherWind: 1
        },
        burglarAlarmFactors: {
          burglarAlarm: false,
          fire: 1,
          water: 1,
          liability: 1,
          allOtherPerils: 1,
          sinkhole: 1,
          hurricane: 1,
          otherWind: 1
        },
        fireAlarmAndSprinklerFactors: {
          sprinkler: 'N',
          fireAlarm: false,
          fire: 1,
          water: 1,
          liability: 1,
          allOtherPerils: 1,
          sinkhole: 1,
          hurricane: 1,
          otherWind: 1
        },
        seasonalFactors: {
          seasonal: false,
          fire: 1,
          water: 1,
          liability: 1,
          allOtherPerils: 1,
          sinkhole: 1,
          hurricane: 1,
          otherWind: 1
        },
        noPriorInsuranceFactors: {
          noPriorInsurance: false,
          fire: 1,
          water: 1,
          liability: 1,
          allOtherPerils: 1,
          sinkhole: 1,
          hurricane: 1,
          otherWind: 1
        },
        deductibleFactors: {
          exWind: false,
          hurricaneDeductible: 2,
          allOtherPerilsDeductible: 1000,
          fire: 1,
          water: 1,
          liability: 1,
          allOtherPerils: 1,
          sinkhole: 1,
          hurricane: 1,
          otherWind: 1
        },
        bcegFactors: {
          grade: 3,
          territoryGroup: 3,
          fire: 1,
          water: 1,
          liability: 1,
          allOtherPerils: 1,
          sinkhole: 1,
          hurricane: 0.911,
          otherWind: 0.911
        },
        windMitigationFactors: {
          fire: 1,
          water: 1,
          liability: 1,
          allOtherPerils: 1,
          sinkhole: 1,
          hurricane: 1,
          otherWind: 1,
          windMitigationDiscount: 0
        }
      },
      perilPremiums: {
        fire: 317,
        water: 529,
        liability: 29,
        allOtherPerils: 157,
        sinkhole: 60,
        hurricane: 1466,
        otherWind: 60
      },
      perilPremiumsSum: 2618,
      additionalCoverages: {
        otherStructIncLimits: 0,
        propertyIncidentalOccupancies: 0,
        liabilityIncidentalOccupancies: 0,
        increasedPersonalLiabilityLimit: 22,
        increasedPropertyMoldFungiLimit: 0,
        increasedLiabilityMoldFungiLimit: 0
      },
      additionalCoveragesSum: 22,
      subtotalPremium: 2640,
      minimumPremiumAdjustment: 0,
      netPremium: 2640,
      fees: {
        empTrustFee: 2,
        mgaPolicyFee: 25,
        fhcfFee: 0,
        figaFee: 0,
        citizensFee: 0
      },
      totalFees: 27,
      totalPremium: 2667,
      bcegAdjustment: -149
    }
  },
  sourceNumber: '12-5179239-01',
  state: 'FL',
  status: 'Cancelled',
  transactionType: 'AI Addition',
  underwritingAnswers: {
    previousClaims: {
      question: 'When was the last claim filed?',
      answer: 'No claims ever filed'
    },
    business: {
      question: 'Is a business conducted on the property?',
      answer: 'No'
    },
    fourPointUpdates: {
      question:
        'Have the wiring, plumbing, and HVAC been updated in the last 35 years?',
      answer: 'Yes',
      source: 'Default'
    },
    noPriorInsuranceSurcharge: {
      question: 'If not new purchase, please provide proof of prior insurance.',
      answer: 'No',
      source: 'Default'
    },
    rented: {
      question: 'Is the home or any structures on the property ever rented?',
      answer: 'Never'
    },
    monthsOccupied: {
      question: 'How many months a year does the owner live in the home?',
      answer: '10+'
    }
  },
  updatedBy: {
    _id: '5d6ea85fbe46880012775d4a',
    userId: 'auth0|5cace111965e901112a8515b',
    userName: 'af3beta'
  },
  nextActionNeeded: 'Create Dec Page',
  nextActionDate: '2019-09-03T17:52:31.111Z',
  nextActionCancelType: null,
  nextActionPolicyNumber: '12-1019690-01',
  nextStatusActionNeeded: 'Set to In Force',
  nextStatusActionDate: '2019-10-03T04:00:00.000Z',
  shouldUpdatePaymentPlan: true,
  updatedAt: '2019-09-03T17:52:31.042Z',
  policyID: '5d6ea85fbe46880012775d26',
  summaryLedger: {
    status: {
      code: 6,
      displayText: 'Voluntary Cancellation'
    },
    invoice: {
      annual: {
        amount: 2667,
        dueDate: '2019-10-03T04:00:00.000Z',
        invoiceDate: '2019-08-19T04:00:00.000Z'
      }
    },
    _id: '5d6ea8609eb6120011199c78',
    balance: {
      $numberDecimal: '2667.00'
    },
    billPlan: 'Annual',
    billToId: '5d6ea460f397660012f9e1c6',
    billToType: 'Policyholder',
    cashNeeded: {
      $numberDecimal: '2667.00'
    },
    cashReceived: {
      $numberDecimal: '0.00'
    },
    companyCode: 'TTIC',
    currentPremium: 2667,
    effectiveDate: '2019-10-03T04:00:00.000Z',
    equityDate: '2019-10-03T04:00:00.000Z',
    fullyEarnedFees: 27,
    initialPremium: 2667,
    invoiceDate: '2019-09-03T04:00:00.000Z',
    invoiceDueDate: '2019-10-03T04:00:00.000Z',
    nonPaymentNoticeDate: '2019-10-13T04:00:00.000Z',
    nonPaymentNoticeDueDate: '2019-11-02T04:00:00.000Z',
    noticeAmountDue: {
      $numberDecimal: '2667.00'
    },
    paymentPlanFees: 0,
    policyAccountCode: 10000,
    policyNumber: '12-1019690-01',
    policyTerm: 1,
    product: 'HO3',
    refundWriteOffDate: null,
    state: 'FL',
    sumOfEndorsements: 0,
    nextActionDate: '2019-09-03T17:52:32.197Z',
    createdAt: '2019-09-03T17:52:32.197Z',
    createdBy: {
      _id: '5d6ea8609eb6120011199c79',
      userId: 'auth0|RUNNERCSR|0',
      userName: 'RUNNERCSR'
    },
    updatedAt: '2019-09-03T17:52:32.197Z',
    updatedBy: {
      _id: '5d6ea8609eb6120011199c7a',
      userId: 'auth0|RUNNERCSR|0',
      userName: 'RUNNERCSR'
    },
    __v: 0
  },
  cancel: {
    equityDate: '10/03/2019',
    effectiveDate: '2019-10-03'
  }
};
