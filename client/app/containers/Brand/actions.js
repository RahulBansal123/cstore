import { goBack } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  FETCH_BRANDS,
  FETCH_STORE_BRANDS,
  FETCH_BRAND,
  BRAND_CHANGE,
  BRAND_EDIT_CHANGE,
  SET_BRAND_FORM_ERRORS,
  SET_BRAND_FORM_EDIT_ERRORS,
  ADD_BRAND,
  REMOVE_BRAND,
  FETCH_BRANDS_SELECT,
  SET_BRANDS_LOADING,
  RESET_BRAND,
} from './constants';

import { selectOptionsFormat } from '../../helpers';
import { allFieldsValidation } from '../../utils/validation';

export const brandChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: BRAND_CHANGE,
    payload: formData,
  };
};

export const brandEditChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: BRAND_EDIT_CHANGE,
    payload: formData,
  };
};

export const fetchStoreBrands = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/brand/list`);

      dispatch({
        type: FETCH_STORE_BRANDS,
        payload: response.data.brands,
      });
    } catch (error) {
      console.log('error');
    }
  };
};

export const fetchBrands = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_BRANDS_LOADING, payload: true });

      const response = await axios.get(`/api/brand`);

      dispatch({
        type: FETCH_BRANDS,
        payload: response.data.brands,
      });
    } catch (error) {
      console.log('error');
    } finally {
      dispatch({ type: SET_BRANDS_LOADING, payload: false });
    }
  };
};

export const fetchBrand = (brandId) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/brand/${brandId}`);

      dispatch({
        type: FETCH_BRAND,
        payload: response.data.brand,
      });
    } catch (error) {
      console.log('error');
    }
  };
};

export const fetchBrandsSelect = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/brand/all`);

      const formattedBrands = selectOptionsFormat(response.data.brands, true);

      dispatch({
        type: FETCH_BRANDS_SELECT,
        payload: formattedBrands,
      });
    } catch (error) {
      console.log('error');
    }
  };
};

export const addBrand = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: 'required',
        description: 'required|max:100',
      };

      const brand = getState().brand.brandFormData;

      const { isValid, errors } = allFieldsValidation(brand, rules, {
        'required.name': 'Name is required.',
        'required.description': 'Description is required.',
        'max.description':
          'Description may not be greater than 100 characters.',
      });

      if (!isValid) {
        return dispatch({ type: SET_BRAND_FORM_ERRORS, payload: errors });
      }

      const response = await axios.post(`/api/brand/add`, brand);

      const optionsS = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1,
      };

      if (response.data.success === true) {
        dispatch(success(optionsS));
        dispatch({
          type: ADD_BRAND,
          payload: response.data.brand,
        });

        dispatch(goBack());
        dispatch({ type: RESET_BRAND });
      }
    } catch (error) {
      console.log('error');
    }
  };
};

export const updateBrand = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: 'required',
        description: 'required|max:100',
      };

      const brand = getState().brand.brand;

      const newBrand = {
        name: brand.name,
        description: brand.description,
      };

      const { isValid, errors } = allFieldsValidation(newBrand, rules, {
        'required.name': 'Name is required.',
        'required.description': 'Description is required.',
        'max.description':
          'Description may not be greater than 100 characters.',
      });

      if (!isValid) {
        return dispatch({ type: SET_BRAND_FORM_EDIT_ERRORS, payload: errors });
      }

      const response = await axios.put(`/api/brand/${brand._id}`, {
        brand: newBrand,
      });

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

export const deleteBrand = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/api/brand/delete/${id}`);

      const optionsS = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1,
      };

      if (response.data.success === true) {
        dispatch(success(optionsS));
        dispatch({
          type: REMOVE_BRAND,
          payload: id,
        });
        dispatch(goBack());
      }
    } catch (error) {
      console.log('error');
    }
  };
};
