/* eslint no-param-reassign:0 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import cg from './cg.reducer';
import authState from './auth.reducer';
import appState from './appState.reducer';
import error from './error.reducer';
import service from './service.reducer';
import ui from './ui.reducer';
import policyState from './policy.reducer';
import questions from './questions.reducer';
import quoteState from './quote.reducer';
import search from './search.reducer';
import agencyState from './agency.reducer';
import zipCodeSettingsState from './zipCodeSettings.reducer';
import notes from './notes.reducer';
import diaries from './diaryReducer';
import list from './list.reducer';

const rootReducer = combineReducers({
  form: formReducer,
  policyState,
  service,
  ui,
  cg,
  authState,
  appState,
  questions,
  error,
  quoteState,
  search,
  agencyState,
  zipCodeSettingsState,
  notes,
  diaries,
  list
});

export default rootReducer;
