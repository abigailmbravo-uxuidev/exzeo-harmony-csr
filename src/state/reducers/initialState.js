export default {
  authState: {
    userProfile: null
  },
  appState: {
    data: {
      submitting: false
    }
  },
  ui: {
    diary: {},
    note: {},
    minimizeDiary: false,
    minimizeNote: false,
    isLoading: false
  },
  cg: {},
  error: {},
  notes: [],
  diaries: [],
  questions: {
    diaryAssignees: [],
    territoryManagers: [],
    lists: {}
  },
  quoteState: {
    quoteId: null,
    update: false,
    quote: {}
  },
  policyState: {
    policyID: '',
    policy: {},
    billingOptions: {},
    cancelOptions: [],
    effectiveDateReasons: [],
    endorsementHistory: [],
    paymentHistory: [],
    paymentOptions: [],
    summaryLedger: {}
  },
  agencyState: {
    agencies: [],
    agency: {},
    agents: []
  },
  search: {
    loading: false,
    currentPage: 1,
    noResults: false,
    pageSize: 0,
    results: [],
    sortBy: '',
    sortDirection: '',
    totalPages: 0,
    totalRecords: 0
  },
  service: {
    cancelOptions: []
  },
  zipCodeSettingsState: {
    zipCodeSettings: []
  },
  list: {
    mortgagee: [],
    premiumFinance: [],
    order: [],
    agency: [],
    agent: [],
  }
};
