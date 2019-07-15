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
          name: 'Coverage',
          id: 1001,
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
                text: 'Policy Stuff'
              },
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
