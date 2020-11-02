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
    hideDetailSummary: false,
    banner: {
      className: 'workflow-banner ttic fl ho3 quote',
      icon: 'ho3',
      title: 'TypTap',
      subTitle: 'FL'
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
          name: 'ProducedBy',
          id: '3c74cf92-b61a-4498-8859-5d9cc8cb577e',
          component: '$SECTION',
          dependencies: '',
          data: {},
          formData: {},
          children: [
            {
              id: '5edae808-9e75-4075-abf6-21e23c23c14d',
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'Produced By'
              },
              formData: {},
              children: []
            },
            {
              id: '05d5f45b-40ba-4acf-861c-2a165fa4b839',
              component: 'date',
              path: 'effectiveDate',
              dependencies: '',
              data: {
                label: 'Effective Date',
                size: '3',
                extendedProperties: {
                  min: 'zipCodeSettings.minEffectiveDate',
                  max: 'zipCodeSettings.maxEffectiveDate'
                },
                validation: ['minEffectiveDate', 'isValidDate']
              },
              formData: {
                required: true
              },
              children: []
            },
            {
              id: '77e13b53-6bea-4576-bf24-5231d4d50a3f',
              component: '$AGENCY_AGENT_SELECT',
              dependencies: '',
              data: {
                size: '9',
                subscribe: true,
                extendedProperties: {
                  enableAgencyInfo: true
                }
              },
              formData: {},
              children: []
            }
          ]
        },
        {
          name: 'Policyholders',
          id: '7639f8d4-3716-475e-9762-f94f03dd61c8',
          component: '$POLICYHOLDERS',
          dependencies: '',
          data: {
            extendedProperties: {
              watchField: 'removeSecondary'
            }
          },
          formData: {},
          children: []
        },
        {
          name: 'PropertyAddress',
          id: '9911f280-424d-41d8-bf2b-534d6339f8f8',
          component: '$SECTION',
          dependencies: '',
          data: {
            size: '4'
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
              id: '57d97b8b-d82e-4261-8488-6dce86b6efdd',
              component: 'text',
              path: 'property.physicalAddress.address1',
              dependencies: '',
              data: {
                label: 'Address 1',
                disabled: true
              },
              formData: {},
              children: []
            },
            {
              id: '807d2e0d-5c10-4c8b-bca2-8ce6d45ac8d0',
              component: 'text',
              path: 'property.physicalAddress.address2',
              dependencies: '',
              data: {
                label: 'Address 2',

                disabled: true
              },
              formData: {},
              children: []
            },
            {
              id: '7f5600a8-97b0-4f88-9d87-f9d31a6cffbd',
              component: 'text',
              path: 'property.physicalAddress.city',
              dependencies: '',
              data: {
                label: 'City',

                disabled: true
              },
              formData: {},
              children: []
            },
            {
              id: '2df0ae71-dd13-4a5b-a861-4b8811896953',
              component: 'text',
              path: 'property.physicalAddress.state',
              dependencies: '',
              data: {
                label: 'State',
                size: '4',
                disabled: true
              },
              formData: {},
              children: []
            },
            {
              id: 'fe820193-a6be-49d2-901f-e7bb0a850f0c',
              component: 'text',
              path: 'property.physicalAddress.zip',
              dependencies: '',
              data: {
                label: 'Zip',
                size: '8',
                disabled: true
              },
              formData: {},
              children: []
            }
          ]
        },
        {
          name: 'Location',
          id: 'b2a6bd25-8b63-4d7a-a8f6-063764f04d00',
          component: '$SECTION',
          dependencies: '',
          data: {
            size: '8'
          },
          formData: {},
          children: [
            {
              id: 'a4f48952-aa46-44ef-9b5e-c5e6341fbbca',
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'Home and Location'
              },
              formData: {},
              children: []
            },
            {
              id: 'a4efd131-5e31-4ab1-a7fd-55442aaa13c0',
              component: 'text',
              path: 'property.yearBuilt',
              dependencies: '',
              data: {
                label: 'Year Home Built',
                size: '3',
                disabled: true
              },
              formData: {},
              children: []
            },
            {
              id: '06a55c5c-fca2-4a49-8c8b-bb76cbab019a',
              component: 'number',
              path: 'property.protectionClass',
              dependencies: '',
              data: {
                label: 'Protection Class',
                validation: [
                  'isNumbersOnly',
                  'isProtectionClassRange',
                  'isRequired'
                ],
                size: '3'
              },
              formData: {},
              children: []
            },
            {
              id: '40808340-4da2-4b08-ab38-c0a969562027',
              component: 'text',
              path: 'property.distanceToTidalWater',
              dependencies: '',
              data: {
                label: 'Tidal Waters Dist.',
                size: '3',
                disabled: true
              },
              formData: {},
              children: []
            },
            {
              id: '7f6a95dd-0848-4e22-8805-3c0e770eb7fe',
              component: 'text',
              path: 'property.residenceType',
              dependencies: '',
              data: {
                label: 'Residence Type',
                size: '3',
                disabled: true
              },
              formData: {},
              children: []
            },
            {
              id: 'f5f12822-09c8-42e6-9cb0-87a49960d11a',
              component: 'select',
              path: 'property.constructionType',
              dependencies: '',
              data: {
                label: 'Construction',
                size: '3',
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
                ]
              },
              formData: {},
              children: []
            },
            {
              id: '6770a129-705d-4f38-9a8e-3f67a7bf92d4',
              component: 'select',
              path: 'property.buildingCodeEffectivenessGrading',
              dependencies: '',
              data: {
                label: 'BCEG',
                size: '3',
                disabled: true,
                options: [
                  { label: '01', answer: '1' },
                  { label: '02', answer: '2' },
                  { label: '03', answer: '3' },
                  { label: '04', answer: '4' },
                  { label: '05', answer: '5' },
                  { label: '06', answer: '6' },
                  { label: '07', answer: '7' },
                  { label: '08', answer: '8' },
                  { label: '09', answer: '9' },
                  { label: '98', answer: '98' },
                  { label: '99', answer: '99' }
                ]
              },
              formData: {},
              children: []
            },
            {
              id: '089600b6-6350-46d3-9ea3-8d5cfa0fe705',
              component: 'text',
              path: 'property.distanceToFireHydrant',
              dependencies: '',
              data: {
                label: 'Fire Hydrant Dist.',
                size: '3',
                disabled: true
              },
              formData: {},
              children: []
            },
            {
              id: 'c5bba8b4-da64-434d-9897-dba80a69160c',
              component: 'text',
              path: 'property.squareFeet',
              dependencies: '',
              data: {
                label: 'Sq. Ft. of Home',
                size: '3',
                disabled: true
              },
              formData: {},
              children: []
            },
            {
              id: 'bf3d77ff-d6ea-4b29-8c4b-6347fbf91113',
              component: 'text',
              path: 'property.yearOfRoof',
              dependencies: '',
              data: {
                label: 'Year Roof Built',
                size: '3',
                disabled: true
              },
              formData: {},
              children: []
            },
            {
              id: '26548d94-cb36-4244-a79c-7c734aa3bccc',
              component: 'select',
              path: 'property.familyUnits',
              dependencies: '',
              data: {
                label: 'Family Units',
                size: '3',
                disabled: true,
                options: [
                  { answer: '1-2' },
                  { answer: '3-4' },
                  { answer: '5-8' },
                  { answer: '9+' }
                ]
              },
              formData: {},
              children: []
            },
            {
              id: '450aa423-f709-47b8-bbca-99dd94a74c08',
              component: 'text',
              path: 'property.distanceToFireStation',
              dependencies: '',
              data: {
                label: 'Fire Station Dist.',
                size: '3',
                disabled: true
              },
              formData: {},
              children: []
            },
            {
              id: '75f752a8-8f5e-4d81-b3f2-228a4462d7dd',
              component: 'select',
              path: 'property.FEMAfloodZone',
              dependencies: '',
              data: {
                label: 'FEMA Flood Zone',
                size: '3',
                disabled: true,
                options: [
                  { answer: 'V' },
                  { answer: 'A' },
                  { answer: 'B' },
                  { answer: 'C' },
                  { answer: 'X' },
                  { answer: 'U' }
                ]
              },
              formData: {},
              children: []
            },
            {
              id: '450aa423-f709-47b8-bbca-03e16747b302',
              component: 'text',
              path: 'property.territory',
              dependencies: '',
              data: {
                label: 'Territory',
                size: '2',
                disabled: true
              },
              formData: {},
              children: []
            },
            {
              id: '93a98349-6361-43cd-b525-03e16747b301',
              component: 'text',
              path: 'rating.worksheet.elements.territoryFactors.name',
              dependencies: '',
              data: {
                label: 'Territory Description',
                size: '4',
                disabled: true
              },
              formData: {},
              children: []
            },
            {
              id: '93a98349-6361-43cd-b525-03e16747b300',
              component: 'text',
              path: 'property.id',
              dependencies: '',
              data: {
                label: 'IGD ID',
                size: '6',
                disabled: true
              },
              formData: {},
              children: []
            }
          ]
        },
        {
          name: 'Coverages',
          id: '505c951c-5455-464f-be37-c5d019f381f0',
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'coverages',
            size: '5'
          },
          formData: {},
          children: [
            {
              id: 'ffca44fc-4798-4553-a724-90de74014445',
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'Coverages'
              },
              formData: {},
              children: []
            },
            {
              id: '869971a7-5f36-482c-9faf-0e099252b6bc',
              component: 'currency',
              path: 'coverageLimits.dwelling.value',
              dependencies: '',
              data: {
                label: 'Dwelling Limit',
                validation: ['isDwellingRange'],
                extendedProperties: {
                  format: 'currency',
                  displayRange: true,
                  min: 'coverageLimits.dwelling.minAmount',
                  max: 'coverageLimits.dwelling.maxAmount'
                }
              },
              formData: {
                required: true
              },
              children: []
            },
            {
              id: '398ce68d-839c-4a49-bbf2-6546546456',
              component: 'selectInteger',
              path: 'coverageLimits.otherStructures.value',
              dependencies: '',
              data: {
                label: 'Percentage',
                options: [
                  { label: '0%', answer: 0 },
                  { label: '2%', answer: 2 },
                  { label: '5%', answer: 5 },
                  { label: '10%', answer: 10 }
                ],
                extendedProperties: {
                  output:
                    '${format.toCurrency(Math.ceil(((it.coverageLimits.otherStructures.value / 100) * it.coverageLimits.dwelling.value)))}',
                  outputLabel: 'Other Structures Limit'
                }
              },
              formData: {
                required: true
              },
              children: []
            },
            {
              id: '52e4217f-570c-4f7c-8c96-a50b509954a9',
              component: 'selectInteger',
              path: 'coverageLimits.personalProperty.value',
              dependencies: '',
              data: {
                label: 'Percentage',
                validation: ['personalPropertyMax'],
                extendedProperties: {
                  output:
                    '${format.toCurrency(Math.ceil(((it.coverageLimits.personalProperty.value / 100) * it.coverageLimits.dwelling.value)))}',
                  outputLabel: 'Personal Property Limit',
                  conditionalOptions: true
                },
                options: [
                  {
                    label: '0%',
                    answer: 0,
                    disabled:
                      '${Math.ceil(((0) * it.coverageLimits.dwelling.value)) > 500000}'
                  },
                  {
                    label: '25%',
                    answer: 25,
                    disabled:
                      '${Math.ceil(((0.25) * it.coverageLimits.dwelling.value)) > 500000}'
                  },
                  {
                    label: '35%',
                    answer: 35,
                    disabled:
                      '${Math.ceil(((0.35) * it.coverageLimits.dwelling.value)) > 500000}'
                  },
                  {
                    label: '50%',
                    answer: 50,
                    disabled:
                      '${Math.ceil(((0.5) * it.coverageLimits.dwelling.value)) > 500000}'
                  }
                ]
              },
              formData: {
                required: true
              },
              children: []
            },
            {
              id: '24ffebbf-541b-4228-8e31-497d18c6b502',
              component: 'display',
              path: 'coverageLimits.lossOfUse.value',
              dependencies: '',
              data: {
                label: 'Loss of Use Limit',
                extendedProperties: {
                  output:
                    '${format.toCurrency(Math.ceil(((it.coverageLimits.lossOfUse.value / 100) * it.coverageLimits.dwelling.value)))}'
                }
              },
              formData: {
                required: true
              },
              children: []
            },
            {
              id: 'f6afdf28-9cc8-472f-84f5-2d209c6517d2',
              component: 'selectInteger',
              path: 'coverageLimits.personalLiability.value',
              dependencies: '',
              data: {
                label: 'Personal Liability Limit',
                segmented: true,
                options: [
                  { label: '$100,000', answer: 100000 },
                  { label: '$300,000', answer: 300000 }
                ]
              },
              formData: {
                required: true
              },
              children: []
            },
            {
              id: '0a81cf7f-a754-4fdb-8c67-2a2e31fd45e2',
              component: 'display',
              path: 'coverageLimits.medicalPayments.value',
              dependencies: '',
              data: {
                label: 'Medical Payments to Others Limit',
                segmented: true,
                extendedProperties: {
                  output: '${format.toCurrency(2000)}'
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
          name: 'OtherCoverages',
          id: '4a8b0f31-5bd5-481d-95db-be90dcb3b89b',
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'other-coverages',
            size: '3'
          },
          formData: {},
          children: [
            {
              id: '555ac19f-c411-44fb-a373-c3252a72d088',
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'Other Coverages'
              },
              formData: {},
              children: []
            },
            {
              id: '2bd854a5-47a1-4a91-b6ce-9b43f00f3b01',
              component: 'selectInteger',
              path: 'coverageLimits.moldProperty.value',
              dependencies: '',
              data: {
                label: 'Mold Property',
                size: '12',
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
              id: '409966fe-20db-49d1-9b24-fa797a7d24b0',
              component: 'selectInteger',
              path: 'coverageLimits.moldLiability.value',
              dependencies: '',
              data: {
                label: 'Mold Liability Limit',
                size: '12',
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
              id: 'b141e258-5074-4ba1-90bc-54864c4a69c6',
              component: 'radio',
              path: 'coverageOptions.personalPropertyReplacementCost.answer',
              dependencies: '',
              data: {
                label: 'Personal Property Replacement Cost',
                segmented: true,
                disabled: '${it.coverageLimits.personalProperty.value < 25}',
                options: [
                  { label: 'No', answer: false },
                  { label: 'Yes', answer: true }
                ],
                extendedProperties: {
                  watchFields: [
                    {
                      field: 'coverageLimits.personalProperty.value',
                      becomes: 0,
                      to: false
                    }
                  ]
                }
              },
              formData: {
                required: true
              },
              children: []
            },
            {
              id: 'b5999281-fc47-410f-b5c5-763cec7c5907',
              component: 'selectInteger',
              path: 'coverageLimits.ordinanceOrLaw.value',
              dependencies: '',
              data: {
                label: 'Ordinance or Law Coverage Limit',
                options: [
                  { label: '25% of Dwelling Limit', answer: 25 },
                  { label: '50% of Dwelling Limit', answer: 50 }
                ]
              },
              formData: {
                required: true
              },
              children: []
            }
          ]
        },
        {
          name: 'Deductibles',
          id: '30d719ce-9aa3-4e86-a40e-d5eadad535a0',
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'deductibles',
            size: '2'
          },
          formData: {},
          children: [
            {
              id: '52685473-9060-4d6f-a957-e94338c0287e',
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'Deductibles'
              },
              formData: {},
              children: []
            },
            {
              id: 'c03f149b-71df-4555-8dfa-2fc697fe3db8',
              component: 'selectInteger',
              path: 'deductibles.allOtherPerils.value',
              dependencies: '',
              data: {
                label: 'All Other Perils',
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
              id: '6dab0dc0-6839-43da-8cb8-7108a6f4c00c',
              component: 'selectInteger',
              path: 'deductibles.hurricane.value',
              dependencies: '',
              data: {
                label: 'Hurricane Deductible',
                options: [
                  { label: '2% of Dwelling Limit', answer: 2 },
                  { label: '5% of Dwelling Limit', answer: 5 },
                  { label: '10% of Dwelling Limit', answer: 10 }
                ],
                extendedProperties: {
                  output:
                    '${format.toCurrency(Math.ceil(((it.deductibles.hurricane.value / 100) * it.coverageLimits.dwelling.value)))}',
                  outputLabel: 'Calculated Hurricane'
                }
              },
              formData: {
                required: true
              },
              children: []
            },
            {
              id: '4cbef727-5327-42f8-b62c-1e94556deefe',
              component: 'select',
              path: 'coverageOptions.sinkholePerilCoverage.answer',
              dependencies: '',
              data: {
                label: 'Sinkhole',
                options: [
                  { answer: false, label: 'Coverage Excluded' },
                  { answer: true, label: '10% of Dwelling Limit' }
                ],
                extendedProperties: {
                  output:
                    "${format.toCurrency(it.coverageOptions.sinkholePerilCoverage.answer === 'true' || it.coverageOptions.sinkholePerilCoverage.answer === true ? Math.ceil(((10 / 100) * it.coverageLimits.dwelling.value)) : 0)}",
                  outputLabel: 'Calculated Sinkhole'
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
          name: 'Discounts',
          id: '6485a47b-e7a4-443f-9d43-ebbb1bd848e7',
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'discounts',
            size: '2'
          },
          formData: {},
          children: [
            {
              id: '1b525554-0138-4900-ba46-72de50984a88',
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'Discounts'
              },
              formData: {},
              children: []
            },
            {
              id: '597938ad-6ef4-4a19-977c-3cbaf857b055',
              component: 'radio',
              path: 'property.burglarAlarm',
              dependencies: '',
              data: {
                segmented: true,
                label: 'Burglar Alarm',
                size: '12',
                options: [
                  { label: 'No', answer: false },
                  { label: 'Yes', answer: true }
                ]
              },
              formData: {},
              children: []
            },
            {
              id: '70a40164-c71d-45b0-9029-b95a57a9291d',
              component: 'radio',
              path: 'property.fireAlarm',
              dependencies: '',
              data: {
                segmented: true,
                label: 'Fire Alarm',
                size: '12',
                options: [
                  { label: 'No', answer: false },
                  { label: 'Yes', answer: true }
                ]
              },
              formData: {},
              children: []
            },
            {
              id: '1ae18d58-26d3-49ea-af33-550100883f11',
              component: 'radio',
              path: 'property.sprinkler',
              dependencies: '',
              data: {
                segmented: true,
                label: 'Sprinkler',
                size: '12',
                options: [
                  { label: 'N', answer: 'N' },
                  { label: 'A', answer: 'A' },
                  { label: 'B', answer: 'B' }
                ]
              },
              formData: {
                required: true
              },
              children: []
            }
          ]
        },
        {
          name: 'WindMitigation',
          id: '598d0d15-42dc-4059-ad09-751dedb3b512',
          component: '$SECTION',
          dependencies: '',
          data: {
            className: 'wind-mit'
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
              id: '57f21212-7631-4dd7-9b42-55fe263b9491',
              component: 'select',
              path: 'property.windMitigation.roofCovering',
              dependencies: '',
              data: {
                component: 'select',
                label: 'Roof Covering',
                size: '6',
                options: [
                  { label: 'Non-FBC', answer: 'Non-FBC' },
                  { label: 'FBC', answer: 'FBC' },
                  { label: 'Other', answer: 'Other' }
                ]
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
                component: 'number',
                label: 'FBC Wind Speed',
                size: '6',
                validation: ['isNumbersOnly']
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
                component: 'select',
                label: 'Roof Deck Attachment',
                size: '6',
                options: [
                  { label: 'A', answer: 'A' },
                  { label: 'B', answer: 'B' },
                  { label: 'C', answer: 'C' },
                  { label: 'D', answer: 'D' },
                  { label: 'Concrete', answer: 'Concrete' },
                  { label: 'Other', answer: 'Other' }
                ]
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
                component: 'number',
                label: 'FBC Wind Speed Design',
                size: '6',
                validation: ['isNumbersOnly']
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
                component: 'select',
                label: 'Roof to Wall Attachment',
                size: '6',
                options: [
                  { label: 'Toe Nails', answer: 'Toe Nails' },
                  { label: 'Clips', answer: 'Clips' },
                  { label: 'Single Wraps', answer: 'Single Wraps' },
                  { label: 'Double Wraps', answer: 'Double Wraps' },
                  { label: 'Other', answer: 'Other' }
                ]
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
                component: 'select',
                label: 'Terrain',
                size: '6',
                segmented: true,
                options: [
                  { label: 'B', answer: 'B' },
                  { label: 'C', answer: 'C' },
                  { label: 'HVHZ', answer: 'HVHZ' },
                  { label: 'Other', answer: 'Other' }
                ]
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
                component: 'select',
                label: 'Roof Geometry',
                size: '6',
                options: [
                  { label: 'Flat', answer: 'Flat' },
                  { label: 'Gable', answer: 'Gable' },
                  { label: 'Hip', answer: 'Hip' },
                  { label: 'Other', answer: 'Other' }
                ]
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
                component: 'select',
                label: 'Internal Pressure Design',
                size: '6',
                options: [
                  { label: 'Enclosed', answer: 'Enclosed' },
                  { label: 'Partial', answer: 'Partial' },
                  { label: 'Other', answer: 'Other' }
                ]
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
                component: 'radio',
                label: 'Secondary Water Resistance (SWR)',
                size: '6',
                segmented: true,
                options: [
                  { label: 'Yes', answer: 'Yes' },
                  { label: 'No', answer: 'No' },
                  { label: 'Other', answer: 'Other' }
                ]
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
                component: 'radio',
                label: 'Wind Borne Debris Region (WBDR)',
                size: '6',
                segmented: true,
                options: [
                  { label: 'Yes', answer: 'Yes' },
                  { label: 'No', answer: 'No' },
                  { label: 'Other', answer: 'Other' }
                ]
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
                component: 'select',
                label: 'Opening Protection:',
                size: '6',
                options: [
                  { label: 'None', answer: 'None' },
                  { label: 'Basic', answer: 'Basic' },
                  { label: 'Hurricane', answer: 'Hurricane' },
                  { label: 'Other', answer: 'Other' }
                ]
              },
              formData: {
                required: true
              },
              children: []
            },
            {
              id: 'b963aac4-936d-4290-9756-7a4e45ee',
              component: '$COVERAGE_WATCHER_HO3',
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
      name: 'underwriting',
      step: {},
      components: [
        {
          id: '7a4e45ee-7c2e-4f0f-9ac7-dc1b9aef8ee7',
          component: '$SECTION',
          dependencies: '',
          data: {},
          formData: {},
          children: [
            {
              id: '0',
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'Underwriting Questions'
              },
              formData: {},
              children: []
            },
            {
              id: '1',
              component: '$UNDERWRITING',
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
      name: 'additionalInterests',
      step: {},
      components: [
        {
          id: '3cd9ee83-7c45-45b2-87f3-6dabdfce260e',
          component: '$TITLE',
          path: 'page.additionalInterest.hide',
          dependencies: '${!(it.rating || {}).worksheet}',
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
          component: '$TITLE',
          path: 'page.additionalInterest.title',
          dependencies: '${!!(it.rating || {}).worksheet}',
          data: {
            text: 'Additional Interests'
          },
          formData: {},
          children: []
        },
        {
          id: 'f11b33f7-fd04-4a25-95ee-5a55c25a5ae3',
          component: '$ADDITIONAL_INTERESTS',
          path: 'page.additionalInterest.show',
          dependencies: '${!!(it.rating || {}).worksheet}',
          data: {
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
          component: '$TITLE',
          path: 'page.mailingBilling.hide',
          dependencies:
            "${it.quoteInputState === 'Initial Data' || it.quoteInputState === 'Underwriting'}",
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
          component: '$GROUP',
          path: 'page.mailingBilling.show',
          dependencies:
            "${it.quoteInputState === 'Qualified' || it.quoteInputState === 'Ready' || it.quoteInputState === 'AppStarted'}",
          data: {},
          formData: {},
          children: [
            {
              id: 'a8d9f35c-27f1-4a26-b1a0-320ad7afddfc',
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'billing-address'
              },
              formData: {},
              children: [
                {
                  id: '4a9b2831-10b9-449e-aefe-90bd10180ceb',
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
                  path: 'section.policyholderMailingAddress.show',
                  dependencies: "${(it.billToId === '' || it.billToId)}",
                  data: {
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
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'billing-information'
              },
              formData: {},
              children: [
                {
                  id: '76e6ef7b-6ec4-4b1c-b823-a52fa0bf8da7',
                  component: '$TITLE',
                  dependencies: '',
                  data: {
                    text: 'Billing Information'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: '18c6eba7-d5ef-4aa8-9ad3-3a9810d3f98e',
                  component: '$BILLING',
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
      name: 'notes',
      step: {},
      components: [
        {
          id: '22119960-d3a3-44aa-bc3e-0afe8fcbc870',
          component: '$SECTION',
          dependencies: '',
          data: {},
          formData: {},
          children: [
            {
              id: 'ec826d85-475b-4155-b921-e9231df847c9',
              component: '$TITLE',
              dependencies: '',
              data: {
                text: 'History'
              },
              formData: {},
              children: []
            },
            {
              id: 'b8ade3d3-8e2d-49d6-92f8-d04e20879514',
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
      name: 'summary',
      step: {},
      components: [
        {
          id: '1f2f82b8-7b4b-4419-a147-a3c50b393e9a',
          component: '$TITLE',
          path: 'page.summary.hide',
          dependencies:
            "${it.blockQuoteSummary || it.quoteInputState === 'Initial Data' || it.quoteInputState === 'Underwriting'}",
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
          component: '$GROUP',
          path: 'page.summary.show',
          dependencies:
            "${!it.blockQuoteSummary && (it.quoteInputState === 'Qualified' || it.quoteInputState === 'Ready' || it.quoteInputState === 'AppStarted')}",
          data: {},
          formData: {},
          children: [
            {
              id: 'b3f9079e-3400-475a-af04-3b4ba3d2ecd3',
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'produced-by'
              },
              formData: {},
              children: [
                {
                  id: 'ea59c51d-f71e-4f1d-8198-178fe5499250',
                  component: '$TITLE',
                  dependencies: '',
                  data: {
                    text: 'Quote Details'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: 'f4a1d4c4-d5ed-4551-accc-95eea2b52d0e',
                  component: '$SUMMARY',
                  dependencies: '',
                  data: {
                    extendedProperties: {
                      fetchAgents: true,
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
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'coverage-rating'
              },
              formData: {},
              children: [
                {
                  id: '0e6cab48-28c8-4878-bdaf-a5c49dfe7f08',
                  component: '$TITLE',
                  dependencies: '',
                  data: {
                    text: 'Coverage / Rating'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: 'a54b8722-7db3-4980-9674-10f8fd6f7318',
                  component: '$SUMMARY',
                  dependencies: '',
                  data: {
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
                              path: 'coverageLimits.dwelling.amount'
                            }
                          ],
                          label: 'A. Dwelling'
                        },
                        {
                          items: [
                            {
                              format: 'currency',
                              path: 'coverageLimits.otherStructures.amount'
                            }
                          ],
                          label: 'B. Other Structures'
                        },
                        {
                          items: [
                            {
                              format: 'currency',
                              path: 'coverageLimits.personalProperty.amount'
                            }
                          ],
                          label: 'C. Personal Property'
                        },
                        {
                          items: [
                            {
                              format: 'currency',
                              path: 'coverageLimits.lossOfUse.amount'
                            }
                          ],
                          label: 'D. Loss Of Use'
                        },
                        {
                          items: [
                            {
                              format: 'currency',
                              path: 'coverageLimits.personalLiability.amount'
                            }
                          ],
                          label: 'E. Personal Liability'
                        },
                        {
                          items: [
                            {
                              format: 'currency',
                              path: 'coverageLimits.medicalPayments.amount'
                            }
                          ],
                          label: 'F. Medical Payments'
                        },
                        {
                          items: [
                            {
                              format: 'bool',
                              path:
                                'coverageOptions.personalPropertyReplacementCost.answer'
                            }
                          ],
                          label: 'Personal Property Replacement Cost'
                        },
                        {
                          items: [
                            {
                              format: 'currency',
                              path: 'coverageLimits.moldProperty.amount'
                            }
                          ],
                          label: 'Mold Property'
                        },
                        {
                          items: [
                            {
                              format: 'currency',
                              path: 'coverageLimits.moldLiability.amount'
                            }
                          ],
                          label: 'Mold Liability'
                        },
                        {
                          items: [
                            {
                              format: 'percent',
                              path: 'coverageLimits.ordinanceOrLaw.amount'
                            }
                          ],
                          label: 'Ordinance or Law'
                        },
                        {
                          items: [
                            {
                              format: 'currency',
                              path: 'deductibles.allOtherPerils.amount'
                            }
                          ],
                          label: 'All Other Perils Deductible'
                        },
                        {
                          items: [
                            {
                              format: 'percent',
                              path: 'deductibles.hurricane.amount'
                            }
                          ],
                          label: 'Hurricane Deductible'
                        },
                        {
                          items: [
                            {
                              format: 'currency',
                              path: 'deductibles.hurricane.calculatedAmount'
                            }
                          ],
                          label: 'Calculated Hurricane Deductible'
                        },
                        {
                          label: 'Sinkhole Deductible',
                          items: [
                            {
                              format: 'conditionalPercent',
                              path: 'deductibles.sinkhole.amount',
                              conditions: [''],
                              defaultValue: 'Coverage Excluded'
                            }
                          ]
                        },
                        {
                          items: [
                            {
                              hideNoValuePath:
                                'deductibles.sinkhole.calculatedAmount',
                              format: 'currency',
                              path: 'deductibles.sinkhole.calculatedAmount'
                            }
                          ],
                          label: 'Calculated Sinkhole Deductible'
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
              component: '$SECTION',
              path: 'page.summary.primaryPolicyHolder',
              dependencies: '${it.policyHolders[0].firstName}',
              data: {
                className: 'policyholder-details'
              },
              formData: {},
              children: [
                {
                  id: 'ce642ba8-ce64-4d48-99cd-9dcb384c055f',
                  component: '$TITLE',
                  dependencies: '',
                  data: {
                    text: 'Primary Policyholder'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: 'caedcedb-6066-4aa6-8eba-8b7272751ee5',
                  component: '$SUMMARY',
                  dependencies: '',
                  data: {
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
              component: '$SECTION',
              path: 'page.summary.secondaryPolicyHolder',
              dependencies: '${it.policyHolders[1].firstName}',
              data: {
                className: 'property-details'
              },
              formData: {},
              children: [
                {
                  id: '1913b679-6a02-4b15-881b-3a23501ec8b2',
                  component: '$TITLE',
                  dependencies: '',
                  data: {
                    text: 'Secondary Policyholder'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: 'c84f5a32-6a4a-4e73-beff-dff442dcea52',
                  component: '$SUMMARY',
                  dependencies: '',
                  data: {
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
              component: '$SECTION',
              path: 'page.summary.policyHolderMailingAddress',
              dependencies: '${it.policyHolderMailingAddress.address1}',
              data: {
                className: 'property-details'
              },
              formData: {},
              children: [
                {
                  id: 'a78ce43c-f56f-48fb-9808-025069d5935f',
                  component: '$TITLE',
                  dependencies: '',
                  data: {
                    text: 'Mailing Address'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: '687912d9-170d-4482-a4c5-22c1fce0bc68',
                  component: '$SUMMARY',
                  dependencies: '',
                  data: {
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
              component: '$SECTION',
              dependencies: '',
              data: {
                className: 'detail-group additional-interests'
              },
              formData: {},
              children: [
                {
                  id: 'c8b8eb90-aa5b-43cb-b94e-f48457524862',
                  component: '$TITLE',
                  dependencies: '',
                  data: {
                    text: 'Additional Interests'
                  },
                  formData: {},
                  children: []
                },
                {
                  id: '3780b829-d438-416d-8596-391d0959cb5f',
                  component: '$ADDITIONAL_INTEREST_LIST',
                  dependencies: '',
                  data: {
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
          id: 'caf7a9c2-2ba4-4815-87b6-21c48b596720',
          component: '$TITLE',
          path: 'page.application.hide',
          dependencies:
            "${it.blockSendApplication || it.quoteInputState === 'Initial Data' || it.quoteInputState === 'Underwriting' || it.quoteInputState === 'AppStarted'}",
          data: {
            className: 'messages',
            icon: 'fa fa-exclamation-circle',
            text: 'Application cannot be sent due to Underwriting Validations.'
          },
          formData: {},
          children: []
        },
        {
          id: '9593a84f-83bf-4895-8504-0eff1f4089bc',
          component: '$SECTION',
          path: 'page.application.show',
          dependencies:
            "${!it.blockSendApplication && (it.quoteInputState === 'Qualified' || it.quoteInputState === 'Ready')}",
          data: {},
          formData: {},
          children: [
            {
              id: '9593a84f-83bf-4895-8504-0eff1f4089bd',
              component: '$APPLICATION',
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
};
