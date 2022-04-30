import { goBack } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  F_ADDRESS,
  F_ADDRESSES,
  CHANGE_ADDRESS,
  ADDRESS_EDIT,
  SET_ADDRESS_FORM_ERRORS,
  SET_ADDRESS_FORM_EDIT_ERRORS,
  RESET_ADDRESS,
  ADD_ADDRESS,
  REMOVE_ADDRESS,
  SET_ADDRESS_LOADING,
  ADDRESS_SELECT,
} from './constants';
import { allFieldsValidation } from '../../utils/validation';

export const changeAddress = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: CHANGE_ADDRESS,
    payload: formData,
  };
};

export const editAddress = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: ADDRESS_EDIT,
    payload: formData,
  };
};

export const handleAddressSelect = (value) => {
  return {
    type: ADDRESS_SELECT,
    payload: value,
  };
};

export const setAddressLoading = (value) => {
  return {
    type: SET_ADDRESS_LOADING,
    payload: value,
  };
};

export const fetchAddresses = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setAddressLoading(true));
      const response = await axios.get(`/api/address`);
      dispatch({ type: F_ADDRESSES, payload: response.data.addresses });
    } catch (error) {
      console.log('error');
    } finally {
      dispatch(setAddressLoading(false));
    }
  };
};

export const fetchAddress = (addressId) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/address/${addressId}`);
      dispatch({
        type: F_ADDRESS,
        payload: response.data.address,
      });
    } catch (error) {
      console.log('error');
    }
  };
};

export const addAddress = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        address: 'required',
        state: 'required',
        country: 'required',
      };

      const newAddress = getState().address.addressFormData;
      const isDefault = getState().address.isDefault;

      const { isValid, errors } = allFieldsValidation(newAddress, rules, {
        'required.address': 'Address is required.',
        'required.state': 'State is required.',
        'required.country': 'Country is required.',
      });

      if (!isValid) {
        return dispatch({ type: SET_ADDRESS_FORM_ERRORS, payload: errors });
      }

      const address = {
        isDefault,
        ...newAddress,
      };

      const response = await axios.post(`/api/address/add`, address);

      const optionsS = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1,
      };

      if (response.data.success === true) {
        dispatch(success(optionsS));
        dispatch({
          type: ADD_ADDRESS,
          payload: response.data.address,
        });
        dispatch(goBack());
        dispatch({ type: RESET_ADDRESS });
      }
    } catch (error) {
      console.log('error');
    }
  };
};

export const updateAddress = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        country: 'required',
        state: 'required',
        address: 'required',
      };

      const newAddress = getState().address.address;

      const { isValid, errors } = allFieldsValidation(newAddress, rules, {
        'required.address': 'Address is required.',
        'required.state': 'State is required.',
        'required.country': 'Country is required.',
      });

      if (!isValid) {
        return dispatch({
          type: SET_ADDRESS_FORM_EDIT_ERRORS,
          payload: errors,
        });
      }

      const response = await axios.put(
        `/api/address/${newAddress._id}`,
        newAddress
      );

      const optionsS = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1,
      };

      if (response.data.success === true) {
        dispatch(success(optionsS));
        dispatch(goBack());
      }
    } catch (error) {
      console.log('error');
    }
  };
};

export const deleteAddress = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/api/address/delete/${id}`);

      const optionsS = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1,
      };

      if (response.data.success === true) {
        dispatch(success(optionsS));
        dispatch({
          type: REMOVE_ADDRESS,
          payload: id,
        });
        dispatch(goBack());
      }
    } catch (error) {
      console.log('error');
    }
  };
};
