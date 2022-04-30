/*
 *
 * Login actions
 *
 */

import { success } from 'react-notification-system-redux';
import axios from 'axios';
import { push } from 'connected-react-router';

import {
  LOGIN_CHANGE,
  LOGIN_RESET,
  SET_LOGIN_LOADING,
  SET_LOGIN_FORM_ERRORS,
  SET_LOGIN_SUBMITTING,
} from './constants';
import { setAuth, clearAuth } from '../Authentication/actions';
import setToken from '../../utils/token';
import { clearCart } from '../Cart/actions';
import { deleteAccount } from '../Account/actions';
import { allFieldsValidation } from '../../utils/validation';

export const loginChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: LOGIN_CHANGE,
    payload: formData,
  };
};

export const login = () => {
  return async (dispatch, getState) => {
    const rules = {
      email: 'required|email',
      password: 'required|min:6',
    };

    const user = getState().login.loginFormData;

    const { isValid, errors } = allFieldsValidation(user, rules, {
      'required.email': 'Email is required.',
      'email.email': 'Email format is invalid.',
      'required.password': 'Password is required.',
      'min.password': 'Password must be at least 6 characters.',
    });

    if (!isValid) {
      return dispatch({ type: SET_LOGIN_FORM_ERRORS, payload: errors });
    }

    dispatch({ type: SET_LOGIN_SUBMITTING, payload: true });
    dispatch({ type: SET_LOGIN_LOADING, payload: true });

    try {
      const response = await axios.post('/api/auth/login', user);

      const name = response.data.user.name;

      const optionsS = {
        title: `Hey${name ? ` ${name}` : ''}, Welcome Back!`,
        position: 'tr',
        autoDismiss: 1,
      };

      localStorage.setItem('token', response.data.token);

      setToken(response.data.token);

      dispatch(setAuth());
      dispatch(success(optionsS));

      dispatch({ type: LOGIN_RESET });
    } catch (error) {
      console.log('error');
    } finally {
      dispatch({ type: SET_LOGIN_SUBMITTING, payload: false });
      dispatch({ type: SET_LOGIN_LOADING, payload: false });
    }
  };
};

export const signOut = () => {
  return (dispatch, getState) => {
    const optionsS = {
      title: `You have signed out!`,
      position: 'tr',
      autoDismiss: 1,
    };

    dispatch(clearAuth());
    dispatch(deleteAccount());
    dispatch(push('/login'));

    localStorage.removeItem('token');

    dispatch(success(optionsS));
  };
};
