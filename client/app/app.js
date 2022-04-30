import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from './store';
import { SET_AUTH } from './containers/Authentication/constants';
import Application from './containers/Application';
import setToken from './utils/token';

import 'rc-slider/assets/index.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import 'font-awesome/css/font-awesome.min.css';
import './styles/style.scss';

const token = localStorage.getItem('token');
if (token) {
  try {
    store.dispatch({ type: SET_AUTH });
    setToken(token);
  } catch (e) {
    console.error('Some exception occured');
  }
}

const app = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Application />
    </ConnectedRouter>
  </Provider>
);

export default app;
