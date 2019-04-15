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
                text: 'Poduced By',
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
                size: '6',
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
                label: 'Agencies',
                size: '6',
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
                size: '6',
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
                icon: 'fa fa-user-circle',
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
                icon: 'fa fa-user-circle',
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
          id: 12,
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
          id: 15,
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
      ],
    }
  ]
};

export default mock;
