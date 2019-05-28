export const fields = [
  {
    name: 'status',
    type: 'select',
    label: 'Diary Status',
    selected: 'true',
    options: ['Open', 'Closed']
  },
  {
    name: 'reason',
    type: 'select',
    label: 'Reason',
    selected: '',
    options: [
      'Please choose', 'Information Needed', 'Estate',
      'Death of Only NI', 'Other', 'Exception',
      'New Policy', 'Occupancy Letter', 'Ownership Change',
      'Renewal Processing', 'Underwriting Condition Letter', 'Underwriting Review',
      'Vacant/Unoccupied', 'Tenant Occupied', 'Refund'
    ]
  },
  {
    name: 'assignees',
    type: 'select-typeahead',
    label: 'Assigned To',
    placeholder: 'Select...'
  },
  {
    name: 'date-range',
    type: 'date',
    label: 'Date Range'
  }
];

export const diaryCard = {
  status: 'Past Due',
  id: '12-1011490-01',
  type: 'Quote',
  cardData: ['10/25/2018', 'Underwriting', 'Estate', 'test', '10/25/2018', '', '']
};
