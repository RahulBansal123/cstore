/*
 *
 * Seller actions
 *
 */

import { push } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  FETCH_SELLERS,
  REMOVE_SELLER,
  SELL_FORM_CHANGE,
  SET_SELL_FORM_ERRORS,
  SELL_FORM_RESET,
  SIGNUP_CHANGE,
  SET_SIGNUP_FORM_ERRORS,
  SET_SELLERS_LOADING,
  SET_SELL_SUBMITTING,
  SET_SELL_LOADING,
  SIGNUP_RESET,
} from './constants';

import { allFieldsValidation } from '../../utils/validation';
import { signOut } from '../Login/actions';

export const sellFormChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: SELL_FORM_CHANGE,
    payload: formData,
  };
};

export const sellerSignupChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: SIGNUP_CHANGE,
    payload: formData,
  };
};

export const sellWithUs = () => {
  return async (dispatch, getState) => {
    try {
      const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

      const rules = {
        name: 'required',
        email: 'required|email',
        password: 'required|password',
        phone: ['required', `regex:${phoneno}`],
        brand: 'required',
        business: 'required|min:10',
      };

      const seller = getState().seller.sellFormData;

      const { isValid, errors } = allFieldsValidation(seller, rules, {
        'required.name': 'Name is required.',
        'required.email': 'Email is required.',
        'required.password': 'Password is required.',
        'email.email': 'Email format is invalid.',
        'required.phone': 'Phone number is required.',
        'regex.phone': 'Phone number format is invalid.',
        'required.brand': 'Brand is required.',
        'required.business': 'Business is required.',
        'min.business': 'Business must be at least 10 characters.',
      });

      if (!isValid) {
        return dispatch({ type: SET_SELL_FORM_ERRORS, payload: errors });
      }

      dispatch({ type: SET_SELL_SUBMITTING, payload: true });
      dispatch({ type: SET_SELL_LOADING, payload: true });

      const response = await axios.post('/api/seller/new', seller);

      const optionsS = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1,
      };

      dispatch({ type: SELL_FORM_RESET });
      dispatch(success(optionsS));
    } catch (error) {
      console.log('error');
    } finally {
      dispatch({ type: SET_SELL_SUBMITTING, payload: false });
      dispatch({ type: SET_SELL_LOADING, payload: false });
    }
  };
};

export const fetchSellers = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_SELLERS_LOADING, payload: true });

      const response = await axios.get(`/api/seller/list`);

      dispatch({
        type: FETCH_SELLERS,
        payload: response.data.sellers,
      });
    } catch (error) {
      console.log('error');
    } finally {
      dispatch({ type: SET_SELLERS_LOADING, payload: false });
    }
  };
};

export const approveSeller = (seller) => {
  return async (dispatch, getState) => {
    try {
      await axios.put(`/api/seller/approve/${seller._id}`);

      dispatch(fetchSellers());
    } catch (error) {
      console.log('error');
    }
  };
};

export const rejectSeller = (seller) => {
  return async (dispatch, getState) => {
    try {
      await axios.put(`/api/seller/reject/${seller._id}`);

      dispatch(fetchSellers());
    } catch (error) {
      console.log('error');
    }
  };
};

export const sellerSignUp = (token) => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        email: 'required|email',
        password: 'required|min:6',
        name: 'required',
      };

      const seller = getState().seller.signupFormData;

      const { isValid, errors } = allFieldsValidation(seller, rules, {
        'required.email': 'Email is required.',
        'required.password': 'Password is required.',
        'required.name': 'First Name is required.',
      });

      if (!isValid) {
        return dispatch({ type: SET_SIGNUP_FORM_ERRORS, payload: errors });
      }

      await axios.post(`/api/seller/signup/${token}`, seller);

      const optionsS = {
        title: `You have signed up successfully! Please sign in with the email and password. Thank you!`,
        position: 'tr',
        autoDismiss: 1,
      };

      dispatch(signOut());
      dispatch(success(optionsS));
      dispatch(push('/login'));
      dispatch({ type: SIGNUP_RESET });
    } catch (error) {
      console.log('error');
    }
  };
};

// delete seller api
export const deleteSeller = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/api/seller/delete/${id}`);

      const optionsS = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1,
      };

      if (response.data.success == true) {
        dispatch(success(optionsS));
        dispatch({
          type: REMOVE_SELLER,
          payload: id,
        });
      }
    } catch (error) {
      console.log('error');
    }
  };
};
