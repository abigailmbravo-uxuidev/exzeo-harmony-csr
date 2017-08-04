import {
  Map
} from 'immutable';

export default {
  search: new Map({}),
  workflowData: {},
  service: {},
  appState: {
    data: {
      showScheduleDateModal: false,
      submitting: false
    }
  },
  navigation: {
    location: null
  },
  error: {},
  questions: [],
  authState: {
    userProfile: null
  }
};
