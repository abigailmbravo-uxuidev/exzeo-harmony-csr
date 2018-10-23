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
  territoryManagerState: {
    territoryManagers: []
  },
  zipCodeSettingsState: {
    zipCodeSettings: []
  }
};
