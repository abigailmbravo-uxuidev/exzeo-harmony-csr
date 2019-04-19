/* eslint-disable */
const mock = {
  pages: [
    {
      name: 'coverage',
      step: {},
      components: [
        {
          id: 1,
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
                size: '5',
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
          id: 1,
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$POLICYHOLDER',
            extendedProperties: {
              subscribe: true,
              watchField: 'removeSecondary',
            }
          },
          formData: {},
          children: [],
        },
        {
          id: 100,
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
              id: 17,
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
              id: 19,
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
          id: 101,
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
              id: 20,
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
              id: 21,
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
              id: 22,
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
              id: 23,
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
              id: 24,
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
              id: 25,
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
                    "label": "Masonry",
                    "answer": "MASONRY"
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
              id: 26,
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
              id: 27,
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
              id: 28,
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
              id: 29,
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
              id: 30,
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
              id: 31,
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
              id: 32,
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
              id: 33,
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
          id: 102,
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
              id: 34,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Coverages',
              },
              formData: {},
              children: [],
            },
            {
              id: 35,
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
              id: 36,
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
              id: 37,
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
              id: 38,
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
              id: 39,
              type: '$INPUT',
              path: 'coverageLimits.personalLiability.amount',
              dependencies: [],
              data: {
                component: 'select',
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
              id: 40,
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
          id: 103,
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
              id: 41,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Other Coverages',
              },
              formData: {},
              children: [],
            },
            {
              id: 42,
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
              id: 43,
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
              id: 44,
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
              id: 45,
              type: '$INPUT',
              path: 'coverageLimits.ordinanceOrLaw.amount',
              dependencies: [],
              data: {
                component: 'select',
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
          id: 104,
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
              id: 46,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Deductibles',
              },
              formData: {},
              children: [],
            },
            {
              id: 47,
              component: '$INPUT',
              path: 'deductibles.allOtherPerils.amount',
              dependencies: [],
              data: {
                component: 'select',
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
              id: 48,
              type: '$INPUT',
              path: 'deductibles.hurricane.amount',
              dependencies: [],
              data: {
                component: 'select',
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
              id: 49,
              type: '$INPUT',
              path: 'deductibles.sinkhole.amount',
              dependencies: [],
              data: {
                component: 'select',
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
          id: 104,
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
              id: 50,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Discounts',
              },
              formData: {},
              children: [],
            },
            {
              id: 51,
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
              id: 52,
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
              id: 53,
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
          id: 105,
          type: '$SECTION',
          dependencies: [],
          data: {
            className: 'wind-mit',
          },
          formData: {},
          className: 'test',
          children: [
            {
              id: 54,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Wind Mitigation',
              },
              formData: {},
              children: [],
            },
            {
              id: 55,
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
              id: 56,
              type: '$INPUT',
              path: 'property.windMitigation.floridaBuildingCodeWindSpeed',
              dependencies: [],
              data: {
                component: 'text',
                label: 'FBC Wind Speed',
                size: '6',
              },
              formData: {},
              children: [],
            },
            {
              id: 57,
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
              id: 58,
              type: '$INPUT',
              path: 'property.windMitigation.floridaBuildingCodeWindSpeedDesign',
              dependencies: [],
              data: {
                component: 'text',
                label: 'FBC Wind Speed Design',
                size: '6',
              },
              formData: {},
              children: [],
            },
            {
              id: 59,
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
              id: 60,
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
              id: 61,
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
              id: 62,
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
              id: 63,
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
              id: 64,
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
              id: 27,
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
    }
  ]
};

export default mock;
