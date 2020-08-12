import { mockPolicy as policy, quote } from './fixtures';
import { jestResolve } from './mockServiceRunner';

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

export const defaultInitialProps = {
  match: {
    params: { quoteNumber: '12-345-67' },
    path: '/quote/:quoteNumber'
  }
};

export const defaultQuoteWorkflowProps = {
  ...defaultInitialProps,
  history: { replace: x => x },
  location: { pathname: '' },
  isLoading: false,
  quote,
  retrieveQuote: jestResolve(),
  verifyQuote: jestResolve(),
  setAppError: () => {},
  getZipCodeSettings: jestResolve(),
  getEnumsForQuoteWorkflow: () => {},
  updateQuote: jestResolve(),
  fetchNotes: jestResolve(),
  toggleDiary: () => {},
  fetchDiaries: jestResolve(),
  diaries: [],
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
  getAgency: jestResolve(),
  updateAgency: jestResolve(),
  createAgency: jestResolve()
};

export const defaultPolicyWorkflowProps = {
  history: { replace: x => x },
  location: { pathname: '' },
  isLoading: false,
  policy,
  initializePolicyWorkflow: jestResolve(policy),
  getEnumsForPolicyWorkflow: jestResolve(),
  getPaymentHistory: jestResolve(),
  getPolicy: jestResolve(policy),
  updateBillPlan: jestResolve(),
  fetchNotes: jestResolve(),
  fetchDiaries: jestResolve(),
  setAppError: () => {},
  toggleDiary: () => {},
  diaries: [],
  claims: [],
  getClaims: jestResolve(),
  notes: [],
  initialized: true,
  zipCodeSettings: {
    timezone: 'America/New_York'
  },
  userProfile: {
    resources: []
  }
};
