import RESOURCES from '../../constants/resources';
import {
  POLICY_SEARCH_OPTIONS,
  DEFAULT_NO_RESULTS_MESSAGE
} from '../../constants/search';

const SEARCH_TYPES = RESOURCES;

export const SEARCH_CONTEXT_OPTIONS = [
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

export const ADDRESS_INITIAL_VALUES = {
  searchType: SEARCH_TYPES.newQuote,
  companyCode: 'TTIC',
  state: 'FL'
};

export const POLICY_INITIAL_VALUES = {
  searchType: SEARCH_TYPES.policy,
  sortBy: 'policyNumber',
  companyCode: 'TTIC',
  state: 'FL'
};

export const QUOTE_INITIAL_VALUES = {
  searchType: SEARCH_TYPES.quote,
  sortBy: 'quoteNumber',
  companyCode: 'TTIC',
  state: 'FL'
};

export const SEARCH_CONFIG = {
  [SEARCH_TYPES.newQuote]: {
    initialValues: ADDRESS_INITIAL_VALUES,
    searchOptions: POLICY_SEARCH_OPTIONS,
    noResultsMessage: DEFAULT_NO_RESULTS_MESSAGE
  },
  [SEARCH_TYPES.policy]: {
    initialValues: POLICY_INITIAL_VALUES,
    searchOptions: POLICY_SEARCH_OPTIONS,
    noResultsMessage:
      'There are no policies found matching that search criteria. Please try to search again.'
  },
  [SEARCH_TYPES.quote]: {
    initialValues: QUOTE_INITIAL_VALUES,
    searchOptions: POLICY_SEARCH_OPTIONS,
    noResultsMessage:
      'There are no quotes found matching that search criteria. Please try to search again, or start a new quote.'
  }
};
