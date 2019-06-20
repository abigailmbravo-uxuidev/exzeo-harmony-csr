/* eslint-disable no-underscore-dangle */
/* globals window */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { enableBatching } from 'redux-batched-actions';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  return createStore(
    enableBatching(rootReducer),
    initialState,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
  );
}
