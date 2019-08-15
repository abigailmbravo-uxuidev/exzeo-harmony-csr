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
      { value: 'floodZone' },
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
                                      format: 'percent',
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
                                        'coverageOptionss.personalPropertyReplacementCost.answer'
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
                          label: 'Flood Zone',
                          items: [{ format: '', path: 'property.floodZone' }]
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
                          label: 'Base Flood Elevation',
                          items: [
                            { format: '', path: 'property.baseFloodElevation' }
                          ]
                        },
                        {
                          label: 'Square Footage',
                          items: [{ format: '', path: 'property.squareFeet' }]
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
    }
  ]
};

export default mock;
