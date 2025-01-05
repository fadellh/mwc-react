import {
  RESET_CHECKOUT, SET_CHECKOUT_PAYMENT_DETAILS, SET_CHECKOUT_SHIPPING_DETAILS, CREATE_ORDER, CREATE_ORDER_SUCCESS
} from '@/constants/constants';

export const setShippingDetails = (details) => ({
  type: SET_CHECKOUT_SHIPPING_DETAILS,
  payload: details
});

export const createOrder = (details) => ({
  type: CREATE_ORDER,
  payload: details
});

export const createOrderSuccess = (response) => ({
  type: CREATE_ORDER_SUCCESS,
  payload: response
});


export const setPaymentDetails = (details) => ({
  type: SET_CHECKOUT_PAYMENT_DETAILS,
  payload: details
});

export const resetCheckout = () => ({
  type: RESET_CHECKOUT
});
