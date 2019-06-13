export const producedByFields = [
  {
    name: 'effectiveDate',
    type: 'text',
    required: true,
    label: 'Effective Date',
    data: '2019-07-01'
  },
  {
    name: 'agencyCode',
    type: 'typeahead',
    label: 'Agency',
    placeholder: 'Start typing to search',
    values: ['0', '20000', '20093']
  },
  {
    name: 'agentCode',
    type: 'typeahead',
    disabled: true,
    label: 'Agent',
    values: ['0', '60092']
  }
];

export const primaryPolicyholderFields = [
  {
    name: 'policyHolders[0].firstName',
    type: 'text',
    required: true,
    label: 'First Name',
    data: 'Bruce'
  },
  {
    name: 'policyHolders[0].lastName',
    type: 'text',
    required: true,
    label: 'Last Name',
    data: 'Wayne'
  },
  {
    name: 'policyHolders[0].primaryPhoneNumber',
    type: 'phone',
    required: true,
    label: 'Primary Phone',
    data: '(999) 888-1231'
  },
  {
    name: 'policyHolders[0].secondaryPhoneNumber',
    type: 'phone',
    label: 'Secondary Phone',
    data: '(123) 456-7890'
  },
  {
    name: 'policyHolders[0].emailAddress',
    type: 'email',
    required: true,
    label: 'Email Address',
    data: 'batman@gmail.gov'
  }
];

export const secondaryPolicyholderFields = [
  {
    name: 'policyHolders[1].firstName',
    type: 'text',
    label: 'First Name',
    data: 'Dick'
  },
  {
    name: 'policyHolders[1].lastName',
    type: 'text',
    label: 'Last Name',
    data: 'Grayson'
  },
  {
    name: 'policyHolders[1].primaryPhoneNumber',
    type: 'phone',
    label: 'Primary Phone',
    data: '(444) 444-4321'
  },
  {
    name: 'policyHolders[1].secondaryPhoneNumber',
    type: 'phone',
    label: 'Secondary Phone',
    data: '(888) 567-1234'
  },
  {
    name: 'policyHolders[1].emailAddress',
    type: 'text',
    label: 'Email Address',
    data: 'Robin@hotmail.notascam.rus'
  }
];

export const propertyFields = [
  {
    name: 'property.physicalAddress.address1',
    type: 'text',
    disabled: true,
    required: true,
    label: 'Address 1',
    data: '1234 Test Address 1'
  },
  {
    name: 'property.physicalAddress.address2',
    type: 'text',
    disabled: true,
    required: false,
    label: 'Address 2',
    data: '1234 Test Address 2'
  },
  {
    name: 'property.physicalAddress.city',
    type: 'text',
    disabled: true,
    required: true,
    label: 'City',
    data: 'Paradise City'
  },
  {
    name: 'property.physicalAddress.state',
    type: 'text',
    disabled: true,
    required: true,
    label: 'State',
    data: 'PA'
  },
  {
    name: 'property.physicalAddress.zip',
    type: 'text',
    disabled: true,
    required: true,
    label: 'Zip',
    data: '97531'
  }
];

export const homeAndLocationFields = [
  {
    name: 'property.yearBuilt',
    type: 'text',
    disabled: true,
    label: 'Year Home Built'
  },
  {
    name: 'property.protectionClass',
    type: 'select',
    disabled: true,
    label: 'Protection Class'
  },
  {
    name: 'property.distanceToTidalWater',
    type: 'text',
    disabled: true,
    label: 'Tidal Waters Dist.'
  },
  {
    name: 'property.residenceType',
    type: 'select',
    disabled: true,
    label: 'Residence Type'
  },
  {
    name: 'property.constructionType',
    type: 'select',
    disabled: true,
    label: 'Construction'
  },
  {
    name: 'property.buildingCodeEffectivenessGrading',
    type: 'select',
    disabled: true,
    label: 'BCEG'
  },
  {
    name: 'property.distanceToFireHydrant',
    type: 'text',
    disabled: true,
    label: 'Fire Hydrant Dist.'
  },
  {
    name: 'property.squareFeet',
    type: 'text',
    disabled: true,
    label: 'Sq. Ft. of Home'
  },
  {
    name: 'property.yearOfRoof',
    type: 'text',
    disabled: true,
    label: 'Year Roof Built'
  },
  {
    name: 'property.familyUnits',
    type: 'select',
    disabled: true,
    label: 'Family Units'
  },
  {
    name: 'property.distanceToFireStation',
    type: 'text',
    disabled: true,
    label: 'Fire Station Dist.'
  },
  {
    name: 'property.floodZone',
    type: 'select',
    disabled: true,
    label: 'Flood Zone'
  },
  {
    name: 'property.id',
    type: 'text',
    disabled: true,
    label: 'IGD ID'
  },
];

