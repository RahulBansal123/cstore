/*
 *
 * Product actions
 *
 */

import { goBack } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  FETCH_PRODUCTS,
  FETCH_STORE_PRODUCTS,
  FETCH_PRODUCT,
  FETCH_STORE_PRODUCT,
  PRODUCT_CHANGE,
  PRODUCT_EDIT_CHANGE,
  PRODUCT_SHOP_CHANGE,
  SET_PRODUCT_FORM_ERRORS,
  SET_PRODUCT_FORM_EDIT_ERRORS,
  RESET_PRODUCT,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  FETCH_PRODUCTS_SELECT,
  SET_PRODUCTS_LOADING,
  SET_ADVANCED_FILTERS,
  RESET_ADVANCED_FILTERS,
} from './constants';

import { selectOptionsFormat, selectOptionsUnFormat } from '../../helpers';
import { allFieldsValidation } from '../../utils/validation';

export const productChange = (name, value) => {
  let formData = {};
  formData[name] = value;
  return {
    type: PRODUCT_CHANGE,
    payload: formData,
  };
};

export const productEditChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: PRODUCT_EDIT_CHANGE,
    payload: formData,
  };
};

export const productShopChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: PRODUCT_SHOP_CHANGE,
    payload: formData,
  };
};

export const resetProduct = () => {
  return async (dispatch, getState) => {
    dispatch({ type: RESET_PRODUCT });
  };
};

// fetch products api
export const fetchProducts = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: true });
      const response = await axios.get(`/api/product`);

      dispatch({
        type: FETCH_PRODUCTS,
        payload: response.data.products,
      });
    } catch (error) {
      console.log('error');
    } finally {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: false });
    }
  };
};

// fetch store products by filterProducts api
export const filterProducts = (n, v) => {
  return async (dispatch, getState) => {
    try {
      n === undefined ? dispatch({ type: RESET_ADVANCED_FILTERS }) : '';

      const s = getState().product.advancedFilters;
      let payload = productsFilterOrganizer(n, v, s);

      dispatch({ type: SET_ADVANCED_FILTERS, payload });
      dispatch({ type: SET_PRODUCTS_LOADING, payload: true });

      const sortOrder = getSortOrder(payload.order);

      payload = { ...payload, sortOrder };

      const response = await axios.post(`/api/product/list`, payload);

      dispatch({
        type: SET_ADVANCED_FILTERS,
        payload: Object.assign(payload, {
          pages: response.data.pages,
          pageNumber: response.data.page,
          totalProducts: response.data.totalProducts,
        }),
      });
      dispatch({
        type: FETCH_STORE_PRODUCTS,
        payload: response.data.products,
      });
    } catch (error) {
      console.log('error');
    } finally {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: false });
    }
  };
};

// fetch product api
export const fetchProduct = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/product/${id}`);

      const inventory = response.data.product.quota;

      const brand = response.data.product.brand;
      const isBrand = brand ? true : false;
      const brandData = selectOptionsFormat(
        isBrand && [brand],
        !isBrand,
        'fetchProduct'
      );

      response.data.product.brand = brandData[0];

      const product = { ...response.data.product, inventory };

      dispatch({
        type: FETCH_PRODUCT,
        payload: product,
      });
    } catch (error) {
      console.log('error');
    }
  };
};

// fetch store product api
export const fetchStoreProduct = (slug) => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_PRODUCTS_LOADING, payload: true });

    try {
      const response = await axios.get(`/api/product/search/${slug}`);

      const inventory = response.data.product.quota;
      const product = { ...response.data.product, inventory };

      dispatch({
        type: FETCH_STORE_PRODUCT,
        payload: product,
      });
    } catch (error) {
      console.log('error');
    } finally {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: false });
    }
  };
};

export const fetchBrandProducts = (slug) => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_PRODUCTS_LOADING, payload: true });

    try {
      const response = await axios.get(`/api/product/list/brand/${slug}`);

      const s = getState().product.advancedFilters;
      dispatch({
        type: SET_ADVANCED_FILTERS,
        payload: Object.assign(s, {
          pages: response.data.pages,
          pageNumber: response.data.page,
          totalProducts: response.data.totalProducts,
        }),
      });
      dispatch({
        type: FETCH_STORE_PRODUCTS,
        payload: response.data.products,
      });
    } catch (error) {
      console.log('error');
    } finally {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: false });
    }
  };
};

export const fetchProductsSelect = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/product/all`);

      const formattedProducts = selectOptionsFormat(response.data.products);

      dispatch({
        type: FETCH_PRODUCTS_SELECT,
        payload: formattedProducts,
      });
    } catch (error) {
      console.log('error');
    }
  };
};

