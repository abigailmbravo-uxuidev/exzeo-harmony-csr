/* eslint-disable */
export default {
  meta: {
    company: 'HCPC',
    state: 'NJ',
    product: 'AF3'
  },
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
  pages: [
    {
      name: 'coverage',
      step: {},
      components: [
        {
          id: '169eb978-15b2-4ec0-b55b-bb40a440fbef',
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'coverage-rating'
          },
          formData: {},
          children: [
            {
              id: 'e40dc5fe-2170-4614-b245-da25775fd4f7',
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'coverage-premium'
              },
              formData: {},
              children: [
                {
                  id: '544531bb-8469-4bf2-bca0-42fcbea750ec',
                  component: '$TITLE',
                  dependencies: '',
                  data: {
                    text: 'Coverage and Premium'
                  },
                  formData: {}
                },
                {
                  id: '8c4aeb73-4c9e-4c41-8cef-213fa10b8696',
                  component: '$SECTION',
                  dependencies: '',
                  data: {
                    className: 'row'
                  },
                  formData: {},
                  children: [
                    {
                      id: 'd7a20d84-e171-4de6-bab0-59dc774b7e34',
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'coverage table',
                        size: '4'
                      },
                      formData: {},
                      children: [
                        {
                          id: 'ca999ab7-b97f-40ee-a9a0-5fe275e75994',
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
                      id: 'e91ecbea-d1df-4def-a31d-f338d521e8c0',
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'coverage table',
                        size: '4'
                      },
                      formData: {},
                      children: [
                        {
                          id: '4dd6c1a0-e19a-48ff-9905-884a252a0511',
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
                      id: '474516e7-fcc7-4ca4-b17d-1ea494019631',
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'coverage table',
                        size: '4'
                      },
                      formData: {},
                      children: [
                        {
                          id: 'c0f834f8-4f65-41f8-a85d-670af809e2b4',
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
                  id: '615dd701-dace-4be3-b517-bfb9ec63c67b',
                  component: '$SECTION',
                  dependencies: '',
                  data: {
                    className: 'row'
                  },
                  formData: {},
                  children: [
                    {
                      id: '57da59b3-8fc0-4a27-a131-3ebe2f569f13',
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'deductible table',
                        size: '4'
                      },
                      formData: {},
                      children: [
                        {
                          id: 'caba505e-c656-407d-ab67-637c3724967d',
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
                      id: 'e80bda26-541f-4d01-9e12-f1743235e9e4',
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'premium table',
                        size: '4'
                      },
                      formData: {},
                      children: [
                        {
                          id: '44fc71a0-3b18-400c-a4cd-496f7c00d0b7',
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
                      id: '1aa4514e-1753-485a-bd6d-a085cdc135a8',
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'billing table',
                        size: '4'
                      },
                      formData: {},
                      children: [
                        {
                          id: '9d224258-844c-4c3d-aabe-aafc637bc7bf',
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
              id: '18882ce4-3df7-4ec6-8ac6-80b5a54a77c4',
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'claims'
              },
              formData: {},
              children: [
                {
                  id: '9fb704ee-95d3-4616-a625-a1201e6fc0ba',
                  component: '$TITLE',
                  dependencies: '',
                  data: {
                    text: 'Claims'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: 'c9e03fe1-6151-44be-9a38-59d5781cf7b0',
                  component: '$CLAIMS_TABLE',
                  dependencies: '',
                  data: {},
                  formData: {}
                }
              ]
            },
            {
              id: '3c063266-5cb6-4508-b802-230e91d477cd',
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'home-location-af3'
              },
              formData: {},
              children: [
                {
                  id: 'cd2ad55e-20b9-493b-97f7-8ad715230681',
                  component: '$TITLE',
                  dependencies: '',
                  data: {
                    text: 'Home and Location'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: '8425a15f-af57-4dac-b174-bb581942b73e',
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
                  id: 'e8309d85-336c-4c2f-9bba-ac445215fda4',
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
          id: '453b6c5d-2aa3-4f66-8e23-f1a8731c5044',
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'policyholder-agent'
          },
          formData: {},
          children: [
            {
              id: '00eaa508-7d80-4bae-9ae1-2dd53d5ae30b',
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
          id: '73a77412-f251-41cb-95e6-a3b5c82f2def',
          component: '$SECTION',
          dependencies: '',
          data: {},
          formData: {},
          children: [
            {
              id: '7d50b8b4-af1f-47af-8292-8bfe57ea6cf2',
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'History'
              },
              formData: {},
              children: []
            },
            {
              id: '56feb02f-5d0c-43d7-9349-d2249a1a4a8c',
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
          id: '9a6ba957-ef5b-47c7-84cd-693ede552baf',
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'mortgage-billing'
          },
          formData: {},
          children: [
            {
              id: '0536d1da-7a60-4167-bcb0-e4d087fc5003',
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
              },
              children: []
            },
            {
              id: '7d91b246-e86f-4442-bbfa-e5c07213aa92',
              component: '$TITLE',
              dependencies: '',
              data: { text: 'Additional Interests' },
              formData: {},
              children: []
            },
            {
              id: 'b77075d6-23cf-4516-882a-a26ca7437726',
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
          id: '4d340ee6-9a95-4b94-a6ae-8fc8eb9f06eb',
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'cancel'
          },
          formData: {},
          children: [
            {
              id: 'f91951d6-896e-4631-9ee6-b5edc8529583',
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'Cancel Policy'
              },
              formData: {},
              children: []
            },
            {
              id: '34b19cf2-b854-4de4-9405-c760d7ac8a27',
              component: '$CANCEL_TYPE',
              dependencies: '',
              data: {
                subscribe: true
              },
              formData: {},
              children: []
            },
            {
              id: 'fa948972-b51c-4f78-9207-e1ba3cb86c83',
              component: 'date',
              path: 'cancel.effectiveDate',
              dependencies: '',
              data: {
                label: 'Effective Date',
                size: '2',
                validation: ['isValidDate']
              },
              formData: {
                required: true
              },
              children: []
            },
            {
              id: '27441252-8798-4049-ac44-305396fd3ac9',
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
          id: '9521a2a8-b97d-4db6-99d8-0cb50629fc47',
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'payments'
          },
          formData: {},
          children: [
            {
              id: '177acf79-0e88-4690-87f9-2b05614e0e12',
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'Payments'
              },
              formData: {}
            },
            {
              id: 'c825c442-ce99-454b-be89-330207dbaeef',
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
                  id: 'df291d56-5d68-4912-a046-d9be516e6e3b',
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
              id: 'f122cc63-6e65-40b8-9ffc-22fb45ab57ed',
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
              id: 'e62ecd54-1605-47e8-95f7-607a0c345c73',
              component: '$PAYMENT_HISTORY_TABLE',
              dependencies: '',
              data: {},
              formData: {}
            }
          ]
        },
        {
          id: 'fdeb143b-39c5-43aa-87df-97537ca4d80c',
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'claims'
          },
          formData: {},
          children: [
            {
              id: '06359215-3a4a-4954-b097-365409918562',
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'Claims'
              },
              formData: {},
              children: []
            },
            {
              id: '27e1628b-69ab-4bc6-8fc8-7e13dcc67238',
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
          id: '4bf11790-93cb-4ace-a4bb-621110f4f3f0',
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'endorsements'
          },
          formData: {},
          children: [
            {
              id: 'bab66b0d-d688-410f-bd2c-3339f376fc85',
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
              id: '576d5d9e-6fc9-4340-b05c-75cbcfe5a7c2',
              component: '$ENDORSEMENTS_WATCHER_AF3',
              dependencies: '',
              data: {
                subscribe: true
              },
              formData: {},
              children: []
            },
            {
              id: '63f3a539-bc63-4982-8b42-5d7c4b5ff015',
              component: '$SECTION',
              dependencies: '',
              data: {
                id: 'coverage-scroll-section',
                className: 'coverage-scroll'
              },
              formData: {},
              children: [
                {
                  id: 'f810c140-e7ed-4a80-a406-80dc4fda8a78',
                  component: '$TITLE',
                  dependencies: '',
                  data: {
                    text: 'Coverage'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: '49839b4c-dfc6-4b37-b638-f5ebdae673fb',
                  component: '$SECTION',
                  dependencies: '',
                  data: {
                    className: 'coverage-left',
                    size: '6'
                  },
                  formData: {},
                  children: [
                    {
                      id: '398a2218-c9d8-41dd-815d-60f70aeb1e3c',
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'form-group labels',
                        size: '12'
                      },
                      formData: {},
                      children: [
                        {
                          id: 'ad36c963-281b-4d08-84b9-018043c230f6',
                          component: '$LABEL',
                          dependencies: '',
                          data: {
                            text: 'Current'
                          },
                          formData: {},
                          children: []
                        },
                        {
                          id: 'd1584103-d110-45a5-b13e-ad1be66270d1',
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
                      id: '0ad5b801-7ef3-4fa8-bd7e-f7662d6266e1',
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
                      id: '8b148561-6cd7-4407-8d6e-7c162298e8e0',
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
                  id: '6da5b6e8-1f74-4ff8-96fc-3eedca99c189',
                  component: '$SECTION',
                  dependencies: '',
                  data: {
                    className: 'coverage-right',
                    size: '6'
                  },
                  formData: {},
                  children: [
                    {
                      id: 'e49f2a14-a572-44d1-bb1e-0871d0fe3d1c',
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'form-group labels',
                        size: '12'
                      },
                      formData: {},
                      children: [
                        {
                          id: '63534a2f-e506-47d7-9878-8285f03277bd',
                          component: '$LABEL',
                          dependencies: '',
                          data: {
                            text: 'Current'
                          },
                          formData: {},
                          children: []
                        },
                        {
                          id: '1bf19c7a-99e6-4b34-9c71-76847e23db5a',
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
                      id: '616e5119-e341-4030-b008-8a3fb54936d6',
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
                  id: '37f8a7e3-2d2e-43bf-a083-683296be3837',
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
                      id: '24920796-1634-4bc3-a524-84f45fb23512',
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'form-group labels',
                        size: '12'
                      },
                      formData: {},
                      children: [
                        {
                          id: 'c7371574-aa7d-46b3-8073-554e8ec3baaf',
                          component: '$LABEL',
                          dependencies: '',
                          data: {
                            text: 'Current'
                          },
                          formData: {},
                          children: []
                        },
                        {
                          id: '05854ba0-3ae6-431b-9cc7-0dc09888786b',
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
                      id: '9156b290-0ae9-4777-ad37-1afcf4b790c8',
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
                      id: 'e3401045-3626-4000-94c0-90710adbfbd3',
                      component: '$SECTION',
                      dependencies: '',
                      data: {
                        className: 'form-group labels',
                        size: '12'
                      },
                      formData: {},
                      children: [
                        {
                          id: '7ca36516-889a-4a44-ade5-0bde4112948a',
                          component: '$LABEL',
                          dependencies: '',
                          data: {
                            text: 'Current'
                          },
                          formData: {},
                          children: []
                        },
                        {
                          id: '5d2af2aa-57b2-4627-b397-f6d807aaab99',
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
                      id: '7b7b0a1f-7810-46c9-9bf7-2b6203262bd2',
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
                      id: 'a7b6cdb0-56c6-4fa9-8839-bb76f11994e2',
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
                      id: '9ebcffe3-4d93-4085-a9a7-25b808bd9cfd',
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
                      id: '1ca83ac9-5763-4102-9617-e2636d8f304a',
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
              id: '55828fd4-7e9c-4e69-bd69-e659770ed538',
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
                  id: 'afba653c-96cb-4c05-823e-ab32e7b8b952',
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
              id: '2e4513dc-0211-435b-886e-7137ad3f70aa',
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
