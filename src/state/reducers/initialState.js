export default {
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
  error: {},
  notes: [],
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
    claims: [],
    effectiveDateReasons: [],
    paymentHistory: [],
    paymentOptions: [],
    summaryLedger: {},
    agencyPolicies: []
  },
  agencyState: {
    agencies: [],
    agency: {},
    agents: []
  },
  service: {
    cancelOptions: []
  },
  list: {
    mortgagee: [],
    premiumFinance: [],
    order: [],
    agency: [],
    agent: [],
    diaryOptions: {
      reasons: [],
      tags: []
    }
  }
};
