import {
  RESET_CHECKOUT, SET_CHECKOUT_PAYMENT_DETAILS, SET_CHECKOUT_SHIPPING_DETAILS, CREATE_ORDER_SUCCESS,
  UPLOAD_PAYMENT_SUCCESS
} from '@/constants/constants';

const defaultState = {
  shipping: {},
  order: {
    orderId: '',
    orderStatus:"",
  },
  payment: {
    type: 'paypal',
    name: '',
    cardnumber: '',
    expiry: '',
    ccv: ''
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_CHECKOUT_SHIPPING_DETAILS:
      return {
        ...state,
        shipping: action.payload
      };
    case SET_CHECKOUT_PAYMENT_DETAILS:
      return {
        ...state,
        payment: action.payload
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload
      }
    case UPLOAD_PAYMENT_SUCCESS:
      return {
        ...state,
        order: action.payload
      }
    case RESET_CHECKOUT:
      return defaultState;
    default:
      return state;
  }
};
