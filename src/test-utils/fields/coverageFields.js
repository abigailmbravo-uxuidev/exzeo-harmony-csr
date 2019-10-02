export const producedByFields = [
  {
    dataTest: 'effectiveDate',
    type: 'text',
    required: true,
    label: 'Effective Date',
    value: '2019-07-01'
  },
  {
    dataTest: 'agencyCode',
    type: 'typeahead',
    label: 'Agency',
    placeholder: 'Start typing to search',
    values: ['0', '20000', '20093']
  },
  {
    dataTest: 'agentCode',
    type: 'typeahead',
    disabled: true,
    label: 'Agent',
    values: ['0', '60092']
  }
];

export const primaryPolicyholderFields = [
  {
    dataTest: 'policyHolders[0].firstName',
    type: 'text',
    required: true,
    label: 'First Name',
    value: 'Bruce'
  },
  {
    dataTest: 'policyHolders[0].lastName',
    type: 'text',
    required: true,
    label: 'Last Name',
    value: 'Wayne'
  },
  {
    dataTest: 'policyHolders[0].primaryPhoneNumber',
    type: 'phone',
    required: true,
    label: 'Primary Phone',
    value: '(999) 888-1231'
  },
  {
    dataTest: 'policyHolders[0].secondaryPhoneNumber',
    type: 'phone',
    label: 'Secondary Phone',
    value: '(123) 456-7890'
  },
  {
    dataTest: 'policyHolders[0].emailAddress',
    type: 'email',
    required: true,
    label: 'Email Address',
    value: 'batman@gmail.gov'
  }
];

export const secondaryPolicyholderFields = [
  {
    dataTest: 'policyHolders[1].firstName',
    type: 'text',
    label: 'First Name',
    value: 'Dick'
  },
  {
    dataTest: 'policyHolders[1].lastName',
    type: 'text',
    label: 'Last Name',
    value: 'Grayson'
  },
  {
    dataTest: 'policyHolders[1].primaryPhoneNumber',
    type: 'phone',
    label: 'Primary Phone',
    value: '(444) 444-4321'
  },
  {
    dataTest: 'policyHolders[1].secondaryPhoneNumber',
    type: 'phone',
    label: 'Secondary Phone',
    value: '(888) 567-1234'
  },
  {
    dataTest: 'policyHolders[1].emailAddress',
    type: 'text',
    label: 'Email Address',
    value: 'Robin@hotmail.notascam.rus'
  }
];

export const propertyFields = [
  {
    dataTest: 'property.physicalAddress.address1',
    type: 'text',
    disabled: true,
    required: true,
    label: 'Address 1',
    text: 'Address 1',
    value: '1234 Test Address 1'
  },
  {
    dataTest: 'property.physicalAddress.address2',
    type: 'text',
    disabled: true,
    required: false,
    label: 'Address 2',
    text: 'Address 2',
    value: '1234 Test Address 2'
  },
  {
    dataTest: 'property.physicalAddress.city',
    type: 'text',
    disabled: true,
    required: true,
    label: 'City',
    text: 'City',
    value: 'Paradise City'
  },
  {
    dataTest: 'property.physicalAddress.state',
    type: 'text',
    disabled: true,
    required: true,
    label: 'State',
    text: 'State',
    value: 'PA'
  },
  {
    dataTest: 'property.physicalAddress.zip',
    type: 'text',
    disabled: true,
    required: true,
    label: 'Zip',
    text: 'Zip',
    value: '97531'
  }
];

