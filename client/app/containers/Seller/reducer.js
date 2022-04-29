/*
 *
 * Seller reducer
 *
 */

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

const initialState = {
  sellers: [],
  sellFormData: {
    name: '',
    email: '',
    phone: '',
    brand: '',
    business: '',
    password: '',
  },
  formErrors: {},
  signupFormData: {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  },
  signupFormErrors: {},
  isLoading: false,
  isSellSubmitting: false,
  isSellLoading: false,
};

const sellerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SELLERS:
      return {
        ...state,
        sellers: action.payload,
      };
    case REMOVE_SELLER:
      const index = state.sellers.findIndex((b) => b._id === action.payload);
      return {
        ...state,
        sellers: [
          ...state.sellers.slice(0, index),
          ...state.sellers.slice(index + 1),
        ],
      };
    case SELL_FORM_CHANGE:
      return {
        ...state,
        sellFormData: { ...state.sellFormData, ...action.payload },
      };
    case SET_SELL_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload,
      };
    case SELL_FORM_RESET:
      return {
        ...state,
        sellFormData: {
          name: '',
          email: '',
          phone: '',
          brand: '',
          business: '',
        },
        formErrors: {},
      };
    case SIGNUP_CHANGE:
      return {
        ...state,
        signupFormData: { ...state.signupFormData, ...action.payload },
      };
    case SET_SIGNUP_FORM_ERRORS:
      return {
        ...state,
        signupFormErrors: action.payload,
      };
    case SET_SELLERS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_SELL_SUBMITTING:
      return {
        ...state,
        isSellSubmitting: action.payload,
      };
    case SET_SELL_LOADING:
      return {
        ...state,
        isSellLoading: action.payload,
      };
    case SIGNUP_RESET:
      return {
        ...state,
        signupFormData: {
          email: '',
          firstName: '',
          lastName: '',
          password: '',
        },
      };
    default:
      return state;
  }
};

export default sellerReducer;
