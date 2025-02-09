/*
 *
 * Signup actions
 *
 */

import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  SIGNUP_CHANGE,
  SIGNUP_RESET,
  SET_SIGNUP_LOADING,
  SET_SIGNUP_SUBMITTING,
  SUBSCRIBE_CHANGE,
  SET_SIGNUP_FORM_ERRORS,
} from './constants';

import { setAuth } from '../Authentication/actions';
import setToken from '../../utils/token';
import { allFieldsValidation } from '../../utils/validation';

export const signupChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: SIGNUP_CHANGE,
    payload: formData,
  };
};

export const subscribeChange = () => {
  return {
    type: SUBSCRIBE_CHANGE,
  };
};

export const signUp = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        email: 'required|email',
        password: 'required|min:6',
        name: 'required',
      };

      const newUser = getState().signup.signupFormData;

      const { isValid, errors } = allFieldsValidation(newUser, rules, {
        'required.email': 'Email is required.',
        'required.password': 'Password is required.',
        'required.name': 'First Name is required.',
      });

      if (!isValid) {
        return dispatch({ type: SET_SIGNUP_FORM_ERRORS, payload: errors });
      }

      dispatch({ type: SET_SIGNUP_SUBMITTING, payload: true });
      dispatch({ type: SET_SIGNUP_LOADING, payload: true });

      const user = {
        ...newUser,
      };

      const response = await axios.post('/api/auth/register', user);

      const successfulOptions = {
        title: `You have signed up successfully! You will be receiving an email as well. Thank you!`,
        position: 'tr',
        autoDismiss: 1,
      };

      localStorage.setItem('token', response.data.token);

      setToken(response.data.token);

      dispatch(setAuth());
      dispatch(success(successfulOptions));
      dispatch({ type: SIGNUP_RESET });
    } catch (error) {
      console.log('error');
    } finally {
      dispatch({ type: SET_SIGNUP_SUBMITTING, payload: false });
      dispatch({ type: SET_SIGNUP_LOADING, payload: false });
    }
  };
};
