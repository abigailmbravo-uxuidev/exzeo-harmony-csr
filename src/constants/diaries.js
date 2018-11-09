export const POLICY_RESOURCE_TYPE = 'Policy';
export const QUOTE_RESOURCE_TYPE = 'Quote';

export const TAGS = [
  { answer: 'new_policy', label: 'New Policy', type: 'tag' },
  { answer: 'occupancy', label: 'Occupancy', type: 'tag' },
  { answer: 'processing', label: 'Processing', type: 'tag' },
  { answer: 'renewal_processing', label: 'Renewal Processing', type: 'tag' },
  { answer: 'underwriting', label: 'Underwriting', type: 'tag' }

];

export const REASONS_DATA = {
  information_needed: {
    answer: 'information_needed', label: 'Information Needed', daysFromDueDate: 7, assignee: ''
  },
  estate: {
    answer: 'estate', label: 'Estate', daysFromDueDate: -145, assignee: 'Underwriting'
  },
  death_of_only_NI: {
    answer: 'death_of_only_NI', label: 'Death of Only NI', daysFromDueDate: 0, assignee: 'Processing'
  },
  other: {
    answer: 'other', label: 'Other', daysFromDueDate: 0, assignee: ''
  },
  exception: {
    answer: 'exception', label: 'Exception', daysFromDueDate: 10, assignee: ''
  },
  new_policy: {
    answer: 'new_policy', label: 'New Policy', daysFromDueDate: 0, assignee: 'Processing'
  },
  occupancy_Letter: {
    answer: 'occupancy_Letter', label: 'Occupancy Letter', daysFromDueDate: 30, assignee: 'Underwriting'
  },
  ownership_Change: {
    answer: 'ownership_Change', label: 'Ownership Change', daysFromDueDate: 0, assignee: 'Underwriting'
  },
  renewal_processing: {
    answer: 'renewal_processing', label: 'Renewal Processing', daysFromDueDate: 365, assignee: 'Processing'
  },
  underwriting_condition_letter: {
    answer: 'underwriting_condition_letter', label: 'Underwriting Condition Letter', daysFromDueDate: 30, assignee: 'Underwriting'
  },
  underwriting_review: {
    answer: 'underwriting_review', label: 'Underwriting Review', daysFromDueDate: 2, assignee: ''
  },
  vacanut_unoccupied: {
    answer: 'vacanut_unoccupied', label: 'Vacant/Unoccupied', daysFromDueDate: 0, assignee: 'Underwriting'
  },
  tenant_occupied: {
    answer: 'tenant_occupied', label: 'Tenant Occupied', daysFromDueDate: 0, assignee: 'Underwriting'
  },
  refund: {
    answer: 'refund', label: 'Refund', daysFromDueDate: 7, assignee: ''
  }
};


export const STATUS_ANSWERS = [
  { answer: 'true', label: 'Open' },
  { answer: 'false', label: 'Closed' }
];


export const REASONS = Object.keys(REASONS_DATA).map((key) => {
  return { answer: REASONS_DATA[key].answer, label: REASONS_DATA[key].label };
});
