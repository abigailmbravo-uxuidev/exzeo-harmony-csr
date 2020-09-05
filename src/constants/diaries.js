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

export const DIARY_TAB = 'diaries';

export const REQUIRED_DIARY_RIGHTS = ['READ', 'UPDATE', 'INSERT'];

export const POLLING_TIMEOUT = 30000;

let inactiveBrowserTab;
if (typeof document.hidden !== 'undefined') {
  inactiveBrowserTab = 'hidden';
} else if (typeof document.msHidden !== 'undefined') {
  inactiveBrowserTab = 'msHidden';
} else if (typeof document.webkitHidden !== 'undefined') {
  inactiveBrowserTab = 'webkitHidden';
}

export const INACTIVE_BROWSER_TAB_KEY = inactiveBrowserTab;
