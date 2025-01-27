/*
 *
 * Order actions
 *
 */

import { push } from 'connected-react-router';
import axios from 'axios';
import { success } from 'react-notification-system-redux';

import {
  FETCH_ORDERS,
  FETCH_SEARCHED_ORDERS,
  FETCH_ORDER,
  UPDATE_ORDER_STATUS,
  SET_ORDERS_LOADING,
  CLEAR_ORDERS,
} from './constants';

import { clearCart, getCartId } from '../Cart/actions';
import { toggleCart } from '../Navigation/actions';

export const updateOrderStatus = (value) => {
  return {
    type: UPDATE_ORDER_STATUS,
    payload: value,
  };
};

export const setOrderLoading = (value) => {
  return {
    type: SET_ORDERS_LOADING,
    payload: value,
  };
};

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setOrderLoading(true));

      const response = await axios.get(`/api/order`);

      if (response.data.orders) {
        dispatch({
          type: FETCH_ORDERS,
          payload: response.data.orders,
        });
      }
    } catch (error) {
      dispatch(clearOrders());
      console.log('error');
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};

export const fetchSearchOrders = (filter) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setOrderLoading(true));

      const response = await axios.get(`/api/order/search`, {
        params: {
          search: filter.value,
        },
      });

      dispatch({ type: FETCH_SEARCHED_ORDERS, payload: response.data.orders });
    } catch (error) {
      console.log('error');
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};

export const searchOrders = (filter) => {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchSearchOrders(filter));
    } catch (error) {
      console.log('error');
    }
  };
};

export const fetchOrder = (id, withLoading = true) => {
  return async (dispatch, getState) => {
    try {
      if (withLoading) {
        dispatch(setOrderLoading(true));
      }

      const response = await axios.get(`/api/order/${id}`);

      dispatch({
        type: FETCH_ORDER,
        payload: response.data.order,
      });
    } catch (error) {
      console.log('error');
    } finally {
      if (withLoading) {
        dispatch(setOrderLoading(false));
      }
    }
  };
};

export const cancelOrder = () => {
  return async (dispatch, getState) => {
    try {
      const order = getState().order.order;

      await axios.delete(`/api/order/cancel/${order._id}`);

      dispatch(push(`/dashboard/orders`));
    } catch (error) {
      console.log('error');
    }
  };
};

export const updateOrderItemStatus = (itemId, status) => {
  return async (dispatch, getState) => {
    try {
      const order = getState().order.order;

      const response = await axios.put(`/api/order/status/item/${itemId}`, {
        orderId: order._id,
        cartId: order.cartId,
        status,
      });

      if (response.data.orderCancelled) {
        dispatch(push(`/dashboard/orders`));
      } else {
        dispatch(updateOrderStatus({ itemId, status }));
        dispatch(fetchOrder(order._id, false));
      }

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1,
      };

      dispatch(success(successfulOptions));
    } catch (error) {
      console.log('error');
    }
  };
};

export const addOrder = () => {
  return async (dispatch, getState) => {
    try {
      const cartId = localStorage.getItem('cart_id');
      const total = getState().cart.cartTotal;

      if (cartId) {
        const response = await axios.post(`/api/order/add`, {
          cartId,
          total,
        });

        dispatch(push(`/order/success/${response.data.order._id}`));
        dispatch(clearCart());
      }
    } catch (error) {
      console.log('error');
    }
  };
};

export const placeOrder = () => {
  return (dispatch, getState) => {
    const token = localStorage.getItem('token');

    const cartItems = getState().cart.cartItems;

    if (token && cartItems.length > 0) {
      Promise.all([dispatch(getCartId())]).then(() => {
        dispatch(addOrder());
      });
    }

    dispatch(toggleCart());
  };
};

export const clearOrders = () => {
  return {
    type: CLEAR_ORDERS,
  };
};
