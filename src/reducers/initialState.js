export default {
  search: {
    currentPage: 1,
    loading: false,
    pageSize: 0,
    results: [],
    sortBy: '',
    sortDirection: '',
    totalPages: 1,
    totalRecords: 0,
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
