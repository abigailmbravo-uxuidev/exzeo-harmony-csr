/* eslint-disable */
export default {
  meta: {
    company: 'TTIC',
    state: 'FL',
    product: 'AF3'
  },
  header: {
    showEffectiveDateButton: true,
    showReinstateButton: true,
    banner: {
      className: 'workflow-banner ttic fl af3 policy',
      icon: 'af3',
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
          id: '85f29af6-3a83-4686-ae5a-cf36eaf5e9a7',
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'coverage-rating'
          },
          formData: {},
          children: [
            {
              id: 'a6a9c459-5f2a-4005-b259-777cc2b223ac',
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'coverage-premium'
              },
              formData: {},
              children: [
                {
                  id: '74bf1df6-fa6f-48b0-a591-22ab235899f9',
                  component: '$TITLE',
                  dependencies: '',
                  data: {
                    text: 'Coverage and Premium'
                  },
                  formData: {}
                },
                {
                  id: '37f6701a-dd0a-47b1-847b-e2540296b47c',
                  component: '$SECTION',
                  dependencies: '',
                  data: {
                    className: 'row'
                  },
                  formData: {},
                  children: [
                    {
                      id: 'fad5ff0a-a21a-43a4-8672-f87d4c33315d',
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'coverage table',
                        size: '4'
                      },
                      formData: {},
                      children: [
                        {
                          id: '54bfec49-c566-4275-b7d6-50d7f735f80d',
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
                      id: 'dd689172-a5e6-4e4a-ac34-67d0ecc5b7f9',
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'coverage table',
                        size: '4'
                      },
                      formData: {},
                      children: [
                        {
                          id: '45da2e71-42ca-4c3b-8f3b-db7bb305b912',
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
                      id: 'f12ef8bf-308b-44f7-bc5a-b50b99974af7',
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'coverage table',
                        size: '4'
                      },
                      formData: {},
                      children: [
                        {
                          id: '4d332b38-07a2-47ce-81f0-2a60b26fd846',
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
                  id: 'c841f598-74cd-4e3b-893a-7199740d4bde',
                  component: '$SECTION',
                  dependencies: '',
                  data: {
                    className: 'row'
                  },
                  formData: {},
                  children: [
                    {
                      id: 12,
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'deductible table',
                        size: '4'
                      },
                      formData: {},
                      children: [
                        {
                          id: 13,
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
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'premium table',
                        size: '4'
                      },
                      formData: {},
                      children: [
                        {
                          id: 15,
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
                      id: 16,
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'billing table',
                        size: '4'
                      },
                      formData: {},
                      children: [
                        {
                          id: 17,
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
              id: 4497775432943353,
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'claims'
              },
              formData: {},
              children: [
                {
                  id: 4497775432943354,
                  component: '$TITLE',
                  dependencies: '',
                  data: {
                    text: 'Claims'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: 4497775432943355,
                  component: '$CLAIMS_TABLE',
                  dependencies: '',
                  data: {},
                  formData: {}
                }
              ]
            },
            {
              id: 18,
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'home-location-af3'
              },
              formData: {},
              children: [
                {
                  id: 19,
                  component: '$TITLE',
                  dependencies: '',
                  data: {
                    text: 'Home and Location'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: 20,
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
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'policyholder-agent'
          },
          formData: {},
          children: [
            {
              id: 32393759439222,
              component: '$POLICYHOLDER_AGENT',
              dependencies: '',
              data: {
                subscribe: true
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
          component: '$SECTION',
          dependencies: '',
          data: {},
          formData: {},
          children: [
            {
              id: 5152019255,
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'History'
              },
              formData: {},
              children: []
            },
            {
              id: 515255,
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
          id: 1,
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'mortgage-billing'
          },
          formData: {},
          children: [
            {
              id: 10,
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
              id: 11,
              component: '$TITLE',
              dependencies: '',
              data: { text: 'Additional Interests' },
              formData: {}
            },
            {
              id: 12,
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
          id: 100100,
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'cancel'
          },
          formData: {},
          children: [
            {
              id: 100101,
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'Cancel Policy'
              },
              formData: {},
              children: []
            },
            {
              id: 100102,
              component: '$CANCEL_TYPE',
              dependencies: '',
              data: {
                subscribe: true
              },
              formData: {},
              children: []
            },
            {
              id: 1001023,
              component: 'date',
              path: 'cancel.effectiveDate',
              dependencies: '',
              data: {
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
              id: 1001024,
              component: '$CANCEL_REASON',
              dependencies: '',
              data: {
                subscribe: true
              },
              formData: {},
              children: []
            }
          ]
        },
        {
          id: 54543543353,
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'payments'
          },
          formData: {},
          children: [
            {
              id: 4543543353,
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'Payments'
              },
              formData: {}
            },
            {
              id: 54543543353,
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
                  id: 20,
                  component: '$POLICY_BILLING',
                  dependencies: '',
                  data: {
                    subscribe: true
                  },
                  formData: {},
                  children: []
                }
              ]
            },
            {
              id: 454333335323,
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
              id: 454337878853231,
              component: '$PAYMENT_HISTORY_TABLE',
              dependencies: '',
              data: {},
              formData: {}
            }
          ]
        },
        {
          id: 5497775432943353,
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'claims'
          },
          formData: {},
          children: [
            {
              id: 5497775432943354,
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'Claims'
              },
              formData: {},
              children: []
            },
            {
              id: 5497775432943355,
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
          id: 34895439847239847,
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'endorsements'
          },
          formData: {},
          children: [
            {
              id: 34895439847239848,
              component: '$ENDORSEMENTS_MENU',
              dependencies: '',
              data: {
                subscribe: true,
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
              id: 44895439847239848,
              component: '$ENDORSEMENTS_WATCHER_AF3',
              dependencies: '',
              data: {
                subscribe: true
              },
              formData: {},
              children: []
            },
            {
              id: '5435535-fdsfdsf-234324324324-sss',
              component: '$SECTION',
              dependencies: '',
              data: {
                id: 'coverage-scroll-section',
                className: 'coverage-scroll'
              },
              formData: {},
              children: [
                {
                  id: '398ce68d-234324324324-4354353-34895439847239849',
                  component: '$TITLE',
                  dependencies: '',
                  data: {
                    text: 'Coverage'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: '398ce68d-234324324324-',
                  component: '$SECTION',
                  dependencies: '',
                  data: {
                    className: 'coverage-left',
                    size: '6'
                  },
                  formData: {},
                  children: [
                    {
                      id: '398ce68d-234324324324-33344',
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'form-group labels',
                        size: '12'
                      },
                      formData: {},
                      children: [
                        {
                          id: '398ce68d-234324324324-22222',
                          component: '$LABEL',
                          dependencies: '',
                          data: {
                            text: 'Current'
                          },
                          formData: {},
                          children: []
                        },
                        {
                          id: '398ce68d-234324324324-22222233',
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
                      id: '398ce68d-839c-4a49-bbf2-4545454543',
                      component: 'currency',
                      path: 'coverageLimits.building.value',
                      dependencies: '',
                      data: {
                        label: 'Building Limit',
                        validation: ['isBuildingRange'],
                        extendedProperties: {
                          format: 'currency',
                          displayRange: true,
                          min: 'coverageLimits.building.minAmount',
                          max: 'coverageLimits.building.maxAmount',
                          output:
                            '${format.toCurrency(it.initialValues.coverageLimits.building.value)}'
                        }
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: '398ce68d-839c-4a49-bbf2-11111113',
                      component: 'currency',
                      path: 'coverageLimits.personalProperty.value',
                      dependencies: '',
                      data: {
                        label: 'Personal Property Limit',
                        validation: ['isPersonalPropertyRange'],
                        extendedProperties: {
                          format: 'currency',
                          displayRange: true,
                          min: 'coverageLimits.personalProperty.minAmount',
                          max: 'coverageLimits.personalProperty.maxAmount',
                          output:
                            '${format.toCurrency(it.initialValues.coverageLimits.personalProperty.value)}'
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
                      path: 'deductibles.buildingDeductible.value',
                      dependencies: '',
                      data: {
                        label: 'Building Deductible',
                        options: [
                          { label: '$500', answer: 500 },
                          { label: '$1,000', answer: 1000 },
                          { label: '$2,000', answer: 2000 },
                          { label: '$5,000', answer: 5000 },
                          { label: '$10,000', answer: 10000 }
                        ],
                        extendedProperties: {
                          output:
                            '${format.toCurrency(it.initialValues.deductibles.buildingDeductible.value)}'
                        }
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: '498ce68d-839c-4a49-bbf2-455427875685',
                      component: 'selectInteger',
                      path: 'deductibles.personalPropertyDeductible.value',
                      dependencies: '',
                      data: {
                        disabled: true,
                        label: 'Personal Property Deductible',
                        options: [
                          { label: '$500', answer: 500 },
                          { label: '$1,000', answer: 1000 },
                          { label: '$2,000', answer: 2000 },
                          { label: '$5,000', answer: 5000 },
                          { label: '$10,000', answer: 10000 }
                        ],
                        extendedProperties: {
                          output:
                            '${format.toCurrency(it.initialValues.deductibles.personalPropertyDeductible.value)}'
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
                  id: '54864c4a69c6-4354355435354353',
                  component: '$SECTION',
                  dependencies: '',
                  data: {
                    className: 'coverage-right',
                    size: '6'
                  },
                  formData: {},
                  children: [
                    {
                      id: '398ce68d-234324324324-33345',
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'form-group labels',
                        size: '12'
                      },
                      formData: {},
                      children: [
                        {
                          id: '398ce68d-234324324324-22225',
                          component: '$LABEL',
                          dependencies: '',
                          data: {
                            text: 'Current'
                          },
                          formData: {},
                          children: []
                        },
                        {
                          id: '398ce68d-234324324324-22222235',
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
                        validation: ['isValidPersonalProperty'],
                        subscribe: true,
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
                      id: '398ce444467768d-839c-4a490890-cc275da53',
                      component: 'currency',
                      path: 'coverageLimits.increasedCompliance.value',
                      dependencies: '',
                      data: {
                        disabled: true,
                        label: 'Increased Cost of Compliance Limit',
                        extendedProperties: {
                          output:
                            '${format.toCurrency(it.initialValues.coverageLimits.increasedCompliance.value)}'
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
                        label: 'Loss of Use Limit',
                        extendedProperties: {
                          output:
                            '${format.toCurrency(it.initialValues.coverageLimits.lossOfUse.amount)}'
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
                  id: '386a6cf2-afe0-40da-8c79-751dedb3v678',
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
                      id: '398ce68d-234324324324-33347',
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'form-group labels',
                        size: '12'
                      },
                      formData: {},
                      children: [
                        {
                          id: '398ce68d-234324324324-22999',
                          component: '$LABEL',
                          dependencies: '',
                          data: {
                            text: 'Current'
                          },
                          formData: {},
                          children: []
                        },
                        {
                          id: '398ce68d-234324324324-22222999',
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
                      id: '741deda4c333-0ed7-4538-910a-598d0999',
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
                            '${it.initialValues.property.constructionType || " "}'
                        }
                      },
                      formData: {
                        required: true
                      },
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
                      id: '44448ce68d-234324324324-33347',
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'form-group labels',
                        size: '12'
                      },
                      formData: {},
                      children: [
                        {
                          id: '4448ce68d-234324324324-22999',
                          component: '$LABEL',
                          dependencies: '',
                          data: {
                            text: 'Current'
                          },
                          formData: {},
                          children: []
                        },
                        {
                          id: '4448ce68d-234324324324-22222999',
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
                      id: '75f752a8-8f5e-4d81-b3f2-435435435dd',
                      component: 'select',
                      path: 'property.floodterritory',
                      dependencies: '',
                      data: {
                        label: 'Territory',
                        size: '12',
                        options: [
                          { answer: '15000' },
                          { answer: '25000' },
                          { answer: '35000' },
                          { answer: '45000' }
                        ],
                        extendedProperties: {
                          output:
                            '${it.initialValues.property.floodterritory || " "}'
                        }
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: '75f752a8-44465678-4d81-b3f2-554654687444',
                      component: 'select',
                      path: 'property.FEMAfloodZone',
                      dependencies: '',
                      data: {
                        label: 'FEMA Flood Zone',
                        size: '12',
                        options: [
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
                        ],
                        extendedProperties: {
                          output:
                            '${it.initialValues.property.FEMAfloodZone || " "}'
                        }
                      },
                      formData: {},
                      children: []
                    },
                    {
                      id: '75f752a8-8f5e-4d81-b3f2-228a446444sd7dd',
                      component: 'select',
                      path: 'property.floodZone',
                      dependencies: '',
                      data: {
                        label: 'Flood Zone',
                        size: '12',
                        options: [
                          { answer: 'A' },
                          { answer: 'B' },
                          { answer: 'C' },
                          { answer: 'V' },
                          { answer: 'X' },
                          { answer: 'Z' }
                        ],
                        extendedProperties: {
                          output: '${it.initialValues.property.floodZone}'
                        }
                      },
                      formData: {
                        required: true
                      },
                      children: []
                    },
                    {
                      id: '75f752a8-44465678-4d81-b3f2-55465468788',
                      component: 'text',
                      path: 'underwritingAnswers.elevationDifference.answer',
                      dependencies: '',
                      data: {
                        disabled: true,
                        label: 'BFE Indicator',
                        size: '12',
                        extendedProperties: {
                          output:
                            '${it.initialValues.underwritingAnswers.elevationDifference.answer || " "}'
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
                  data: {
                    subscribe: true
                  },
                  formData: {},
                  children: []
                }
              ]
            },
            {
              name: 'PolicyHolder',
              id: '598d0d15-42dc-4059-ad09-64jddb3b512',
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
                  id: '64jddda3b512-3716-475e-9762-42dcdds',
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
              id: '598d0d15-42dc-4059-ad09-64jddb3b655',
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
                      id: '65345c40-2b54-4818-9778-d3f01404b16d',
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
                      id: '65345c40-2b54-4818-9778-6dce86b6efdd',
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
