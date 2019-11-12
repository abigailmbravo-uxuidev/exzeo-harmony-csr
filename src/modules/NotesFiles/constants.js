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

export const STATUS_ANSWERS = [
  { answer: 'true', label: 'Open' },
  { answer: 'false', label: 'Closed' }
];

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
