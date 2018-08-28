export const WORK_FLOW_MODEL_NAME = 'csrQuote';
export const WORK_FLOW_DATA = {
  dsUrl: `${process.env.REACT_APP_API_URL}/ds`
};

export const SEARCH_TYPES = {
  newQuote: 'address',
  quote: 'quote',
  policy: 'policy',
  agent: 'agent',
  agency: 'agency',
  diaries: 'diaries'
};

export const POLICY_INITIAL_VALUES = {
  searchType: SEARCH_TYPES.policy,
  sortBy: 'policyNumber'
};

export const AGENCY_INITIAL_VALUES = {
  searchType: SEARCH_TYPES.agency
};

export const DIARY_INITIAL_VALUES = {
  status: 'open',
  dateRange: {
    min: '',
    max: ''
  }
};

export const POLICY_SEARCH_OPTIONS = [
  {
    answer: SEARCH_TYPES.newQuote,
    label: 'New Quote'
  },
  {
    answer: SEARCH_TYPES.quote,
    label: 'Quote Search'
  },
  {
    answer: SEARCH_TYPES.policy,
    label: 'Policy Search'
  }
];

export const AGENCY_SEARCH_OPTIONS = [
  {
    answer: SEARCH_TYPES.agent,
    label: 'Agent Search'
  },
  {
    answer: SEARCH_TYPES.agency,
    label: 'Agency Search'
  }
];

export const DIARY_SEARCH_OPTIONS = [
  {
    answer: true,
    label: 'Open'
  },
  {
    answer: false,
    label: 'Closed'
  }
];

export const SEARCH_CONFIG = {
  [SEARCH_TYPES.policy]: {
    initialValues: POLICY_INITIAL_VALUES,
    searchOptions: POLICY_SEARCH_OPTIONS
  },
  [SEARCH_TYPES.agency]: {
    initialValues: AGENCY_INITIAL_VALUES,
    searchOptions: AGENCY_SEARCH_OPTIONS
  },
  [SEARCH_TYPES.diaries]: {
    initialValues: DIARY_INITIAL_VALUES,
    searchOptions: DIARY_SEARCH_OPTIONS
  }
};

export const DEFAULT_SEARCH_PARAMS = {
  companyCode: 'TTIC',
  state: 'FL'
};

export const RESULTS_PAGE_SIZE = 25;

const DEFAULT_NO_RESULTS_MESSAGE = 'We\'re sorry we couldn\'t find any results matching your search parameters. Please check your spelling and try a new search. You can also try a less specific search (such as street number and name).';
export const NO_RESULTS_MESSAGES = {
  [SEARCH_TYPES.newQuote]: DEFAULT_NO_RESULTS_MESSAGE,
  [SEARCH_TYPES.policy]: 'There are no policies found matching that search criteria. Please try to search again.',
  [SEARCH_TYPES.quote]: 'There are no quotes found matching that search criteria. Please try to search again, or start a new quote.',
  [SEARCH_TYPES.agent]: DEFAULT_NO_RESULTS_MESSAGE,
  [SEARCH_TYPES.agency]: DEFAULT_NO_RESULTS_MESSAGE
};

export const STANDARD_DATE_FORMAT = 'MM/DD/YYYY';
export const SECONDARY_DATE_FORMAT = 'YYYY-MM-DD';
