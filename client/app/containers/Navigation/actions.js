/*
 *
 * Navigation actions
 *
 */

import axios from 'axios';
import {
  TOGGLE_MENU,
  TOGGLE_CART,
  SEARCH_CHANGE,
  SUGGESTIONS_FETCH_REQUEST,
  SUGGESTIONS_CLEAR_REQUEST,
} from './constants';

export const toggleMenu = () => {
  return {
    type: TOGGLE_MENU,
  };
};

export const toggleCart = () => {
  return {
    type: TOGGLE_CART,
  };
};

export const onSearch = (v) => {
  return {
    type: SEARCH_CHANGE,
    payload: v,
  };
};

export const onSuggestionsFetchRequested = (value) => {
  const inputValue = value.value.trim().toLowerCase();

  return async (dispatch, getState) => {
    try {
      if (inputValue && inputValue.length % 3 === 0) {
        const response = await axios.get(`/api/product/search/${inputValue}`);
        dispatch({
          type: SUGGESTIONS_FETCH_REQUEST,
          payload: response.data.products,
        });
      }
    } catch (error) {
      console.log('error');
    }
  };
};

export const onSuggestionsClearRequested = () => {
  return {
    type: SUGGESTIONS_CLEAR_REQUEST,
    payload: [],
  };
};
