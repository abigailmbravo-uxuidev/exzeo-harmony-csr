export default {
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
  workflowData: {},
  newNote: {},
  error: {},
  questions: [],
  service: {
    cancelOptions: []
  },
  appState: {
    loading: false,
    data: {
      submitting: false
    }
  },
  navigation: {
    location: null
  },
  quoteState: {
    quoteId: null,
    update: false
  },
  policyState: {
    policy: {},
    summaryLedger: {},
    getRate: {}
  },
  authState: {
    userProfile: null
  }
};
