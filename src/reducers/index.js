/* eslint no-param-reassign:0 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import cg from './cgReducer';
import user from './userReducer';
import appState from './appStateReducer';
import error from './errorReducer';


const rootReducer = combineReducers({
  form: formReducer,
  cg,
  user,
  appState,
  error
});

export default rootReducer;
