import {
  Map
} from 'immutable';

export default {
  user: {
    isAuthenticated: false,
    token: ''
  },
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
  error: {}
};
