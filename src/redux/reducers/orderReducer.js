import {
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
} from '@/constants/constants';

const initState = {
  lastRefKey: null,
  total: 0,
  items: []
};


export default (state = initState, action) => {
  switch (action.type) {
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        lastRefKey: action.payload
      };
    default:
      return state;
  }
};