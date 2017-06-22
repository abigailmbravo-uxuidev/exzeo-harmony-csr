/* eslint no-param-reassign:0 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import cg from './cgReducer';
import appState from './appStateReducer';
import error from './errorReducer';
import questions from './questionsReducer';
import service from './serviceReducer';

const rootReducer = combineReducers({
  form: formReducer,
  cg,
  appState,
  questions,
  service,
  error
});

export default rootReducer;
