import {
CANCEL_GET_ORDERS,
CLEAR_ORDER_STATE,
GET_ORDERS,
GET_ORDERS_SUCCESS,
REMOVE_ORDER,
REMOVE_ORDER_SUCCESS,
SEARCH_ORDER,
SEARCH_ORDER_SUCCESS
} from '@/constants/constants';

export const getOrders = (lastRef) => ({
  type: GET_ORDERS,
  payload: lastRef
});

export const getOrdersSuccess = (orders) => ({
  type: GET_ORDERS_SUCCESS,
  payload: orders
});

export const cancelGetOrders = () => ({
  type: CANCEL_GET_ORDERS
});


export const searchOrder = (searchKey) => ({
  type: SEARCH_ORDER,
  payload: {
    searchKey
  }
});

export const searchOrderSuccess = (orders) => ({
  type: SEARCH_ORDER_SUCCESS,
  payload: orders
});

export const clearOrderState = () => ({
  type: CLEAR_ORDER_STATE
});


export const removeOrder = (id) => ({
  type: REMOVE_ORDER,
  payload: id
});

export const removeOrderSuccess = (id) => ({
  type: REMOVE_ORDER_SUCCESS,
  payload: id
});



