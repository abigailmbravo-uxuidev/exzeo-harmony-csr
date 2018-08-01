export default {
  authState: {
    userProfile: null
  },
  appState: {
    data: {
      submitting: false
    }
  },
  cg: {},
  error: {},
  newNote: {},
  questions: {},
  quoteState: {
    quoteId: null,
    update: false
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
    summaryLedger: {},
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
