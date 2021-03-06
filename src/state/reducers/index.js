/* eslint no-param-reassign:0 */
import { combineReducers } from 'redux';
import agencyState from './agency.reducer';
import appState from './appState.reducer';
import error from './error.reducer';
import list from './list.reducer';
import notes from './notes.reducer';
import policyState from './policy.reducer';
import questions from './questions.reducer';
import quoteState from './quote.reducer';
import service from './service.reducer';
import ui from './ui.reducer';

const rootReducer = combineReducers({
  policyState,
  service,
  ui,
  appState,
  questions,
  error,
  quoteState,
  agencyState,
  notes,
  list
});

export default rootReducer;
