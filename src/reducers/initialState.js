import {
  Map
} from 'immutable';

export default {
  search: new Map({}),
  workflowData: {},
  service: {},
  appState: {
    data: {
      submitting: false
    }
  },
  navigation: {
    location: null
  },
  error: {},
  questions: [],
  policyState: {
    policyId: null,
    update: false
  },
  authState: {
    userProfile: null
  }
};
