import { call, put } from 'redux-saga/effects';
import { history } from '@/routers/AppRouter';
import { CREATE_ORDER } from '@/constants/constants';
import { displayActionMessage } from '@/helpers/utils';
import firebase from '@/services/firebase';
import api from '@/services/mwcApi';
import { setLoading } from '../actions/miscActions';
import { CHECKOUT_STEP_3 } from '@/constants/routes';
import { createOrderSuccess } from '../actions/checkoutActions';

function* checkoutSaga({ type, payload }) {
  switch (type) {
    case CREATE_ORDER: {
      try {
        yield put(setLoading(true));

        const items = payload.basket.map(item => ({ 
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.price * item.quantity
        }));

        const apiPayload = {
          customerId: payload.customerId,
          warehouseId: payload.warehouseId,
          address: {
            street: payload.location.address,
            postalCode: '90',
            city: payload.location.address,
            latitude: payload.location.latitude,
            longitude: payload.location.longitude
          },
          items
        };
        

        const orderResponse = yield call(api.createOrder, apiPayload);
        yield put(createOrderSuccess(orderResponse));

        yield put(setLoading(false));
        yield call(history.push, CHECKOUT_STEP_3);

        yield call(displayActionMessage, 'Order placed successfully!', 'success');
      } catch (e) {
        console.log(e.message);
        // yield put(checkoutFailure(e.message));
        yield put(setLoading(false));
        yield call(displayActionMessage, 'Order placement failed. Please try again.', 'error');
      }
      break;
    }
    default: {
      throw new Error('Unexpected action type.');
    }
  }
}

export default checkoutSaga;