/* eslint-disable */
const mock = {
  header: {
    showEffectiveDateButton: true,
    showReinstateButton: true,
    fields: [
      {
        value: 'policyHolder',
        component: 'Section',
        label: 'Policyholder'
      },
      { value: 'mailingAddress', component: 'Section' },
      { value: 'propertyAddress', component: 'Section' },
      { value: 'county', label: 'Property County' },
      { value: 'territory' },
      { value: 'constructionType' },
      { value: 'effectiveDate' },
      { value: 'cancellation' },
      { value: 'finalPayment', label: 'Final Payment' },
      { value: 'currentPremium', className: 'premium' }
    ]
  },
  pages: [
    {
      name: 'coverage',
      step: {},
      components: [
        {
          id: 1,
          type: '$SECTION',
          dependencies: [],
          data: {
            className: 'coverage-rating'
          },
          formData: {},
          children: [
            {
              id: 2,
              type: '$SECTION',
              dependencies: [],
              data: {
                className: 'coverage-premium'
              },
              formData: {},
              children: [
                {
                  id: 3,
                  type: '$TITLE',
                  dependencies: [],
                  data: {
                    text: 'Coverage and Premium'
                  },
                  formData: {}
                },
                {
                  id: 4,
                  type: '$SECTION',
                  dependencies: [],
                  data: {
                    className: 'row'
                  },
                  formData: {},
                  children: [
                    {
                      id: 5,
                      type: '$SECTION',
                      dependencies: [],
                      data: {
                        className: 'coverage table',
                        size: '4'
                      },
                      formData: {},
                      children: [
                        {
                          id: 6,
                          type: '$ENTITY_DETAILS',
                          dependencies: [],
                          data: {
                            extendedProperties: {
                              className: 'coverage',
                              details: [
                                {
                                  label: 'Coverage Limits',
                                  items: [
                                    {
                                      format: 'conditionalValue',
                                      path: 'none',
                                      conditions: [''],
                                      defaultValue: 'Value'
                                    }
                                  ]
                                },
                                {
                                  label: 'Dwelling Limit',
                                  items: [
                                    {
                                      format: 'currency',
                                      path: 'coverageLimits.dwelling.amount'
                                    }
                                  ]
                                },
                                {
                                  label: 'Other Structures Limit',
                                  items: [
                                    {
                                      format: 'currency',
                                      path:
                                        'coverageLimits.otherStructures.amount'
                                    }
                                  ]
                                },
                                {
                                  label: 'Personal Property Limit',
                                  items: [
                                    {
                                      format: 'currency',
                                      path:
                                        'coverageLimits.personalProperty.amount'
                                    }
                                  ]
                                },
                                {
                                  label: 'Loss of Use Limit',
                                  items: [
                                    {
                                      format: 'currency',
                                      path: 'coverageLimits.lossOfUse.amount'
                                    }
                                  ]
                                },
                                {
                                  label: 'Personal Liability Limit',
                                  items: [
                                    {
                                      format: 'currency',
                                      path:
                                        'coverageLimits.personalLiability.amount'
                                    }
                                  ]
                                },
                                {
                                  label: 'Medical Payments to Others Limit',
                                  items: [
                                    {
                                      format: 'currency',
                                      path:
                                        'coverageLimits.medicalPayments.amount'
                                    }
                                  ]
                                }
                              ]
                            }
                          },
                          formData: {},
                          children: []
                        }
                      ]
                    },
                    {
                      id: 7,
                      type: '$SECTION',
                      dependencies: [],
                      data: {
                        className: 'coverage table',
                        size: '4'
                      },
                      formData: {},
                      children: [
                        {
                          id: 8,
                          type: '$ENTITY_DETAILS',
                          dependencies: [],
                          data: {
                            extendedProperties: {
                              className: 'coverage',
                              details: [
                                {
                                  label: 'Coverage Limits',
                                  items: [
                                    {
                                      format: 'conditionalValue',
                                      path: 'none',
                                      conditions: [''],
                                      defaultValue: 'Value'
                                    }
                                  ]
                                },
                                {
                                  label: 'Mold Property Limit',
                                  items: [
                                    {
                                      format: 'currency',
                                      path: 'coverageLimits.moldProperty.amount'
                                    }
                                  ]
                                },
                                {
                                  label: 'Mold Liability Limit',
                                  items: [
                                    {
                                      format: 'currency',
                                      path:
                                        'coverageLimits.moldLiability.amount'
                                    }
                                  ]
                                },
                                {
                                  label: 'Personal Property Repl Cost',
                                  items: [
                                    {
                                      format: 'bool',
                                      path:
                                        'coverageOptions.personalPropertyReplacementCost.answer'
                                    }
                                  ]
                                },
                                {
                                  label: 'Ordinance or Law Coverage Limit',
                                  items: [
                                    {
                                      format: 'percent',
                                      path:
                                        'coverageLimits.ordinanceOrLaw.amount'
                                    }
                                  ]
                                },
                                {
                                  label: 'Incidental Occ Main',
                                  items: [
                                    {
                                      format: 'bool',
                                      path:
                                        'coverageOptions.propertyIncidentalOccupanciesMainDwelling.answer'
                                    }
                                  ]
                                },
                                {
                                  label: 'Incidental Occ Other',
                                  items: [
                                    {
                                      format: 'bool',
                                      path:
                                        'coverageOptions.propertyIncidentalOccupanciesOtherStructures.answer'
                                    }
                                  ]
                                },
                                {
                                  label: 'Incidental Occ Liability',
                                  items: [
                                    {
                                      format: 'bool',
                                      path:
                                        'coverageOptions.liabilityIncidentalOccupancies.answer'
                                    }
                                  ]
                                }
                              ]
                            }
                          },
                          formData: {},
                          children: []
                        }
                      ]
                    },
                    {
                      id: 9,
                      type: '$SECTION',
                      dependencies: [],
                      data: {
                        className: 'discount-surcharge table',
                        size: '4'
                      },
                      formData: {},
                      children: [
                        {
                          id: 10,
                          type: '$ENTITY_DETAILS',
                          dependencies: [],
                          data: {
                            extendedProperties: {
                              className: 'coverage',
                              details: [
                                {
                                  label: 'Discount/Surcharge',
                                  items: [
                                    {
                                      format: 'conditionalValue',
                                      path: 'none',
                                      conditions: [''],
                                      defaultValue: 'Value'
                                    }
                                  ]
                                },
                                {
                                  label: 'Townhouse/Rowhouse',
                                  items: [
                                    {
                                      format: 'bool',
                                      path: 'property.townhouseRowhouse'
                                    }
                                  ]
                                },
                                {
                                  label: 'Property Ever Rented',
                                  items: [
                                    {
                                      format: 'conditionalBool',
                                      path: 'underwritingAnswers.rented.answer',
                                      conditions: ['Yes']
                                    }
                                  ]
                                },
                                {
                                  label: 'Seasonally Occupied',
                                  items: [
                                    {
                                      format: 'conditionalBool',
                                      path:
                                        'underwritingAnswers.monthsOccupied.answer',
                                      conditions: ['0-3', '4-6']
                                    }
                                  ]
                                },
                                {
                                  label: 'No Prior Insurance',
                                  items: [
                                    {
                                      format: 'conditionalBool',
                                      path:
                                        'underwritingAnswers.noPriorInsuranceSurcharge.answer',
                                      conditions: ['Yes']
                                    }
                                  ]
                                },
                                {
                                  label: 'Burglar Alarm',
                                  items: [
                                    {
                                      format: 'bool',
                                      path: 'property.burglarAlarm'
                                    }
                                  ]
                                },
                                {
                                  label: 'Fire Alarm',
                                  items: [
                                    {
                                      format: 'bool',
                                      path: 'property.fireAlarm'
                                    }
                                  ]
                                },
                                {
                                  label: 'Sprinkler',
                                  items: [
                                    {
                                      format: 'conditionalValue',
                                      path: 'property.sprinkler',
                                      conditions: ['N'],
                                      defaultValue: 'No'
                                    }
                                  ]
                                },
                                {
                                  label: 'Wind Mit Factor',
                                  items: [
                                    {
                                      format: '',
                                      path:
                                        'rating.worksheet.elements.windMitigationFactors.windMitigationDiscount'
                                    }
                                  ]
                                }
                              ]
                            }
                          },
                          formData: {},
                          children: []
                        }
                      ]
                    }
                  ]
                },
                {
                  id: 11,
                  type: '$SECTION',
                  dependencies: [],
                  data: {
                    className: 'row'
                  },
                  formData: {},
                  children: [
                    {
                      id: 12,
                      type: '$SECTION',
                      dependencies: [],
                      data: {
                        className: 'deductible table',
                        size: '4'
                      },
                      formData: {},
                      children: [
                        {
                          id: 13,
                          type: '$ENTITY_DETAILS',
                          dependencies: [],
                          data: {
                            extendedProperties: {
                              className: 'deductible',
                              details: [
                                {
                                  label: 'Deductible',
                                  items: [
                                    {
                                      format: 'conditionalValue',
                                      path: 'none',
                                      conditions: [''],
                                      defaultValue: 'Value'
                                    }
                                  ]
                                },
                                {
                                  label: 'All Other Perils',
                                  items: [
                                    {
                                      format: 'currency',
                                      path: 'deductibles.allOtherPerils.amount'
                                    }
                                  ]
                                },
                                {
                                  label: 'Hurricane',
                                  items: [
                                    {
                                      format: 'percent',
                                      path: 'deductibles.hurricane.amount'
                                    }
                                  ]
                                },
                                {
                                  label: 'Sinkhole',
                                  items: [
                                    {
                                      format: 'conditionalPercent',
                                      path: 'deductibles.sinkhole.amount',
                                      conditions: [''],
                                      defaultValue: 'No'
                                    }
                                  ]
                                }
                              ]
                            }
                          },
                          formData: {},
                          children: []
                        }
                      ]
                    },
                    {
                      id: 14,
                      type: '$SECTION',
                      dependencies: [],
                      data: {
                        className: 'premium table',
                        size: '4'
                      },
                      formData: {},
                      children: [
                        {
                          id: 15,
                          type: '$ENTITY_DETAILS',
                          dependencies: [],
                          data: {
                            extendedProperties: {
                              className: 'premium',
                              details: [
                                {
                                  label: 'Premium',
                                  items: [
                                    {
                                      format: 'conditionalValue',
                                      path: 'none',
                                      conditions: [''],
                                      defaultValue: 'Value'
                                    }
                                  ]
                                },
                                {
                                  label: 'Current Premium',
                                  items: [
                                    {
                                      format: 'currency',
                                      path: 'summaryLedger.currentPremium'
                                    }
                                  ]
                                },
                                {
                                  label: 'Initial Premium',
                                  items: [
                                    {
                                      format: 'currency',
                                      path: 'summaryLedger.initialPremium'
                                    }
                                  ]
                                },
                                {
                                  label: 'Balance Due',
                                  items: [
                                    {
                                      format: 'currency',
                                      path:
                                        'summaryLedger.balance.$numberDecimal'
                                    }
                                  ]
                                }
                              ]
                            }
                          },
                          formData: {},
                          children: []
                        }
                      ]
                    },
                    {
                      id: 16,
                      type: '$SECTION',
                      dependencies: [],
                      data: {
                        className: 'billing table',
                        size: '4'
                      },
                      formData: {},
                      children: [
                        {
                          id: 17,
                          type: '$BILLING_TABLE',
                          size: '4',
                          dependencies: [],
                          data: {},
                          formData: {},
                          children: []
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: 18,
              type: '$SECTION',
              dependencies: [],
              data: {
                className: 'home-location'
              },
              formData: {},
              children: [
                {
                  id: 19,
                  type: '$TITLE',
                  dependencies: [],
                  data: {
                    text: 'Home and Location'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: 20,
                  type: '$ENTITY_DETAILS',
                  dependencies: [],
                  data: {
                    extendedProperties: {
                      className: 'home-and-location-1',
                      details: [
                        {
                          label: 'Year Home Built',
                          items: [{ format: '', path: 'property.yearBuilt' }]
                        },
                        {
                          label: 'Protection Class',
                          items: [
                            { format: '', path: 'property.protectionClass' }
                          ]
                        },
                        {
                          label: 'Dist. to Tidal Waters',
                          items: [
                            {
                              format: 'feet',
                              path: 'property.distanceToTidalWater'
                            }
                          ]
                        },
                        {
                          label: 'Residence Type',
                          items: [
                            { format: '', path: 'property.residenceType' }
                          ]
                        }
                      ]
                    }
                  },
                  formData: {},
                  children: []
                },
                {
                  id: 21,
                  type: '$APPRAISER',
                  dependencies: [],
                  data: {},
                  formData: {},
                  children: []
                },
                {
                  id: 22,
                  type: '$ENTITY_DETAILS',
                  dependencies: [],
                  data: {
                    extendedProperties: {
                      className: 'home-and-location-2',
                      details: [
                        {
                          label: 'Construction',
                          items: [
                            { format: '', path: 'property.constructionType' }
                          ]
                        },
                        {
                          label: 'BCEG',
                          items: [
                            {
                              format: '',
                              path: 'property.buildingCodeEffectivenessGrading'
                            }
                          ]
                        },
                        {
                          label: 'Dist. to Fire Hydrant',
                          items: [
                            {
                              format: 'feet',
                              path: 'property.distanceToFireHydrant'
                            }
                          ]
                        },
                        {
                          label: 'Square Footage',
                          items: [{ format: '', path: 'property.squareFeet' }]
                        },
                        {
                          label: 'Territory',
                          items: [
                            {
                              format: '',
                              path:
                                'rating.worksheet.elements.territoryFactors.name'
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
                  id: 23,
                  type: '$ENTITY_DETAILS',
                  dependencies: [],
                  data: {
                    extendedProperties: {
                      className: 'home-and-location-3',
                      details: [
                        {
                          label: 'Year Roof Built',
                          items: [{ format: '', path: 'property.yearOfRoof' }]
                        },
                        {
                          label: 'Family Units',
                          items: [{ format: '', path: 'property.familyUnits' }]
                        },
                        {
                          label: 'Dist. to Fire Station',
                          items: [
                            {
                              format: 'miles',
                              path: 'property.distanceToFireStation'
                            }
                          ]
                        },
                        {
                          label: 'Flood Zone',
                          items: [{ format: '', path: 'property.floodZone' }]
                        },
                        {
                          label: 'IGD ID',
                          items: [{ format: '', path: 'property.id' }]
                        }
                      ]
                    }
                  },
                  formData: {},
                  children: []
                }
              ]
            },
            {
              id: 24,
              type: '$SECTION',
              dependencies: [],
              data: {
                className: 'wind-mitigation'
              },
              formData: {},
              children: [
                {
                  id: 25,
                  type: '$TITLE',
                  dependencies: [],
                  data: {
                    text: 'Wind Mitigation'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: 26,
                  type: '$SECTION',
                  dependencies: [],
                  data: {
                    className: 'wind-mitigation-1'
                  },
                  formData: {},
                  children: [
                    {
                      id: 27,
                      type: '$ENTITY_DETAILS',
                      dependencies: [],
                      data: {
                        extendedProperties: {
                          className: 'home-and-location',
                          details: [
                            {
                              label: 'Roof Covering',
                              items: [
                                {
                                  format: '',
                                  path: 'property.windMitigation.roofCovering'
                                }
                              ]
                            },
                            {
                              label: 'Roof Geometry',
                              items: [
                                {
                                  format: '',
                                  path: 'property.windMitigation.roofGeometry'
                                }
                              ]
                            },
                            {
                              label: 'FBC Wind Speed',
                              items: [
                                {
                                  format: '',
                                  path:
                                    'property.windMitigation.floridaBuildingCodeWindSpeed'
                                }
                              ]
                            },
                            {
                              label: 'Internal Pressure Design',
                              items: [
                                {
                                  format: '',
                                  path:
                                    'property.windMitigation.internalPressureDesign'
                                }
                              ]
                            },
                            {
                              label: 'Roof Deck Attachment',
                              items: [
                                {
                                  format: '',
                                  path:
                                    'property.windMitigation.roofDeckAttachment'
                                }
                              ]
                            },
                            {
                              label: 'Secondary Water Resistance (SWR)',
                              items: [
                                {
                                  format: '',
                                  path:
                                    'property.windMitigation.secondaryWaterResistance'
                                }
                              ]
                            },
                            {
                              label: 'FBC Wind Speed Design',
                              items: [
                                {
                                  format: '',
                                  path:
                                    'property.windMitigation.floridaBuildingCodeWindSpeedDesign'
                                }
                              ]
                            },
                            {
                              label: 'Wind Borne Debris Region (WBDR)',
                              items: [
                                {
                                  format: '',
                                  path:
                                    'property.windMitigation.windBorneDebrisRegion'
                                }
                              ]
                            },
                            {
                              label: 'Roof to Wall Attachment',
                              items: [
                                {
                                  format: '',
                                  path:
                                    'property.windMitigation.roofToWallConnection'
                                }
                              ]
                            },
                            {
                              label: 'Opening Protection',
                              items: [
                                {
                                  format: '',
                                  path:
                                    'property.windMitigation.openingProtection'
                                }
                              ]
                            },
                            {
                              label: 'Terrain',
                              items: [
                                {
                                  format: '',
                                  path: 'property.windMitigation.terrain'
                                }
                              ]
                            },
                            {
                              label: 'Wind Mit Factor',
                              items: [
                                {
                                  format: '',
                                  path:
                                    'rating.worksheet.elements.windMitigationFactors.windMitigationDiscount'
                                }
                              ]
                            }
                          ]
                        }
                      },
                      formData: {},
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'policyHolder',
      step: {},
      components: [
        {
          id: 230340305495959,
          type: '$SECTION',
          dependencies: [],
          data: {
            className: 'policyholder-agent'
          },
          formData: {},
          children: [
            {
              id: 32393759439222,
              type: '$POLICYHOLDER_AGENT',
              dependencies: [],
              data: {
                extendedProperties: {
                  subscribe: true
                }
              },
              formData: {},
              children: []
            }
          ]
        }
      ]
    },
    {
      name: 'notes',
      step: {},
      components: [
        {
          id: 5101254,
          type: '$SECTION',
          dependencies: [],
          data: {},
          formData: {},
          children: [
            {
              id: 5152019255,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'History'
              },
              formData: {},
              children: []
            },
            {
              id: 515255,
              type: '$NOTES_FILES',
              dependencies: [],
              data: {},
              formData: {},
              children: []
            }
          ]
        }
      ]
    },
    {
      name: 'billing',
      step: {},
      components: [
        {
          id: 1,
          type: '$SECTION',
          dependencies: [],
          data: {
            className: 'mortgage-billing'
          },
          formData: {},
          children: [
            {
              id: 10,
              type: '$CUSTOM',
              dependencies: [],
              data: {
                component: '$BILLING',
                extendedProperties: {
                  billingHeader: 'Billing',
                  billingClassName: 'billing',
                  paymentHistoryHeader: 'Payments'
                }
              },
              formData: {
                required: true
              }
            },
            {
              id: 11,
              type: '$TITLE',
              dependencies: [],
              data: { text: 'Additional Interests' },
              formData: {}
            },
            {
              id: 12,
              type: '$CUSTOM',
              dependencies: [{ 'rating.worksheet': true }],
              data: {
                component: '$ADDITIONAL_INTERESTS',
                extendedProperties: {
                  isPolicy: true,
                  types: [
                    'mortgagee',
                    'additionalInsured',
                    'additionalInterest',
                    'premiumFinance',
                    'billPayer'
                  ],
                  displayReferenceNumber: true
                }
              },
              formData: {},
              children: []
            }
          ]
        }
      ]
    },
    {
      name: 'cancel',
      step: {},
      components: [
        {
          id: 100100,
          type: '$SECTION',
          dependencies: [],
          data: {
            className: 'cancel'
          },
          formData: {},
          children: [
            {
              id: 100101,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Cancel Policy'
              },
              formData: {},
              children: []
            },
            {
              id: 100102,
              type: '$CANCEL_TYPE',
              dependencies: [],
              data: {
                extendedProperties: {
                  subscribe: true
                }
              },
              formData: {},
              children: []
            },
            {
              id: 1001023,
              type: '$INPUT',
              path: 'cancel.effectiveDate',
              dependencies: [],
              data: {
                component: 'date',
                label: 'Effective Date',
                size: '2',
                extendedProperties: {},
                validation: ['isValidDate']
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
              id: 1001024,
              type: '$CANCEL_REASON',
              dependencies: [],
              data: {
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
          id: 54543543353,
          type: '$SECTION',
          dependencies: [],
          data: {
            className: 'payments'
          },
          formData: {},
          children: [
            {
              id: 4543543353,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Payments'
              },
              formData: {}
            },
            {
              id: 54543543353,
              type: '$SECTION',
              dependencies: [],
              data: {
                className: 'billing',
                size: '10',
                extendedProperties: {}
              },
              formData: {},
              children: [
                {
                  id: 20,
                  type: '$POLICY_BILLING',
                  dependencies: [],
                  data: {
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
              id: 454333335323,
              type: '$INPUT',
              path: 'cancel.equityDate',
              dependencies: [],
              data: {
                component: 'text',
                label: 'Equity Date',
                size: '2',
                disabled: true
              },
              formData: {},
              children: []
            },
            {
              id: 454337878853231,
              type: '$PAYMENT_HISTORY_TABLE',
              dependencies: [],
              data: {
                text: 'Payments'
              },
              formData: {}
            }
          ]
        },
        {
          id: 5497775432943353,
          type: '$SECTION',
          dependencies: [],
          data: {
            className: 'claims'
          },
          formData: {},
          children: [
            {
              id: 5497775432943354,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Claims'
              },
              formData: {},
              children: []
            },
            {
              id: 5497775432943355,
              type: '$CLAIMS_TABLE',
              dependencies: [],
              data: {},
              formData: {}
            }
          ]
        }
      ]
    },
    {
      name: 'endorsements',
      step: {},
      components: [
        {
          id: 34895439847239847,
          type: '$SECTION',
          dependencies: [],
          data: {
            className: 'endorsements'
          },
          formData: {},
          children: [
            {
              id: 34895439847239848,
              type: '$ENDORSEMENTS_MENU',
              dependencies: [],
              data: {
                extendedProperties: {
                  subscribe: true
                }
              },
              formData: {},
              children: []
            },
            {
              id: 44895439847239848,
              type: '$ENDORSEMENTS_WATCHER',
              dependencies: [],
              data: {
                extendedProperties: {
                  subscribe: true
                }
              },
              formData: {},
              children: []
            },
            {
              id: 34895439847239849,
              type: '$SECTION',
              dependencies: [],
              data: {
                className: 'coverage-scroll'
              },
              formData: {},
              children: [
                {
                  id: '34895439847239849',
                  type: '$TITLE',
                  dependencies: [],
                  data: {
                    text: 'Coverage'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: 34895539847239855,
                  type: '$SECTION',
                  dependencies: [],
                  data: {
                    className: 'coverage-left',
                    size: '6'
                  },
                  formData: {},
                  children: [
                    {
                      id: '398ce68d-839c-4a49-bbf2-92fcc275da40',
                      type: '$INPUT',
                      path: 'coverageLimits.dwelling.value',
                      dependencies: [],
                      data: {
                        component: 'currency',
                        label: 'Dwelling (A)',
                        validation: ['isDwellingRange'],
                        extendedProperties: {
                          format: 'currency',
                          displayRange: true,
                          min: 'coverageLimits.dwelling.minAmount',
                          max: 'coverageLimits.dwelling.maxAmount'
                        }
                      },
                      formData: {
                        path: 'coverageLimits.dwelling.value',
                        type: 'integer',
                        required: true,
                        metaData: {
                          target:
                            '${format.toCurrency(it._TEMP_INITIAL_VALUES.coverageLimits.dwelling.value)}'
                        }
                      },
                      children: []
                    },
                    {
                      id: '398ce68d-839c-4a49-bbf2-92fcc275da40',
                      type: '$INPUT',
                      path: 'coverageLimits.otherStructures.amount',
                      dependencies: [],
                      data: {
                        disabled: true,
                        component: 'currency',
                        label: 'Other Structures (B)',
                        extendedProperties: {}
                      },
                      formData: {
                        path: 'coverageLimits.otherStructures.amount',
                        type: 'integer',
                        required: true,
                        metaData: {
                          target:
                            '${format.toCurrency(Math.ceil(((it.coverageLimits.otherStructures.value / 100) * it.coverageLimits.dwelling.value)))}'
                        }
                      },
                      children: []
                    },
                    {
                      id: '498ce68d-839c-4a49-bbf2-92fcc275da49',
                      type: '$INPUT',
                      path: 'coverageLimits.otherStructures.value',
                      dependencies: [],
                      data: {
                        component: 'selectInteger',
                        label: 'Other Structures %',
                        dataSource: [
                          { label: '0%', answer: 0 },
                          { label: '2%', answer: 2 },
                          { label: '5%', answer: 5 },
                          { label: '10%', answer: 10 }
                        ],
                        extendedProperties: {}
                      },
                      formData: {
                        path: 'coverageLimits.otherStructures.value',
                        type: 'integer',
                        required: true,
                        metaData: {
                          target:
                            '${format.toPercent(it._TEMP_INITIAL_VALUES.coverageLimits.otherStructures.value)}'
                        }
                      },
                      children: []
                    },
                    {
                      id: '398ce68d-839c-4a49-bbf2-92fcc275da51',
                      type: '$INPUT',
                      path: 'coverageLimits.personalProperty.amount',
                      dependencies: [],
                      data: {
                        disabled: true,
                        component: 'currency',
                        label: 'Personal Property (C)',
                        extendedProperties: {}
                      },
                      formData: {
                        path: 'coverageLimits.personalProperty.amount',
                        type: 'integer',
                        required: true,
                        metaData: {
                          target:
                            '${format.toCurrency(Math.ceil(((it.coverageLimits.personalProperty.value / 100) * it.coverageLimits.dwelling.value)))}'
                        }
                      },
                      children: []
                    },
                    {
                      id: '398ce68d-839c-4a49-bbf2-92fcc275da52',
                      type: '$INPUT',
                      path: 'coverageLimits.personalProperty.value',
                      dependencies: [],
                      data: {
                        component: 'selectInteger',
                        label: 'Personal Property %',
                        dataSource: [
                          { label: '0%', answer: 0 },
                          { label: '25%', answer: 25 },
                          { label: '35%', answer: 35 },
                          { label: '50%', answer: 50 }
                        ],
                        extendedProperties: {}
                      },
                      formData: {
                        path: 'coverageLimits.personalProperty.value',
                        type: 'integer',
                        required: true,
                        metaData: {
                          target:
                            '${format.toPercent(it._TEMP_INITIAL_VALUES.coverageLimits.personalProperty.value)}'
                        }
                      },
                      children: []
                    },
                    {
                      id: '398ce68d-839c-4a49-bbf2-92fcc275da53',
                      type: '$INPUT',
                      path: 'coverageLimits.lossOfUse.amount',
                      dependencies: [],
                      data: {
                        disabled: true,
                        component: 'currency',
                        label: 'Loss of Use (D)',
                        extendedProperties: {}
                      },
                      formData: {
                        path: 'coverageLimits.lossOfUse.amount',
                        type: 'integer',
                        required: true,
                        metaData: {
                          target:
                            '${format.toCurrency(Math.ceil(((it.coverageLimits.lossOfUse.value / 100) * it.coverageLimits.dwelling.value)))}'
                        }
                      },
                      children: []
                    },
                    {
                      id: '398ce68d-839c-4a49-bbf2-92fcc275da52',
                      type: '$INPUT',
                      path: 'coverageLimits.personalLiability.value',
                      dependencies: [],
                      data: {
                        component: 'selectInteger',
                        label: 'Personal Liability (E)',
                        dataSource: [
                          { label: '$ 100,000', answer: 100000 },
                          { label: '$ 300,000', answer: 300000 }
                        ],
                        extendedProperties: {}
                      },
                      formData: {
                        path: 'coverageLimits.personalLiability.value',
                        type: 'integer',
                        required: true,
                        metaData: {
                          target:
                            '${format.toCurrency(it._TEMP_INITIAL_VALUES.coverageLimits.personalLiability.value)}'
                        }
                      },
                      children: []
                    },
                    {
                      id: '398ce68d-839c-4a49-bbf2-92fcc275da55',
                      type: '$INPUT',
                      path: 'coverageLimits.medicalPayments.amount',
                      dependencies: [],
                      data: {
                        disabled: true,
                        component: 'currency',
                        label: 'Medical Payments (F)',
                        extendedProperties: {}
                      },
                      formData: {
                        path: 'coverageLimits.medicalPayments.amount',
                        type: 'integer',
                        required: true,
                        metaData: {
                          target:
                            '${format.toCurrency(it._TEMP_INITIAL_VALUES.coverageLimits.medicalPayments.amount)}'
                        }
                      },
                      children: []
                    },
                    {
                      id: '398ce68d-839c-4a49-bbf2-92fcc275da56',
                      type: '$INPUT',
                      path: 'coverageLimits.moldProperty.amount',
                      dependencies: [],
                      data: {
                        component: 'selectInteger',
                        label: 'Mold Property',
                        extendedProperties: {},
                        dataSource: [
                          { label: '$ 10,000', answer: 10000 },
                          { label: '$ 25,000', answer: 25000 },
                          { label: '$ 50,000', answer: 50000 }
                        ]
                      },
                      formData: {
                        path: 'coverageLimits.moldProperty.amount',
                        type: 'integer',
                        required: true,
                        metaData: {
                          target:
                            '${format.toCurrency(it._TEMP_INITIAL_VALUES.coverageLimits.moldProperty.amount)}'
                        }
                      },
                      children: []
                    },
                    {
                      id: '398ce68d-839c-4a49-bbf2-92fcc275da57',
                      type: '$INPUT',
                      path: 'coverageLimits.moldLiability.amount',
                      dependencies: [],
                      data: {
                        component: 'selectInteger',
                        label: 'Mold Liability',
                        extendedProperties: {},
                        dataSource: [
                          { label: '$ 50,000', answer: 50000 },
                          { label: '$ 100,000', answer: 100000 }
                        ]
                      },
                      formData: {
                        path: 'coverageLimits.moldLiability.amount',
                        type: 'integer',
                        required: true,
                        metaData: {
                          target:
                            '${format.toCurrency(it._TEMP_INITIAL_VALUES.coverageLimits.moldLiability.amount)}'
                        }
                      },
                      children: []
                    },
                    {
                      id: '398ce68d-839c-4a49-bbf2-92fcc275da58',
                      type: '$INPUT',
                      path: 'deductibles.allOtherPerils.value',
                      dependencies: [],
                      data: {
                        component: 'selectInteger',
                        label: 'AOP Deductible',
                        extendedProperties: {},
                        dataSource: [
                          { label: '$ 500', answer: 500 },
                          { label: '$ 1,000', answer: 1000 },
                          { label: '$ 2,500', answer: 2500 }
                        ]
                      },
                      formData: {
                        path: 'deductibles.allOtherPerils.value',
                        type: 'integer',
                        required: true,
                        metaData: {
                          target:
                            '${format.toCurrency(it._TEMP_INITIAL_VALUES.deductibles.allOtherPerils.value)}'
                        }
                      },
                      children: []
                    },
                    {
                      id: '398ce68d-839c-4a49-bbf2-92fcc275da59',
                      type: '$INPUT',
                      path: 'deductibles.allOtherPerils.value',
                      dependencies: [],
                      data: {
                        component: 'selectInteger',
                        label: 'Hurricane Deductible',
                        extendedProperties: {},
                        dataSource: [
                          { label: '2% of Dwelling Limit', answer: 2 },
                          { label: '5% of Dwelling Limit', answer: 5 },
                          { label: '10% of Dwelling Limit', answer: 10 }
                        ]
                      },
                      formData: {
                        path: 'deductibles.allOtherPerils.value',
                        type: 'integer',
                        required: true,
                        metaData: {
                          target:
                            '${format.toCurrency(it._TEMP_INITIAL_VALUES.deductibles.allOtherPerils.value)}'
                        }
                      },
                      children: []
                    },
                    {
                      id: '4cbef727-5327-42f8-b62c-92fcc275da60',
                      type: '$INPUT',
                      path: 'coverageOptions.sinkholePerilCoverage.answer',
                      dependencies: [],
                      data: {
                        component: 'select',
                        label: 'Sinkhole',

                        dataSource: [
                          { answer: false, label: 'Coverage Excluded' },
                          { answer: true, label: '10% of Dwelling Limit' }
                        ],
                        extendedProperties: {}
                      },
                      formData: {
                        path: 'coverageOptions.sinkholePerilCoverage.answer',
                        type: 'integer',
                        required: true,
                        metaData: {
                          target:
                            "${it._TEMP_INITIAL_VALUES.coverageOptions.sinkholePerilCoverage.answer === 'true' || it._TEMP_INITIAL_VALUES.coverageOptions.sinkholePerilCoverage.answer === true ? '10% of Dwelling Limit' : 0}"
                        }
                      },
                      children: []
                    }
                  ]
                },
                {
                  id: 34895539847239855,
                  type: '$SECTION',
                  dependencies: [],
                  data: {
                    className: 'coverage-right',
                    size: '6'
                  },
                  formData: {},
                  children: [
                    {
                      id: 'b141e258-5074-4ba1-90bc-54864c4a69c6',
                      type: '$INPUT',
                      path:
                        'coverageOptions.personalPropertyReplacementCost.answer',
                      dependencies: [],
                      data: {
                        component: 'radio',
                        label: 'Personal Property Repl Cost',
                        segmented: true,
                        extendedProperties: {
                          subscribe: true
                        }
                      },
                      formData: {
                        path:
                          'coverageOptions.personalPropertyReplacementCost.answer',
                        type: 'boolean',
                        required: true,
                        metaData: {
                          enum: [
                            { label: 'No', answer: false },
                            { label: 'Yes', answer: true }
                          ],
                          target:
                            '${format.boolToYesNo(it._TEMP_INITIAL_VALUES.coverageOptions.personalPropertyReplacementCost.answer)}'
                        }
                      },
                      children: []
                    },
                    {
                      id: '398ce68d-839c-4a49-bbf2-54864c4a69c7',
                      type: '$INPUT',
                      path: 'coverageLimits.ordinanceOrLaw.amount',
                      dependencies: [],
                      data: {
                        component: 'selectInteger',
                        label: 'Ordinance or Law',
                        extendedProperties: {},
                        dataSource: [
                          { label: '25% of Dwelling Limit', answer: 25 },
                          { label: '50% of Dwelling Limit', answer: 50 }
                        ]
                      },
                      formData: {
                        path: 'coverageLimits.ordinanceOrLaw.amount',
                        type: 'integer',
                        required: true,
                        metaData: {
                          target:
                            '${format.toCurrency(it._TEMP_INITIAL_VALUES.coverageLimits.ordinanceOrLaw.amount)}'
                        }
                      },
                      children: []
                    },
                    {
                      id: 'b141e258-5074-4ba1-90bc-54864c4a69d1',
                      type: '$INPUT',
                      path:
                        'coverageOptions.propertyIncidentalOccupanciesMainDwelling.answer',
                      dependencies: [],
                      data: {
                        component: 'radio',
                        label: 'Incidental Occ Main',
                        segmented: true,
                        extendedProperties: {
                          subscribe: true
                        }
                      },
                      formData: {
                        path:
                          'coverageOptions.propertyIncidentalOccupanciesMainDwelling.answer',
                        type: 'boolean',
                        required: true,
                        metaData: {
                          enum: [
                            { label: 'No', answer: false },
                            { label: 'Yes', answer: true }
                          ],
                          target:
                            '${format.boolToYesNo(it._TEMP_INITIAL_VALUES.coverageOptions.propertyIncidentalOccupanciesMainDwelling.answer)}'
                        }
                      },
                      children: []
                    },
                    {
                      id: 'b141e258-5074-4ba1-90bc-54864c4a69d2',
                      type: '$INPUT',
                      path:
                        'coverageOptions.propertyIncidentalOccupanciesOtherStructures.answer',
                      dependencies: [],
                      data: {
                        component: 'radio',
                        label: 'Incidental Occ Other',
                        segmented: true,
                        extendedProperties: {
                          subscribe: true
                        }
                      },
                      formData: {
                        path:
                          'coverageOptions.propertyIncidentalOccupanciesOtherStructures.answer',
                        type: 'boolean',
                        required: true,
                        metaData: {
                          enum: [
                            { label: 'No', answer: false },
                            { label: 'Yes', answer: true }
                          ],
                          target:
                            '${format.boolToYesNo(it._TEMP_INITIAL_VALUES.coverageOptions.propertyIncidentalOccupanciesOtherStructures.answer)}'
                        }
                      },
                      children: []
                    },
                    {
                      id: 'b141e258-5074-4ba1-90bc-54864c4a69d3',
                      type: '$INPUT',
                      path:
                        'coverageOptions.liabilityIncidentalOccupancies.answer',
                      dependencies: [],
                      data: {
                        disabled: true,
                        component: 'radio',
                        label: 'Incidental Occ Liability',
                        segmented: true,
                        extendedProperties: {
                          subscribe: true
                        }
                      },
                      formData: {
                        path:
                          'coverageOptions.liabilityIncidentalOccupancies.answer',
                        type: 'boolean',
                        required: true,
                        metaData: {
                          enum: [
                            { label: 'No', answer: false },
                            { label: 'Yes', answer: true }
                          ],
                          target:
                            '${format.boolToYesNo(it._TEMP_INITIAL_VALUES.coverageOptions.liabilityIncidentalOccupancies.answer)}'
                        }
                      },
                      children: []
                    },
                    {
                      id: 'b141e258-5074-4ba1-90bc-54864c4a69d4',
                      type: '$INPUT',
                      path: 'property.townhouseRowhouse',
                      dependencies: [],
                      data: {
                        component: 'radio',
                        label: 'Townhouse / Rowhouse',
                        segmented: true,
                        extendedProperties: {
                          subscribe: true
                        }
                      },
                      formData: {
                        path: 'property.townhouseRowhouse',
                        type: 'boolean',
                        required: true,
                        metaData: {
                          enum: [
                            { label: 'No', answer: false },
                            { label: 'Yes', answer: true }
                          ],
                          target:
                            '${format.boolToYesNo(it._TEMP_INITIAL_VALUES.property.townhouseRowhouse)}'
                        }
                      },
                      children: []
                    },
                    {
                      id: '398ce68d-839c-4a49-bbf2-54864c4a69d5',
                      type: '$INPUT',
                      path: 'underwritingAnswers.rented.answer',
                      dependencies: [],
                      data: {
                        component: 'select',
                        label: 'Property Ever Rented',
                        extendedProperties: {},
                        dataSource: [
                          { label: 'Yes', answer: 'Yes' },
                          { label: 'Occasionally', answer: 'Occasionally' },
                          { label: 'Never', answer: 'Never' }
                        ]
                      },
                      formData: {
                        path: 'underwritingAnswers.rented.answer',
                        type: 'integer',
                        required: true,
                        metaData: {
                          target:
                            '${it._TEMP_INITIAL_VALUES.underwritingAnswers.rented.answer}'
                        }
                      },
                      children: []
                    },
                    {
                      id: '398ce68d-839c-4a49-bbf2-54864c4a69d6',
                      type: '$INPUT',
                      path: 'underwritingAnswers.monthsOccupied.answer',
                      dependencies: [],
                      data: {
                        component: 'select',
                        label: 'Months Occupied',
                        extendedProperties: {},
                        dataSource: [
                          { label: '0-3', answer: '0-3' },
                          { label: '4-6', answer: '4-6' },
                          { label: '7-9', answer: '7-9' },
                          { label: '10+', answer: '10+' }
                        ]
                      },
                      formData: {
                        path: 'underwritingAnswers.monthsOccupied.answer',
                        type: 'integer',
                        required: true,
                        metaData: {
                          target:
                            '${it._TEMP_INITIAL_VALUES.underwritingAnswers.monthsOccupied.answer}'
                        }
                      },
                      children: []
                    },
                    {
                      id: 'b141e258-5074-4ba1-90bc-54864c4a69d7',
                      type: '$INPUT',
                      path:
                        'underwritingAnswers.noPriorInsuranceSurcharge.answer',
                      dependencies: [],
                      data: {
                        component: 'radio',
                        label: 'No Prior Insurance',
                        segmented: true,
                        extendedProperties: {
                          subscribe: true
                        }
                      },
                      formData: {
                        path:
                          'underwritingAnswers.noPriorInsuranceSurcharge.answer',
                        type: 'boolean',
                        required: true,
                        metaData: {
                          enum: [
                            { label: 'No', answer: 'No' },
                            { label: 'Yes', answer: 'Yes' }
                          ],
                          target:
                            '${it._TEMP_INITIAL_VALUES.underwritingAnswers.noPriorInsuranceSurcharge.answer}'
                        }
                      },
                      children: []
                    },
                    {
                      id: 'b141e258-5074-4ba1-90bc-54864c4a69d8',
                      type: '$INPUT',
                      path: 'property.burglarAlarm',
                      dependencies: [],
                      data: {
                        component: 'radio',
                        label: 'Burglar Alarm',
                        segmented: true,
                        extendedProperties: {
                          subscribe: true
                        }
                      },
                      formData: {
                        path: 'property.burglarAlarm',
                        type: 'boolean',
                        required: true,
                        metaData: {
                          enum: [
                            { label: 'No', answer: false },
                            { label: 'Yes', answer: true }
                          ],
                          target:
                            '${format.boolToYesNo(it._TEMP_INITIAL_VALUES.property.burglarAlarm)}'
                        }
                      },
                      children: []
                    },
                    {
                      id: 'b141e258-5074-4ba1-90bc-54864c4a69d9',
                      type: '$INPUT',
                      path: 'property.fireAlarm',
                      dependencies: [],
                      data: {
                        component: 'radio',
                        label: 'Fire Alarm',
                        segmented: true,
                        extendedProperties: {
                          subscribe: true
                        }
                      },
                      formData: {
                        path: 'property.fireAlarm',
                        type: 'boolean',
                        required: true,
                        metaData: {
                          enum: [
                            { label: 'No', answer: false },
                            { label: 'Yes', answer: true }
                          ],
                          target:
                            '${format.boolToYesNo(it._TEMP_INITIAL_VALUES.property.fireAlarm)}'
                        }
                      },
                      children: []
                    },
                    {
                      id: 'b141e258-5074-4ba1-90bc-54864c4a69c1',
                      type: '$INPUT',
                      path: 'property.sprinkler',
                      dependencies: [],
                      data: {
                        component: 'radio',
                        label: 'Sprinkler',
                        segmented: true,
                        extendedProperties: {
                          subscribe: true
                        }
                      },
                      formData: {
                        path: 'property.sprinkler',
                        type: 'boolean',
                        required: true,
                        metaData: {
                          enum: [
                            { label: 'N', answer: 'N' },
                            { label: 'A', answer: 'A' },
                            { label: 'B', answer: 'B' }
                          ],
                          target:
                            '${it._TEMP_INITIAL_VALUES.property.sprinkler}'
                        }
                      },
                      children: []
                    }
                  ]
                }
              ]
            },
            {
              name: 'WindMitigation',
              id: '598d0d15-42dc-4059-ad09-751dedb3b512',
              type: '$SECTION',
              dependencies: [],
              data: {
                className: 'wind-mitigation-scroll'
              },
              formData: {},
              children: [
                {
                  id: '386a6cf2-afe0-40da-8c79-0a9106e26893',
                  type: '$TITLE',
                  dependencies: [],
                  data: {
                    text: 'Wind Mitigation'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: '57f21212-7631-4dd7-9b42-55fe263b9491',
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
                        { label: 'Non-FBC', answer: 'Non-FBC' },
                        { label: 'FBC', answer: 'FBC' },
                        { label: 'Other', answer: 'Other' }
                      ],
                      target:
                        '${it._TEMP_INITIAL_VALUES.property.windMitigation.roofCovering}'
                    }
                  },
                  children: []
                },
                {
                  id: '97f2109e-856c-4b86-8aa0-acba782b7c1e',
                  type: '$INPUT',
                  path: 'property.windMitigation.floridaBuildingCodeWindSpeed',
                  dependencies: [],
                  data: {
                    component: 'number',
                    label: 'FBC Wind Speed',
                    size: '6'
                  },
                  formData: {
                    path:
                      'property.windMitigation.floridaBuildingCodeWindSpeed',
                    required: true,
                    metaData: {
                      target:
                        '${it._TEMP_INITIAL_VALUES.property.windMitigation.floridaBuildingCodeWindSpeed}'
                    }
                  },
                  children: []
                },
                {
                  id: '45b74810-b565-4702-8d2e-f1fdf83833b2',
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
                      target:
                        '${it._TEMP_INITIAL_VALUES.property.windMitigation.roofDeckAttachment}',
                      enum: [
                        { label: 'A', answer: 'A' },
                        { label: 'B', answer: 'B' },
                        { label: 'C', answer: 'C' },
                        { label: 'D', answer: 'D' },
                        { label: 'Concrete', answer: 'Concrete' },
                        { label: 'Other', answer: 'Other' }
                      ]
                    }
                  },
                  children: []
                },
                {
                  id: '37fab2c3-0ed7-4538-910a-46aa9452f839',
                  type: '$INPUT',
                  path:
                    'property.windMitigation.floridaBuildingCodeWindSpeedDesign',
                  dependencies: [],
                  data: {
                    component: 'number',
                    label: 'FBC Wind Speed Design',
                    size: '6'
                  },
                  formData: {
                    path:
                      'property.windMitigation.floridaBuildingCodeWindSpeedDesign',
                    required: true,
                    metaData: {
                      target:
                        '${it._TEMP_INITIAL_VALUES.property.windMitigation.floridaBuildingCodeWindSpeedDesign}'
                    }
                  },
                  children: []
                },
                {
                  id: 'df4710d0-2efb-4700-ac8d-74340f41f120',
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
                        { label: 'Toe Nails', answer: 'Toe Nails' },
                        { label: 'Clips', answer: 'Clips' },
                        { label: 'Single Wraps', answer: 'Single Wraps' },
                        { label: 'Double Wraps', answer: 'Double Wraps' },
                        { label: 'Other', answer: 'Other' }
                      ],
                      target:
                        '${it._TEMP_INITIAL_VALUES.property.windMitigation.roofToWallConnection}'
                    }
                  },
                  children: []
                },
                {
                  id: '47e72599-1e7a-448a-b1e3-56d3fe244703',
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
                        { label: 'B', answer: 'B' },
                        { label: 'C', answer: 'C' },
                        { label: 'HVHZ', answer: 'HVHZ' },
                        { label: 'Other', answer: 'Other' }
                      ],
                      target:
                        '${it._TEMP_INITIAL_VALUES.property.windMitigation.terrain}'
                    }
                  },
                  children: []
                },
                {
                  id: '01c51d1d-a6db-4976-b7d9-91442d81edb0',
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
                        { label: 'Flat', answer: 'Flat' },
                        { label: 'Gable', answer: 'Gable' },
                        { label: 'Hip', answer: 'Hip' },
                        { label: 'Other', answer: 'Other' }
                      ],
                      target:
                        '${it._TEMP_INITIAL_VALUES.property.windMitigation.roofGeometry}'
                    }
                  },
                  children: []
                },
                {
                  id: 'cdcbaee8-bf97-4a1f-9a2d-a3c66b211635',
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
                        { label: 'Enclosed', answer: 'Enclosed' },
                        { label: 'Partial', answer: 'Partial' },
                        { label: 'Other', answer: 'Other' }
                      ],
                      target:
                        '${it._TEMP_INITIAL_VALUES.property.windMitigation.internalPressureDesign}'
                    }
                  },
                  children: []
                },
                {
                  id: 'bc4be681-7e17-4eb5-8a61-c2f3229d7ed6',
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
                        { label: 'Yes', answer: 'Yes' },
                        { label: 'No', answer: 'No' },
                        { label: 'Other', answer: 'Other' }
                      ],
                      target:
                        '${it._TEMP_INITIAL_VALUES.property.windMitigation.secondaryWaterResistance}'
                    }
                  },
                  children: []
                },
                {
                  id: '57723cd6-ec1c-40c9-97f7-aae75327e8e3',
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
                        { label: 'Yes', answer: 'Yes' },
                        { label: 'No', answer: 'No' },
                        { label: 'Other', answer: 'Other' }
                      ],
                      target:
                        '${it._TEMP_INITIAL_VALUES.property.windMitigation.windBorneDebrisRegion}'
                    }
                  },
                  children: []
                },
                {
                  id: '85213569-d390-490a-bcfd-16791bde6d74',
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
                        { label: 'None', answer: 'None' },
                        { label: 'Basic', answer: 'Basic' },
                        { label: 'Hurricane', answer: 'Hurricane' },
                        { label: 'Other', answer: 'Other' }
                      ],
                      target:
                        '${it._TEMP_INITIAL_VALUES.property.windMitigation.openingProtection}'
                    },
                    children: []
                  },
                  children: []
                },
                {
                  id: '37fab2c3-0ed7-4538-910a-46aa9452g333',
                  type: '$INPUT',
                  path:
                    'rating.worksheet.elements.windMitigationFactors.windMitigationDiscount',
                  dependencies: [],
                  data: {
                    disabled: true,
                    component: 'number',
                    label: 'Wind Mit Factor',
                    size: '6'
                  },
                  formData: {
                    type: 'integer',
                    path:
                      'rating.worksheet.elements.windMitigationFactors.windMitigationDiscount',
                    required: true,
                    metaData: {
                      target:
                        '${it._TEMP_INITIAL_VALUES.rating.worksheet.elements.windMitigationFactors.windMitigationDiscount}'
                    }
                  },
                  children: []
                }
              ]
            },
            {
              name: 'HomeLocation',
              id: '598d0d15-42dc-4059-ad09-751dedb3c613',
              type: '$SECTION',
              dependencies: [],
              data: {
                className: 'home-location-scroll'
              },
              formData: {},
              children: [
                {
                  id: '386a6cf2-afe0-40da-8c79-751dedb3v678',
                  type: '$TITLE',
                  dependencies: [],
                  data: {
                    text: 'Home / Location'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: '598d0d15-42dc-4059-ad09-741deda4c613',
                  type: '$SECTION',
                  dependencies: [],
                  data: {
                    className: 'home-location-left',
                    size: '6'
                  },
                  formData: {},
                  children: [
                    {
                      id: '741deda4c333-0ed7-4538-910a-598d0d15',
                      type: '$INPUT',
                      path: 'property.yearBuilt',
                      dependencies: [],
                      data: {
                        component: 'text',
                        label: 'Year Home Built',
                        size: '12',
                        validation: ['isNumbersOnly']
                      },
                      formData: {
                        path: 'property.yearBuilt',
                        required: true,
                        metaData: {
                          target:
                            '${it._TEMP_INITIAL_VALUES.property.yearBuilt}'
                        }
                      },
                      children: []
                    },
                    {
                      id: 'f5f12822-09c8-42e6-9cb0-87a49960d11a',
                      type: '$INPUT',
                      path: 'property.constructionType',
                      dependencies: [],
                      data: {
                        component: 'select',
                        label: 'Construction',
                        size: '12',
                        dataSource: [
                          {
                            label: 'Masonry',
                            answer: 'MASONRY'
                          },
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
                            label: 'Masonry Veneer',
                            answer: 'MASONRY VENEER'
                          },
                          {
                            label: 'Superior',
                            answer: 'SUPERIOR'
                          }
                        ]
                      },
                      formData: {
                        path: 'property.yearBuilt',
                        required: true,
                        metaData: {
                          target:
                            '${it._TEMP_INITIAL_VALUES.property.constructionType}'
                        }
                      },
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export default mock;
