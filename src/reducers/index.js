/* eslint no-param-reassign:0 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import cg from './cgReducer';
import appState from './appStateReducer';
import error from './errorReducer';


const rootReducer = combineReducers({
  form: formReducer,
  cg,
  appState,
  error
});

export default rootReducer;
