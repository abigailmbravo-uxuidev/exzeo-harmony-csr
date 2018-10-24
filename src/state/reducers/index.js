/* eslint no-param-reassign:0 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import cg from './cg.reducer';
import authState from './auth.reducer';
import appState from './appState.reducer';
import error from './error.reducer';
import service from './service.reducer';
import newNote from './newNote.reducer';
import policyState from './policy.reducer';
import questions from './questions.reducer';
import quoteState from './quote.reducer';
import search from './search.reducer';
import agencyState from './agency.reducer';
import zipCodeSettingsState from './zipCodeSettings.reducer';

const rootReducer = combineReducers({
  form: formReducer,
  policyState,
  service,
  newNote,
  cg,
  authState,
  appState,
  questions,
  error,
  quoteState,
  search,
  agencyState,
  zipCodeSettingsState
});

export default rootReducer;
