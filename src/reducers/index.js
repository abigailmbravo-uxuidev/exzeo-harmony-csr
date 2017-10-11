/* eslint no-param-reassign:0 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import cg from './cgReducer';
import authState from './authReducer';
import appState from './appStateReducer';
import error from './errorReducer';
import service from './serviceReducer';
import policy from './policyStateReducer';
import questions from './questionsReducer';

const rootReducer = combineReducers({
  form: formReducer,
  policy,
  service,
  cg,
  authState,
  appState,
  questions,
  error
});

export default rootReducer;
