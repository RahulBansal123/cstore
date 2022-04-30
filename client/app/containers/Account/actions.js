import { success } from 'react-notification-system-redux';
import axios from 'axios';
import { ACCOUNT_UPDATE, FETCH_PROFILE, DELETE_ACCOUNT } from './constants';

export const updateAccount = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: ACCOUNT_UPDATE,
    payload: formData,
  };
};

export const deleteAccount = () => {
  return {
    type: DELETE_ACCOUNT,
  };
};

export const fetchProfile = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/user`);
      dispatch({ type: FETCH_PROFILE, payload: response.data.user });
    } catch (error) {
      console.log('error');
    }
  };
};

export const updateProfile = () => {
  return async (dispatch, getState) => {
    const profile = getState().account.user;
    try {
      const response = await axios.put(`/api/user`, {
        profile,
      });
      const optionsS = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 2,
      };
      dispatch({ type: FETCH_PROFILE, payload: response.data.user });
      dispatch(success(optionsS));
    } catch (error) {
      console.log('error');
    }
  };
};
