/* eslint no-param-reassign:0 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import cg from './cgReducer';
import authState from './authReducer';
import appState from './appStateReducer';
import error from './errorReducer';
import service from './serviceReducer';
import questions from './questionsReducer';
import quoteState from './quoteStateReducer';

const rootReducer = combineReducers({
  form: formReducer,
  service,
  cg,
  authState,
  appState,
  questions,
  error,
  quoteState
});

export default rootReducer;
