import {
  Map
} from 'immutable';

export default {
  user: {
    isAuthenticated: false,
    token: '',
    profile: {}
  },
  service: {},
  search: new Map({}),
  workflowData: {},
  appState: {
    data: {
      submitting: false,
      updateWorkflowDetails: false
    }
  },
  navigation: {
    location: null
  },
  error: {},
  questions: []
};
