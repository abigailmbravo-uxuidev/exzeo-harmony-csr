/* eslint no-param-reassign:0 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import cg from './cgReducer';
import authState from './authReducer';
import appState from './appStateReducer';
import error from './errorReducer';
import service from './serviceReducer';
import newNote from './newNoteReducer';
import policyState from './policyStateReducer';
import questions from './questionsReducer';
import quoteState from './quoteStateReducer';
import search from './searchReducer';

const rootReducer = combineReducers({
  form: formReducer,
  policyState,
  appState,
  search,
  service,
  newNote,
  cg,
  authState,
  questions,
  error,
  quoteState,
});

export default rootReducer;
