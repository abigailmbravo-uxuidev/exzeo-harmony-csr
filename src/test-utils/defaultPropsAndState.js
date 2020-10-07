import { mockPolicy as policy, quote } from './fixtures';

export const defaultInitialState = {
  appState: {
    data: {}
  },
  list: {
    diaryOptions: {}
  },
  service: {
    agencies: [],
    zipCodeSettings: {
      timezone: 'America/New_York'
    }
  },
  error: {},
  policyState: {
    policy: {
      policyID: 'test'
    },
    summaryLedger: {
      _id: 'test'
    },
    claims: []
  },
  quoteState: {},
  ui: { isLoading: false },
  notes: {}
};

export const defaultAuth = {
  isAuthenticated: true,
  user: {},
  userProfile: {
    entity: {
      companyCode: 'TTIC',
      state: 'FL'
    },
    appMetadata: { beta: false },
    resources: []
  },
  loading: false,
  popupOpen: false,
  getIdTokenClaims: x => x,
  loginWithRedirect: x => x,
  getTokenSilently: x => x,
  getTokenWithPopup: x => x,
  logout: x => x
};

export const defaultDiaries = {
  diaries: [],
  diaryEnums: {
    reasonOptions: [],
    assigneeOptions: []
  },
  getDiaries: x => x,
  getDiaryEnums: x => x,
  diariesDispatch: x => x,
  submitDiary: x => x,
  showDiariesBar: false,
  activeDocument: {},
  selectedDiary: {}
};

export const defaultInitialProps = {
  match: {
    params: { quoteNumber: '12-345-67' },
    path: '/quote/:quoteNumber/:step'
  }
};

export const defaultQuoteWorkflowProps = {
  ...defaultInitialProps,
  history: { replace: x => x },
  location: { pathname: '' },
  isLoading: false,
  quote,
  retrieveQuote: async (x = {}) => x,
  verifyQuote: async (x = {}) => x,
  setAppError: () => {},
  getZipCodeSettings: async (x = {}) => x,
  getEnumsForQuoteWorkflow: async (x = {}) => x,
  updateQuote: async (x = {}) => x,
  fetchNotes: async (x = {}) => x,
  notes: [],
  options: {
    agents: [],
    mortgagee: [],
    order: [],
    uiQuestions: {}
  }
};

export const defaultCreateAgencyProps = {
  orphans: [],
  initialValues: {
    status: 'Active',
    okToPay: true,
    mailingAddress: {},
    physicalAddress: {},
    agentOfRecord: {
      sameAsMailing: false,
      licenses: [
        {
          state: '',
          license: '',
          licenseType: '',
          licenseEffectiveDate: '',
          appointed: false
        }
      ]
    }
  },
  listAnswersAsKey: {
    US_states: [
      {
        label: 'Florida',
        answer: 'FL'
      },
      {
        label: 'Maryland',
        answer: 'MD'
      },
      {
        label: 'New Jersey',
        answer: 'NJ'
      }
    ]
  },
  getAgency: async (x = {}) => x,
  updateAgency: async (x = {}) => x,
  createAgency: async (x = {}) => x
};

export const defaultPolicyWorkflowProps = {
  history: { replace: x => x },
  location: { pathname: '' },
  isLoading: false,
  policy,
  summaryLedger: {
    status: {}
  },
  initializePolicyWorkflow: async () => policy,
  getEnumsForPolicyWorkflow: async (x = {}) => x,
  getPaymentHistory: async (x = {}) => x,
  getPolicy: async () => policy,
  updateBillPlan: async (x = {}) => x,
  fetchNotes: async (x = {}) => x,
  setAppError: () => {},
  diaries: [],
  claims: [],
  getClaims: async (x = {}) => x,
  notes: [],
  options: {},
  initialized: true,
  zipCodeSettings: {
    timezone: 'America/New_York'
  },
  userProfile: {
    resources: []
  }
};
