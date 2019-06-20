export const NOTE_TYPE = {
  notes: 'notes',
  files: 'files',
  diaries: 'diaries'
};

export const NOTE_TAB = NOTE_TYPE.notes;
export const FILES_TAB = NOTE_TYPE.files;
export const DIARY_TAB = NOTE_TYPE.diaries;

export const POLICY_RESOURCE_TYPE = 'Policy';
export const QUOTE_RESOURCE_TYPE = 'Quote';
export const AGENCY_RESOURCE_TYPE = 'Agency';
export const AGENT_RESOURCE_TYPE = 'Agent';

export const TAGS = [
  { answer: 'new_policy', label: 'New Policy', type: 'tag' },
  { answer: 'occupancy', label: 'Occupancy', type: 'tag' },
  { answer: 'processing', label: 'Processing', type: 'tag' },
  { answer: 'renewal_processing', label: 'Renewal Processing', type: 'tag' },
  { answer: 'underwriting', label: 'Underwriting', type: 'tag' }
];

export const REASONS_DATA = {
  information_needed: {
    answer: 'information_needed',
    label: 'Information Needed',
    daysFromDueDate: 7,
    assignee: ''
  },
  estate: {
    answer: 'estate',
    label: 'Estate',
    daysFromDueDate: -145,
    assignee: 'Underwriting'
  },
  death_of_only_NI: {
    answer: 'death_of_only_NI',
    label: 'Death of Only NI',
    daysFromDueDate: 0,
    assignee: 'Processing'
  },
  other: {
    answer: 'other',
    label: 'Other',
    daysFromDueDate: 0,
    assignee: ''
  },
  exception: {
    answer: 'exception',
    label: 'Exception',
    daysFromDueDate: 10,
    assignee: ''
  },
  new_policy: {
    answer: 'new_policy',
    label: 'New Policy',
    daysFromDueDate: 0,
    assignee: 'Processing'
  },
  occupancy_Letter: {
    answer: 'occupancy_Letter',
    label: 'Occupancy Letter',
    daysFromDueDate: 30,
    assignee: 'Underwriting'
  },
  ownership_Change: {
    answer: 'ownership_Change',
    label: 'Ownership Change',
    daysFromDueDate: 0,
    assignee: 'Underwriting'
  },
  renewal_processing: {
    answer: 'renewal_processing',
    label: 'Renewal Processing',
    daysFromDueDate: -65,
    assignee: 'Processing'
  },
  underwriting_condition_letter: {
    answer: 'underwriting_condition_letter',
    label: 'Underwriting Condition Letter',
    daysFromDueDate: 30,
    assignee: 'Underwriting'
  },
  underwriting_review: {
    answer: 'underwriting_review',
    label: 'Underwriting Review',
    daysFromDueDate: 2,
    assignee: ''
  },
  vacant_unoccupied: {
    answer: 'vacant_unoccupied',
    label: 'Vacant/Unoccupied',
    daysFromDueDate: 0,
    assignee: 'Underwriting'
  },
  tenant_occupied: {
    answer: 'tenant_occupied',
    label: 'Tenant Occupied',
    daysFromDueDate: 0,
    assignee: 'Underwriting'
  },
  refund: {
    answer: 'refund',
    label: 'Refund',
    daysFromDueDate: 7,
    assignee: ''
  }
};

export const USE_ENITY_END_DATE = [
  REASONS_DATA.renewal_processing.answer,
  REASONS_DATA.estate.answer
];

export const STATUS_ANSWERS = [
  { answer: 'true', label: 'Open' },
  { answer: 'false', label: 'Closed' }
];

export const REASONS = Object.keys(REASONS_DATA).map(key => {
  return { answer: REASONS_DATA[key].answer, label: REASONS_DATA[key].label };
});

export const DUE_STATUS = {
  dueSoon: 'Due Soon',
  pastDue: 'Past Due',
  upComing: 'Upcoming'
};

export const DIARY_STATUS = {
  pastDue: `OPEN | ${DUE_STATUS.pastDue}`,
  dueSoon: `OPEN | ${DUE_STATUS.dueSoon}`,
  upComing: `OPEN | ${DUE_STATUS.upComing}`,
  closed: 'CLOSED'
};

export const DIARY_STATUS_COLOR = {
  pastDue: 'red',
  dueSoon: 'yellow',
  upComing: 'green',
  closed: 'gray'
};
