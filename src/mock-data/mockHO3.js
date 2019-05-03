/* eslint-disable */
const mock = {
  pages: [
    {
      name: 'coverage',
      step: {},
      components: [
        {
          id: 100100,
          type: '$SECTION',
          dependencies: [],
          data: { className: 'produced-by' },
          formData: {},
          children: [
            {
              id: 2,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Produced By',
              },
              formData: {},
              children: [],
            },
            {
              id: 3,
              type: '$INPUT',
              path: 'effectiveDate',
              dependencies: [],
              data: {
                component: 'date',
                label: 'Effective Date',
                size: '3',
                extendedProperties: {
                  min: 'zipCodeSettings.minEffectiveDate',
                  max: 'zipCodeSettings.maxEffectiveDate',
                },
                validation: ['minEffectiveDate', 'isValidDate'],
              },
              formData: {
                path: 'effectiveDate',
                type: 'string',
                required: true,
                metaData: {
                  format: 'date-time'
                  // also need min-date for underwriting
                },
              },
              children: [],
            },
            {
              id: 4,
              type: '$CUSTOM',
              dependencies: [],
              data: {
                size: '5',
                component: '$AGENCY',
                dataSource: 'agencies',
                extendedProperties: {
                  subscribe: true,
                }
              },
              formData: {
                required: true,
              },
              children: [],
            },
            {
              id: 5,
              type: '$INPUT',
              path: 'agentCode',
              dependencies: [],
              data: {
                component: 'select',
                label: 'Agent',
                size: '4',
                dataSource: 'agents'
              },
              formData: {
                path: 'agentCode',
                type: 'integer',
                required: true,
                metaData: {},
              },
              children: [],
            }
          ]
        },
        {
          id: 6,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$POLICYHOLDERS',
            extendedProperties: {
              subscribe: true,
              watchField: 'removeSecondary',
            }
          },
          formData: {},
          children: [],
        },
        {
          id: 10007,
          type: '$SECTION',
          dependencies: [],
          data: {
            className: 'property-address',
            size: '4',
          },
          formData: {},
          className: 'test',
          children: [
            {
              id: 8,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Property Address',
                children: []
              },
              formData: {},
              children: [],
            },
            {
              id: 18,
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
              children: [],
            },
            {
              id: 19,
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
              children: [],
            },
            {
              id: 20,
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
              children: [],
            },
            {
              id: 21,
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
              children: [],
            },
            {
              id: 22,
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
              children: [],
            },
          ]
        },
        {
          id: 100001,
          type: '$SECTION',
          dependencies: [],
          data: {
            className: 'home-location',
            size: '8',
          },
          formData: {},
          className: 'test',
          children: [
            {
              id: 120,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Home and Location',
                children: []
              },
              formData: {},
              children: [],
            },
            {
              id: 121,
              type: '$INPUT',
              path: 'property.yearBuilt',
              dependencies: [],
              data: {
                component: 'text',
                label: 'Year Home Built',
                size: '3',
                disabled: true
              },
              formData: {},
              children: [],
            },
            {
              id: 122,
              type: '$INPUT',
              path: 'property.protectionClass',
              dependencies: [],
              data: {
                component: 'text',
                label: 'Protection Class',
                size: '3',
                disabled: true
              },
              formData: {},
              children: [],
            },
            {
              id: 123,
              type: '$INPUT',
              path: 'property.distanceToTidalWater',
              dependencies: [],
              data: {
                component: 'text',
                label: 'Tidal Waters Dist.',
                size: '3',
                disabled: true
              },
              formData: {},
              children: [],
            },
            {
              id: 124,
              type: '$INPUT',
              path: 'property.residenceType',
              dependencies: [],
              data: {
                component: 'text',
                label: 'Residence Type',
                size: '3',
                disabled: true
              },
              formData: {},
              children: [],
            },
            {
              id: 125,
              type: '$INPUT',
              path: 'property.constructionType',
              dependencies: [],
              data: {
                component: 'select',
                label: 'Construction',
                size: '3',
                disabled: true,
                dataSource: [
                  {
                    "label": "Masonry",
                    "answer": "MASONRY"
                  },
                  {
                    "label": "Frame",
                    "answer": "FRAME"
                  },
                  {
                    "label": "Plastic Siding",
                    "answer": "PLASTIC SIDING"
                  },
                  {
                    "label": "Aluminum Siding",
                    "answer": "ALUMINUM SIDING"
                  },
                  {
                    "label": "Masonry Veneer",
                    "answer": "MASONRY VENEER"
                  },
                  {
                    "label": "Superior",
                    "answer": "SUPERIOR"
                  },
                ]
              },
              formData: {},
              children: [],
            },
            {
              id: 126,
              type: '$INPUT',
              path: 'property.buildingCodeEffectivenessGrading',
              dependencies: [],
              data: {
                component: 'select',
                label: 'BCEG',
                size: '3',
                disabled: true,
                dataSource: [
                  {
                    "label": "01",
                    "answer": "1"
                  },
                  {
                    "label": "02",
                    "answer": "2"
                  },
                  {
                    "label": "03",
                    "answer": "3"
                  },
                  {
                    "label": "04",
                    "answer": "4"
                  },
                  {
                    "label": "05",
                    "answer": "5"
                  },
                  {
                    "label": "06",
                    "answer": "6"
                  },
                  {
                    "label": "07",
                    "answer": "7"
                  }, {
                    "label": "08",
                    "answer": "8"
                  }, {
                    "label": "09",
                    "answer": "9"
                  }, {
                    "label": "98",
                    "answer": "98"
                  }, {
                    "label": "99",
                    "answer": "99"
                  },
                ]
              },
              formData: {},
              children: [],
            },
            {
              id: 127,
              type: '$INPUT',
              path: 'property.distanceToFireHydrant',
              dependencies: [],
              data: {
                component: 'text',
                label: 'Fire Hydrant Dist.',
                size: '3',
                disabled: true
              },
              formData: {},
              children: [],
            },
            {
              id: 128,
              type: '$INPUT',
              path: 'property.squareFeet',
              dependencies: [],
              data: {
                component: 'text',
                label: 'Sq. Ft. of Home',
                size: '3',
                disabled: true
              },
              formData: {},
              children: [],
            },
            {
              id: 129,
              type: '$INPUT',
              path: 'property.yearOfRoof',
              dependencies: [],
              data: {
                component: 'text',
                label: 'Year Roof Built',
                size: '3',
                disabled: true
              },
              formData: {},
              children: [],
            },
            {
              id: 130,
              type: '$INPUT',
              path: 'property.familyUnits',
              dependencies: [],
              data: {
                component: 'select',
                label: 'Family Units',
                size: '3',
                disabled: true,
                dataSource: [
                  {
                    "answer": "1-2"
                  },
                  {
                    "answer": "3-4"
                  },
                  {
                    "answer": "5-8"
                  },
                  {
                    "answer": "9+"
                  }
                ]
              },
              formData: {},
              children: [],
            },
            {
              id: 131,
              type: '$INPUT',
              path: 'property.distanceToFireStation',
              dependencies: [],
              data: {
                component: 'text',
                label: 'Fire Station Dist.',
                size: '3',
                disabled: true
              },
              formData: {},
              children: [],
            },
            {
              id: 132,
              type: '$INPUT',
              path: 'property.floodZone',
              dependencies: [],
              data: {
                component: 'select',
                label: 'Flood Zone',
                size: '3',
                disabled: true,
                dataSource: [
                  {
                    "answer": "V"
                  },
                  {
                    "answer": "A"
                  },
                  {
                    "answer": "B"
                  },
                  {
                    "answer": "C"
                  },
                  {
                    "answer": "X"
                  },
                  {
                    "answer": "U"
                  }
                ]
              },
              formData: {},
              children: [],
            },
            {
              id: 133,
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
              children: [],
            },
          ]
        },
        {
          id: 100034,
          type: '$SECTION',
          dependencies: [],
          data: {
            className: 'coverages',
            size: '5',
          },
          formData: {},
          className: 'test',
          children: [
            {
              id: 135,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Coverages',
              },
              formData: {},
              children: [],
            },
            {
              id: 136,
              type: '$INPUT',
              path: 'coverageLimits.dwelling.amount',
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
                  step: 1000,
                },
              },
              formData: {
                path: 'coverageLimits.dwelling.value',
                type: 'integer',
                required: true,
                metaData: {},
              },
              children: [],
            },
            {
              id: 137,
              type: '$INPUT',
              path: 'coverageLimits.otherStructures.value',
              dependencies: [],
              data: {
                component: 'select',
                label: 'Percentage',
                size: '12',
                dataSource: [
                  {
                    "label": "0%",
                    "answer": 0
                  },
                  {
                    "label": "2%",
                    "answer": 2
                  },
                  {
                    "label": "5%",
                    "answer": 5
                  },
                  {
                    "label": "10%",
                    "answer": 10
                  }
                ],
                extendedProperties: {
                  output: 'currency',
                  outputLabel: 'Other Structures Limit'
                },
              },
              formData: {
                path: 'coverageLimits.otherStructures.value',
                type: 'integer',
                required: true,
                metaData: {
                  target: '${Math.ceil(((it.coverageLimits.otherStructures.value / 100) * it.coverageLimits.dwelling.amount))}',
                },
              },
              children: [],
            },
            {
              id: 138,
              type: '$INPUT',
              path: 'coverageLimits.personalProperty.value',
              dependencies: [],
              data: {
                component: 'select',
                label: 'Percentage',
                size: '12',
                extendedProperties: {
                  output: 'currency',
                  outputLabel: 'Personal Property Limit',
                  renderWatchFields: [{
                    "field": 'coverageLimits.personalProperty.value',
                    "becomes": "0",
                    "set": 'coverageOptions.personalPropertyReplacementCost.answer',
                    "to": false
                  },
                  {
                    "field": 'coverageLimits.personalProperty.value',
                    "becomes": "25",
                    "set": 'coverageOptions.personalPropertyReplacementCost.answer',
                    "to": true
                  },
                  {
                    "field": 'coverageLimits.personalProperty.value',
                    "becomes": "35",
                    "set": 'coverageOptions.personalPropertyReplacementCost.answer',
                    "to": true
                  },
                  {
                    "field": 'coverageLimits.personalProperty.value',
                    "becomes": "50",
                    "set": 'coverageOptions.personalPropertyReplacementCost.answer',
                    "to": true
                  }],
                },
                dataSource: [
                  {
                    "label": "0%",
                    "answer": 0
                  },
                  {
                    "label": "25%",
                    "answer": 25
                  },
                  {
                    "label": "35%",
                    "answer": 35
                  },
                  {
                    "label": "50%",
                    "answer": 50
                  }
                ]
              },
              formData: {
                path: 'coverageLimits.personalProperty.value',
                type: 'integer',
                required: true,
                metaData: {
                  target: '${Math.ceil(((it.coverageLimits.personalProperty.value / 100) * it.coverageLimits.dwelling.amount))}',
                },
              },
              children: [],
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
                },
              },
              formData: {
                path: 'coverageLimits.lossOfUse.value',
                type: 'integer',
                required: true,
                metaData: {
                  target: '${Math.ceil(((it.coverageLimits.lossOfUse.value / 100) * it.coverageLimits.dwelling.amount))}',
                },
              },
              children: [],
            },
            {
              id: 140,
              type: '$INPUT',
              path: 'coverageLimits.personalLiability.amount',
              dependencies: [],
              data: {
                component: 'selectInteger',
                label: 'Personal Liability Limit',
                size: '12',
                className: 'side-by-side',
                segmented: true,
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
                },
              },
              children: [],
            },
            {
              id: 141,
              type: '$INPUT',
              path: 'coverageLimits.medicalPayments.amount',
              dependencies: [],
              data: {
                component: 'display',
                label: 'Medical Payments to Others Limit',
                size: '12',
                className: 'side-by-side',
                segmented: true,
                extendedProperties: {
                  output: 'currency',
                },
                dataSource: []
              },
              formData: {
                path: 'coverageLimits.medicalPayments.value',
                type: 'integer',
                required: true,
                metaData: {
                  target: '${2000}'
                },
              },
              children: [],
            },
          ]
        },
        {
          id: 1000042,
          type: '$SECTION',
          dependencies: [],
          data: {
            className: 'other-coverages',
            size: '3',
          },
          formData: {},
          className: 'test',
          children: [
            {
              id: 143,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Other Coverages',
              },
              formData: {},
              children: [],
            },
            {
              id: 144,
              type: '$INPUT',
              path: 'coverageLimits.moldProperty.amount',
              dependencies: [],
              data: {
                component: 'select',
                label: 'Mold Property',
                size: '12',
              },
              formData: {
                path: 'coverageLimits.moldProperty.value',
                type: 'integer',
                required: true,
                metaData: {
                  enum: [
                    {
                      "label": "$ 10,000",
                      "answer": 10000
                    },
                    {
                      "label": "$ 25,000",
                      "answer": 25000
                    },
                    {
                      "label": "$ 50,000",
                      "answer": 50000
                    }
                  ]
                },
              },
              children: [],
            },
            {
              id: 145,
              type: '$INPUT',
              path: 'coverageLimits.moldLiability.amount',
              dependencies: [],
              data: {
                component: 'select',
                label: 'Mold Liability Limit',
                size: '12',
              },
              formData: {
                path: 'coverageLimits.moldLiability.value',
                type: 'integer',
                required: true,
                metaData: {
                  enum: [
                    {
                      "label": "$ 50,000",
                      "answer": 50000
                    },
                    {
                      "label": "$ 100,000",
                      "answer": 100000
                    }
                  ]
                },
              },
              children: [],
            },
            {
              id: 146,
              type: '$INPUT',
              path: 'coverageOptions.personalPropertyReplacementCost.answer',
              dependencies: [],
              data: {
                disabled: { path: 'coverageLimits.personalProperty.value', value: '0', defaultValue: '' },
                component: 'radio',
                segmented: true,
                label: 'Personal Property Replacement Cost',
                size: '12',
              },
              formData: {
                path: 'coverageOptions.personalPropertyReplacementCost.answer',
                type: 'boolean',
                required: true,
                metaData: {
                  enum: [
                    {
                      "label": "No",
                      "answer": false
                    },
                    {
                      "label": "Yes",
                      "answer": true
                    }
                  ]
                }
              },
              children: [],
            },
            {
              id: 147,
              type: '$INPUT',
              path: 'coverageLimits.ordinanceOrLaw.amount',
              dependencies: [],
              data: {
                component: 'selectInteger',
                label: 'Ordinance or Law Coverage Limit',
                size: '12',
              },
              formData: {
                path: 'coverageLimits.ordinanceOrLaw.value',
                type: 'integer',
                required: true,
                metaData: {
                  enum: [
                    {
                      "label": "25% of Dwelling Limit",
                      "answer": 25
                    },
                    {
                      "label": "50% of Dwelling Limit",
                      "answer": 50
                    }
                  ]
                },
              },
              children: [],
            },
          ]
        },
        {
          id: 1000048,
          type: '$SECTION',
          dependencies: [],
          data: {
            className: 'deductibles',
            size: '2',
          },
          formData: {},
          className: 'test',
          children: [
            {
              id: 149,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Deductibles',
              },
              formData: {},
              children: [],
            },
            {
              id: 150,
              component: '$INPUT',
              path: 'deductibles.allOtherPerils.amount',
              dependencies: [],
              data: {
                component: 'selectInteger',
                label: 'All Other Perils',
                size: '12',
              },
              formData: {
                path: 'deductibles.allOtherPerils.value',
                type: 'integer',
                required: true,
                metaData: {
                  enum: [
                    {
                      "label": "$ 500",
                      "answer": 500
                    },
                    {
                      "label": "$ 1,000",
                      "answer": 1000
                    },
                    {
                      "label": "$ 2,500",
                      "answer": 2500
                    }
                  ]
                },
              },
              children: [],
            },
            {
              id: 151,
              type: '$INPUT',
              path: 'deductibles.hurricane.amount',
              dependencies: [],
              data: {
                component: 'selectInteger',
                label: 'Hurricane Deductible',
                size: '12',
                extendedProperties: {
                  outputLabel: 'Calculated Hurricane',
                  output: 'currency',
                },
              },
              formData: {
                path: 'deductibles.hurricane.value',
                type: 'integer',
                required: true,
                metaData: {
                  enum: [
                    {
                      "label": "2% of Dewlling Limit",
                      "answer": 2
                    },
                    {
                      "label": "5% of Dewlling Limit",
                      "answer": 5
                    },
                    {
                      "label": "10% of Dewlling Limit",
                      "answer": 10
                    }
                  ],
                  target: '${Math.ceil(((it.deductibles.hurricane.amount / 100) * it.coverageLimits.dwelling.amount))}',
                },
              },
              children: [],
            },
            {
              id: 152,
              type: '$INPUT',
              path: 'deductibles.sinkhole.amount',
              dependencies: [],
              data: {
                component: 'selectInteger',
                label: 'Sinkhole',
                size: '12',
                dataSource: [
                  {
                    "answer": 0,
                    "label": "Coverage Excluded"
                  },
                  {
                    "answer": 10,
                    "label": "10% of Dwelling Limit"
                  }
                ],
                extendedProperties: {
                  outputLabel: 'Calculated Sinkhole',
                  output: 'currency',
                }
              },
              formData: {
                path: 'deductibles.sinkhole.value',
                type: 'integer',
                required: true,
                metaData: {
                  target: '${Math.ceil(((it.deductibles.sinkhole.amount / 100) * it.coverageLimits.dwelling.amount))}',
                },
              },
              children: [],
            },
          ]
        },
        {
          id: 1000053,
          type: '$SECTION',
          dependencies: [],
          data: {
            className: 'discounts',
            size: '2',
          },
          formData: {},
          className: 'test',
          children: [
            {
              id: 154,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Discounts',
              },
              formData: {},
              children: [],
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
                size: '12',
              },
              formData: {
                path: 'property.burglarAlarm',
                type: 'boolean',
                metaData: {
                  enum: [
                    {
                      "label": "No",
                      "answer": false
                    },
                    {
                      "label": "Yes",
                      "answer": true
                    }
                  ]
                },
                children: [],
              },
              children: [],
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
                size: '12',
              },
              formData: {
                path: 'property.fireAlarm',
                type: 'boolean',
                metaData: {
                  enum: [
                    {
                      "label": "No",
                      "answer": false
                    },
                    {
                      "label": "Yes",
                      "answer": true
                    }
                  ]
                },
                children: [],
              },
              children: [],
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
                size: '12',
              },
              formData: {
                path: 'property.sprinkler',
                type: 'string',
                required: true,
                metaData: {
                  enum: [
                    {
                      "label": "N",
                      "answer": "N"
                    },
                    {
                      "label": "A",
                      "answer": "A"
                    },
                    {
                      "label": "B",
                      "answer": "B"
                    }
                  ]
                },
                children: [],
              },
              children: [],
            },
          ]
        },
        {
          id: 1000058,
          type: '$SECTION',
          dependencies: [],
          data: {
            className: 'wind-mit',
          },
          formData: {},
          className: 'test',
          children: [
            {
              id: 159,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Wind Mitigation',
              },
              formData: {},
              children: [],
            },
            {
              id: 160,
              component: '$INPUT',
              path: 'property.windMitigation.roofCovering',
              dependencies: [],
              data: {
                component: 'select',
                label: 'Roof Covering',
                size: '6',
              },
              formData: {
                path: 'property.windMitigation.roofCovering',
                type: 'string',
                required: true,
                metaData: {
                  enum: [
                    {
                      "label": "Non-FBC",
                      "answer": "Non-FBC"
                    },
                    {
                      "label": "FBC",
                      "answer": "FBC"
                    },
                    {
                      "label": "Other",
                      "answer": "Other"
                    }
                  ]
                },
              },
              children: [],
            },
            {
              id: 161,
              type: '$INPUT',
              path: 'property.windMitigation.floridaBuildingCodeWindSpeed',
              dependencies: [],
              data: {
                component: 'number',
                label: 'FBC Wind Speed',
                size: '6',
              },
              formData: {},
              children: [],
            },
            {
              id: 162,
              type: '$INPUT',
              path: 'property.windMitigation.roofDeckAttachment',
              dependencies: [],
              data: {
                component: 'select',
                label: 'Roof Deck Attachment',
                size: '6',
              },
              formData: {
                path: 'property.windMitigation.roofDeckAttachment',
                type: 'integer',
                required: true,
                metaData: {
                  enum: [
                    {
                      "label": "A",
                      "answer": "A"
                    },
                    {
                      "label": "B",
                      "answer": "B"
                    },
                    {
                      "label": "C",
                      "answer": "C"
                    },
                    {
                      "label": "D",
                      "answer": "D"
                    },
                    {
                      "label": "Concrete",
                      "answer": "Concrete"
                    },
                    {
                      "label": "Other",
                      "answer": "Other"
                    }
                  ]
                },
              },
              children: [],
            },
            {
              id: 163,
              type: '$INPUT',
              path: 'property.windMitigation.floridaBuildingCodeWindSpeedDesign',
              dependencies: [],
              data: {
                component: 'number',
                label: 'FBC Wind Speed Design',
                size: '6',
              },
              formData: {},
              children: [],
            },
            {
              id: 164,
              type: '$INPUT',
              path: 'property.windMitigation.roofToWallConnection',
              dependencies: [],
              data: {
                component: 'select',
                label: 'Roof to Wall Attachment',
                size: '6',
              },
              formData: {
                path: 'property.windMitigation.roofToWallConnection',
                type: 'string',
                required: true,
                metaData: {
                  enum: [
                    {
                      "label": "Toe Nails",
                      "answer": "Toe Nails"
                    },
                    {
                      "label": "Clips",
                      "answer": "Clips"
                    },
                    {
                      "label": "Single Wraps",
                      "answer": "Single Wraps"
                    },
                    {
                      "label": "Double Wraps",
                      "answer": "Double Wraps"
                    },
                    {
                      "label": "Other",
                      "answer": "Other"
                    }
                  ]
                },
              },
              children: [],
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
                segmented: true,
              },
              formData: {
                path: 'property.windMitigation.terrain',
                type: 'string',
                required: true,
                metaData: {
                  enum: [
                    {
                      "label": "B",
                      "answer": "B"
                    },
                    {
                      "label": "C",
                      "answer": "C"
                    },
                    {
                      "label": "HVHZ",
                      "answer": "HVHZ"
                    },
                    {
                      "label": "Other",
                      "answer": "Other"
                    }
                  ]
                },
              },
              children: [],
            },
            {
              id: 166,
              type: '$INPUT',
              path: 'property.windMitigation.roofGeometry',
              dependencies: [],
              data: {
                component: 'select',
                label: 'Roof Geometry',
                size: '6',
              },
              formData: {
                path: 'property.windMitigation.roofGeometry',
                type: 'string',
                required: true,
                metaData: {
                  enum: [
                    {
                      "label": "Flat",
                      "answer": "Flat"
                    },
                    {
                      "label": "Gable",
                      "answer": "Gable"
                    },
                    {
                      "label": "Hip",
                      "answer": "Hip"
                    },
                    {
                      "label": "Other",
                      "answer": "Other"
                    }
                  ]
                },
              },
              children: [],
            },
            {
              id: 167,
              type: '$INPUT',
              path: 'property.windMitigation.internalPressureDesign',
              dependencies: [],
              data: {
                component: 'select',
                label: 'Internal Pressure Design',
                size: '6',
              },
              formData: {
                path: 'property.windMitigation.internalPressureDesign',
                type: 'string',
                required: true,
                metaData: {
                  enum: [
                    {
                      "label": "Enclosed",
                      "answer": "Enclosed"
                    },
                    {
                      "label": "Partial",
                      "answer": "Partial"
                    },
                    {
                      "label": "Other",
                      "answer": "Other"
                    }
                  ]
                },
              },
              children: [],
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
                segmented: true,
              },
              formData: {
                path: 'property.windMitigation.secondaryWaterResistance',
                type: 'string',
                required: true,
                metaData: {
                  enum: [
                    {
                      "label": "Yes",
                      "answer": "Yes"
                    },
                    {
                      "label": "No",
                      "answer": "No"
                    },
                    {
                      "label": "Other",
                      "answer": "Other"
                    }
                  ]
                },
              },
              children: [],
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
                segmented: true,
              },
              formData: {
                path: 'property.windMitigation.windBorneDebrisRegion',
                type: 'string',
                required: true,
                metaData: {
                  enum: [
                    {
                      "label": "Yes",
                      "answer": "Yes"
                    },
                    {
                      "label": "No",
                      "answer": "No"
                    },
                    {
                      "label": "Other",
                      "answer": "Other"
                    }
                  ]
                },
              },
              children: [],
            },
            {
              id: 170,
              type: '$INPUT',
              dependencies: [],
              path: 'property.windMitigation.openingProtection',
              data: {
                component: 'select',
                label: 'Opening Protection:',
                size: '6',
              },
              formData: {
                path: 'property.windMitigation.openingProtection',
                type: 'string',
                required: true,
                metaData: {
                  enum: [
                    {
                      "label": "None",
                      "answer": "None"
                    },
                    {
                      "label": "Basic",
                      "answer": "Basic"
                    },
                    {
                      "label": "Hurricane",
                      "answer": "Hurricane"
                    },
                    {
                      "label": "Other",
                      "answer": "Other"
                    }
                  ]
                },
                children: [],
              },
              children: [],
            },
          ]
        },
      ],
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
            component: '$UNDERWRITING',
          },
          formData: {},
          children: [],
        },
      ],
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
              header: "Property Details",
              className :"property-details",
              type: "propertyDetails",
            }
          },
          formData: {},
          children: [],
        },
        {
          id: 1001,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$SUMMARY',
            extendedProperties: {
              header: "Quote Details",
              className :"quote-details",
              type: "entityDetails",
              details: [
                { format: 'currency', path: 'rating.totalPremium', label: 'Yearly Premium'},
                { format: 'currency', path: 'coverageLimits.dwelling.amount', label: 'A. Dwelling'},
                { format: 'currency', path: 'coverageLimits.otherStructures.amount', label: 'B. Other Structures'},
                { format: 'currency', path: 'coverageLimits.personalProperty.amount', label: 'C. Personal Property'},
                { format: 'currency', path: 'coverageLimits.lossOfUse.amount', label: 'D. Loss Of Use'},
                { format: 'currency', path: 'coverageLimits.personalLiability.amount', label: 'E. Personal Liability'},
                { format: 'currency', path: 'coverageLimits.medicalPayments.amount', label: 'F. Medical Payments'},
                { format: 'bool', path: 'coverageOptions.personalPropertyReplacementCost.answer', label: 'Personal Property Replacement Cost'},
                { format: 'currency', path: 'coverageLimits.moldProperty.amount', label: 'Mold Property'},
                { format: 'currency', path: 'coverageLimits.moldLiability.amount', label: 'Mold Liability'},
                { format: 'percent', path: 'coverageLimits.ordinanceOrLaw.amount', label: 'Ordinance or Law'},
                { format: 'currency', path: 'deductibles.allOtherPerils.amount', label: 'All Other Perils Deductible'},
                { format: 'percent', path: 'deductibles.hurricane.amount', label: 'Hurricane Deductible'},
                { format: 'currency', path: 'deductibles.hurricane.calculatedAmount', label: 'Calculated Hurricane Deductible'},
                { format: 'percent', path: 'deductibles.sinkhole.amount', label: 'Sinkhole Deductible', hideNoValue: true},
                { format: 'currency', path: 'deductibles.sinkhole.calculatedAmount', label: 'Calculated Sinkhole Deductible', hideNoValue: true}
              ]
            }
          },
          formData: {},
          children: [],
        },
        {
          id: 1002,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$SUMMARY',
            extendedProperties: {
              header: "Property Details",
              className :"property-details",
              type: "propertyDetails",
            }
          },
          formData: {},
          children: [],
        },
        {
          id: 1003,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$SUMMARY',
            extendedProperties: {
              secondaryHeader: "Primary Policyholder",
              className :"policyHolder-details",
              type: "policyHolderDetails",
              fieldPrefix: "policyHolders[0]"
            }
          },
          formData: {},
          children: [],
        },
        {
          id: 1004,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$SUMMARY',
            extendedProperties: {
              secondaryHeader: "Secondary Policyholder",
              className :"policyHolder-details",
              type: "policyHolderDetails",
              fieldPrefix: "policyHolders[1]"
            }
          },
          formData: {},
          children: [],
        },
        {
          id: 1005,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$SUMMARY',
            extendedProperties: {
              header: "Mailing Address",
              className :"mailing-address-details",
              type: "addressDetails",
              fieldPrefix: "policyHolderMailingAddress"
            }
          },
          formData: {},
          children: [],
        },
        {
          id: 1006,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$SUMMARY',
            extendedProperties: {
              header: "Additional Interests",
              className :"additional-interests-details",
              type: "additionalInterestDetails"
            }
          },
          formData: {},
          children: [],
        },
      ],
    },
  ]
};

export default mock;
