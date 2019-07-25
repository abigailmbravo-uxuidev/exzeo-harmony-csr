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
                                      format: 'currencyDecimals',
                                      path: 'summaryLedger.currentPremium'
                                    }
                                  ]
                                },
                                {
                                  label: 'Initial Premium',
                                  items: [
                                    {
                                      format: 'currencyDecimals',
                                      path: 'summaryLedger.initialPremium'
                                    }
                                  ]
                                },
                                {
                                  label: 'Balance Due',
                                  items: [
                                    {
                                      format: 'currencyDecimals',
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
                          items: [{ format: '', path: 'property.territory' }]
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
              type: '$BILLING',
              dependencies: [],
              data: {
                className: 'billing'
              },
              formData: {}
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
          data: {},
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
                className: 'payments-cancel-policy',
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
                    extendedProperties: {}
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
    }
  ]
};

export default mock;
