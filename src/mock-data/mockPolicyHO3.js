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
            className: 'coverage'
          },
          formData: {},
          children: [
            {
              id: 2,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Coverage and Premium'
              },
              formData: {},
              children: []
            },
            {
              id: 3,
              type: '$SECTION',
              dependencies: [],
              data: {
                className: 'coverage-left'
              },
              formData: {},
              children: [
                {
                  id: 4,
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
                              path: 'coverageLimits.otherStructures.amount'
                            }
                          ]
                        },
                        {
                          label: 'Personal Property Limit',
                          items: [
                            {
                              format: 'currency',
                              path: 'coverageLimits.personalProperty.amount'
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
                              path: 'coverageLimits.personalLiability.amount'
                            }
                          ]
                        },
                        {
                          label: 'Medical Payments to Others Limit',
                          items: [
                            {
                              format: 'currency',
                              path: 'coverageLimits.medicalPayments.amount'
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
              id: 5,
              type: '$SECTION',
              dependencies: [],
              data: {
                className: 'coverage-center'
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
                              path: 'coverageLimits.moldLiability.amount'
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
                              path: 'coverageLimits.ordinanceOrLaw.amount'
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
              id: 7,
              type: '$SECTION',
              dependencies: [],
              data: {
                className: 'coverage-right'
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
                          label: 'Discount/Surcharge',
                          items: [
                            {
                              format: 'conditionalValue',
                              path: 'none',
                              conditions: [''],
                              defaultValue: 'Value'
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
};

export default mock;
