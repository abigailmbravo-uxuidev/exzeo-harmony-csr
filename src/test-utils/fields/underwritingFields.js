export const underwritingFields = [
  {
    name: 'rented',
    type: 'radio',
    values: ['Yes', 'Occasionally', 'Never'],
    label: 'Is the home or any structures on the property ever rented?'
  },
  {
    name: 'previousClaims',
    type: 'radio',
    values: ['No claims ever filed', 'Less than 3 Years', '3-5 Years', 'Over 5 Years', 'Unknown'],
    label: 'When was the last claim filed?'
  },
  {
    name: 'monthsOccupied',
    type: 'radio',
    values: ['0-3', '4-6', '7-9', '10+'],
    label: 'How many months a year does the owner live in the home?'
  },
  {
    name: 'fourPointUpdates',
    type: 'radio',
    values: ['No', 'Unknown', 'Yes'],
    label: 'Have the wiring, plumbing, and HVAC been updated in the last 35 years?'
  },
  {
    name: 'business',
    type: 'radio',
    values: ['Yes', 'No'],
    label: 'Is a business conducted on the property?'
  }
];
