/* eslint-disable */
const mock = {
  header: {
    showEffectiveDateButton: true,
    showReinstateButton: true,
    banner: {
      className: 'workflow-banner hcpci nj af3 policy',
      icon: 'af3',
      title: 'Homeowners Choice',
      subTitle: 'NJ'
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
  disclaimer: {
    className: 'workflow-disclaimer',
    displayText:
      'In Florida, insurance products and services are underwritten by TypTap Insurance Company. In Arkansas, California, Maryland, New Jersey, Ohio, Pennsylvania, South Carolina and Texas insurance products and services are underwritten by Homeowners Choice Property & Casualty Insurance Company, Inc.'
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
                                  label: 'Building Limit',
                                  items: [
                                    {
                                      format: 'currency',
                                      path: 'coverageLimits.building.amount'
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
                                  label: 'Increased Cost of Compliance Limit',
                                  items: [
                                    {
                                      format: 'currency',
                                      path:
                                        'coverageLimits.increasedCompliance.amount'
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
                        className: 'coverage table',
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
                                  label: 'Personal Property Repl Cost',
                                  items: [
                                    {
                                      format: 'bool',
                                      path:
                                        'coverageOptions.personalPropertyReplacementCost.answer'
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
                                  label: 'Building',
                                  items: [
                                    {
                                      format: 'currency',
                                      path:
                                        'deductibles.buildingDeductible.amount'
                                    }
                                  ]
                                },
                                {
                                  label: 'Personal Property',
                                  items: [
                                    {
                                      format: 'currency',
                                      path:
                                        'deductibles.personalPropertyDeductible.amount'
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
                className: 'home-location-af3'
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
                          label: 'Residence Type',
                          items: [
                            { format: '', path: 'property.residenceType' }
                          ]
                        },
                        {
                          label: 'Flood Zone',
                          items: [{ format: '', path: 'property.floodZone' }]
                        },
                        {
                          label: 'FEMA Flood Zone',
                          items: [
                            { format: '', path: 'property.FEMAfloodZone' }
                          ]
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
                          label: 'Square Footage',
                          items: [{ format: '', path: 'property.squareFeet' }]
                        },
                        {
                          label: 'BFE Indicator',
                          items: [
                            {
                              format: '',
                              path:
                                'underwritingAnswers.elevationDifference.answer'
                            }
                          ]
                        },
                        {
                          label: 'Territory',
                          items: [
                            { format: '', path: 'property.floodterritory' }
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
              id: 4497775432943353,
              type: '$SECTION',
              dependencies: [],
              data: {
                className: 'claims'
              },
              formData: {},
              children: [
                {
                  id: 4497775432943354,
                  type: '$TITLE',
                  dependencies: [],
                  data: {
                    text: 'Claims'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: 4497775432943355,
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
              data: {},
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
                  subscribe: true,
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
              id: 44895439847239848,
              type: '$ENDORSEMENTS_WATCHER_AF3',
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
              id: '5435535-fdsfdsf-234324324324-sss',
              type: '$SECTION',
              dependencies: [],
              data: {
                id: 'coverage-scroll-section',
                className: 'coverage-scroll'
              },
              formData: {},
              children: [
                {
                  id: '398ce68d-234324324324-4354353-34895439847239849',
                  type: '$TITLE',
                  dependencies: [],
                  data: {
                    text: 'Coverage'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: '398ce68d-234324324324-',
                  type: '$SECTION',
                  dependencies: [],
                  data: {
                    className: 'coverage-left',
                    size: '6'
                  },
                  formData: {},
                  children: [
                    {
                      id: '398ce68d-234324324324-33344',
                      type: '$SECTION',
                      dependencies: [],
                      data: {
                        className: 'form-group labels',
                        size: '12'
                      },
                      formData: {},
                      children: [
                        {
                          id: '398ce68d-234324324324-22222',
                          type: '$LABEL',
                          dependencies: [],
                          data: {
                            text: 'Current'
                          },
                          formData: {},
                          children: []
                        },
                        {
                          id: '398ce68d-234324324324-22222233',
                          type: '$LABEL',
                          dependencies: [],
                          data: {
                            text: 'New'
                          },
                          formData: {},
                          children: []
                        }
                      ]
                    },
                    {
                      id: '398ce68d-839c-4a49-bbf2-4545454543',
                      type: '$INPUT',
                      path: 'coverageLimits.building.value',
                      dependencies: [],
                      data: {
                        component: 'currency',
                        label: 'Building Limit',
                        validation: ['isBuildingRange'],
                        extendedProperties: {
                          format: 'currency',
                          displayRange: true,
                          min: 'coverageLimits.building.minAmount',
                          max: 'coverageLimits.building.maxAmount',
                          output: 'initial'
                        }
                      },
                      formData: {
                        path: 'coverageLimits.building.value',
                        type: 'integer',
                        required: true,
                        metaData: {
                          target:
                            '${format.toCurrency(it._TEMP_INITIAL_VALUES.coverageLimits.building.value)}'
                        }
                      },
                      children: []
                    },
                    {
                      id: '398ce68d-839c-4a49-bbf2-11111113',
                      type: '$INPUT',
                      path: 'coverageLimits.personalProperty.value',
                      dependencies: [],
                      data: {
                        component: 'currency',
                        label: 'Personal Property Limit',
                        validation: ['isPersonalPropertyRange'],
                        extendedProperties: {
                          format: 'currency',
                          displayRange: true,
                          min: 'coverageLimits.personalProperty.minAmount',
                          max: 'coverageLimits.personalProperty.maxAmount',
                          output: 'initial'
                        }
                      },
                      formData: {
                        type: 'integer',
                        required: true,
                        metaData: {
                          target:
                            '${format.toCurrency(it._TEMP_INITIAL_VALUES.coverageLimits.personalProperty.value)}'
                        }
                      },
                      children: []
                    },
                    {
                      id: '498ce68d-839c-4a49-bbf2-92fcc275da49',
                      type: '$INPUT',
                      path: 'deductibles.buildingDeductible.value',
                      dependencies: [],
                      data: {
                        component: 'selectInteger',
                        label: 'Building Deductible',
                        dataSource: [
                          { label: '$ 500', answer: 500 },
                          { label: '$ 1,000', answer: 1000 },
                          { label: '$ 2,000', answer: 2000 },
                          { label: '$ 5,000', answer: 5000 },
                          { label: '$ 10,000', answer: 10000 }
                        ],
                        extendedProperties: {
                          output: 'initial'
                        }
                      },
                      formData: {
                        path: 'deductibles.buildingDeductible.value',
                        type: 'integer',
                        required: true,
                        metaData: {
                          target:
                            '${format.toCurrency(it._TEMP_INITIAL_VALUES.deductibles.buildingDeductible.value)}'
                        }
                      },
                      children: []
                    },
                    {
                      id: '498ce68d-839c-4a49-bbf2-455427875685',
                      type: '$INPUT',
                      path: 'deductibles.personalPropertyDeductible.value',
                      dependencies: [],
                      data: {
                        disabled: true,
                        component: 'selectInteger',
                        label: 'Personal Property Deductible',
                        dataSource: [
                          { label: '$ 500', answer: 500 },
                          { label: '$ 1,000', answer: 1000 },
                          { label: '$ 2,000', answer: 2000 },
                          { label: '$ 5,000', answer: 5000 },
                          { label: '$ 10,000', answer: 10000 }
                        ],
                        extendedProperties: {
                          output: 'initial'
                        }
                      },
                      formData: {
                        path: 'deductibles.personalPropertyDeductible.value',
                        type: 'integer',
                        required: true,
                        metaData: {
                          target:
                            '${format.toCurrency(it._TEMP_INITIAL_VALUES.deductibles.personalPropertyDeductible.value)}'
                        }
                      },
                      children: []
                    }
                  ]
                },
                {
                  id: '54864c4a69c6-4354355435354353',
                  type: '$SECTION',
                  dependencies: [],
                  data: {
                    className: 'coverage-right',
                    size: '6'
                  },
                  formData: {},
                  children: [
                    {
                      id: '398ce68d-234324324324-33345',
                      type: '$SECTION',
                      dependencies: [],
                      data: {
                        className: 'form-group labels',
                        size: '12'
                      },
                      formData: {},
                      children: [
                        {
                          id: '398ce68d-234324324324-22225',
                          type: '$LABEL',
                          dependencies: [],
                          data: {
                            text: 'Current'
                          },
                          formData: {},
                          children: []
                        },
                        {
                          id: '398ce68d-234324324324-22222235',
                          type: '$LABEL',
                          dependencies: [],
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
                      type: '$INPUT',
                      path:
                        'coverageOptions.personalPropertyReplacementCost.answer',
                      dependencies: [],
                      data: {
                        component: 'radio',
                        label: 'Personal Property Repl Cost',
                        segmented: true,
                        disabled:
                          '${Math.ceil((it.coverageLimits.building.value || 0) / 4) > (it.coverageLimits.personalProperty.value || 0)}',
                        extendedProperties: {
                          subscribe: true,
                          output: 'values'
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
                      id: '398ce444467768d-839c-4a490890-cc275da53',
                      type: '$INPUT',
                      path: 'coverageLimits.increasedCompliance.value',
                      dependencies: [],
                      data: {
                        disabled: true,
                        component: 'currency',
                        label: 'Increased Cost of Compliance Limit',
                        extendedProperties: { output: 'initial' }
                      },
                      formData: {
                        path: 'coverageLimits.increasedCompliance.value',
                        type: 'integer',
                        required: true,
                        metaData: {
                          target:
                            '${format.toCurrency(it._TEMP_INITIAL_VALUES.coverageLimits.increasedCompliance.value)}'
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
                        label: 'Loss of Use Limit',
                        extendedProperties: { output: 'initial' }
                      },
                      formData: {
                        path: 'coverageLimits.lossOfUse.amount',
                        type: 'integer',
                        required: true,
                        metaData: {
                          target:
                            '${format.toCurrency(it._TEMP_INITIAL_VALUES.coverageLimits.lossOfUse.amount)}'
                        }
                      },
                      children: []
                    }
                  ]
                }
              ]
            },
            {
              name: 'HomeLocation',
              id: '598d0d15-42dc-4059-ad09-751dedb3c613',
              type: '$SECTION',
              dependencies: [],
              data: {
                id: 'home-scroll-section',
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
                      id: '398ce68d-234324324324-33347',
                      type: '$SECTION',
                      dependencies: [],
                      data: {
                        className: 'form-group labels',
                        size: '12'
                      },
                      formData: {},
                      children: [
                        {
                          id: '398ce68d-234324324324-22999',
                          type: '$LABEL',
                          dependencies: [],
                          data: {
                            text: 'Current'
                          },
                          formData: {},
                          children: []
                        },
                        {
                          id: '398ce68d-234324324324-22222999',
                          type: '$LABEL',
                          dependencies: [],
                          data: {
                            text: 'New'
                          },
                          formData: {},
                          children: []
                        }
                      ]
                    },
                    {
                      id: '741deda4c333-0ed7-4538-910a-598d0999',
                      type: '$INPUT',
                      path: 'property.yearBuilt',
                      dependencies: [],
                      data: {
                        component: 'number',
                        label: 'Year Home Built',
                        size: '12',
                        validation: ['isNumbersOnly'],
                        thousandSeparator: false
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
                            '${it._TEMP_INITIAL_VALUES.property.constructionType || " "}'
                        }
                      },
                      children: []
                    },
                    {
                      id: 'f5f12822-09c8-42e6-9cb0-97b49960d11a',
                      type: '$INPUT',
                      path: 'property.residenceType',
                      dependencies: [],
                      data: {
                        component: 'select',
                        label: 'Residence Type',
                        size: '12',
                        dataSource: [
                          {
                            label: 'Single Family',
                            answer: 'SINGLE FAMILY'
                          },
                          {
                            label: 'Commercial',
                            answer: 'COMMERCIAL'
                          }
                        ]
                      },
                      formData: {
                        path: 'property.residenceType',
                        required: true,
                        metaData: {
                          target:
                            '${it._TEMP_INITIAL_VALUES.property.residenceType}'
                        }
                      },
                      children: []
                    },
                    {
                      id: '40808340-4da2-5b17-ab38-c0a969562032',
                      type: '$INPUT',
                      path: 'property.squareFeet',
                      dependencies: [],
                      data: {
                        component: 'number',
                        label: 'Sq. Ft. of Home',
                        size: '12'
                      },
                      formData: {
                        path: 'property.squareFeet',
                        metaData: {
                          target:
                            '${it._TEMP_INITIAL_VALUES.property.squareFeet ? format.appendUnit(it._TEMP_INITIAL_VALUES.property.squareFeet, "") : " "}'
                        }
                      },
                      children: []
                    }
                  ]
                },
                {
                  id: '598d0d15-42dc-4059-ad09-741deda3b502',
                  type: '$SECTION',
                  dependencies: [],
                  data: {
                    className: 'home-location-right',
                    size: '6'
                  },
                  formData: {},
                  children: [
                    {
                      id: '44448ce68d-234324324324-33347',
                      type: '$SECTION',
                      dependencies: [],
                      data: {
                        className: 'form-group labels',
                        size: '12'
                      },
                      formData: {},
                      children: [
                        {
                          id: '4448ce68d-234324324324-22999',
                          type: '$LABEL',
                          dependencies: [],
                          data: {
                            text: 'Current'
                          },
                          formData: {},
                          children: []
                        },
                        {
                          id: '4448ce68d-234324324324-22222999',
                          type: '$LABEL',
                          dependencies: [],
                          data: {
                            text: 'New'
                          },
                          formData: {},
                          children: []
                        }
                      ]
                    },
                    {
                      id: '75f752a8-8f5e-4d81-b3f2-435435435dd',
                      type: '$INPUT',
                      path: 'property.floodterritory',
                      dependencies: [],
                      data: {
                        component: 'select',
                        label: 'Territory',
                        size: '12',
                        dataSource: [
                          { answer: '15000' },
                          { answer: '25000' },
                          { answer: '35000' },
                          { answer: '45000' }
                        ]
                      },
                      formData: {
                        path: 'property.floodterritory',
                        required: true,
                        metaData: {
                          target:
                            '${it._TEMP_INITIAL_VALUES.property.floodterritory || " "}'
                        }
                      },
                      children: []
                    },
                    {
                      id: '75f752a8-44465678-4d81-b3f2-554654687444',
                      type: '$INPUT',
                      path: 'property.FEMAfloodZone',
                      dependencies: [],
                      data: {
                        component: 'select',
                        label: 'FEMA Flood Zone',
                        size: '12',
                        dataSource: [
                          { answer: 'A' },
                          { answer: 'A1' },
                          { answer: 'A10' },
                          { answer: 'A11' },
                          { answer: 'A12' },
                          { answer: 'A13' },
                          { answer: 'A14' },
                          { answer: 'A15' },
                          { answer: 'A16' },
                          { answer: 'A17' },
                          { answer: 'A18' },
                          { answer: 'A19' },
                          { answer: 'A2' },
                          { answer: 'A20' },
                          { answer: 'A21' },
                          { answer: 'A22' },
                          { answer: 'A23' },
                          { answer: 'A24' },
                          { answer: 'A25' },
                          { answer: 'A26' },
                          { answer: 'A27' },
                          { answer: 'A28' },
                          { answer: 'A29' },
                          { answer: 'A3' },
                          { answer: 'A30' },
                          { answer: 'A4' },
                          { answer: 'A5' },
                          { answer: 'A6' },
                          { answer: 'A7' },
                          { answer: 'A8' },
                          { answer: 'A9' },
                          { answer: 'A99' },
                          { answer: 'AE' },
                          { answer: 'AH' },
                          { answer: 'AO' },
                          { answer: 'AR' },
                          { answer: 'B' },
                          { answer: 'C' },
                          { answer: 'CBRA' },
                          { answer: 'D' },
                          { answer: 'U' },
                          { answer: 'V' },
                          { answer: 'V1' },
                          { answer: 'V10' },
                          { answer: 'V11' },
                          { answer: 'V12' },
                          { answer: 'V13' },
                          { answer: 'V14' },
                          { answer: 'V15' },
                          { answer: 'V16' },
                          { answer: 'V17' },
                          { answer: 'V18' },
                          { answer: 'V19' },
                          { answer: 'V2' },
                          { answer: 'V20' },
                          { answer: 'V21' },
                          { answer: 'V22' },
                          { answer: 'V23' },
                          { answer: 'V24' },
                          { answer: 'V25' },
                          { answer: 'V26' },
                          { answer: 'V27' },
                          { answer: 'V28' },
                          { answer: 'V29' },
                          { answer: 'V3' },
                          { answer: 'V30' },
                          { answer: 'V4' },
                          { answer: 'V5' },
                          { answer: 'V6' },
                          { answer: 'V7' },
                          { answer: 'V8' },
                          { answer: 'V9' },
                          { answer: 'VE' },
                          { answer: 'X' },
                          { answer: 'X500' },
                          { answer: 'Z' }
                        ]
                      },
                      formData: {
                        path: 'property.FEMAfloodZone',
                        metaData: {
                          target:
                            '${it._TEMP_INITIAL_VALUES.property.FEMAfloodZone || " "}'
                        }
                      },
                      children: []
                    },
                    {
                      id: '75f752a8-8f5e-4d81-b3f2-228a446444sd7dd',
                      type: '$INPUT',
                      path: 'property.floodZone',
                      dependencies: [],
                      data: {
                        component: 'select',
                        label: 'Flood Zone',
                        size: '12',
                        dataSource: [
                          { answer: 'A' },
                          { answer: 'B' },
                          { answer: 'C' },
                          { answer: 'V' },
                          { answer: 'X' },
                          { answer: 'Z' }
                        ]
                      },
                      formData: {
                        path: 'property.floodZone',
                        required: true,
                        metaData: {
                          target:
                            '${it._TEMP_INITIAL_VALUES.property.floodZone}'
                        }
                      },
                      children: []
                    },
                    {
                      id: '75f752a8-44465678-4d81-b3f2-55465468788',
                      type: '$INPUT',
                      path: 'underwritingAnswers.elevationDifference.answer',
                      dependencies: [],
                      data: {
                        component: 'text',
                        disabled: true,
                        label: 'BFE Indicator',
                        size: '12',
                        extendedProperties: {
                          output: 'initial'
                        }
                      },
                      formData: {
                        path: 'underwritingAnswers.elevationDifference.answer',
                        metaData: {
                          target:
                            '${it._TEMP_INITIAL_VALUES.underwritingAnswers.elevationDifference.answer || " "}'
                        }
                      },
                      children: []
                    }
                  ]
                }
              ]
            },
            {
              name: 'PreviousEndorsements',
              id: '598d0d15-42dc-4059-ad09-751fddb3b512',
              type: '$SECTION',
              dependencies: [],
              data: {
                className: 'previous-endorsements-scroll'
              },
              formData: {},
              children: [
                {
                  id: '598d0a99-42dc-4059-ad09-751fddb3b512',
                  type: '$PREVIOUS_ENDORSEMENTS',
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
              name: 'PolicyHolder',
              id: '598d0d15-42dc-4059-ad09-64jddb3b512',
              type: '$SECTION',
              dependencies: [],
              data: {
                id: 'policyholder-scroll-section',
                className: 'policyholder-scroll'
              },
              formData: {},
              children: [
                {
                  name: 'Policyholders',
                  id: '64jddda3b512-3716-475e-9762-42dcdds',
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
                }
              ]
            },
            {
              name: 'Addresses',
              id: '598d0d15-42dc-4059-ad09-64jddb3b655',
              type: '$SECTION',
              dependencies: [],
              data: {
                id: 'address-scroll-section',
                className: 'address-scroll'
              },
              formData: {},
              children: [
                {
                  name: 'MailingAddress',
                  id: '8811f280-424d-41d8-bf2b-534d6339f8f8',
                  type: '$SECTION',
                  dependencies: [],
                  data: {
                    size: '12'
                  },
                  formData: {},
                  children: [
                    {
                      id: '88fdde5d-9032-48aa-994d-1f4bf3cd1fa6',
                      type: '$TITLE',
                      dependencies: [],
                      data: {
                        text: 'Mailing Address'
                      },
                      formData: {},
                      children: []
                    },
                    {
                      id: '65345c40-2b54-4818-9778-d3f01404b16d',
                      type: '$CUSTOM',
                      dependencies: [],
                      data: {
                        component: '$ADDRESS',
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
                  type: '$SECTION',
                  dependencies: [],
                  data: {
                    size: '12'
                  },
                  formData: {},
                  children: [
                    {
                      id: 'cefdde5d-9032-48aa-994d-1f4bf3cd1fa6',
                      type: '$TITLE',
                      dependencies: [],
                      data: {
                        text: 'Property Address'
                      },
                      formData: {},
                      children: []
                    },
                    {
                      id: '65345c40-2b54-4818-9778-6dce86b6efdd',
                      type: '$CUSTOM',
                      dependencies: [],
                      data: {
                        component: '$ADDRESS',
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

export default mock;
