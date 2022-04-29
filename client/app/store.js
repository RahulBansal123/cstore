import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createReducer from './reducers';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory({
  basename: '/',
  hashType: 'noslash',
});

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const store = createStore(
  createReducer(history),
  composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
);

export default store;
