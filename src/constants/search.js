import RESOURCES from './resources';

export const SEARCH_TYPES = RESOURCES;

export const SEARCH_FORM = 'SEARCH_BAR';

export const ADDRESS_INITIAL_VALUES = {
  searchType: SEARCH_TYPES.newQuote
};

export const POLICY_INITIAL_VALUES = {
  searchType: SEARCH_TYPES.policy,
  sortBy: 'policyNumber'
};

export const QUOTE_INITIAL_VALUES = {
  searchType: SEARCH_TYPES.quote
};

export const AGENCY_INITIAL_VALUES = {
  searchType: SEARCH_TYPES.agency
};

export const AGENT_INITIAL_VALUES = {
  searchType: SEARCH_TYPES.agent
};

export const DIARY_INITIAL_VALUES = {
  assignees: [],
  open: 'true',
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

export const SEARCH_CONFIG = {
  [SEARCH_TYPES.newQuote]: {
    initialValues: ADDRESS_INITIAL_VALUES,
    searchOptions: POLICY_SEARCH_OPTIONS
  },
  [SEARCH_TYPES.policy]: {
    initialValues: POLICY_INITIAL_VALUES,
    searchOptions: POLICY_SEARCH_OPTIONS
  },
  [SEARCH_TYPES.quote]: {
    initialValues: QUOTE_INITIAL_VALUES,
    searchOptions: POLICY_SEARCH_OPTIONS
  },
  [SEARCH_TYPES.agency]: {
    initialValues: AGENCY_INITIAL_VALUES,
    searchOptions: AGENCY_SEARCH_OPTIONS
  },
  [SEARCH_TYPES.agent]: {
    initialValues: AGENT_INITIAL_VALUES,
    searchOptions: AGENCY_SEARCH_OPTIONS
  },
  [SEARCH_TYPES.diaries]: {
    initialValues: DIARY_INITIAL_VALUES,
    searchOptions: []
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
  [SEARCH_TYPES.agency]: DEFAULT_NO_RESULTS_MESSAGE,
  [SEARCH_TYPES.diaries]: DEFAULT_NO_RESULTS_MESSAGE
};