export const coverageFields = [
  {
    name: 'coverageLimits.dwelling.value',
    type: 'text',
    required: true,
    label: /Dwelling Limit/,
    data: '$ 300,000'
  },
  {
    name: 'coverageLimits.otherStructures.value',
    type: 'select',
    required: true,
    values: ['0', '2', '5'],
    label: 'Percentage',
    output: {
      label: 'Other Structures Limit', value: '$ 0'
    }
  },
  {
    name: 'coverageLimits.personalProperty.value',
    type: 'select',
    values: ['0', '25', '35'],
    label: 'Percentage',
    output: {
      label: 'Personal Property Limit', value: '$ 0'
    }
  },
  {
    name: 'coverageLimits.lossOfUse.value',
    label: 'Loss of Use Limit'
  },
  {
    name: 'coverageLimits.personalLiability.value',
    type: 'select',
    values: ['100000', '300000'],
    label: 'Personal Liability Limit'
  },
  {
    name: 'coverageLimits.medicalPayments.value',
    label: 'Medical Payments to Others Limit'
  }
];

export const otherCoveragesFields = [
  {
    name: 'coverageLimits.moldProperty.value',
    type: 'select',
    values: ['10000', '25000'],
    label: 'Mold Property'
  },
  {
    name: 'coverageLimits.moldLiability.value',
    type: 'select',
    values: ['50000', '100000'],
    label: 'Mold Liability Limit'
  },
  {
    name: 'coverageOptions.personalPropertyReplacementCost.answer',
    label: 'Personal Property Replacement Cost'
  },
  {
    name: 'coverageLimits.ordinanceOrLaw.value',
    type: 'select',
    values: ['25', '50'],
    label: 'Ordinance or Law Coverage Limit'
  }
];

export const deductiblesFields = [
  {
    name: 'deductibles.allOtherPerils.value',
    type: 'select',
    values: ['500', '1000'],
    label: 'All Other Perils'
  },
  {
    name: 'deductibles.hurricane.value',
    type: 'select',
    values: ['2', '5'],
    label: 'Hurricane Deductible',
    output: {
      label: 'Calculated Hurricane', value: '$ 0'
    }
  },
  {
    name: 'coverageOptions.sinkholePerilCoverage.answer',
    type: 'select',
    values: ['true', 'false'],
    label: 'Sinkhole',
    output: {
      label: 'Calculated Sinkhole', value: '$ 0'
    }
  }
];

export const discountsFields = [
  {
    name: 'property.burglarAlarm',
    type: 'radio',
    values: ['false', 'true'],
    label: 'Burglar Alarm'
  },
  {
    name: 'property.fireAlarm',
    type: 'radio',
    values: ['false', 'true'],
    label: 'Fire Alarm'
  },
  {
    name: 'property.sprinkler',
    type: 'radio',
    values: ['N', 'A', 'B'],
    label: 'Sprinkler'
  }
];

export const windFields = [
  {
    name: 'property.windMitigation.roofCovering',
    type: 'select',
    required: true,
    values: ['Non-FBC', 'FBC', 'Other'],
    label: 'Roof Covering'
  },
  {
    name: 'property.windMitigation.roofDeckAttachment',
    type: 'select',
    required: true,
    values: ['A', 'B', 'C', 'D'],
    label: 'Roof Deck Attachment'
  },
  {
    name: 'property.windMitigation.roofToWallConnection',
    type: 'select',
    required: true,
    values: ['Toe Nails', 'Clips', 'Single Wraps'],
    label: 'Roof to Wall Attachment'
  },
  {
    name: 'property.windMitigation.roofGeometry',
    type: 'select',
    required: true,
    values: ['Flat', 'Gable', 'Hip'],
    label: 'Roof Geometry'
  },
  {
    name: 'property.windMitigation.secondaryWaterResistance',
    type: 'radio',
    values: ['Yes', 'No'],
    label: 'Secondary Water Resistance (SWR)'
  },
  {
    name: 'property.windMitigation.openingProtection',
    type: 'select',
    required: true,
    values: ['None', 'Basic', 'Hurricane'],
    label: 'Opening Protection'
  },
  {
    name: 'property.windMitigation.floridaBuildingCodeWindSpeed',
    type: 'text',
    required: true,
    data: '1300',
    label: 'FBC Wind Speed'
  },
  {
    name: 'property.windMitigation.floridaBuildingCodeWindSpeedDesign',
    type: 'text',
    required: true,
    data: '1300',
    label: 'FBC Wind Speed Design'
  },
  {
    name: 'property.windMitigation.terrain',
    type: 'select',
    required: true,
    values: ['B', 'C', 'HVHZ'],
    label: 'Terrain'
  },
  {
    name: 'property.windMitigation.internalPressureDesign',
    type: 'select',
    required: true,
    values: ['Enclosed', 'Partial'],
    label: 'Internal Pressure Design'
  },
  {
    name: 'property.windMitigation.windBorneDebrisRegion',
    type: 'radio',
    values: ['Yes', 'No', 'Other'],
    label: 'Wind Borne Debris Region (WBDR)'
  }
];
