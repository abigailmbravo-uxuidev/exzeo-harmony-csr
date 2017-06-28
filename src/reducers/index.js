/* eslint no-param-reassign:0 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import cg from './cgReducer';
import authState from './authReducer';
import appState from './appStateReducer';
import error from './errorReducer';
import service from './serviceReducer';
import questions from './questionsReducer';

const rootReducer = combineReducers({
  form: formReducer,
  cg,
  authState,
  appState,
  questions,
  service,
  error
});

export default rootReducer;
