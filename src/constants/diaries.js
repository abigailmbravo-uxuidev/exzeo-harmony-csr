export const POLICY_RESOURCE_TYPE = 'Policy';
export const QUOTE_RESOURCE_TYPE = 'Quote';

export const TAGS = [
  { answer: 'new_policy', label: 'New Policy', type: 'tag' },
  { answer: 'occupancy', label: 'Occupancy', type: 'tag' },
  { answer: 'processing', label: 'Processing', type: 'tag' },
  { answer: 'renewal_processing', label: 'Renewal Processing', type: 'tag' },
  { answer: 'underwriting', label: 'Underwriting', type: 'tag' }

];

export const REASONS = {
  information_needed: {
    answer: 'information_needed', label: 'Information Needed', daysFromDueDate: 7, assignee: '', message: 'CSR will indicate what it is in the body of diary and what\'s missing: Ex- "Wind Mit Photos" or "Cancellation Signature" or "App Missing Cov C Reject Form"'
  },
  estate: {
    answer: 'estate', label: 'Estate', daysFromDueDate: -145, assignee: 'Underwriting', message: ''
  },
  death_of_only_NI: {
    answer: 'death_of_only_NI', label: 'Death of Only NI', daysFromDueDate: 0, assignee: 'Processing', message: ''
  },
  other: {
    answer: 'other', label: 'Other', daysFromDueDate: 0, assignee: '', message: ''
  },
  exception: {
    answer: 'exception', label: 'Exception', daysFromDueDate: 10, assignee: '', message: 'Could be an auto-generated diary but those are in future release; we don\'t need the assignee to be "New Policy" we can transfer it by looking at the type.'
  },
  new_policy: {
    answer: 'new_policy', label: 'New Policy', daysFromDueDate: 0, assignee: 'Processing', message: 'Keeping for future system generated (when pol binds, eliminates the email via No reply box)'
  },
  occupancy_Letter: {
    answer: 'occupancy_Letter', label: 'Occupancy Letter', daysFromDueDate: 30, assignee: 'Underwriting', message: ''
  },
  ownership_Change: {
    answer: 'ownership_Change', label: 'Ownership Change', daysFromDueDate: 0, assignee: 'Underwriting', message: ''
  },
  renewal_processing: {
    answer: 'renewal_processing', label: 'Renewal Processing', daysFromDueDate: null, assignee: 'Processing', message: 'Can\'t forget to consider "N/A" or any other reason that we now have, that will be deleted.'
  },
  underwriting_condition_letter: {
    answer: 'underwriting_condition_letter', label: 'Underwriting Condition Letter', daysFromDueDate: 30, assignee: 'Underwriting', message: 'Keeping for future system generated '
  },
  underwriting_review: {
    answer: 'underwriting_review', label: 'Underwriting Review', daysFromDueDate: 2, assignee: '', message: ''
  },
  vacanut_unoccupied: {
    answer: 'vacanut_unoccupied', label: 'Vacant/Unoccupied', daysFromDueDate: 0, assignee: 'Underwriting', message: ''
  },
  tenant_occupied: {
    answer: 'tenant_occupied', label: 'Tenant Occupied', daysFromDueDate: 0, assignee: 'Underwriting', message: ''
  },
  refund: {
    answer: 'refund', label: 'Refund', daysFromDueDate: 7, assignee: '', message: 'CSRs will schedule this to ensure refund makes it out'
  }
};


export const STATUS_ANSWERS = [
  { answer: 'true', label: 'Open' },
  { answer: 'false', label: 'Closed' }
];


export const REASONS_LIST = Object.keys(REASONS).map((key) => {
  return { answer: REASONS[key].answer, label: REASONS[key].label };
});
