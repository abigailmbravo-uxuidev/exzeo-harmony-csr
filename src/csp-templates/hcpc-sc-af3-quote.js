/* eslint-disable */
const mock = {
  meta: {
    company: 'HCPC',
    state: 'SC',
    product: 'AF3'
  },
  header: {
    hideDetailSummary: false,
    banner: {
      className: 'workflow-banner hcpci sc af3 quote',
      icon: 'af3',
      title: 'Homeowners Choice',
      subTitle: 'SC'
    },
    fields: [
      { value: 'policyHolder', component: 'Section', label: 'Policyholder' },
      { value: 'mailingAddress', component: 'Section' },
      { value: 'propertyAddress', component: 'Section' },
      { value: 'county', label: 'Property County' },
      { value: 'effectiveDate', className: 'quoteEffectiveDate' },
      { value: 'endDate', label: 'Expiration Date', className: 'quoteEndDate' },
      { value: 'currentPremium', label: 'Premium', className: 'premium' }
    ]
  },
  pages: [
    {
      name: 'coverage',
      step: {},
      components: [
        {
          name: 'producedBy',
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
                component: '$AGENCY_AGENT_SELECT',
                dataSource: 'agencies',
                extendedProperties: {
                  subscribe: true,
                  enableAgencyInfo: true
                }
              },
              formData: {},
              children: []
            }
          ]
        },
        {
          name: 'policyHolders',
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
          name: 'propertyAddress',
          id: '0842592e-072d-4171-bc72-5141d43a1f39',
          type: '$SECTION',
          dependencies: [],
          data: {
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
                size: '2',
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
                size: '3',
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
                size: '7',
                component: 'text',
                label: 'IGD ID',
                disabled: true
              },
              formData: {},
              children: []
            }
          ]
        },
        {
          name: 'location',
          id: 'b1614e7d-1657-424b-b206-d06bfbde38af',
          type: '$SECTION',
          dependencies: [],
          data: {
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
              path: 'property.FEMAfloodZone',
              dependencies: [],
              data: {
                component: 'text',
                label: 'FEMA Flood Zone',
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
              path: 'property.floodterritory',
              dependencies: [],
              data: {
                component: 'text',
                label: 'Territory',
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
              id: '97874384-0638-43a8-9d76-671aa2f83438',
              type: '$INPUT',
              path: 'underwritingAnswers.elevationDifference.answer',
              dependencies: [],
              data: {
                component: 'text',
                label: 'BFE Indicator',
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
            }
          ]
        },
        {
          name: 'coverages',
          id: '79b48a18-4f4d-44e2-b778-9d02b6d827f6',
          type: '$SECTION',
          dependencies: [],
          data: {
            className: 'coverages-deductibles',
            size: '12'
          },
          formData: {},
          children: [
            {
              name: 'coverages',
              id: '79b48a18-4f4d-44e2-b778-9QQQQQQQQQQQQd02b6d827f6',
              type: '$SECTION',
              dependencies: [],
              data: {
                className: 'coverages',
                size: '9'
              },
              formData: {},
              children: [
                {
                  id: 'f5a6c22b-6d65-453e-b446-2d5c461d14c2',
                  type: '$TITLE',
                  dependencies: [],
                  data: {
                    text: 'Coverages'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: 'e532c398-a22d-4ff7-b459-10cc35b8a3d1',
                  type: '$INPUT',
                  path: 'coverageLimits.building.value',
                  dependencies: [],
                  data: {
                    component: 'currency',
                    label: 'Building Limit',
                    size: '7',
                    validation: ['isBuildingRange'],
                    extendedProperties: {
                      format: 'currency',
                      displayRange: true,
                      min: 'coverageLimits.building.minAmount',
                      max: 'coverageLimits.building.maxAmount'
                    }
                  },
                  formData: {
                    path: 'coverageLimits.building.value',
                    type: 'integer',
                    required: true,
                    metaData: {}
                  },
                  children: []
                },
                {
                  id: '0855ca01-4f9c-4d3f-ac1b-3b550fead6b1',
                  type: '$INPUT',
                  path: 'coverageLimits.increasedCompliance.value',
                  dependencies: [],
                  data: {
                    component: 'display',
                    label: 'Increased Cost of Compliance Limit',
                    size: '5',
                    extendedProperties: {
                      output: 'currency'
                    }
                  },
                  formData: {
                    path: 'coverageLimits.increasedCompliance.value',
                    type: 'integer',
                    metaData: {
                      target: '${it.coverageLimits.increasedCompliance.value}'
                    }
                  },
                  children: []
                },
                {
                  id: 'ce8fa0c1-b13b-4c31-9377-3be2a124ff30',
                  type: '$INPUT',
                  path: 'coverageLimits.personalProperty.value',
                  dependencies: [],
                  data: {
                    component: 'currency',
                    label: 'Personal Property Limit',
                    validation: ['isPersonalPropertyRange'],
                    size: '7',
                    extendedProperties: {
                      output: 'percent',
                      outputLabel: 'Percentage'
                    }
                  },
                  formData: {
                    path: 'coverageLimits.personalProperty.value',
                    type: 'integer',
                    required: true,
                    metaData: {
                      target:
                        '${Math.floor((((it.coverageLimits.personalProperty.value || 0) / it.coverageLimits.building.value) * 100 ))}'
                    }
                  },
                  children: []
                },
                {
                  id: '02ad7385-fa1d-4554-9cc8-7c7bbfa53d10',
                  type: '$INPUT',
                  path: 'coverageLimits.lossOfUse.value',
                  dependencies: [],
                  data: {
                    component: 'display',
                    label: 'Loss of Use Limit',
                    size: '5',
                    extendedProperties: {
                      output: 'currency'
                    }
                  },
                  formData: {
                    path: 'coverageLimits.lossOfUse.value',
                    type: 'integer',
                    metaData: {
                      target: '${it.coverageLimits.lossOfUse.value}'
                    }
                  },
                  children: []
                },
                {
                  id: '2d63a166-8e4f-4c4a-829d-d54c067e3c39',
                  type: '$INPUT',
                  path:
                    'coverageOptions.personalPropertyReplacementCost.answer',
                  dependencies: [],
                  data: {
                    component: 'radio',
                    label: 'Personal Property Repl Cost',
                    size: '7',
                    segmented: true,
                    disabled:
                      '${Math.floor((((it.coverageLimits.personalProperty.value || 0) / it.coverageLimits.building.value) * 100 )) < 25}',
                    dataSource: [
                      { label: 'No', answer: false },
                      { label: 'Yes', answer: true }
                    ],
                    extendedProperties: {
                      subscribe: true
                    }
                  },
                  formData: {
                    path:
                      'coverageOptions.personalPropertyReplacementCost.answer',
                    type: 'boolean',
                    required: true
                  },
                  children: []
                }
              ]
            },
            {
              name: 'Deductibles',
              id: '36c89c9e-5d95-465b-9426-308ebc1e8350',
              type: '$SECTION',
              dependencies: [],
              data: {
                className: 'deductibles',
                size: '3'
              },
              formData: {},
              children: [
                {
                  id: '33ea1392-e18a-435c-8163-ba0e11a30f38',
                  type: '$TITLE',
                  dependencies: [],
                  data: {
                    text: 'Deductibles'
                  },
                  formData: {},
                  children: []
                },
                {
                  name: 'Deductibles',
                  id: '36c89c9e-5d95-465b-9426-308ebc1e8350',
                  type: '$SECTION',
                  dependencies: [],
                  data: {
                    className: 'deductible-wrapper',
                    size: '12'
                  },
                  formData: {},
                  children: [
                    {
                      id: 'e1b7d921-2e61-42cd-8e80-20808f610ca0',
                      type: '$INPUT',
                      path: 'deductibles.buildingDeductible.value',
                      dependencies: [],
                      data: {
                        component: 'selectInteger',
                        label: 'Building Deductible',
                        size: '12'
                      },
                      formData: {
                        path: 'deductibles.buildingDeductible.value',
                        type: 'integer',
                        required: true,
                        metaData: {
                          enum: [
                            { label: '$500', answer: 500 },
                            { label: '$1,000', answer: 1000 },
                            { label: '$2,000', answer: 2000 },
                            { label: '$5,000', answer: 5000 },
                            { label: '$10,000', answer: 10000 }
                          ]
                        }
                      },
                      children: []
                    },
                    {
                      id: '82cbb49d-e76b-41f3-a30e-92c283c27b00',
                      type: '$INPUT',
                      path: 'deductibles.personalPropertyDeductible.value',
                      dependencies: [],
                      data: {
                        component: 'currency',
                        label: 'Personal Property Deductible',
                        size: '12',
                        disabled: true,
                        extendedProperties: {
                          watchFields: [
                            {
                              field: 'deductibles.buildingDeductible.value',
                              becomes: '$MATCH_FIELD',
                              to: '$FIELD_VALUE'
                            }
                          ]
                        }
                      },
                      formData: {
                        path: 'deductibles.personalPropertyDeductible.value',
                        type: 'integer',
                        metaData: {
                          enum: [
                            { label: '$500', answer: 500 },
                            { label: '$1,000', answer: 1000 },
                            { label: '$2,000', answer: 2000 },
                            { label: '$5,000', answer: 5000 },
                            { label: '$10,000', answer: 10000 }
                          ]
                        }
                      },
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'b963aac4-936d-4290-9756-0a41819dvv6h',
          type: '$CUSTOM',
          dependencies: [],
          data: {
            component: '$COVERAGE_WATCHER_AF3',
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
      name: 'underwriting',
      step: {},
      components: [
        {
          id: '0',
          type: '$TITLE',
          dependencies: [],
          data: {
            text: 'Underwriting Questions'
          },
          formData: {},
          children: []
        },
        {
          id: '6fb8975a-1a56-4280-8021-484d8da24dfd',
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
      name: 'additionalInterests',
      step: {},
      components: [
        {
          id: '3cd9ee83-7c45-45b2-87f3-6dabdfce260e',
          type: '$TITLE',
          dependencies: [{ 'rating.worksheet': false }],
          data: {
            className: 'messages',
            icon: 'fa fa-exclamation-circle',
            text:
              'Additional Interests cannot be accessed until Premium calculated.'
          },
          formData: {},
          children: []
        },
        {
          id: 'fd4a8e5c-cb30-4342-9bec-adaa10887b86',
          type: '$TITLE',
          dependencies: [{ 'rating.worksheet': true }],
          data: {
            text: 'Additional Interests'
          },
          formData: {},
          children: []
        },
        {
          id: 'f11b33f7-fd04-4a25-95ee-5a55c25a5ae3',
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
    },
    {
      name: 'mailingBilling',
      step: {},
      components: [
        {
          id: '1816b7dd-0a67-499f-86d0-d2a413a5517f',
          type: '$TITLE',
          dependencies: [
            { quoteInputState: 'Initial Data' },
            { quoteInputState: 'Underwriting' }
          ],
          data: {
            className: 'messages',
            icon: 'fa fa-exclamation-circle',
            text:
              'Billing cannot be accessed until policyholder information and underwriting questions are answered.'
          },
          formData: {},
          children: []
        },
        {
          id: '03d39ef5-010d-4ceb-8298-7f5d47ab0b99',
          type: '$GROUP',
          dependencies: [
            { quoteInputState: 'Qualified' },
            { quoteInputState: 'Ready' },
            { quoteInputState: 'AppStarted' }
          ],
          data: {},
          formData: {},
          children: [
            {
              id: 'a8d9f35c-27f1-4a26-b1a0-320ad7afddfc',
              type: '$SECTION',
              dependencies: [],
              data: {
                className: 'billing-address'
              },
              formData: {},
              children: [
                {
                  id: '4a9b2831-10b9-449e-aefe-90bd10180ceb',
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
                  dependencies: [{ billToId: '' }, { billToId: true }],

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
                }
              ]
            },
            {
              id: '71035517-5930-46b5-b2b9-d9c570c1181d',
              type: '$SECTION',
              dependencies: [],
              data: {
                className: 'billing-information'
              },
              formData: {},
              children: [
                {
                  id: '76e6ef7b-6ec4-4b1c-b823-a52fa0bf8da7',
                  type: '$TITLE',
                  dependencies: [],
                  data: {
                    text: 'Billing Information'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: '18c6eba7-d5ef-4aa8-9ad3-3a9810d3f98e',
                  type: '$CUSTOM',
                  dependencies: [],
                  data: {
                    component: '$BILLING',
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
          id: '22119960-d3a3-44aa-bc3e-0afe8fcbc870',
          type: '$SECTION',
          dependencies: [],
          data: {},
          formData: {},
          children: [
            {
              id: 'ec826d85-475b-4155-b921-e9231df847c9',
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'History'
              },
              formData: {},
              children: []
            },
            {
              id: 'b8ade3d3-8e2d-49d6-92f8-d04e20879514',
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
      name: 'summary',
      step: {},
      components: [
        {
          id: '1f2f82b8-7b4b-4419-a147-a3c50b393e9a',
          type: '$TITLE',
          dependencies: [
            { blockQuoteSummary: true },
            { quoteInputState: 'Initial Data' },
            { quoteInputState: 'Underwriting' },
            { quoteInputState: 'AppStarted' }
          ],
          data: {
            className: 'messages',
            icon: 'fa fa-exclamation-circle',
            text: 'Quote Summary cannot be sent due to Underwriting Validations'
          },
          formData: {},
          children: []
        },
        {
          id: '03d39ef5-010d-4ceb-8298-7f5d47ab0b99',
          type: '$GROUP',
          dependencies: [
            {
              quoteInputState: 'Qualified',
              blockQuoteSummary: false
            },
            {
              quoteInputState: 'Ready',
              blockQuoteSummary: false
            }
          ],
          data: {},
          formData: {},
          children: [
            {
              id: 'b3f9079e-3400-475a-af04-3b4ba3d2ecd3',
              type: '$SECTION',
              dependencies: [],
              data: {
                className: 'produced-by af3'
              },
              formData: {},
              children: [
                {
                  id: 'ea59c51d-f71e-4f1d-8198-178fe5499250',
                  type: '$TITLE',
                  dependencies: [],
                  data: {
                    text: 'Quote Details'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: 'f4a1d4c4-d5ed-4551-accc-95eea2b52d0e',
                  type: '$CUSTOM',
                  dependencies: [],
                  data: {
                    component: '$SUMMARY',
                    extendedProperties: {
                      useFetchAgents: true,
                      className: 'property-details',
                      details: [
                        {
                          label: 'Quote Number',
                          items: [{ format: '', path: 'quoteNumber' }]
                        },
                        {
                          label: 'Property Address',
                          items: [
                            {
                              format: '',
                              path: 'property.physicalAddress.address1'
                            },
                            {
                              format: '',
                              path: 'property.physicalAddress.address2'
                            },
                            {
                              format: 'cityStateZip',
                              path: 'property.physicalAddress'
                            }
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
                              format: '',
                              optionKey: 'agents',
                              compareField: 'answer',
                              valuePath: 'agentCode',
                              selectField: 'displayName'
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
              id: '0248c645-acf8-462f-a22a-0df85a7d162f',
              type: '$SECTION',
              dependencies: [],
              data: {
                className: 'coverage-rating af3'
              },
              formData: {},
              children: [
                {
                  id: '0e6cab48-28c8-4878-bdaf-a5c49dfe7f08',
                  type: '$TITLE',
                  dependencies: [],
                  data: {
                    text: 'Coverage / Rating'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: 'a54b8722-7db3-4980-9674-10f8fd6f7318',
                  type: '$CUSTOM',
                  dependencies: [],
                  data: {
                    component: '$SUMMARY',
                    extendedProperties: {
                      details: [
                        {
                          items: [
                            { format: 'currency', path: 'rating.totalPremium' }
                          ],
                          label: 'Yearly Premium'
                        },
                        {
                          items: [
                            {
                              format: 'currency',
                              path: 'coverageLimits.building.amount'
                            }
                          ],
                          label: 'Building'
                        },
                        {
                          items: [
                            {
                              format: 'currency',
                              path: 'coverageLimits.personalProperty.amount'
                            }
                          ],
                          label: 'Personal Property'
                        },
                        {
                          items: [
                            {
                              format: 'currency',
                              path: 'coverageLimits.increasedCompliance.value'
                            }
                          ],
                          label: 'Increased Cost of Compliance Limit'
                        },
                        {
                          items: [
                            {
                              format: 'currency',
                              path: 'coverageLimits.lossOfUse.amount'
                            }
                          ],
                          label: 'Loss Of Use'
                        },
                        {
                          items: [
                            {
                              format: 'bool',
                              path:
                                'coverageOptions.personalPropertyReplacementCost.answer'
                            }
                          ],
                          label: 'Personal Property Repl Cost'
                        },
                        {
                          items: [
                            {
                              format: 'currency',
                              path: 'deductibles.buildingDeductible.amount'
                            }
                          ],
                          label: 'Building Deductible'
                        },
                        {
                          items: [
                            {
                              format: 'currency',
                              path:
                                'deductibles.personalPropertyDeductible.amount'
                            }
                          ],
                          label: 'Personal Property Deductible'
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
              id: 'c62f27b9-517e-4f81-a366-c6a7890bcfad',
              type: '$SECTION',
              dependencies: [{ 'policyHolders[0].firstName': true }],
              data: {
                className: 'policyholder-details af3'
              },
              formData: {},
              children: [
                {
                  id: 'ce642ba8-ce64-4d48-99cd-9dcb384c055f',
                  type: '$TITLE',
                  dependencies: [],
                  data: {
                    text: 'Primary Policyholder'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: 'caedcedb-6066-4aa6-8eba-8b7272751ee5',
                  type: '$CUSTOM',
                  dependencies: [],
                  data: {
                    component: '$SUMMARY',
                    extendedProperties: {
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
                          items: [
                            {
                              format: '',
                              path: 'policyHolders[0].emailAddress'
                            }
                          ]
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
                }
              ]
            },
            {
              id: 'f437d380-c77a-47c5-b434-a34ba2b2f279',
              type: '$SECTION',
              dependencies: [{ 'policyHolders[1].firstName': true }],
              data: {
                className: 'property-details af3'
              },
              formData: {},
              children: [
                {
                  id: '1913b679-6a02-4b15-881b-3a23501ec8b2',
                  type: '$TITLE',
                  dependencies: [],
                  data: {
                    text: 'Secondary Policyholder'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: 'c84f5a32-6a4a-4e73-beff-dff442dcea52',
                  type: '$CUSTOM',
                  dependencies: [],
                  data: {
                    component: '$SUMMARY',
                    extendedProperties: {
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
                          items: [
                            {
                              format: '',
                              path: 'policyHolders[1].emailAddress'
                            }
                          ]
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
                }
              ]
            },
            {
              id: 'e4689ed9-9cff-415a-8885-c30ba47db7d8',
              type: '$SECTION',
              dependencies: [{ 'policyHolderMailingAddress.address1': true }],
              data: {
                className: 'property-details af3'
              },
              formData: {},
              children: [
                {
                  id: 'a78ce43c-f56f-48fb-9808-025069d5935f',
                  type: '$TITLE',
                  dependencies: [],
                  data: {
                    text: 'Mailing Address'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: '687912d9-170d-4482-a4c5-22c1fce0bc68',
                  type: '$CUSTOM',
                  dependencies: [],
                  data: {
                    component: '$SUMMARY',
                    extendedProperties: {
                      details: [
                        {
                          label: 'Address',
                          items: [
                            {
                              format: '',
                              path: 'policyHolderMailingAddress.address1'
                            },
                            {
                              hideNoValuePath:
                                'policyHolderMailingAddress.address2',
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
                              path:
                                'policyHolderMailingAddress.country.displayText'
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
              id: '9654c0cc-7373-45c3-ab51-2c0ce4cea0b3',
              type: '$SECTION',
              dependencies: [],
              data: {
                className: 'detail-group additional-interests af3'
              },
              formData: {},
              children: [
                {
                  id: 'c8b8eb90-aa5b-43cb-b94e-f48457524862',
                  type: '$TITLE',
                  dependencies: [],
                  data: {
                    text: 'Additional Interests'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: '3780b829-d438-416d-8596-391d0959cb5f',
                  type: '$CUSTOM',
                  dependencies: [],
                  data: {
                    component: '$ADDITIONAL_INTEREST_LIST',
                    extendedProperties: {
                      displayReferenceNumber: true
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
      name: 'application',
      step: {},
      components: [
        {
          id: 'cc01470d-8c90-4daf-9ac9-a465ca7184a5',
          type: '$TITLE',
          dependencies: [
            { blockSendApplication: true },
            { quoteInputState: 'Initial Data' },
            { quoteInputState: 'Underwriting' },
            { quoteInputState: 'AppStarted' }
          ],
          data: {
            className: 'messages',
            icon: 'fa fa-exclamation-circle',
            text: 'Application cannot be sent due to Underwriting Validations.'
          },
          formData: {},
          children: []
        },
        {
          id: 'caf7a9c2-2ba4-4815-87b6-21c48b596720',
          type: '$SECTION',
          dependencies: [
            { quoteInputState: 'Qualified', blockSendApplication: false },
            { quoteInputState: 'Ready', blockSendApplication: false }
          ],
          data: {},
          formData: {},
          children: [
            {
              id: '9593a84f-83bf-4895-8504-0eff1f4089bd',
              type: '$APPLICATION',
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
};

export default mock;