// add product api
export const addProduct = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: 'required',
        description: 'required|max:200',
        quota: 'required|numeric',
        price: 'required|numeric',
        image: 'required',
      };

      const product = getState().product.productFormData;
      const user = getState().account.user;
      const brands = getState().brand.brandsSelect;

      const brand = selectOptionsUnFormat([product.brand]);

      const newProduct = {
        name: product.name,
        description: product.description,
        price: product.price,
        quota: product.quota,
        image: product.image,
        brand:
          user.role !== 'SELLER'
            ? brand != 0
              ? brand
              : null
            : brands[1].value,
      };

      const { isValid, errors } = allFieldsValidation(newProduct, rules, {
        'required.name': 'Name is required.',
        'required.description': 'Description is required.',
        'max.description':
          'Description may not be greater than 200 characters.',
        'required.quota': 'Quantity is required.',
        'required.price': 'Price is required.',
        'required.image': 'Image URL is required',
      });

      if (!isValid) {
        return dispatch({ type: SET_PRODUCT_FORM_ERRORS, payload: errors });
      }

      const response = await axios.post(`/api/product/add`, newProduct);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1,
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: ADD_PRODUCT,
          payload: response.data.product,
        });
        dispatch(resetProduct());
        dispatch(goBack());
      }
    } catch (error) {
      console.log('error');
    }
  };
};

// update Product api
export const updateProduct = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: 'required',
        description: 'required|max:200',
        quota: 'required|numeric',
        price: 'required|numeric',
      };

      const product = getState().product.product;

      const brand = selectOptionsUnFormat([product.brand]);

      const newProduct = {
        name: product.name,
        description: product.description,
        quota: product.quota,
        price: product.price,
        brand: brand != 0 ? brand : null,
      };

      const { isValid, errors } = allFieldsValidation(newProduct, rules, {
        'required.name': 'Name is required.',
        'required.description': 'Description is required.',
        'max.description':
          'Description may not be greater than 200 characters.',
        'required.quota': 'Quantity is required.',
        'required.price': 'Price is required.',
      });

      if (!isValid) {
        return dispatch({
          type: SET_PRODUCT_FORM_EDIT_ERRORS,
          payload: errors,
        });
      }

      const response = await axios.put(`/api/product/${product._id}`, {
        product: newProduct,
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1,
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));

        //dispatch(goBack());
      }
    } catch (error) {
      console.log('error');
    }
  };
};

// delete product api
export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/api/product/delete/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1,
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_PRODUCT,
          payload: id,
        });
        dispatch(goBack());
      }
    } catch (error) {
      console.log('error');
    }
  };
};

// TODO: Need improvement
const productsFilterOrganizer = (n, v, s) => {
  switch (n) {
    case 'brand':
      return {
        name: s.name,
        brand: v,
        min: s.min,
        max: s.max,
        stars: s.stars,
        order: s.order,
        pageNumber: s.pageNumber,
      };
    case 'sorting':
      return {
        name: s.name,
        brand: s.brand,
        min: s.min,
        max: s.max,
        stars: s.stars,
        order: v,
        pageNumber: s.pageNumber,
      };
    case 'price':
      return {
        name: s.name,
        brand: s.brand,
        min: v[0],
        max: v[1],
        stars: s.stars,
        order: s.order,
        pageNumber: s.pageNumber,
      };
    case 'rating':
      return {
        name: s.name,
        brand: s.brand,
        min: s.min,
        max: s.max,
        stars: v,
        order: s.order,
        pageNumber: s.pageNumber,
      };
    case 'pagination':
      return {
        name: s.name,
        brand: s.brand,
        min: s.min,
        max: s.max,
        stars: s.stars,
        order: s.order,
        pageNumber: v,
      };
    default:
      return {
        name: s.name,
        brand: s.brand,
        min: s.min,
        max: s.max,
        stars: s.stars,
        order: s.order,
        pageNumber: s.pageNumber,
      };
  }
};

const getSortOrder = (value) => {
  let sortOrder = {};
  switch (value) {
    case 0:
      sortOrder._id = -1;
      break;
    case 1:
      sortOrder.price = -1;
      break;
    case 2:
      sortOrder.price = 1;
      break;

    default:
      break;
  }

  return sortOrder;
};
