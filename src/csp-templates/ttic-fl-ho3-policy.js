/* eslint-disable */
export default {
  meta: {
    company: 'TTIC',
    state: 'FL',
    product: 'HO3',
    underwritingConditions:
      '<h2>All properties will be inspected within 30 days of the effective date.</h2><p>Please be aware that assumptions to this property have been made in order to provide you this quote. If any of the below assumptions are not correct, please contact us before continuing.</p><ul><li>Properties with pools (or similar structures), are to be completely fenced, walled, or screened. There are no slides or diving boards.</li><li>Properties located in Special Flood Hazard Areas, as defined by the National Flood Insurance Program maintain a separate flood policy.</li><li>Property is not in state of disrepair or having existing unrepaired damage.</li><li>Roof covering does not exceed the age as defined below<ul><li>Roof cannot be over 20 years old if Asphalt, Fiberglass, Composition/Wood Shake Shingles; Built-up Tar and Gravel; or other roof covering types not included below</li><li>Roof cannot be over 40 years old if Tile, Slate, Concrete, or Metal</li></ul></li></ul>'
  },
  header: {
    showEffectiveDateButton: true,
    showReinstateButton: true,
    banner: {
      className: 'workflow-banner ttic fl ho3 policy',
      icon: 'ho3',
      title: 'TypTap',
      subTitle: 'FL'
    },
    fields: [
      {
        value: 'policyHolder',
        component: 'Section',
        label: 'Policyholder'
      },
      { value: 'mailingAddress', component: 'Section' },
      { value: 'propertyAddress', component: 'Section' },
      { value: 'county', label: 'Property County' },
      { value: 'effectiveDate' },
      { value: 'cancellation', isOptional: true },
      {
        value: 'nonPaymentNoticeDate',
        label: 'NP Cancellation Date',
        isOptional: true
      },
      {
        value: 'nonPaymentNoticeDueDate',
        label: 'Final Payment Date',
        isOptional: true
      },
      { value: 'currentPremium', className: 'premium' }
    ]
  },
  pages: [
    {
      name: 'coverage',
      step: {},
      components: [
        {
          id: 'b1f90e03-7c3d-4e49-8d18-c17f0478d457',
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'coverage-rating'
          },
          formData: {},
          children: [
            {
              id: 'ffa8267f-c920-4159-919a-7b6cc3dfb620',
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'coverage-premium'
              },
              formData: {},
              children: [
                {
                  id: 'd7619168-7512-415e-8eb0-fedfe7f6454e',
                  component: '$TITLE',
                  dependencies: '',
                  data: {
                    text: 'Coverage and Premium'
                  },
                  formData: {}
                },
                {
                  id: 'd46ff5be-f436-44f5-8d4a-f25528041dbd',
                  component: '$SECTION',
                  dependencies: '',
                  data: {
                    className: 'row'
                  },
                  formData: {},
                  children: [
                    {
                      id: '92f655ca-2410-4eeb-a510-a873358222ea',
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'coverage table',
                        size: '4'
                      },
                      formData: {},
                      children: [
                        {
                          id: '630563a1-a460-4b1a-aea3-4f026bc5df40',
                          component: '$ENTITY_DETAILS',
                          dependencies: '',
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
                      id: '9809d5b7-126c-418a-a600-e4e98d0d2cd3',
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'coverage table',
                        size: '4'
                      },
                      formData: {},
                      children: [
                        {
                          id: '08964b61-e9f6-4f98-877c-bd288562410e',
                          component: '$ENTITY_DETAILS',
                          dependencies: '',
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
                      id: '7b59cb96-2fae-4ac4-b317-cd54a58ce64f',
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'discount-surcharge table',
                        size: '4'
                      },
                      formData: {},
                      children: [
                        {
                          id: 'f2813a0b-5201-4793-9d4c-4e6db4c0ad6c',
                          component: '$ENTITY_DETAILS',
                          dependencies: '',
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
                  id: '4789fe25-3016-4ba2-abe1-07a207c5a555',
                  component: '$SECTION',
                  dependencies: '',
                  data: {
                    className: 'row'
                  },
                  formData: {},
                  children: [
                    {
                      id: 'ba382360-6b69-47da-a91d-1f1fdcb901c5',
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'deductible table',
                        size: '4'
                      },
                      formData: {},
                      children: [
                        {
                          id: '291201f2-3820-4bde-af4f-3fccf2276678',
                          component: '$ENTITY_DETAILS',
                          dependencies: '',
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
                                      conditions: [0, '', undefined, null],
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
                      id: 'e7b90159-1923-436e-bea4-171de297b0ab',
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'premium table',
                        size: '4'
                      },
                      formData: {},
                      children: [
                        {
                          id: '2718197d-4abe-498c-99c0-52b313a59ad4',
                          component: '$ENTITY_DETAILS',
                          dependencies: '',
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
                                      path: 'summaryLedger.balance'
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
                      id: '315ac27f-a403-448d-bc4f-7db0662af593',
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'billing table',
                        size: '4'
                      },
                      formData: {},
                      children: [
                        {
                          id: '20521b05-3521-4574-9764-98d0a9cf6142',
                          component: '$BILLING_DETAILS',
                          size: '4',
                          dependencies: '',
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
              id: '47cd0d74-0294-4e91-bba4-31e90d48f2f1',
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'claims'
              },
              formData: {},
              children: [
                {
                  id: 'c34ff583-d096-461b-8714-2b6bd63c18f6',
                  component: '$TITLE',
                  dependencies: '',
                  data: {
                    text: 'Claims'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: '04a2de3d-9477-4607-80ae-20c57b4efb92',
                  component: '$CLAIMS_TABLE',
                  dependencies: '',
                  data: {},
                  formData: {}
                }
              ]
            },
            {
              id: '9c45dec3-962a-4891-a38b-9004cc32b593',
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'home-location'
              },
              formData: {},
              children: [
                {
                  id: 'bab8f39b-f6cd-407f-8f0b-99528f69e490',
                  component: '$TITLE',
                  dependencies: '',
                  data: {
                    text: 'Home and Location'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: '46100d53-66be-4283-a51c-9c258032946b',
                  component: '$ENTITY_DETAILS',
                  dependencies: '',
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
                  id: 'd2b4ff6e-dc21-435b-b711-1c312d669eb3',
                  component: '$ENTITY_DETAILS',
                  dependencies: '',
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
                          label: 'Territory Description',
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
                  id: 'bb0a6733-e234-4f6a-83a2-c2fc0f60fae8',
                  component: '$ENTITY_DETAILS',
                  dependencies: '',
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
              id: 'a61c21c9-96fc-4b4c-a0ee-726ed16bc888',
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'wind-mitigation'
              },
              formData: {},
              children: [
                {
                  id: '3ce805f3-29e0-499c-a2d4-28a2d1770590',
                  component: '$TITLE',
                  dependencies: '',
                  data: {
                    text: 'Wind Mitigation'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: '306fb5ed-2fa4-4414-80f0-919db2858acb',
                  component: '$SECTION',
                  dependencies: '',
                  data: {
                    className: 'wind-mitigation-1'
                  },
                  formData: {},
                  children: [
                    {
                      id: 'c46bafca-f23b-4a0d-b8aa-9e17cd355f5f',
                      component: '$ENTITY_DETAILS',
                      dependencies: '',
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
          id: '2868dd52-2d07-47f1-8147-6ca8b3fd9b1d',
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'policyholder-agent'
          },
          formData: {},
          children: [
            {
              id: '467faf36-2d03-49b7-8c3a-1ea9b7d4bb5e',
              component: '$POLICYHOLDER_AGENT',
              dependencies: '',
              data: {},
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
          id: 'e59d18e9-f89b-4b04-97cb-549623f0114b',
          component: '$SECTION',
          dependencies: '',
          data: {},
          formData: {},
          children: [
            {
              id: 'ef483ad4-7215-4772-8fbb-9892aa2203d8',
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'History'
              },
              formData: {},
              children: []
            },
            {
              id: 'aab25799-6350-415b-83d4-b0bc443c83ce',
              component: '$NOTES_FILES',
              dependencies: '',
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
          id: '8030c1de-25f5-4d2a-a808-cdaf9656e454',
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'mortgage-billing'
          },
          formData: {},
          children: [
            {
              id: 'c5090f27-4c1f-47fd-af6b-455269dc7cf4',
              component: '$BILLING',
              dependencies: '',
              data: {
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
              id: 'e70a914c-1e27-465c-9d7d-ee926afca40f',
              component: '$TITLE',
              dependencies: '',
              data: { text: 'Additional Interests' },
              formData: {}
            },
            {
              id: 'e27b3b61-9efb-4233-9c92-a3eea7ab48e3',
              component: '$ADDITIONAL_INTERESTS',
              dependencies: '${!!(it.rating || {}).worksheet}',
              data: {
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
          id: 'ed0af4ad-6b36-45a0-a90b-b35a662ace82',
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'cancel'
          },
          formData: {},
          children: [
            {
              id: 'c15bfebc-6e02-45fd-82c8-5b1428956ed8',
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'Cancel Policy'
              },
              formData: {},
              children: []
            },
            {
              id: '444c6014-1d88-439b-98fc-655a41ef305a',
              component: '$CANCEL_TYPE',
              dependencies: '',
              data: {},
              formData: {},
              children: []
            },
            {
              id: 'f08fb154-f500-4c25-9add-8f8c1034a9bf',
              component: 'date',
              path: 'cancel.effectiveDate',
              dependencies: '',
              data: {
                value: '1/22/2021',
                label: 'Effective Date',
                size: '2',
                extendedProperties: {},
                validation: ['isValidDate']
              },
              formData: {
                required: true
              },
              children: []
            },
            {
              id: '5edcf0d9-4220-4a90-a1ba-a80dc8afc51d',
              component: '$CANCEL_REASON',
              dependencies: '',
              data: {},
              formData: {},
              children: []
            }
          ]
        },
        {
          id: '7caf5537-7f8a-4b6e-9977-79da50709de5',
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'payments'
          },
          formData: {},
          children: [
            {
              id: '6fe3ecf1-d245-424a-8f99-2972bd371042',
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'Payments'
              },
              formData: {}
            },
            {
              id: '5eefcbd2-9f49-4f0d-ac50-c2bd311022c0',
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'billing',
                size: '10',
                extendedProperties: {}
              },
              formData: {},
              children: [
                {
                  id: 'd73c1130-c7ae-4564-99ef-424e792b5143',
                  component: '$POLICY_BILLING',
                  dependencies: '',
                  data: {},
                  formData: {},
                  children: []
                }
              ]
            },
            {
              id: '1f5a6a69-82e2-4370-a99f-9de158e4bbb8',
              component: 'text',
              path: 'cancel.equityDate',
              dependencies: '',
              data: {
                label: 'Equity Date',
                size: '2',
                disabled: true
              },
              formData: {},
              children: []
            },
            {
              id: '37a13d50-fe98-4ec3-9bdd-2509eac3ed70',
              component: '$PAYMENT_HISTORY_TABLE',
              dependencies: '',
              data: {},
              formData: {}
            }
          ]
        },
        {
          id: '59d21724-f9d7-4931-888a-a90788bb097b',
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'claims'
          },
          formData: {},
          children: [
            {
              id: 'b443f584-00d2-488c-ac6f-61926813a31d',
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'Claims'
              },
              formData: {},
              children: []
            },
            {
              id: '259c9d46-605d-4989-83fe-a62d42962bd3',
              component: '$CLAIMS_TABLE',
              dependencies: '',
              data: {},
              formData: {}
            }
          ]
        }
      ]
    },
    {
      name: 'endorsements',
      step: {
        outputType: 'initial'
      },
      components: [
        {
          id: 'f9688b00-20bd-48fe-9740-842e5cb7c44f',
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'endorsements'
          },
          formData: {},
          children: [
            {
              id: '9869282c-c947-4059-8071-0f58cf5cb23d',
              component: '$ENDORSEMENTS_MENU',
              dependencies: '',
              data: {
                extendedProperties: {
                  links: [
                    { id: 'coverage-scroll-section', label: 'Coverage' },
                    { id: 'home-scroll-section', label: 'Home / Location' },
                    {
                      id: 'policyholder-scroll-section',
                      label: 'Policyholders'
                    },
                    { id: 'address-scroll-section', label: 'Addresses' }
                  ]
                }
              },
              formData: {},
              children: []
            },
            {
              id: '97969aa5-ec74-45bf-88ed-b216202daae0',
              component: '$ENDORSEMENTS_WATCHER_HO3',
              dependencies: '',
              data: {},
              formData: {},
              children: []
            },
            {
              id: '0da13c3f-83f8-4596-aa62-5ca09a137c03',
              component: '$SECTION',
              dependencies: '',
              data: {
                id: 'coverage-scroll-section',
                className: 'coverage-scroll'
              },
              formData: {},
              children: [
                {
                  id: '2ed8d66c-a68a-4d82-8d58-50455582905a',
                  component: '$TITLE',
                  dependencies: '',
                  data: {
                    text: 'Coverage'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: 'c076ccff-bf06-495c-bcf1-4d90ab3658ac',
                  component: '$SECTION',
                  dependencies: '',
                  data: {
                    className: 'coverage-left',
                    size: '6'
                  },
                  formData: {},
                  children: [
                    {
                      id: '46d0357a-e3e6-4daf-9a00-39f6286399fe',
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'form-group labels',
                        size: '12'
                      },
                      formData: {},
                      children: [
                        {
                          id: 'f46e98a8-1884-4838-9e1b-90a87c083d9c',
                          component: '$LABEL',
                          dependencies: '',
                          data: {
                            text: 'Current'
                          },
                          formData: {},
                          children: []
                        },
                        {
                          id: '39f053a2-1142-4b5e-b3e0-9739366ff7ba',
                          component: '$LABEL',
                          dependencies: '',
                          data: {
                            text: 'New'
                          },
                          formData: {},
                          children: []
                        }
                      ]
                    },
                    {
                      id: '965095bd-4667-43c2-9100-ab4c360261e5',
                      component: 'currency',
                      path: 'coverageLimits.dwelling.value',
                      dependencies: '',
                      data: {
                        label: 'Dwelling (A)',
                        validation: ['isDwellingRange'],
                        extendedProperties: {
                          format: 'currency',
                          displayRange: true,
                          min: 'coverageLimits.dwelling.minAmount',
                          max: 'coverageLimits.dwelling.maxAmount',
                          output:
                            '${format.toCurrency(it.initialValues.coverageLimits.dwelling.value)}'
                        }
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: 'be0e06dc-8fc4-416c-9b1d-28ead9b656af',
                      component: 'currency',
                      path: 'coverageLimits.otherStructures.amount',
                      dependencies: '',
                      data: {
                        disabled: true,
                        label: 'Other Structures (B)',
                        extendedProperties: {
                          output:
                            '${format.toCurrency(it.initialValues.coverageLimits.otherStructures.amount)}'
                        }
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: '498ce68d-839c-4a49-bbf2-92fcc275da49',
                      component: 'selectInteger',
                      path: 'coverageLimits.otherStructures.value',
                      dependencies: '',
                      data: {
                        label: 'Other Structures %',
                        options: [
                          { label: '0%', answer: 0 },
                          { label: '2%', answer: 2 },
                          { label: '5%', answer: 5 },
                          { label: '10%', answer: 10 }
                        ],
                        extendedProperties: {
                          output:
                            '${format.toPercent(it.initialValues.coverageLimits.otherStructures.value) || "0%"}'
                        }
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: '398ce68d-839c-4a49-bbf2-92fcc275da51',
                      component: 'currency',
                      path: 'coverageLimits.personalProperty.amount',
                      dependencies: '',
                      data: {
                        disabled: true,
                        label: 'Personal Property (C)',
                        extendedProperties: {
                          output:
                            '${format.toCurrency(it.initialValues.coverageLimits.personalProperty.amount)}'
                        }
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: 'c982ec3d-65cc-4b8c-a0e0-6b78404b375a',
                      component: 'selectInteger',
                      path: 'coverageLimits.personalProperty.value',
                      dependencies: '',
                      data: {
                        label: 'Personal Property %',
                        options: [
                          { label: '0%', answer: 0 },
                          { label: '25%', answer: 25 },
                          { label: '35%', answer: 35 },
                          { label: '50%', answer: 50 }
                        ],
                        extendedProperties: {
                          output:
                            '${format.toPercent(it.initialValues.coverageLimits.personalProperty.value) || "0%"}'
                        }
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: '398ce68d-839c-4a49-bbf2-92fcc275da53',
                      component: 'currency',
                      path: 'coverageLimits.lossOfUse.amount',
                      dependencies: '',
                      data: {
                        disabled: true,
                        label: 'Loss of Use (D)',
                        extendedProperties: {
                          output:
                            '${format.toCurrency(it.initialValues.coverageLimits.lossOfUse.amount)}'
                        }
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: 'd88ab269-7672-4f69-a49e-637d6344bbf5',
                      component: 'selectInteger',
                      path: 'coverageLimits.personalLiability.value',
                      dependencies: '',
                      data: {
                        label: 'Personal Liability (E)',
                        options: [
                          { label: '$100,000', answer: 100000 },
                          { label: '$300,000', answer: 300000 }
                        ],
                        extendedProperties: {
                          output:
                            '${format.toCurrency(it.initialValues.coverageLimits.personalLiability.value)}'
                        }
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: '398ce68d-839c-4a49-bbf2-92fcc275da55',
                      component: 'currency',
                      path: 'coverageLimits.medicalPayments.amount',
                      dependencies: '',
                      data: {
                        disabled: true,
                        label: 'Medical Payments (F)',
                        extendedProperties: {
                          output:
                            '${format.toCurrency(it.initialValues.coverageLimits.medicalPayments.amount)}'
                        }
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: '398ce68d-839c-4a49-bbf2-92fcc275da56',
                      component: 'selectInteger',
                      path: 'coverageLimits.moldProperty.value',
                      dependencies: '',
                      data: {
                        label: 'Mold Property',
                        extendedProperties: {
                          output:
                            '${format.toCurrency(it.initialValues.coverageLimits.moldProperty.amount)}'
                        },
                        options: [
                          { label: '$10,000', answer: 10000 },
                          { label: '$25,000', answer: 25000 },
                          { label: '$50,000', answer: 50000 }
                        ]
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: '398ce68d-839c-4a49-bbf2-92fcc275da57',
                      component: 'selectInteger',
                      path: 'coverageLimits.moldLiability.value',
                      dependencies: '',
                      data: {
                        label: 'Mold Liability',
                        extendedProperties: {
                          output:
                            '${format.toCurrency(it.initialValues.coverageLimits.moldLiability.amount)}'
                        },
                        options: [
                          { label: '$50,000', answer: 50000 },
                          { label: '$100,000', answer: 100000 }
                        ]
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: '398ce68d-839c-4a49-bbf2-92fcc275da58',
                      component: 'selectInteger',
                      path: 'deductibles.allOtherPerils.value',
                      dependencies: '',
                      data: {
                        label: 'AOP Deductible',
                        extendedProperties: {
                          output:
                            '${format.toCurrency(it.initialValues.deductibles.allOtherPerils.value)}'
                        },
                        options: [
                          { label: '$500', answer: 500 },
                          { label: '$1,000', answer: 1000 },
                          { label: '$2,500', answer: 2500 }
                        ]
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: '398ce68d-839c-4a49-bbf2-92fcc275da59',
                      component: 'selectInteger',
                      path: 'deductibles.hurricane.value',
                      dependencies: '',
                      data: {
                        label: 'Hurricane Deductible',
                        extendedProperties: {
                          output:
                            '${format.toPercent(it.initialValues.deductibles.hurricane.value)} of Dwelling Limit'
                        },
                        options: [
                          { label: '2% of Dwelling Limit', answer: 2 },
                          { label: '5% of Dwelling Limit', answer: 5 },
                          { label: '10% of Dwelling Limit', answer: 10 }
                        ]
                      },
                      formData: {
                        path: 'deductibles.hurricane.value',
                        type: 'integer',
                        required: true,
                        metaData: {}
                      },
                      children: []
                    },
                    {
                      id: '4cbef727-5327-42f8-b62c-92fcc275da60',
                      component: 'select',
                      path: 'coverageOptions.sinkholePerilCoverage.answer',
                      dependencies: '',
                      data: {
                        label: 'Sinkhole Deductible',

                        options: [
                          { answer: false, label: 'Coverage Excluded' },
                          { answer: true, label: '10% of Dwelling Limit' }
                        ],
                        extendedProperties: {
                          output:
                            "${it.initialValues.coverageOptions.sinkholePerilCoverage.answer === 'true' || it.initialValues.coverageOptions.sinkholePerilCoverage.answer === true ? '10% of Dwelling Limit' : 'Coverage Excluded'}"
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
                  id: 'dc361347-5a21-4751-9213-9c6517410e43',
                  component: '$SECTION',
                  dependencies: '',
                  data: {
                    className: 'coverage-right',
                    size: '6'
                  },
                  formData: {},
                  children: [
                    {
                      id: 'd03d5f2c-2ea7-4b5f-83c8-c3b7d98d46c1',
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'form-group labels',
                        size: '12'
                      },
                      formData: {},
                      children: [
                        {
                          id: '92651c30-5726-40fb-9c02-c6baca6695cf',
                          component: '$LABEL',
                          dependencies: '',
                          data: {
                            text: 'Current'
                          },
                          formData: {},
                          children: []
                        },
                        {
                          id: '26bae90b-f7f6-436a-ac49-ffa2a14ffb8c',
                          component: '$LABEL',
                          dependencies: '',
                          data: {
                            text: 'New'
                          },
                          formData: {},
                          children: []
                        }
                      ]
                    },
                    {
                      id: 'b141e258-5074-4ba1-90bc-54864c4a69c6',
                      component: 'radio',
                      path:
                        'coverageOptions.personalPropertyReplacementCost.answer',
                      dependencies: '',
                      data: {
                        label: 'Personal Property Repl Cost',
                        segmented: true,
                        options: [
                          { label: 'No', answer: false },
                          { label: 'Yes', answer: true }
                        ],
                        extendedProperties: {
                          output:
                            '${format.boolToYesNo(it.initialValues.coverageOptions.personalPropertyReplacementCost.answer)}'
                        }
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: '398ce68d-839c-4a49-bbf2-54864c4a69c7',
                      component: 'selectInteger',
                      path: 'coverageLimits.ordinanceOrLaw.value',
                      dependencies: '',
                      data: {
                        label: 'Ordinance or Law',
                        extendedProperties: {
                          output:
                            '${it.initialValues.coverageLimits.ordinanceOrLaw.amount}% of Dwelling Limit'
                        },
                        options: [
                          { label: '25% of Dwelling Limit', answer: 25 },
                          { label: '50% of Dwelling Limit', answer: 50 }
                        ]
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: 'b141e258-5074-4ba1-90bc-54864c4a69d1',
                      component: 'radio',
                      path:
                        'coverageOptions.propertyIncidentalOccupanciesMainDwelling.answer',
                      dependencies: '',
                      data: {
                        label: 'Incidental Occ Main',
                        segmented: true,
                        options: [
                          { label: 'No', answer: false },
                          { label: 'Yes', answer: true }
                        ],
                        extendedProperties: {
                          output:
                            '${format.boolToYesNo(it.initialValues.coverageOptions.propertyIncidentalOccupanciesMainDwelling.answer)}'
                        }
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: 'b141e258-5074-4ba1-90bc-54864c4a69d2',
                      component: 'radio',
                      path:
                        'coverageOptions.propertyIncidentalOccupanciesOtherStructures.answer',
                      dependencies: '',
                      data: {
                        label: 'Incidental Occ Other',
                        segmented: true,
                        options: [
                          { label: 'No', answer: false },
                          { label: 'Yes', answer: true }
                        ],
                        extendedProperties: {
                          output:
                            '${format.boolToYesNo(it.initialValues.coverageOptions.propertyIncidentalOccupanciesOtherStructures.answer)}'
                        }
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: 'b141e258-5074-4ba1-90bc-54864c4a69d3',
                      component: 'radio',
                      path:
                        'coverageOptions.liabilityIncidentalOccupancies.answer',
                      dependencies: '',
                      data: {
                        disabled: true,
                        label: 'Incidental Occ Liability',
                        segmented: true,
                        options: [
                          { label: 'No', answer: false },
                          { label: 'Yes', answer: true }
                        ],
                        extendedProperties: {
                          output:
                            '${format.boolToYesNo(it.initialValues.coverageOptions.liabilityIncidentalOccupancies.answer)}'
                        }
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: 'b141e258-5074-4ba1-90bc-54864c4a69d4',
                      component: 'radio',
                      path: 'property.townhouseRowhouse',
                      dependencies: '',
                      data: {
                        label: 'Townhouse / Rowhouse',
                        segmented: true,
                        options: [
                          { label: 'No', answer: false },
                          { label: 'Yes', answer: true }
                        ],
                        extendedProperties: {
                          output:
                            '${format.boolToYesNo(it.initialValues.property.townhouseRowhouse)}'
                        }
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: '398ce68d-839c-4a49-bbf2-54864c4a69d5',
                      component: 'select',
                      path: 'underwritingAnswers.rented.answer',
                      dependencies: '',
                      data: {
                        label: 'Property Ever Rented',
                        extendedProperties: {
                          output:
                            '${it.initialValues.underwritingAnswers.rented.answer}'
                        },
                        options: [
                          { label: 'Yes', answer: 'Yes' },
                          { label: 'Occasionally', answer: 'Occasionally' },
                          { label: 'Never', answer: 'Never' }
                        ]
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: '398ce68d-839c-4a49-bbf2-54864c4a69d6',
                      component: 'select',
                      path: 'underwritingAnswers.monthsOccupied.answer',
                      dependencies: '',
                      data: {
                        label: 'Months Occupied',
                        extendedProperties: {
                          output:
                            '${it.initialValues.underwritingAnswers.monthsOccupied.answer}'
                        },
                        options: [
                          { label: '0-3', answer: '0-3' },
                          { label: '4-6', answer: '4-6' },
                          { label: '7-9', answer: '7-9' },
                          { label: '10+', answer: '10+' }
                        ]
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: 'b141e258-5074-4ba1-90bc-54864c4a69d7',
                      component: 'radio',
                      path:
                        'underwritingAnswers.noPriorInsuranceSurcharge.answer',
                      dependencies: '',
                      data: {
                        label: 'No Prior Insurance',
                        segmented: true,
                        options: [
                          { label: 'No', answer: 'No' },
                          { label: 'Yes', answer: 'Yes' }
                        ],
                        extendedProperties: {
                          output:
                            '${it.initialValues.underwritingAnswers.noPriorInsuranceSurcharge.answer}'
                        }
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: 'b141e258-5074-4ba1-90bc-54864c4a69d8',
                      component: 'radio',
                      path: 'property.burglarAlarm',
                      dependencies: '',
                      data: {
                        label: 'Burglar Alarm',
                        segmented: true,
                        options: [
                          { label: 'No', answer: false },
                          { label: 'Yes', answer: true }
                        ],
                        extendedProperties: {
                          output:
                            '${format.boolToYesNo(it.initialValues.property.burglarAlarm)}'
                        }
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: 'b141e258-5074-4ba1-90bc-54864c4a69d9',
                      component: 'radio',
                      path: 'property.fireAlarm',
                      dependencies: '',
                      data: {
                        label: 'Fire Alarm',
                        segmented: true,
                        options: [
                          { label: 'No', answer: false },
                          { label: 'Yes', answer: true }
                        ],
                        extendedProperties: {
                          output:
                            '${format.boolToYesNo(it.initialValues.property.fireAlarm)}'
                        }
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: 'b141e258-5074-4ba1-90bc-54864c4a69c1',
                      component: 'radio',
                      path: 'property.sprinkler',
                      dependencies: '',
                      data: {
                        label: 'Sprinkler',
                        segmented: true,
                        options: [
                          { label: 'No', answer: 'N' },
                          { label: 'A', answer: 'A' },
                          { label: 'B', answer: 'B' }
                        ],
                        extendedProperties: {
                          output:
                            '${it.initialValues.property.sprinkler === "N" ? "No" : it.initialValues.property.sprinkler}'
                        }
                      },
                      formData: {
                        required: true
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
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'wind-mitigation-scroll'
              },
              formData: {},
              children: [
                {
                  id: '386a6cf2-afe0-40da-8c79-0a9106e26893',
                  component: '$TITLE',
                  dependencies: '',
                  data: {
                    text: 'Wind Mitigation'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: 'ae610722-84e4-410d-a685-130f23f0ba80',
                  component: '$SECTION',
                  dependencies: '',
                  data: {
                    className: 'form-group labels',
                    size: '6'
                  },
                  formData: {},
                  children: [
                    {
                      id: 'b7b3edac-f053-4718-9533-d3e44201fc0a',
                      component: '$LABEL',
                      dependencies: '',
                      data: {
                        text: 'Current'
                      },
                      formData: {},
                      children: []
                    },
                    {
                      id: '815c2fe5-9beb-41ab-9549-73c90dd98ad4',
                      component: '$LABEL',
                      dependencies: '',
                      data: {
                        text: 'New'
                      },
                      formData: {},
                      children: []
                    }
                  ]
                },
                {
                  id: 'bccef1de-d639-41d4-ab13-7f6dc4cfcb41',
                  component: '$SECTION',
                  dependencies: '',
                  data: {
                    className: 'form-group labels',
                    size: '6'
                  },
                  formData: {},
                  children: [
                    {
                      id: 'd5655fd0-9f73-49de-95f4-16018aa165c0',
                      component: '$LABEL',
                      dependencies: '',
                      data: {
                        text: 'Current'
                      },
                      formData: {},
                      children: []
                    },
                    {
                      id: '2fdd6f99-b160-42f6-bd35-be0192beaaf4',
                      component: '$LABEL',
                      dependencies: '',
                      data: {
                        text: 'New'
                      },
                      formData: {},
                      children: []
                    }
                  ]
                },
                {
                  id: '57f21212-7631-4dd7-9b42-55fe263b9491',
                  component: 'select',
                  path: 'property.windMitigation.roofCovering',
                  dependencies: '',
                  data: {
                    label: 'Roof Covering',
                    size: '6',
                    options: [
                      { label: 'Non-FBC', answer: 'Non-FBC' },
                      { label: 'FBC', answer: 'FBC' },
                      { label: 'Other', answer: 'Other' }
                    ],
                    extendedProperties: {
                      output:
                        '${it.initialValues.property.windMitigation.roofCovering}'
                    }
                  },
                  formData: {
                    required: true
                  },
                  children: []
                },
                {
                  id: '97f2109e-856c-4b86-8aa0-acba782b7c1e',
                  component: 'number',
                  path: 'property.windMitigation.floridaBuildingCodeWindSpeed',
                  dependencies: '',
                  data: {
                    label: 'FBC Wind Speed',
                    size: '6',
                    validation: ['isNumbersOnly'],
                    extendedProperties: {
                      output:
                        '${it.initialValues.property.windMitigation.floridaBuildingCodeWindSpeed}'
                    }
                  },
                  formData: {
                    required: true
                  },
                  children: []
                },
                {
                  id: '45b74810-b565-4702-8d2e-f1fdf83833b2',
                  component: 'select',
                  path: 'property.windMitigation.roofDeckAttachment',
                  dependencies: '',
                  data: {
                    label: 'Roof Deck Attachment',
                    size: '6',
                    options: [
                      { label: 'A', answer: 'A' },
                      { label: 'B', answer: 'B' },
                      { label: 'C', answer: 'C' },
                      { label: 'D', answer: 'D' },
                      { label: 'Concrete', answer: 'Concrete' },
                      { label: 'Other', answer: 'Other' }
                    ],
                    extendedProperties: {
                      output:
                        '${it.initialValues.property.windMitigation.roofDeckAttachment}'
                    }
                  },
                  formData: {
                    required: true
                  },
                  children: []
                },
                {
                  id: '37fab2c3-0ed7-4538-910a-46aa9452f839',
                  component: 'number',
                  path:
                    'property.windMitigation.floridaBuildingCodeWindSpeedDesign',
                  dependencies: '',
                  data: {
                    label: 'FBC Wind Speed Design',
                    size: '6',
                    validation: ['isNumbersOnly'],
                    extendedProperties: {
                      output:
                        '${it.initialValues.property.windMitigation.floridaBuildingCodeWindSpeedDesign}'
                    }
                  },
                  formData: {
                    required: true
                  },
                  children: []
                },
                {
                  id: 'df4710d0-2efb-4700-ac8d-74340f41f120',
                  component: 'select',
                  path: 'property.windMitigation.roofToWallConnection',
                  dependencies: '',
                  data: {
                    label: 'Roof to Wall Attachment',
                    size: '6',
                    options: [
                      { label: 'Toe Nails', answer: 'Toe Nails' },
                      { label: 'Clips', answer: 'Clips' },
                      { label: 'Single Wraps', answer: 'Single Wraps' },
                      { label: 'Double Wraps', answer: 'Double Wraps' },
                      { label: 'Other', answer: 'Other' }
                    ],
                    extendedProperties: {
                      output:
                        '${it.initialValues.property.windMitigation.roofToWallConnection}'
                    }
                  },
                  formData: {
                    required: true
                  },
                  children: []
                },
                {
                  id: '47e72599-1e7a-448a-b1e3-56d3fe244703',
                  component: 'select',
                  path: 'property.windMitigation.terrain',
                  dependencies: '',
                  data: {
                    label: 'Terrain',
                    size: '6',
                    segmented: true,
                    options: [
                      { label: 'B', answer: 'B' },
                      { label: 'C', answer: 'C' },
                      { label: 'HVHZ', answer: 'HVHZ' },
                      { label: 'Other', answer: 'Other' }
                    ],
                    extendedProperties: {
                      output:
                        '${it.initialValues.property.windMitigation.terrain}'
                    }
                  },
                  formData: {
                    required: true
                  },
                  children: []
                },
                {
                  id: '01c51d1d-a6db-4976-b7d9-91442d81edb0',
                  component: 'select',
                  path: 'property.windMitigation.roofGeometry',
                  dependencies: '',
                  data: {
                    label: 'Roof Geometry',
                    size: '6',
                    options: [
                      { label: 'Flat', answer: 'Flat' },
                      { label: 'Gable', answer: 'Gable' },
                      { label: 'Hip', answer: 'Hip' },
                      { label: 'Other', answer: 'Other' }
                    ],
                    extendedProperties: {
                      output:
                        '${it.initialValues.property.windMitigation.roofGeometry}'
                    }
                  },
                  formData: {
                    required: true
                  },
                  children: []
                },
                {
                  id: 'cdcbaee8-bf97-4a1f-9a2d-a3c66b211635',
                  component: 'select',
                  path: 'property.windMitigation.internalPressureDesign',
                  dependencies: '',
                  data: {
                    label: 'Internal Pressure Design',
                    size: '6',
                    options: [
                      { label: 'Enclosed', answer: 'Enclosed' },
                      { label: 'Partial', answer: 'Partial' },
                      { label: 'Other', answer: 'Other' }
                    ],
                    extendedProperties: {
                      output:
                        '${it.initialValues.property.windMitigation.internalPressureDesign}'
                    }
                  },
                  formData: {
                    required: true
                  },
                  children: []
                },
                {
                  id: 'bc4be681-7e17-4eb5-8a61-c2f3229d7ed6',
                  component: 'radio',
                  path: 'property.windMitigation.secondaryWaterResistance',
                  dependencies: '',
                  data: {
                    label: 'Secondary Water Resistance (SWR)',
                    size: '6',
                    segmented: true,
                    options: [
                      { label: 'Yes', answer: 'Yes' },
                      { label: 'No', answer: 'No' },
                      { label: 'Other', answer: 'Other' }
                    ],
                    extendedProperties: {
                      output:
                        '${it.initialValues.property.windMitigation.secondaryWaterResistance}'
                    }
                  },
                  formData: {
                    required: true
                  },
                  children: []
                },
                {
                  id: '57723cd6-ec1c-40c9-97f7-aae75327e8e3',
                  component: 'radio',
                  path: 'property.windMitigation.windBorneDebrisRegion',
                  dependencies: '',
                  data: {
                    label: 'Wind Borne Debris Region (WBDR)',
                    size: '6',
                    segmented: true,
                    options: [
                      { label: 'Yes', answer: 'Yes' },
                      { label: 'No', answer: 'No' },
                      { label: 'Other', answer: 'Other' }
                    ],
                    extendedProperties: {
                      output:
                        '${it.initialValues.property.windMitigation.windBorneDebrisRegion}'
                    }
                  },
                  formData: {
                    required: true
                  },
                  children: []
                },
                {
                  id: '85213569-d390-490a-bcfd-16791bde6d74',
                  component: 'select',
                  dependencies: '',
                  path: 'property.windMitigation.openingProtection',
                  data: {
                    label: 'Opening Protection',
                    size: '6',
                    options: [
                      { label: 'None', answer: 'None' },
                      { label: 'Basic', answer: 'Basic' },
                      { label: 'Hurricane', answer: 'Hurricane' },
                      { label: 'Other', answer: 'Other' }
                    ],
                    extendedProperties: {
                      output:
                        '${it.initialValues.property.windMitigation.openingProtection}'
                    }
                  },
                  formData: {
                    required: true
                  },
                  children: []
                },
                {
                  id: '89188eb6-22eb-4197-b3e7-4f0ef098047b',
                  component: 'number',
                  path:
                    'rating.worksheet.elements.windMitigationFactors.windMitigationDiscount',
                  dependencies: '',
                  data: {
                    disabled: true,
                    label: 'Wind Mit Factor',
                    size: '6',
                    extendedProperties: {
                      output:
                        '${it.initialValues.rating.worksheet.elements.windMitigationFactors.windMitigationDiscount || "0"}'
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
              name: 'HomeLocation',
              id: '598d0d15-42dc-4059-ad09-751dedb3c613',
              component: '$SECTION',
              dependencies: '',
              data: {
                id: 'home-scroll-section',
                className: 'home-location-scroll'
              },
              formData: {},
              children: [
                {
                  id: 'c5f8873c-49d8-4c68-8899-09ff8e45a922',
                  component: '$TITLE',
                  dependencies: '',
                  data: {
                    text: 'Home / Location'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: '598d0d15-42dc-4059-ad09-741deda4c613',
                  component: '$SECTION',
                  dependencies: '',
                  data: {
                    className: 'home-location-left',
                    size: '6'
                  },
                  formData: {},
                  children: [
                    {
                      id: '08494d6e-1075-45a0-bfcb-9b76250e0d82',
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'form-group labels',
                        size: '12'
                      },
                      formData: {},
                      children: [
                        {
                          id: '68ec6b90-40e4-4f4e-914d-246fe1c568ef',
                          component: '$LABEL',
                          dependencies: '',
                          data: {
                            text: 'Current'
                          },
                          formData: {},
                          children: []
                        },
                        {
                          id: 'bc3eae24-386b-47cd-b39e-ed136fa175a3',
                          component: '$LABEL',
                          dependencies: '',
                          data: {
                            text: 'New'
                          },
                          formData: {},
                          children: []
                        }
                      ]
                    },
                    {
                      id: '2e28def4-a2ec-49f8-9ad4-4fe343ff1505',
                      component: 'number',
                      path: 'property.yearBuilt',
                      dependencies: '',
                      data: {
                        label: 'Year Home Built',
                        size: '12',
                        validation: ['isNumbersOnly'],
                        extendedProperties: {
                          thousandSeparator: false,
                          output: '${it.initialValues.property.yearBuilt}'
                        }
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: 'f5f12822-09c8-42e6-9cb0-87a49960d11a',
                      component: 'select',
                      path: 'property.constructionType',
                      dependencies: '',
                      data: {
                        label: 'Construction',
                        size: '12',
                        options: [
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
                        ],
                        extendedProperties: {
                          output:
                            '${it.initialValues.property.constructionType}'
                        }
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: 'f5f12822-09c8-42e6-9cb0-87a49960d13a',
                      component: 'selectInteger',
                      path: 'property.protectionClass',
                      dependencies: '',
                      data: {
                        label: 'Protection Class',
                        size: '12',
                        options: [
                          {
                            label: '01',
                            answer: 1
                          },
                          {
                            label: '02',
                            answer: 2
                          },
                          {
                            label: '03',
                            answer: 3
                          },
                          {
                            label: '04',
                            answer: 4
                          },
                          {
                            label: '05',
                            answer: 5
                          },
                          {
                            label: '06',
                            answer: 6
                          },
                          {
                            label: '07',
                            answer: 7
                          },
                          {
                            label: '08',
                            answer: 8
                          },
                          {
                            label: '09',
                            answer: 9
                          },
                          {
                            label: '10',
                            answer: 10
                          }
                        ],
                        extendedProperties: {
                          output: '${it.initialValues.property.protectionClass}'
                        }
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: '6770a129-705d-4f38-9a8e-3f67a7bf92d4',
                      component: 'selectInteger',
                      path: 'property.buildingCodeEffectivenessGrading',
                      dependencies: '',
                      data: {
                        label: 'BCEG',
                        size: '12',
                        options: [
                          { label: '01', answer: 1 },
                          { label: '02', answer: 2 },
                          { label: '03', answer: 3 },
                          { label: '04', answer: 4 },
                          { label: '05', answer: 5 },
                          { label: '06', answer: 6 },
                          { label: '07', answer: 7 },
                          { label: '08', answer: 8 },
                          { label: '09', answer: 9 },
                          { label: '98', answer: 98 },
                          { label: '99', answer: 99 }
                        ],
                        extendedProperties: {
                          output:
                            '${it.initialValues.property.buildingCodeEffectivenessGrading}'
                        }
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: '26548d94-cb36-4244-a79c-7c734aa3bccc',
                      component: 'select',
                      path: 'property.familyUnits',
                      dependencies: '',
                      data: {
                        label: 'Family Units',
                        size: '12',
                        options: [
                          { answer: '1-2' },
                          { answer: '3-4' },
                          { answer: '5-8' },
                          { answer: '9+' }
                        ],
                        extendedProperties: {
                          output: '${it.initialValues.property.familyUnits}'
                        }
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: '75f752a8-8f5e-4d81-b3f2-228a4462d7dd',
                      component: 'select',
                      path: 'property.floodZone',
                      dependencies: '',
                      data: {
                        label: 'Flood Zone',
                        size: '12',
                        options: [
                          { answer: 'V' },
                          { answer: 'A' },
                          { answer: 'B' },
                          { answer: 'C' },
                          { answer: 'X' },
                          { answer: 'U' }
                        ],
                        extendedProperties: {
                          output: '${it.initialValues.property.floodZone}'
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
                  id: '598d0d15-42dc-4059-ad09-741deda3b502',
                  component: '$SECTION',
                  dependencies: '',
                  data: {
                    className: 'home-location-right',
                    size: '6'
                  },
                  formData: {},
                  children: [
                    {
                      id: '7169b64d-8a30-46d3-8c5a-78c3dcda9aa3',
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'form-group labels',
                        size: '12'
                      },
                      formData: {},
                      children: [
                        {
                          id: '69e44813-94ef-4ba1-b3c8-952786acb04c',
                          component: '$LABEL',
                          dependencies: '',
                          data: {
                            text: 'Current'
                          },
                          formData: {},
                          children: []
                        },
                        {
                          id: '0c0f9a4b-ebdf-4c7d-9fb7-e2b7dcff3035',
                          component: '$LABEL',
                          dependencies: '',
                          data: {
                            text: 'New'
                          },
                          formData: {},
                          children: []
                        }
                      ]
                    },
                    {
                      id: '40808340-4da2-4b08-ab38-c0a969562027',
                      component: 'number',
                      path: 'property.distanceToTidalWater',
                      dependencies: '',
                      data: {
                        label: 'Tidal Waters Dist.',
                        size: '12',
                        extendedProperties: {
                          decimalScale: 2,
                          output:
                            '${it.initialValues.property.distanceToTidalWater ? format.appendUnitMaxDigits(it.initialValues.property.distanceToTidalWater, "", 2): " "}'
                        }
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: '40808340-4da2-4b08-ab38-c0a969562028',
                      component: 'number',
                      path: 'property.distanceToFireHydrant',
                      dependencies: '',
                      data: {
                        label: 'Fire Hydrant Dist.',
                        size: '12',
                        extendedProperties: {
                          decimalScale: 2,
                          output:
                            '${it.initialValues.property.distanceToFireHydrant ? format.appendUnitMaxDigits(it.initialValues.property.distanceToFireHydrant, "", 2) : " "}'
                        }
                      },
                      formData: {},
                      children: []
                    },
                    {
                      id: '40808340-4da2-4b08-ab38-c0a969562030',
                      component: 'number',
                      path: 'property.distanceToFireStation',
                      dependencies: '',
                      data: {
                        label: 'Fire Station Dist.',
                        size: '12',
                        extendedProperties: {
                          decimalScale: 2,
                          output:
                            '${it.initialValues.property.distanceToFireStation ? format.appendUnitMaxDigits(it.initialValues.property.distanceToFireStation, "", 2): " "}'
                        }
                      },
                      formData: {},
                      children: []
                    },
                    {
                      id: 'f5f12822-09c8-42e6-9cb0-97b49960d11a',
                      component: 'select',
                      path: 'property.residenceType',
                      dependencies: '',
                      data: {
                        label: 'Residence Type',
                        size: '12',
                        options: [
                          {
                            label: 'Single Family',
                            answer: 'SINGLE FAMILY'
                          },
                          {
                            label: 'Commercial',
                            answer: 'COMMERCIAL'
                          }
                        ],
                        extendedProperties: {
                          output: '${it.initialValues.property.residenceType}'
                        }
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: '40808340-4da2-5b17-ab38-c0a969562032',
                      component: 'number',
                      path: 'property.squareFeet',
                      dependencies: '',
                      data: {
                        label: 'Sq. Ft. of Home',
                        size: '12',
                        extendedProperties: {
                          output:
                            '${it.initialValues.property.squareFeet ? format.appendUnit(it.initialValues.property.squareFeet, "") : " "}'
                        }
                      },
                      formData: {},
                      children: []
                    },
                    {
                      id: 'ef524792-406a-496f-a99f-47189c9cc29b',
                      component: 'number',
                      path: 'property.yearOfRoof',
                      dependencies: '',
                      data: {
                        label: 'Year Roof Built',
                        size: '12',
                        validation: ['isNumbersOnly'],
                        extendedProperties: {
                          thousandSeparator: false,
                          output:
                            '${it.initialValues.property.yearOfRoof || " "}'
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
              name: 'PreviousEndorsements',
              id: '598d0d15-42dc-4059-ad09-751fddb3b512',
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'previous-endorsements-scroll'
              },
              formData: {},
              children: [
                {
                  id: '598d0a99-42dc-4059-ad09-751fddb3b512',
                  component: '$PREVIOUS_ENDORSEMENTS',
                  dependencies: '',
                  data: {},
                  formData: {},
                  children: []
                }
              ]
            },
            {
              name: 'PolicyHolder',
              id: '58710677-5930-4e89-a193-87ffa12139d5',
              component: '$SECTION',
              dependencies: '',
              data: {
                id: 'policyholder-scroll-section',
                className: 'policyholder-scroll'
              },
              formData: {},
              children: [
                {
                  name: 'Policyholders',
                  id: 'ee0d8778-10e8-4105-bd74-e6aa398d8cd8',
                  component: '$POLICYHOLDERS',
                  dependencies: '',
                  data: {
                    extendedProperties: {
                      watchField: 'removeSecondary'
                    }
                  },
                  formData: {},
                  children: []
                }
              ]
            },
            {
              name: 'Addresses',
              id: '17d85a6e-8370-478e-b5d2-9f74ad064030',
              component: '$SECTION',
              dependencies: '',
              data: {
                id: 'address-scroll-section',
                className: 'address-scroll'
              },
              formData: {},
              children: [
                {
                  name: 'MailingAddress',
                  id: '8811f280-424d-41d8-bf2b-534d6339f8f8',
                  component: '$SECTION',
                  dependencies: '',
                  data: {
                    size: '12'
                  },
                  formData: {},
                  children: [
                    {
                      id: '88fdde5d-9032-48aa-994d-1f4bf3cd1fa6',
                      component: '$TITLE',
                      dependencies: '',
                      data: {
                        text: 'Mailing Address'
                      },
                      formData: {},
                      children: []
                    },
                    {
                      id: '65345c40-2b54-4818-9778-6dce86b6efdd',
                      component: '$ADDRESS',
                      dependencies: '',
                      data: {
                        extendedProperties: {
                          fieldPrefix: 'policyHolderMailingAddress'
                        }
                      },
                      formData: {},
                      children: []
                    }
                  ]
                },
                {
                  name: 'PropertyAddress',
                  id: '9911f280-424d-41d8-bf2b-534d6339f8f8',
                  component: '$SECTION',
                  dependencies: '',
                  data: {
                    size: '12'
                  },
                  formData: {},
                  children: [
                    {
                      id: 'cefdde5d-9032-48aa-994d-1f4bf3cd1fa6',
                      component: '$TITLE',
                      dependencies: '',
                      data: {
                        text: 'Property Address'
                      },
                      formData: {},
                      children: []
                    },
                    {
                      id: '65345c40-2b54-4818-9778-d3f01404b16d',
                      component: '$ADDRESS',
                      dependencies: '',
                      data: {
                        extendedProperties: {
                          fieldPrefix: 'property.physicalAddress'
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
    }
  ]
};