export const homeAndLocationFields = [
  {
    dataTest: 'property.yearBuilt',
    type: 'text',
    disabled: true,
    label: 'Year Home Built'
  },
  {
    dataTest: 'property.protectionClass',
    type: 'select',
    label: 'Protection Class'
  },
  {
    dataTest: 'property.distanceToTidalWater',
    type: 'text',
    disabled: true,
    label: 'Tidal Waters Dist.'
  },
  {
    dataTest: 'property.residenceType',
    type: 'select',
    disabled: true,
    label: 'Residence Type'
  },
  {
    dataTest: 'property.constructionType',
    type: 'select',
    label: 'Construction'
  },
  {
    dataTest: 'property.buildingCodeEffectivenessGrading',
    type: 'select',
    disabled: true,
    label: 'BCEG'
  },
  {
    dataTest: 'property.distanceToFireHydrant',
    type: 'text',
    disabled: true,
    label: 'Fire Hydrant Dist.'
  },
  {
    dataTest: 'property.squareFeet',
    type: 'text',
    disabled: true,
    label: 'Sq. Ft. of Home'
  },
  {
    dataTest: 'property.yearOfRoof',
    type: 'text',
    disabled: true,
    label: 'Year Roof Built'
  },
  {
    dataTest: 'property.familyUnits',
    type: 'select',
    disabled: true,
    label: 'Family Units'
  },
  {
    dataTest: 'property.distanceToFireStation',
    type: 'text',
    disabled: true,
    label: 'Fire Station Dist.'
  },
  {
    dataTest: 'property.floodZone',
    type: 'select',
    disabled: true,
    label: 'Flood Zone'
  },
  {
    dataTest: 'property.id',
    type: 'text',
    disabled: true,
    label: 'IGD ID'
  }
];

export const coverageFields = [
  {
    dataTest: 'coverageLimits.dwelling.value',
    type: 'text',
    required: true,
    label: /Dwelling Limit/,
    value: '$ 300,000'
  },
  {
    dataTest: 'coverageLimits.otherStructures.value',
    type: 'select',
    required: true,
    values: [
      { value: '0', label: '0%' },
      { value: '2', label: '2%' },
      { value: '5', label: '5%' }
    ],
    label: 'Percentage',
    output: {
      label: 'Other Structures Limit',
      value: '$ 0'
    }
  },
  {
    dataTest: 'coverageLimits.personalProperty.value',
    type: 'select',
    values: [
      { value: '0', label: '0%' },
      { value: '25', label: '25%' },
      { value: '35', label: '35%' }
    ],
    label: 'Percentage',
    output: {
      label: 'Personal Property Limit',
      value: '$ 0'
    }
  },
  {
    dataTest: 'coverageLimits.lossOfUse.value',
    label: 'Loss of Use Limit'
  },
  {
    dataTest: 'coverageLimits.personalLiability.value',
    type: 'select',
    values: [
      { value: '100000', label: '$ 100,000' },
      { value: '300000', label: '$ 300,000' }
    ],
    label: 'Personal Liability Limit'
  },
  {
    dataTest: 'coverageLimits.medicalPayments.value',
    label: 'Medical Payments to Others Limit'
  }
];

export const otherCoveragesFields = [
  {
    dataTest: 'coverageLimits.moldProperty.value',
    type: 'select',
    values: [
      { value: '10000', label: '$ 10,000' },
      { value: '25000', label: '$ 25,000' }
    ],
    label: 'Mold Property'
  },
  {
    dataTest: 'coverageLimits.moldLiability.value',
    type: 'select',
    values: [
      { value: '50000', label: '$ 50,000' },
      { value: '100000', label: '$ 100,000' }
    ],
    label: 'Mold Liability Limit'
  },
  {
    dataTest: 'coverageOptions.personalPropertyReplacementCost.answer',
    label: 'Personal Property Replacement Cost'
  },
  {
    dataTest: 'coverageLimits.ordinanceOrLaw.value',
    type: 'select',
    values: [
      { value: '25', label: '25% of Dwelling Limit' },
      { value: '50', label: '50% of Dwelling Limit' }
    ],
    label: 'Ordinance or Law Coverage Limit'
  }
];

