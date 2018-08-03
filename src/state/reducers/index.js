/* eslint no-param-reassign:0 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import cg from './cgReducer';
import authState from './authReducer';
import appState from './appStateReducer';
import error from './errorReducer';
import service from './serviceReducer';
import ui from './uiReducer';
import policyState from './policyReducer';
import questions from './questionsReducer';
import quoteState from './quoteReducer';
import search from './searchReducer';

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
  search
});

export default rootReducer;
