export default {
  authState: {
    userProfile: null
  },
  appState: {
    data: {
      submitting: false
    }
  },
  ui: {},
  cg: {},
  error: {},
  diaries: [],
  newNote: {},
  questions: {},
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
  }
};