export const deductiblesFields = [
  {
    dataTest: 'deductibles.allOtherPerils.value',
    type: 'select',
    values: [
      { value: '500', label: '$ 500' },
      { value: '1000', label: '$ 1,000' }
    ],
    label: 'All Other Perils'
  },
  {
    dataTest: 'deductibles.hurricane.value',
    type: 'select',
    values: [
      { value: '2', label: '2% of Dwelling Limit' },
      { value: '5', label: '5% of Dwelling Limit' }
    ],
    label: 'Hurricane Deductible',
    output: {
      label: 'Calculated Hurricane',
      value: '$ 0'
    }
  },
  {
    dataTest: 'coverageOptions.sinkholePerilCoverage.answer',
    type: 'select',
    values: [
      { value: 'true', label: '10% of Dwelling Limit' },
      { value: 'false', label: 'Coverage Excluded' }
    ],
    label: 'Sinkhole',
    output: {
      label: 'Calculated Sinkhole',
      value: '$ 0'
    }
  }
];

export const discountsFields = [
  {
    dataTest: 'property.burglarAlarm',
    type: 'radio',
    values: ['false', 'true'],
    label: 'Burglar Alarm',
    format: str => (str === 'false' ? 'No' : 'Yes')
  },
  {
    dataTest: 'property.fireAlarm',
    type: 'radio',
    values: ['false', 'true'],
    label: 'Fire Alarm',
    format: str => (str === 'false' ? 'No' : 'Yes')
  },
  {
    dataTest: 'property.sprinkler',
    type: 'radio',
    values: ['N', 'A', 'B'],
    label: 'Sprinkler'
  }
];

export const windFields = [
  {
    dataTest: 'property.windMitigation.roofCovering',
    type: 'select',
    required: true,
    values: [{ value: 'Non-FBC' }, { value: 'FBC' }, { value: 'Other' }],
    label: 'Roof Covering'
  },
  {
    dataTest: 'property.windMitigation.roofDeckAttachment',
    type: 'select',
    required: true,
    values: [{ value: 'A' }, { value: 'B' }, { value: 'C' }, { value: 'D' }],
    label: 'Roof Deck Attachment'
  },
  {
    dataTest: 'property.windMitigation.roofToWallConnection',
    type: 'select',
    required: true,
    values: [
      { value: 'Toe Nails' },
      { value: 'Clips' },
      { value: 'Single Wraps' }
    ],
    label: 'Roof to Wall Attachment'
  },
  {
    dataTest: 'property.windMitigation.roofGeometry',
    type: 'select',
    required: true,
    values: [{ value: 'Flat' }, { value: 'Gable' }, { value: 'Hip' }],
    label: 'Roof Geometry'
  },
  {
    dataTest: 'property.windMitigation.secondaryWaterResistance',
    type: 'radio',
    values: ['Yes', 'No'],
    label: 'Secondary Water Resistance (SWR)'
  },
  {
    dataTest: 'property.windMitigation.openingProtection',
    type: 'select',
    required: true,
    values: [{ value: 'None' }, { value: 'Basic' }, { value: 'Hurricane' }],
    label: 'Opening Protection'
  },
  {
    dataTest: 'property.windMitigation.floridaBuildingCodeWindSpeed',
    type: 'text',
    required: true,
    value: '1300',
    label: 'FBC Wind Speed'
  },
  {
    dataTest: 'property.windMitigation.floridaBuildingCodeWindSpeedDesign',
    type: 'text',
    required: true,
    value: '1300',
    label: 'FBC Wind Speed Design'
  },
  {
    dataTest: 'property.windMitigation.terrain',
    type: 'select',
    required: true,
    values: [{ value: 'B' }, { value: 'C' }, { value: 'HVHZ' }],
    label: 'Terrain'
  },
  {
    dataTest: 'property.windMitigation.internalPressureDesign',
    type: 'select',
    required: true,
    values: [{ value: 'Enclosed' }, { value: 'Partial' }],
    label: 'Internal Pressure Design'
  },
  {
    dataTest: 'property.windMitigation.windBorneDebrisRegion',
    type: 'radio',
    values: ['Yes', 'No', 'Other'],
    label: 'Wind Borne Debris Region (WBDR)'
  }
];
