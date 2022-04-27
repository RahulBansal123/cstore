/*
 *
 * Users actions
 *
 */

import axios from 'axios';

import { FETCH_USERS } from './constants';

export const fetchUsers = (filter) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/user/search`, {
        params: {
          search: filter.value,
        },
      });

      dispatch({ type: FETCH_USERS, payload: response.data.users });
    } catch (error) {
      console.log('error');
    }
  };
};

export const searchUsers = (filter) => {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchUsers(filter));
    } catch (error) {
      console.log('error');
    }
  };
};
