/* eslint no-param-reassign:0 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import cg from './cgReducer';
import authState from './authReducer';
import appState from './appStateReducer';
import error from './errorReducer';
import service from './serviceReducer';
import newNote from './newNoteReducer';
import policyState from './policyReducer';
import questions from './questionsReducer';
import quoteState from './quoteReducer';
import search from './searchReducer';
import agency from './agencyReducer';

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
  agency
});

export default rootReducer;
