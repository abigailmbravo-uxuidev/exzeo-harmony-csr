/* eslint no-param-reassign:0 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import cg from './cgReducer';
import user from './userReducer';
import appState from './appStateReducer';
import error from './errorReducer';
import service from './serviceReducer';

const rootReducer = combineReducers({
  form: formReducer,
  cg,
  user,
  appState,
  service,
  error
});

export default rootReducer;
