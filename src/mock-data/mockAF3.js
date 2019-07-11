/* eslint-disable */
const mock = {
  header: {
    hideDetailSummary: true,
    fields: [
      { value: 'policyHolder', component: 'Section', label: 'Policyholder' },
      { value: 'mailingAddress', component: 'Section' },
      { value: 'propertyAddress', component: 'Section' },
      { value: 'county', label: 'Property County' },
      { value: 'floodZone', label: 'Flood Zone' },
      { value: 'effectiveDate', className: 'quoteEffectiveDate' },
      { value: 'currentPremium', label: 'Premium', className: 'premium' }
    ]
  },
  pages: [
    {
      name: 'coverage',
      step: {},
      components: [
        {
          name: 'ProducedBy',
          id: '4ea7d1a1-80b8-4109-9d4b-4c2155a0a2b1',
          type: '$SECTION',
          dependencies: [],
          data: {},
          formData: {},
          children: [
            {
              id: 'ec744d52-d3e8-4ead-b030-d4eb99e9ba63',
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Produced By'
              },
              formData: {},
              children: []
            },
            {
              id: 'ac46d884-491e-4c7e-b103-b2e1547a7e01',
              type: '$INPUT',
              path: 'effectiveDate',
              dependencies: [],
              data: {
                component: 'date',
                label: 'Effective Date',
                size: '3',
                extendedProperties: {
                  min: 'zipCodeSettings.minEffectiveDate',
                  max: 'zipCodeSettings.maxEffectiveDate'
                },
                validation: ['minEffectiveDate', 'isValidDate']
              },
              formData: {
                path: 'effectiveDate',
                type: 'string',
                required: true,
                metaData: {
                  format: 'date-time'
                  // also need min-date for underwriting
                }
              },
              children: []
            },
            {
              id: 'ec8f821b-0cc4-4328-9e65-ad0d6f08305c',
              type: '$CUSTOM',
              dependencies: [],
              data: {
                size: '9',
                component: '$AGENCY_SELECT',
                dataSource: 'agencies',
                extendedProperties: {
                  subscribe: true
                }
              },
              formData: {},
              children: []
            }
          ]
        },
        {
          name: 'PropertyAddress',
          id: 'b963aac4-936d-4290-9756-0a41819dccb4',
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$POLICYHOLDERS',
            extendedProperties: {
              watchField: 'removeSecondary'
            }
          },
          formData: {},
          children: []
        },
        {
          name: 'PropertyAddress',
          id: '0842592e-072d-4171-bc72-5141d43a1f39',
          type: '$SECTION',
          dependencies: [],
          data: {
            className: 'property-address',
            size: '6'
          },
          formData: {},
          children: [
            {
              id: '8050ead1-bb21-4ffa-8a41-0547ef748ffb',
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Property Address'
              },
              formData: {},
              children: []
            },
            {
              id: '12e86c6b-ed7c-45d1-9ad3-8f5ea403fadd',
              type: '$INPUT',
              path: 'property.physicalAddress.address1',
              dependencies: [],
              data: {
                component: 'text',
                label: 'Address 1',
                size: '12',
                disabled: true
              },
              formData: {},
              children: []
            },
            {
              id: 'a38243d1-88f4-4647-be0b-04712c4abf5b',
              type: '$INPUT',
              path: 'property.physicalAddress.address2',
              dependencies: [],
              data: {
                component: 'text',
                label: 'Address 2',
                size: '12',
                disabled: true
              },
              formData: {},
              children: []
            },
            {
              id: '1df85b3c-e673-4183-9e0e-dbd0923c8739',
              type: '$INPUT',
              path: 'property.physicalAddress.city',
              dependencies: [],
              data: {
                component: 'text',
                label: 'City',
                size: '12',
                disabled: true
              },
              formData: {},
              children: []
            },
            {
              id: '50427097-7889-49f8-be88-dc2a4f5531bd',
              type: '$INPUT',
              path: 'property.physicalAddress.state',
              dependencies: [],
              data: {
                component: 'text',
                label: 'State',
                size: '4',
                disabled: true
              },
              formData: {},
              children: []
            },
            {
              id: 'dbacf35a-97b7-4bd5-8c1b-571dd4d16ff4',
              type: '$INPUT',
              path: 'property.physicalAddress.zip',
              dependencies: [],
              data: {
                component: 'text',
                label: 'Zip',
                size: '8',
                disabled: true
              },
              formData: {},
              children: []
            }
          ]
        },
        {
          name: 'Location',
          id: 'b1614e7d-1657-424b-b206-d06bfbde38af',
          type: '$SECTION',
          dependencies: [],
          data: {
            className: 'home-location',
            size: '6'
          },
          formData: {},
          children: [
            {
              id: '39209da0-1925-4802-95b8-aa945cd8ce38',
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Home and Location',
                children: []
              },
              formData: {},
              children: []
            },
            {
              id: 'd5e9109b-3f9d-4e52-a5bc-bd19e064bd8c',
              type: '$INPUT',
              path: 'property.yearBuilt',
              dependencies: [],
              data: {
                component: 'text',
                label: 'Year Home Built',
                size: '6',
                disabled: true
              },
              formData: {},
              children: []
            },
            {
              id: '44a250d8-a05e-4793-b5ee-c50d80d9b547',
              type: '$INPUT',
              path: 'property.floodZone',
              dependencies: [],
              data: {
                component: 'text',
                label: 'Flood Zone',
                size: '6',
                disabled: true
              },
              formData: {},
              children: []
            },
            {
              id: 'c67c0eab-8263-4de6-a382-3002cbb85250',
              type: '$INPUT',
              path: 'property.constructionType',
              dependencies: [],
              data: {
                component: 'text',
                label: 'Construction',
                size: '6',
                disabled: true
              },
              formData: {},
              children: []
            },
            {
              id: '7839181e-4413-442d-a273-e65c08a17a19',
              type: '$INPUT',
              path: 'property.baseFloodElevation',
              dependencies: [],
              data: {
                component: 'text',
                label: 'Base Flood Elevation',
                size: '6',
                disabled: true
              },
              formData: {},
              children: []
            },
            {
              id: '77874384-0638-43a8-9d76-671aa2f83438',
              type: '$INPUT',
              path: 'property.residenceType',
              dependencies: [],
              data: {
                component: 'text',
                label: 'Residence Type',
                size: '6',
                disabled: true
              },
              formData: {},
              children: []
            },
            {
              id: '8b35b7f1-e920-413b-9d73-9a1fc1086bbf',
              type: '$INPUT',
              path: 'property.squareFeet',
              dependencies: [],
              data: {
                component: 'text',
                label: 'Square Footage',
                size: '6',
                disabled: true
              },
              formData: {},
              children: []
            },
            {
              id: '6b15e702-d810-4fc3-aa33-83c73aca0214',
              type: '$INPUT',
              path: 'property.id',
              dependencies: [],
              data: {
                component: 'text',
                label: 'IGD ID',
                size: '12',
                disabled: true
              },
              formData: {},
              children: []
            }
          ]
        },
        {
          id: 100034,
          type: '$SECTION',
          dependencies: [],
          data: {
            className: 'coverages',
            size: '5'
          },
          formData: {},
          children: [
            {
              id: 135,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Coverages'
              },
              formData: {},
              children: []
            },
            {
              id: 136,
              type: '$INPUT',
              path: 'coverageLimits.dwelling.value',
              dependencies: [],
              data: {
                component: 'currency',
                label: 'Dwelling Limit',
                size: '12',
                className: '',
                validation: ['isDwellingRange'],
                extendedProperties: {
                  format: 'currency',
                  min: 'coverageLimits.dwelling.minAmount',
                  max: 'coverageLimits.dwelling.maxAmount',
                  step: 1000
                }
              },
              formData: {
                path: 'coverageLimits.dwelling.value',
                type: 'integer',
                required: true,
                metaData: {}
              },
              children: []
            },
            {
              id: 137,
              type: '$INPUT',
              path: 'coverageLimits.otherStructures.value',
              dependencies: [],
              data: {
                component: 'selectInteger',
                label: 'Percentage',
                size: '12',
                dataSource: [
                  { label: '0%', answer: 0 },
                  { label: '2%', answer: 2 },
                  { label: '5%', answer: 5 },
                  { label: '10%', answer: 10 }
                ],
                extendedProperties: {
                  output: 'currency',
                  outputLabel: 'Other Structures Limit'
                }
              },
              formData: {
                path: 'coverageLimits.otherStructures.value',
                type: 'integer',
                required: true,
                metaData: {
                  target:
                    '${Math.ceil(((it.coverageLimits.otherStructures.value / 100) * it.coverageLimits.dwelling.value))}'
                }
              },
              children: []
            },
            {
              id: 138,
              type: '$INPUT',
              path: 'coverageLimits.personalProperty.value',
              dependencies: [],
              data: {
                component: 'selectInteger',
                label: 'Percentage',
                size: '12',
                extendedProperties: {
                  output: 'currency',
                  outputLabel: 'Personal Property Limit'
                },
                dataSource: [
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
                ]
              },
              formData: {
                path: 'coverageLimits.personalProperty.value',
                type: 'integer',
                required: true,
                metaData: {
                  target:
                    '${Math.ceil(((it.coverageLimits.personalProperty.value / 100) * it.coverageLimits.dwelling.value))}'
                }
              },
              children: []
            },
            {
              id: 139,
              type: '$INPUT',
              path: 'coverageLimits.lossOfUse.value',
              dependencies: [],
              data: {
                component: 'display',
                label: 'Loss of Use Limit',
                size: '12',
                className: 'side-by-side',
                extendedProperties: {
                  output: 'currency'
                }
              },
              formData: {
                path: 'coverageLimits.lossOfUse.value',
                type: 'integer',
                required: true,
                metaData: {
                  target:
                    '${Math.ceil(((it.coverageLimits.lossOfUse.value / 100) * it.coverageLimits.dwelling.value))}'
                }
              },
              children: []
            },
            {
              id: 140,
              type: '$INPUT',
              path: 'coverageLimits.personalLiability.value',
              dependencies: [],
              data: {
                component: 'selectInteger',
                label: 'Personal Liability Limit',
                size: '12',
                className: 'side-by-side',
                segmented: true
              },
              formData: {
                path: 'coverageLimits.personalLiability.value',
                type: 'integer',
                required: true,
                metaData: {
                  enum: [
                    { label: '$ 100,000', answer: 100000 },
                    { label: '$ 300,000', answer: 300000 }
                  ]
                }
              },
              children: []
            },
            {
              id: 141,
              type: '$INPUT',
              path: 'coverageLimits.medicalPayments.value',
              dependencies: [],
              data: {
                component: 'display',
                label: 'Medical Payments to Others Limit',
                size: '12',
                className: 'side-by-side',
                segmented: true,
                extendedProperties: {
                  output: 'currency'
                },
                dataSource: []
              },
              formData: {
                path: 'coverageLimits.medicalPayments.value',
                type: 'integer',
                required: true,
                metaData: {
                  target: '${2000}'
                }
              },
              children: []
            }
          ]
        },
        {
          id: 1000042,
          type: '$SECTION',
          dependencies: [],
          data: {
            className: 'other-coverages',
            size: '3'
          },
          formData: {},
          className: 'test',
          children: [
            {
              id: 143,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Other Coverages'
              },
              formData: {},
              children: []
            },
            {
              id: 144,
              type: '$INPUT',
              path: 'coverageLimits.moldProperty.value',
              dependencies: [],
              data: {
                component: 'selectInteger',
                label: 'Mold Property',
                size: '12'
              },
              formData: {
                path: 'coverageLimits.moldProperty.value',
                type: 'integer',
                required: true,
                metaData: {
                  enum: [
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
                  ]
                }
              },
              children: []
            },
            {
              id: 145,
              type: '$INPUT',
              path: 'coverageLimits.moldLiability.value',
              dependencies: [],
              data: {
                component: 'selectInteger',
                label: 'Mold Liability Limit',
                size: '12'
              },
              formData: {
                path: 'coverageLimits.moldLiability.value',
                type: 'integer',
                required: true,
                metaData: {
                  enum: [
                    {
                      label: '$ 50,000',
                      answer: 50000
                    },
                    {
                      label: '$ 100,000',
                      answer: 100000
                    }
                  ]
                }
              },
              children: []
            },
            {
              id: 146,
              type: '$INPUT',
              path: 'coverageOptions.personalPropertyReplacementCost.answer',
              dependencies: [],
              data: {
                disabled: {
                  path: 'coverageLimits.personalProperty.value',
                  value: '0',
                  defaultValue: ''
                },
                component: 'radio',
                segmented: true,
                label: 'Personal Property Replacement Cost',
                size: '12',
                extendedProperties: {
                  watchFields: [
                    {
                      field: 'coverageLimits.personalProperty.value',
                      becomes: 0,
                      to: false
                    },
                    {
                      field: 'coverageLimits.personalProperty.value',
                      becomes: 25,
                      to: true
                    },
                    {
                      field: 'coverageLimits.personalProperty.value',
                      becomes: 35,
                      to: true
                    },
                    {
                      field: 'coverageLimits.personalProperty.value',
                      becomes: 50,
                      to: true
                    }
                  ]
                }
              },
              formData: {
                path: 'coverageOptions.personalPropertyReplacementCost.answer',
                type: 'boolean',
                required: true,
                metaData: {
                  enum: [
                    {
                      label: 'No',
                      answer: false
                    },
                    {
                      label: 'Yes',
                      answer: true
                    }
                  ]
                }
              },
              children: []
            },
            {
              id: 147,
              type: '$INPUT',
              path: 'coverageLimits.ordinanceOrLaw.value',
              dependencies: [],
              data: {
                component: 'selectInteger',
                label: 'Ordinance or Law Coverage Limit',
                size: '12'
              },
              formData: {
                path: 'coverageLimits.ordinanceOrLaw.value',
                type: 'integer',
                required: true,
                metaData: {
                  enum: [
                    {
                      label: '25% of Dwelling Limit',
                      answer: 25
                    },
                    {
                      label: '50% of Dwelling Limit',
                      answer: 50
                    }
                  ]
                }
              },
              children: []
            }
          ]
        },
        {
          id: 1000048,
          type: '$SECTION',
          dependencies: [],
          data: {
            className: 'deductibles',
            size: '2'
          },
          formData: {},
          className: 'test',
          children: [
            {
              id: 149,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Deductibles'
              },
              formData: {},
              children: []
            },
            {
              id: 150,
              component: '$INPUT',
              path: 'deductibles.allOtherPerils.value',
              dependencies: [],
              data: {
                component: 'selectInteger',
                label: 'All Other Perils',
                size: '12'
              },
              formData: {
                path: 'deductibles.allOtherPerils.value',
                type: 'integer',
                required: true,
                metaData: {
                  enum: [
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
                  ]
                }
              },
              children: []
            },
            {
              id: 151,
              type: '$INPUT',
              path: 'deductibles.hurricane.value',
              dependencies: [],
              data: {
                component: 'selectInteger',
                label: 'Hurricane Deductible',
                size: '12',
                extendedProperties: {
                  outputLabel: 'Calculated Hurricane',
                  output: 'currency'
                }
              },
              formData: {
                path: 'deductibles.hurricane.value',
                type: 'integer',
                required: true,
                metaData: {
                  enum: [
                    {
                      label: '2% of Dewlling Limit',
                      answer: 2
                    },
                    {
                      label: '5% of Dewlling Limit',
                      answer: 5
                    },
                    {
                      label: '10% of Dewlling Limit',
                      answer: 10
                    }
                  ],
                  target:
                    '${Math.ceil(((it.deductibles.hurricane.value / 100) * it.coverageLimits.dwelling.value))}'
                }
              },
              children: []
            },
            {
              id: 152,
              type: '$INPUT',
              path: 'deductibles.sinkhole.value',
              dependencies: [],
              data: {
                component: 'selectInteger',
                label: 'Sinkhole',
                size: '12',
                dataSource: [
                  {
                    answer: 0,
                    label: 'Coverage Excluded'
                  },
                  {
                    answer: 10,
                    label: '10% of Dwelling Limit'
                  }
                ],
                extendedProperties: {
                  outputLabel: 'Calculated Sinkhole',
                  output: 'currency'
                }
              },
              formData: {
                path: 'deductibles.sinkhole.value',
                type: 'integer',
                required: true,
                metaData: {
                  target:
                    '${Math.ceil(((it.deductibles.sinkhole.value / 100) * it.coverageLimits.dwelling.value))}'
                }
              },
              children: []
            }
          ]
        },
        {
          id: 1000053,
          type: '$SECTION',
          dependencies: [],
          data: {
            className: 'discounts',
            size: '2'
          },
          formData: {},
          className: 'test',
          children: [
            {
              id: 154,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Discounts'
              },
              formData: {},
              children: []
            },
            {
              id: 155,
              type: '$INPUT',
              path: 'property.burglarAlarm',
              dependencies: [],
              data: {
                segmented: true,
                component: 'radio',
                label: 'Burglar Alarm',
                size: '12'
              },
              formData: {
                path: 'property.burglarAlarm',
                type: 'boolean',
                metaData: {
                  enum: [
                    {
                      label: 'No',
                      answer: false
                    },
                    {
                      label: 'Yes',
                      answer: true
                    }
                  ]
                },
                children: []
              },
              children: []
            },
            {
              id: 156,
              type: '$INPUT',
              path: 'property.fireAlarm',
              dependencies: [],
              data: {
                segmented: true,
                component: 'radio',
                label: 'Fire Alarm',
                size: '12'
              },
              formData: {
                path: 'property.fireAlarm',
                type: 'boolean',
                metaData: {
                  enum: [
                    {
                      label: 'No',
                      answer: false
                    },
                    {
                      label: 'Yes',
                      answer: true
                    }
                  ]
                },
                children: []
              },
              children: []
            },
            {
              id: 157,
              type: '$INPUT',
              path: 'property.sprinkler',
              dependencies: [],
              data: {
                segmented: true,
                component: 'radio',
                label: 'Sprinkler',
                size: '12'
              },
              formData: {
                path: 'property.sprinkler',
                type: 'string',
                required: true,
                metaData: {
                  enum: [
                    {
                      label: 'N',
                      answer: 'N'
                    },
                    {
                      label: 'A',
                      answer: 'A'
                    },
                    {
                      label: 'B',
                      answer: 'B'
                    }
                  ]
                },
                children: []
              },
              children: []
            }
          ]
        },
        {
          id: 1000058,
          type: '$SECTION',
          dependencies: [],
          data: {
            className: 'wind-mit'
          },
          formData: {},
          className: 'test',
          children: [
            {
              id: 159,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Wind Mitigation'
              },
              formData: {},
              children: []
            },
            {
              id: 160,
              component: '$INPUT',
              path: 'property.windMitigation.roofCovering',
              dependencies: [],
              data: {
                component: 'select',
                label: 'Roof Covering',
                size: '6'
              },
              formData: {
                path: 'property.windMitigation.roofCovering',
                type: 'string',
                required: true,
                metaData: {
                  enum: [
                    {
                      label: 'Non-FBC',
                      answer: 'Non-FBC'
                    },
                    {
                      label: 'FBC',
                      answer: 'FBC'
                    },
                    {
                      label: 'Other',
                      answer: 'Other'
                    }
                  ]
                }
              },
              children: []
            },
            {
              id: 161,
              type: '$INPUT',
              path: 'property.windMitigation.floridaBuildingCodeWindSpeed',
              dependencies: [],
              data: {
                component: 'number',
                label: 'FBC Wind Speed',
                size: '6'
              },
              formData: {},
              children: []
            },
            {
              id: 162,
              type: '$INPUT',
              path: 'property.windMitigation.roofDeckAttachment',
              dependencies: [],
              data: {
                component: 'select',
                label: 'Roof Deck Attachment',
                size: '6'
              },
              formData: {
                path: 'property.windMitigation.roofDeckAttachment',
                type: 'integer',
                required: true,
                metaData: {
                  enum: [
                    {
                      label: 'A',
                      answer: 'A'
                    },
                    {
                      label: 'B',
                      answer: 'B'
                    },
                    {
                      label: 'C',
                      answer: 'C'
                    },
                    {
                      label: 'D',
                      answer: 'D'
                    },
                    {
                      label: 'Concrete',
                      answer: 'Concrete'
                    },
                    {
                      label: 'Other',
                      answer: 'Other'
                    }
                  ]
                }
              },
              children: []
            },
            {
              id: 163,
              type: '$INPUT',
              path:
                'property.windMitigation.floridaBuildingCodeWindSpeedDesign',
              dependencies: [],
              data: {
                component: 'number',
                label: 'FBC Wind Speed Design',
                size: '6'
              },
              formData: {},
              children: []
            },
            {
              id: 164,
              type: '$INPUT',
              path: 'property.windMitigation.roofToWallConnection',
              dependencies: [],
              data: {
                component: 'select',
                label: 'Roof to Wall Attachment',
                size: '6'
              },
              formData: {
                path: 'property.windMitigation.roofToWallConnection',
                type: 'string',
                required: true,
                metaData: {
                  enum: [
                    {
                      label: 'Toe Nails',
                      answer: 'Toe Nails'
                    },
                    {
                      label: 'Clips',
                      answer: 'Clips'
                    },
                    {
                      label: 'Single Wraps',
                      answer: 'Single Wraps'
                    },
                    {
                      label: 'Double Wraps',
                      answer: 'Double Wraps'
                    },
                    {
                      label: 'Other',
                      answer: 'Other'
                    }
                  ]
                }
              },
              children: []
            },
            {
              id: 165,
              type: '$INPUT',
              path: 'property.windMitigation.terrain',
              dependencies: [],
              data: {
                component: 'select',
                label: 'Terrain',
                size: '6',
                segmented: true
              },
              formData: {
                path: 'property.windMitigation.terrain',
                type: 'string',
                required: true,
                metaData: {
                  enum: [
                    {
                      label: 'B',
                      answer: 'B'
                    },
                    {
                      label: 'C',
                      answer: 'C'
                    },
                    {
                      label: 'HVHZ',
                      answer: 'HVHZ'
                    },
                    {
                      label: 'Other',
                      answer: 'Other'
                    }
                  ]
                }
              },
              children: []
            },
            {
              id: 166,
              type: '$INPUT',
              path: 'property.windMitigation.roofGeometry',
              dependencies: [],
              data: {
                component: 'select',
                label: 'Roof Geometry',
                size: '6'
              },
              formData: {
                path: 'property.windMitigation.roofGeometry',
                type: 'string',
                required: true,
                metaData: {
                  enum: [
                    {
                      label: 'Flat',
                      answer: 'Flat'
                    },
                    {
                      label: 'Gable',
                      answer: 'Gable'
                    },
                    {
                      label: 'Hip',
                      answer: 'Hip'
                    },
                    {
                      label: 'Other',
                      answer: 'Other'
                    }
                  ]
                }
              },
              children: []
            },
            {
              id: 167,
              type: '$INPUT',
              path: 'property.windMitigation.internalPressureDesign',
              dependencies: [],
              data: {
                component: 'select',
                label: 'Internal Pressure Design',
                size: '6'
              },
              formData: {
                path: 'property.windMitigation.internalPressureDesign',
                type: 'string',
                required: true,
                metaData: {
                  enum: [
                    {
                      label: 'Enclosed',
                      answer: 'Enclosed'
                    },
                    {
                      label: 'Partial',
                      answer: 'Partial'
                    },
                    {
                      label: 'Other',
                      answer: 'Other'
                    }
                  ]
                }
              },
              children: []
            },
            {
              id: 168,
              type: '$INPUT',
              path: 'property.windMitigation.secondaryWaterResistance',
              dependencies: [],
              data: {
                component: 'radio',
                label: 'Secondary Water Resistance (SWR)',
                size: '6',
                segmented: true
              },
              formData: {
                path: 'property.windMitigation.secondaryWaterResistance',
                type: 'string',
                required: true,
                metaData: {
                  enum: [
                    {
                      label: 'Yes',
                      answer: 'Yes'
                    },
                    {
                      label: 'No',
                      answer: 'No'
                    },
                    {
                      label: 'Other',
                      answer: 'Other'
                    }
                  ]
                }
              },
              children: []
            },
            {
              id: 169,
              type: '$INPUT',
              path: 'property.windMitigation.windBorneDebrisRegion',
              dependencies: [],
              data: {
                component: 'radio',
                label: 'Wind Borne Debris Region (WBDR)',
                size: '6',
                segmented: true
              },
              formData: {
                path: 'property.windMitigation.windBorneDebrisRegion',
                type: 'string',
                required: true,
                metaData: {
                  enum: [
                    {
                      label: 'Yes',
                      answer: 'Yes'
                    },
                    {
                      label: 'No',
                      answer: 'No'
                    },
                    {
                      label: 'Other',
                      answer: 'Other'
                    }
                  ]
                }
              },
              children: []
            },
            {
              id: 170,
              type: '$INPUT',
              dependencies: [],
              path: 'property.windMitigation.openingProtection',
              data: {
                component: 'select',
                label: 'Opening Protection:',
                size: '6'
              },
              formData: {
                path: 'property.windMitigation.openingProtection',
                type: 'string',
                required: true,
                metaData: {
                  enum: [
                    {
                      label: 'None',
                      answer: 'None'
                    },
                    {
                      label: 'Basic',
                      answer: 'Basic'
                    },
                    {
                      label: 'Hurricane',
                      answer: 'Hurricane'
                    },
                    {
                      label: 'Other',
                      answer: 'Other'
                    }
                  ]
                },
                children: []
              },
              children: []
            }
          ]
        }
      ]
    },
    {
      name: 'underwriting',
      step: {},
      components: [
        {
          id: 200,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$UNDERWRITING'
          },
          formData: {},
          children: []
        }
      ]
    },
    {
      name: 'mailingBilling',
      step: {},
      meta: {},
      components: [
        {
          id: 34576,
          type: '$TITLE',
          dependencies: [],
          data: {
            text: 'Mailing Address',
            icon: 'fa fa-envelope'
          },
          formData: {},
          children: []
        },
        {
          id: 1,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$ADDRESS',
            extendedProperties: {
              watchFieldCustomClass: 'segmented-switch',
              watchField: 'sameAsPropertyAddress',
              fieldPrefix: 'policyHolderMailingAddress',
              matchPrefix: 'property.physicalAddress'
            }
          },
          formData: {},
          children: []
        },
        {
          id: 340933,
          type: '$TITLE',
          dependencies: [],
          data: {
            text: 'Billing Information',
            icon: 'fa fa-dollar'
          },
          formData: {},
          children: []
        },
        {
          id: 348833,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$BILLING',
            dataSource: 'billPlans',
            extendedProperties: {
              subscribe: true
            }
          },
          formData: {
            required: true
          },
          children: []
        }
      ]
    },
    {
      name: 'summary',
      step: {},
      components: [
        {
          id: 1000,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$SUMMARY',
            extendedProperties: {
              header: 'Quote Details',
              className: 'property-details',
              details: [
                {
                  label: 'Quote Number',
                  items: [{ format: '', path: 'quoteNumber' }]
                },
                {
                  label: 'Property Address',
                  items: [
                    { format: '', path: 'property.physicalAddress.address1' },
                    { format: '', path: 'property.physicalAddress.address2' },
                    { format: 'cityStateZip', path: 'property.physicalAddress' }
                  ]
                },
                {
                  label: 'Year Built',
                  items: [{ format: '', path: 'property.yearBuilt' }]
                },
                {
                  label: 'Effective Date',
                  items: [{ format: 'date', path: 'effectiveDate' }]
                },
                {
                  label: 'Agent',
                  items: [
                    {
                      format: 'name',
                      optionKey: 'agents',
                      compareField: 'answer',
                      valuePath: 'agentCode'
                    }
                  ]
                }
              ]
            }
          },
          formData: {},
          children: []
        },
        {
          id: 9001,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$SUMMARY',
            extendedProperties: {
              header: 'Coverage / Rating',
              className: 'coverage-rating',
              details: [
                {
                  items: [{ format: 'currency', path: 'rating.totalPremium' }],
                  label: 'Yearly Premium'
                },
                {
                  items: [
                    {
                      format: 'currency',
                      path: 'coverageLimits.dwelling.amount'
                    }
                  ],
                  label: 'A. Dwelling'
                },
                {
                  items: [
                    {
                      format: 'currency',
                      path: 'coverageLimits.otherStructures.amount'
                    }
                  ],
                  label: 'B. Other Structures'
                },
                {
                  items: [
                    {
                      format: 'currency',
                      path: 'coverageLimits.personalProperty.amount'
                    }
                  ],
                  label: 'C. Personal Property'
                },
                {
                  items: [
                    {
                      format: 'currency',
                      path: 'coverageLimits.lossOfUse.amount'
                    }
                  ],
                  label: 'D. Loss Of Use'
                },
                {
                  items: [
                    {
                      format: 'currency',
                      path: 'coverageLimits.personalLiability.amount'
                    }
                  ],
                  label: 'E. Personal Liability'
                },
                {
                  items: [
                    {
                      format: 'currency',
                      path: 'coverageLimits.medicalPayments.amount'
                    }
                  ],
                  label: 'F. Medical Payments'
                },
                {
                  items: [
                    {
                      format: 'bool',
                      path:
                        'coverageOptions.personalPropertyReplacementCost.answer'
                    }
                  ],
                  label: 'Personal Property Replacement Cost'
                },
                {
                  items: [
                    {
                      format: 'currency',
                      path: 'coverageLimits.moldProperty.amount'
                    }
                  ],
                  label: 'Mold Property'
                },
                {
                  items: [
                    {
                      format: 'currency',
                      path: 'coverageLimits.moldLiability.amount'
                    }
                  ],
                  label: 'Mold Liability'
                },
                {
                  items: [
                    {
                      format: 'percent',
                      path: 'coverageLimits.ordinanceOrLaw.amount'
                    }
                  ],
                  label: 'Ordinance or Law'
                },
                {
                  items: [
                    {
                      format: 'currency',
                      path: 'deductibles.allOtherPerils.amount'
                    }
                  ],
                  label: 'All Other Perils Deductible'
                },
                {
                  items: [
                    { format: 'percent', path: 'deductibles.hurricane.amount' }
                  ],
                  label: 'Hurricane Deductible'
                },
                {
                  items: [
                    {
                      format: 'currency',
                      path: 'deductibles.hurricane.calculatedAmount'
                    }
                  ],
                  label: 'Calculated Hurricane Deductible'
                },
                {
                  items: [
                    {
                      hideNoValuePath: 'deductibles.sinkhole.amount',
                      format: 'percent',
                      path: 'deductibles.sinkhole.amount'
                    }
                  ],
                  label: 'Sinkhole Deductible'
                },
                {
                  items: [
                    {
                      hideNoValuePath: 'deductibles.sinkhole.calculatedAmount',
                      format: 'currency',
                      path: 'deductibles.sinkhole.calculatedAmount'
                    }
                  ],
                  label: 'Calculated Sinkhole Deductible'
                }
              ]
            }
          },
          formData: {},
          children: []
        },
        {
          id: 9002,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$SUMMARY',
            extendedProperties: {
              header: 'Primary PolicyHolder',
              className: 'policyholder-details',
              hideNoValue: 'policyHolders[1]',
              details: [
                {
                  label: 'Policyholder Name',
                  items: [{ format: 'name', path: 'policyHolders[0]' }]
                },
                {
                  label: 'Phone Number',
                  items: [
                    {
                      format: 'phone',
                      path: 'policyHolders[0].primaryPhoneNumber'
                    }
                  ]
                },
                {
                  label: 'Email',
                  items: [{ format: '', path: 'policyHolders[0].emailAddress' }]
                },
                {
                  label: 'Electronic Delivery',
                  items: [
                    {
                      format: 'bool',
                      path: 'policyHolders[0].electronicDelivery'
                    }
                  ]
                }
              ]
            }
          },
          formData: {},
          children: []
        },
        {
          id: 9003,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$SUMMARY',
            extendedProperties: {
              header: 'Secondary PolicyHolder',
              className: 'property-details',
              hideNoValuePath: 'policyHolders[1]',
              details: [
                {
                  label: 'Policyholder Name',
                  items: [{ format: 'name', path: 'policyHolders[1]' }]
                },
                {
                  label: 'Phone Number',
                  items: [
                    {
                      format: 'phone',
                      path: 'policyHolders[1].primaryPhoneNumber'
                    }
                  ]
                },
                {
                  label: 'Email',
                  items: [{ format: '', path: 'policyHolders[1].emailAddress' }]
                },
                {
                  label: 'Electronic Delivery',
                  items: [
                    {
                      format: 'bool',
                      path: 'policyHolders[1].electronicDelivery'
                    }
                  ]
                }
              ]
            }
          },
          formData: {},
          children: []
        },
        {
          id: 9004,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$SUMMARY',
            extendedProperties: {
              header: 'Mailing Address',
              className: 'property-details',
              hideNoValuePath: 'policyHolderMailingAddress',
              details: [
                {
                  label: 'Address',
                  items: [
                    { format: '', path: 'policyHolderMailingAddress.address1' },
                    {
                      hideNoValuePath: 'policyHolderMailingAddress.address2',
                      format: '',
                      path: 'policyHolderMailingAddress.address2'
                    }
                  ]
                },
                {
                  label: 'City/State/Zip',
                  items: [
                    {
                      format: 'cityStateZip',
                      path: 'policyHolderMailingAddress'
                    }
                  ]
                },
                {
                  label: 'Country',
                  items: [
                    {
                      format: '',
                      path: 'policyHolderMailingAddress.country.displayText'
                    }
                  ]
                }
              ]
            }
          },
          formData: {},
          children: []
        },
        {
          id: 9005,
          type: '$SECTION',
          dependencies: [],
          data: { className: 'detail-group additional-interests', size: '' },
          formData: {},
          children: [
            {
              id: 9006,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Additional Interests'
              },
              formData: {},
              children: []
            },
            {
              id: 9007,
              type: '$CUSTOM',
              dependencies: [],
              data: {
                component: '$ADDITIONAL_INTEREST_DETAILS'
              },
              formData: {},
              children: []
            }
          ]
        },
        {
          id: 9008,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$SHARE'
          },
          formData: {},
          children: []
        }
      ]
    }
  ]
};

export default mock;
