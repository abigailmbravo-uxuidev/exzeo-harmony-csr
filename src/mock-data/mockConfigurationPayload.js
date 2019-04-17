/* eslint-disable */
const mock = {
  pages: [
    {
      name: 'coverage',
      step: {},
      components: [
          {
            id: 1,
            type: '$SECTION',
            dependencies: [],
            data: {},
            formData: {},
            children: [
            {
              id: 2,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Produced By',
              },
              formData: {},
              children: [],
            },
            {
              id: 3,
              type: '$INPUT',
              path: 'effectiveDate',
              dependencies: [],
              data: {
                component: 'date',
                label: 'Effective Date',
                size: '4',
                extendedProperties: {
                  min: 'zipCodeSettings.minEffectiveDate',
                  max: 'zipCodeSettings.maxEffectiveDate',
                },
                validation: ['minEffectiveDate', 'isValidDate'],
              },
              formData: {
                path: 'effectiveDate',
                type: 'string',
                required: true,
                metaData: {
                  format: 'date-time'
                  // also need min-date for underwriting
                },
              },
              children: [],
            },
            {
              id: 4,
              type: '$INPUT',
              path: 'agencyCode',
              dependencies: [],
              data: {
                component: 'select',
                label: 'Agency',
                size: '4',
                dataSource: 'agencies'
              },
              formData: {
                path: 'agencyCode',
                type: 'integer',
                required: true,
                metaData: {},
              },
              children: [],
            },
            {
              id: 5,
              type: '$INPUT',
              path: 'agentCode',
              dependencies: [],
              data: {
                component: 'select',
                label: 'Agent',
                size: '4',
                dataSource: 'agents'
              },
              formData: {
                path: 'agentCode',
                type: 'integer',
                required: true,
                metaData: {},
              },
              children: [],
            }
        ]
      },
        {
          id: 6,
          type: '$SECTION',
          dependencies: [],
          data: {},
          formData: {},
          children: [
            {
              id: 7,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Primary Policyholder',
                children: []
              },
              formData: {},
              children: [],
            },
            {
              id: 8,
              type: '$INPUT',
              dependencies: [],
              path: 'policyHolders[0].firstName',
              data: {
                component: 'text',
                label: 'First Name',
                size: '5',
                validation: ['isValidNameFormat'],
              },
              formData:  {
                path: 'policyHolders.policyHolder.firstName',
                type: 'string',
                required: true,
                metaData: { minLength: 1, maxLength: 255 },
              },
              children: [],
            },
            {
              id: 9,
              type: '$INPUT',
              path: 'policyHolders[0].lastName',
              dependencies: [],
              data: {
                component: 'text',
                label: 'Last Name',
                size: '7',
                validation: ['isValidNameFormat'],
              },
              formData:  {
                path: 'policyHolders.policyHolder.lastName',
                type: 'string',
                required: true,
                metaData: {
                  minLength: 1,
                  maxLength: 255
                },
              },
              children: [],
            },
            {
              id: 10,
              type: '$INPUT',
              path: 'policyHolders[0].emailAddress',
              dependencies: [],
              data: {
                component: 'text',
                label: 'Email Address',
                size: '8',
                validation: ['isEmail'],
              },
              formData:  {
                path: 'policyHolders.policyHolder.emailAddress',
                type: 'string',
                required: true,
                metaData: {
                  minLength: 1,
                  maxLength: 255
                },
              },
              children: [],
            },
            {
              id: 11,
              type: '$INPUT',
              path: 'policyHolders[0].primaryPhoneNumber',
              dependencies: [],
              data: {
                component: 'phone',
                label: 'Contact Phone',
                size: '4',
                validation: ['isPhone'],
              },
              formData:  {
                path: 'policyHolders.policyHolder.primaryPhoneNumber',
                type: 'string',
                required: true,
                metaData: {
                  pattern: '^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$'
                },
              },
              children: [],
            },
            {
              id: 12,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Secondary Policyholder',
                children: []
              },
              formData: {},
              children: [],
            },
            {
              id: 13,
              type: '$INPUT',
              path: 'policyHolders[1].firstName',
              dependencies: [],
              data: {
                component: 'text',
                label: 'First Name',
                size: '5',
                validation: ['isValidNameFormat'],
              },
              formData:  {
                path: 'policyHolders.policyHolder.firstName',
                type: 'string',
                required: true,
                metaData: {
                  minLength: 1,
                  maxLength: 255
                },
              },
              children: [],
            },
            {
              id: 14,
              type: '$INPUT',
              path: 'policyHolders[1].lastName',
              dependencies: [],
              data: {
                component: 'text',
                label: 'Last Name',
                size: '7',
                validation: ['isValidNameFormat'],
              },
              formData:  {
                path: 'policyHolders.policyHolder.lastName',
                type: 'string',
                required: true,
                metaData: {
                  minLength: 1,
                  maxLength: 255
                },
              },
              children: [],
            },
            {
              id: 15,
              type: '$INPUT',
              path: 'policyHolders[1].emailAddress',
              dependencies: [],
              data: {
                component: 'text',
                label: 'Email Address',
                size: '8',
                validation: ['isEmail'],
              },
              formData:  {
                path: 'policyHolders.policyHolder.emailAddress',
                type: 'string',
                required: true,
                metaData: {
                  minLength: 1,
                  maxLength: 255
                },
              },
              children: [],
            },
            {
              id: 16,
              type: '$INPUT',
              path: 'policyHolders[1].primaryPhoneNumber',
              dependencies: [],
              data: {
                component: 'phone',
                label: 'Contact Phone',
                size: '4',
                validation: ['isPhone'],
              },
              formData:  {
                path: 'policyHolders.policyHolder.primaryPhoneNumber',
                type: 'string',
                required: true,
                metaData: {
                  pattern: '^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$'
                },
              },
              children: [],
            }
          ]
        },
        {
          id: 17,
          type: '$TITLE',
          dependencies: [],
          data: {
            text: 'Property Address',
            children: []
          },
          formData: {},
          children: [],
        },
        {
          id: 18,
          type: '$INPUT',
          path: 'property.physicalAddress.address1',
          dependencies: [],
          data: {
            component: 'text',
            label: 'Address 1',
            size: '4',
            disabled: true
          },
          formData: {},
          children: [],
        },
        {
          id: 19,
          type: '$INPUT',
          path: 'property.physicalAddress.address2',
          dependencies: [],
          data: {
            component: 'text',
            label: 'Address 2',
            size: '4',
            disabled: true
          },
          formData: {},
          children: [],
        },
        {
          id: 20,
          type: '$INPUT',
          path: 'property.physicalAddress.city',
          dependencies: [],
          data: {
            component: 'text',
            label: 'City',
            size: '4',
            disabled: true
          },
          formData: {},
          children: [],
        },
        {
          id: 21,
          type: '$INPUT',
          path: 'property.physicalAddress.state',
          dependencies: [],
          data: {
            component: 'text',
            label: 'State',
            size: '6',
            disabled: true
          },
          formData: {},
          children: [],
        },
        {
          id: 19,
          type: '$INPUT',
          path: 'property.physicalAddress.zip',
          dependencies: [],
          data: {
            component: 'text',
            label: 'Zip',
            size: '6',
            disabled: true
          },
          formData: {},
          children: [],
        },
        {
          id: 20,
          type: '$TITLE',
          dependencies: [],
          data: {
            text: 'Home and Location',
            children: []
          },
          formData: {},
          children: [],
        },
        {
          id: 21,
          type: '$INPUT',
          path: 'property.yearBuilt',
          dependencies: [],
          data: {
            component: 'text',
            label: 'Year Home Built',
            size: '3',
            disabled: true
          },
          formData: {},
          children: [],
        },
        {
          id: 22,
          type: '$INPUT',
          path: 'property.protectionClass',
          dependencies: [],
          data: {
            component: 'text',
            label: 'Protection Class',
            size: '3',
            disabled: true
          },
          formData: {},
          children: [],
        },
        {
          id: 23,
          type: '$INPUT',
          path: 'property.distanceToTidalWater',
          dependencies: [],
          data: {
            component: 'text',
            label: 'Tidal Waters Dist.',
            size: '3',
            disabled: true
          },
          formData: {},
          children: [],
        },
        {
          id: 24,
          type: '$INPUT',
          path: 'property.residenceType',
          dependencies: [],
          data: {
            component: 'text',
            label: 'Residence Type',
            size: '3',
            disabled: true
          },
          formData: {},
          children: [],
        },
        {
          id: 25,
          type: '$INPUT',
          path: 'property.constructionType',
          dependencies: [],
          data: {
            component: 'select',
            label: 'Construction',
            size: '3',
            disabled: true,
            dataSource: [
              {
                "label" : "Masonry",
                "answer" : "MASONRY"
              },
              {
                "label" : "Frame",
                "answer" : "FRAME"
              },
              {
                "label" : "Masonry",
                "answer" : "MASONRY"
              },
              {
                "label" : "Plastic Siding",
                "answer" : "PLASTIC SIDING"
              },
              {
                "label" : "Aluminum Siding",
                "answer" : "ALUMINUM SIDING"
              },
              {
                "label" : "Masonry Veneer",
                "answer" : "MASONRY VENEER"
              },
              {
                "label" : "Superior",
                "answer" : "SUPERIOR"
              },
            ]
          },
          formData: {},
          children: [],
        },
        {
          id: 26,
          type: '$INPUT',
          path: 'property.buildingCodeEffectivenessGrading',
          dependencies: [],
          data: {
            component: 'select',
            label: 'BCEG',
            size: '3',
            disabled: true,
            dataSource: [
              {
                "label" : "01",
                "answer" : "1"
              },
              {
                "label" : "02",
                "answer" : "2"
              },
              {
                "label" : "03",
                "answer" : "3"
              },
              {
                "label" : "04",
                "answer" : "4"
              },
              {
                "label" : "05",
                "answer" : "5"
              },
              {
                "label" : "06",
                "answer" : "6"
              },
              {
                "label" : "07",
                "answer" : "7"
              },              {
                "label" : "08",
                "answer" : "8"
              },              {
                "label" : "09",
                "answer" : "9"
              },              {
                "label" : "98",
                "answer" : "98"
              },              {
                "label" : "99",
                "answer" : "99"
              },
            ]
          },
          formData: {},
          children: [],
        },
        {
          id: 27,
          type: '$INPUT',
          path: 'property.distanceToFireHydrant',
          dependencies: [],
          data: {
            component: 'text',
            label: 'Fire Hydrant Dist.',
            size: '3',
            disabled: true
          },
          formData: {},
          children: [],
        },
        {
          id: 28,
          type: '$INPUT',
          path: 'property.squareFeet',
          dependencies: [],
          data: {
            component: 'text',
            label: 'Sq. Ft. of Home',
            size: '3',
            disabled: true
          },
          formData: {},
          children: [],
        },
        {
          id: 29,
          type: '$INPUT',
          path: 'property.yearOfRoof',
          dependencies: [],
          data: {
            component: 'text',
            label: 'Year Roof Built',
            size: '3',
            disabled: true
          },
          formData: {},
          children: [],
        },
        {
          id: 30,
          type: '$INPUT',
          path: 'property.familyUnits',
          dependencies: [],
          data: {
            component: 'select',
            label: 'Family Units',
            size: '3',
            disabled: true,
            dataSource: [
              {
                "answer" : "1-2"
              },              
              {
                "answer" : "3-4"
              },
              {
                "answer" : "5-8"
              },
              {
                "answer" : "9+"
              }
            ]
          },
          formData: {},
          children: [],
        },
        {
          id: 31,
          type: '$INPUT',
          path: 'property.distanceToFireStation',
          dependencies: [],
          data: {
            component: 'text',
            label: 'Fire Station Dist.',
            size: '3',
            disabled: true
          },
          formData: {},
          children: [],
        },
        {
          id: 32,
          type: '$INPUT',
          path: 'property.floodZone',
          dependencies: [],
          data: {
            component: 'select',
            label: 'Flood Zone',
            size: '3',
            disabled: true,
            dataSource: [
              {
                "answer" : "V"
              },              
              {
                "answer" : "A"
              },
              {
                "answer" : "B"
              },
              {
                "answer" : "C"
              },
              {
                "answer" : "X"
              },
              {
                "answer" : "U"
              }
            ]
          },
          formData: {},
          children: [],
        },
        {
          id: 33,
          type: '$INPUT',
          path: 'property.id',
          dependencies: [],
          data: {
            component: 'text',
            label: 'IGD ID',
            size: '12',
            disabled: true
          },
          formData: {},
          children: [],
        },
        {
          id: 34,
          type: '$TITLE',
          dependencies: [],
          data: {
            text: 'Coverages',
          },
          formData: {},
          children: [],
        },
        {
          id: 35,
          type: '$INPUT',
          path: 'coverageLimits.dwelling.amount',
          dependencies: [],
          data: {
            component: 'currency',
            label: 'Dwelling Limit',
            size: '4',
            hint : "This is the dollar amount of coverage for the structure of your home. This amount should represent the total cost to rebuild your home to its current state in the event of a loss. If you have a Declarations Page from your current  policy it may be listed as Coverage A.  (Based on basic information of your home, we provide you a guide for a recommended value. You can move this number up or down based on more detailed information. For example, if you have an upgraded kitchen and bathroom, you may want to increase this number to ensure that you have adequate coverage in the event of a loss.)  ",
            validation: ['isDwellingRange'],
            extendedProperties: {
              format: 'currency',
              min: 'coverageLimits.dwelling.minAmount',
              max: 'coverageLimits.dwelling.maxAmount',
              step: 1000,
            },
          },
          formData: {
            path: 'coverageLimits.dwelling.value',
            type: 'integer',
            required: true,
            metaData: {},
          },
          children: [],
        },
        {
          id: 36,
          type: '$INPUT',
          path: 'coverageLimits.otherStructures.value',
          dependencies: [],
          data: {
            component: 'select',
            label: 'Other Structures Limit',
            size: '4',
            hint : "This is the dollar amount of coverage for the other structures on your property not attached to your home. This might include a fence, shed, or unattached garage. If you have a Declarations Page from your current  policy it may be listed as Coverage B.",
            dataSource: [
              {
                "label" : "0%",
                "answer" : 0
              },
              {
                "label" : "2%",
                "answer" : 2
              },
              {
                "label" : "5%",
                "answer" : 5
              },
              {
                "label" : "10%",
                "answer" : 10
              }
            ],
            extendedProperties: {
                output: 'currency',
            },
          },
          formData: {
            path: 'coverageLimits.otherStructures.value',
            type: 'integer',
            required: true,
            metaData: {
              target: '${Math.ceil(((it.coverageLimits.otherStructures.value / 100) * it.coverageLimits.dwelling.amount))}',
            },
          },
          children: [],
        },
        {
          id: 37,
          type: '$INPUT',
          path: 'coverageLimits.personalProperty.value',
          dependencies: [],
          data: {
            component: 'select',
            label: 'Personal Property Limit',
            size: '4',
            hint : "This is your personal belongings, or items located inside the home. This could include your furniture, clothing, bedding, dishes, etc. If you choose to have replacement cost coverage on Personal Property, you will be required to carry Personal Property limits at a minimum of 25% of your Dwelling limit.",
            extendedProperties: {
                output: 'currency',
                renderWatchFields: [{
                  "field": 'coverageLimits.personalProperty.value',
                  "becomes": "0",
                  "set": 'coverageOptions.personalPropertyReplacementCost.answer',
                  "to": false
                },
                {
                  "field": 'coverageLimits.personalProperty.value',
                  "becomes": "25",
                  "set": 'coverageOptions.personalPropertyReplacementCost.answer',
                  "to": true
                },
                {
                  "field": 'coverageLimits.personalProperty.value',
                  "becomes": "35",
                  "set": 'coverageOptions.personalPropertyReplacementCost.answer',
                  "to": true
                },
                {
                  "field": 'coverageLimits.personalProperty.value',
                  "becomes": "50",
                  "set": 'coverageOptions.personalPropertyReplacementCost.answer',
                  "to": true
                }],
            },
            dataSource: [
              {
                "label" : "0%",
                "answer" : 0
              },
              {
                "label" : "25%",
                "answer" : 25
              },
              {
                "label" : "35%",
                "answer" : 35
              },
              {
                "label" : "50%",
                "answer" : 50
              }
            ]
          },
          formData: {
            path: 'coverageLimits.personalProperty.value',
            type: 'integer',
            required: true,
            metaData: {
              target: '${Math.ceil(((it.coverageLimits.personalProperty.value / 100) * it.coverageLimits.dwelling.amount))}',
            },
          },
          children: [],
        },
        {
          id: 38,
          type: '$INPUT',
          path: 'coverageLimits.lossOfUse.value',
          dependencies: [],
          data: {
            component: 'display',
            label: 'Loss of Use Limit',
            size: '4',
            hint : "This is your personal belongings, or items located inside the home. This could include your furniture, clothing, bedding, dishes, etc. If you choose to have replacement cost coverage on Personal Property, you will be required to carry Personal Property limits at a minimum of 25% of your Dwelling limit.",
            extendedProperties: {
              output: 'currency'
            },
          },
          formData: {
            path: 'coverageLimits.lossOfUse.value',
            type: 'integer',
            required: true,
            metaData: {
              target: '${Math.ceil(((it.coverageLimits.lossOfUse.value / 100) * it.coverageLimits.dwelling.amount))}',
            },
          },
          children: [],
        },
        {
          id: 39,
          type: '$INPUT',
          path: 'coverageLimits.personalLiability.amount',
          dependencies: [],
          data: {
            component: 'select',
            label: 'Personal Liability Limit',
            size: '4',
            segmented: true,
          },
          formData: {
            path: 'coverageLimits.personalLiability.value',
            type: 'integer',
            required: true,
            metaData: {
              enum: [
                { label: '$ 100,000', answer: 100000 },
                { label: '$ 300,000', answer: 300000 }
              ]
            },
          },
          children: [],
        },
        {
          id: 40,
          type: '$INPUT',
          path: 'coverageLimits.medicalPayments.amount',
          dependencies: [],
          data: {
            component: 'display',
            label: 'Medical Payments to Others Limit',
            size: '4',
            segmented: true,
            extendedProperties: {
              output: 'currency',
            },
            dataSource: []
          },
          formData: {
            path: 'coverageLimits.medicalPayments.value',
            type: 'integer',
            required: true,
            metaData: {
              target: '${2000}'
            },
          },
          children: [],
        },
        {
          id: 41,
          type: '$TITLE',
          dependencies: [],
          data: {
            text: 'Other Coverages',
          },
          formData: {},
          children: [],
        },
        {
          id: 41,
          type: '$INPUT',
          path: 'coverageLimits.moldProperty.amount',
          dependencies: [],
          data: {
            component: 'select',
            label: 'Mold Property',
            size: '4',
          },
          formData: {
            path: 'coverageLimits.moldProperty.value',
            type: 'integer',
            required: true,
            metaData: {
              enum: [
                {
                  "label" : "$ 10,000",
                  "answer" : 10000
                },
                {
                  "label" : "$ 25,000",
                  "answer" : 25000
                },
                {
                  "label" : "$ 50,000",
                  "answer" : 50000
                }
              ]
            },
          },
          children: [],
        },
        {
          id: 42,
          type: '$INPUT',
          path: 'coverageLimits.moldLiability.amount',
          dependencies: [],
          data: {
            component: 'select',
            label: 'Mold Liability Limit',
            size: '4',
          },
          formData: {
            path: 'coverageLimits.moldLiability.value',
            type: 'integer',
            required: true,
            metaData: {
              enum: [
                {
                  "label" : "$ 50,000",
                  "answer" : 50000
                },
                {
                  "label" : "$ 100,000",
                  "answer" : 100000
                }
              ]
            },
          },
          children: [],
        },
        {
          id: 6,
          type: '$INPUT',
          path: 'coverageOptions.personalPropertyReplacementCost.answer',
          dependencies: [],
          data: {
            component: 'radio',
            segmented: true,
            label: 'Personal Property Replacement Cost',
            size: '4',
            hint : "Replacement Cost Coverage replaces your damaged possessions at today's prices without deducting for depreciation. If you choose not to select this coverage, your loss for personal property will be paid out at Actual Cash Value.",
          },
          formData: {
            path: 'coverageOptions.personalPropertyReplacementCost.answer',
            type: 'boolean',
            required: true,
            metaData: {
              enum: [
                {
                  "label" : "No",
                  "answer" : false
                },
                {
                  "label" : "Yes",
                  "answer" : true
                }
              ]
            }
          },
          children: [],
        },
      ],
    }
  ]
};

export default mock;
