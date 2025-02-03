import { call, put } from 'redux-saga/effects';
import { history } from '@/routers/AppRouter';
import { CREATE_ORDER, UPLOAD_PAYMENT } from '@/constants/constants';
import { displayActionMessage } from '@/helpers/utils';
import firebase from '@/services/firebase';
import api from '@/services/mwcApi';
import { setLoading } from '../actions/miscActions';
import { CHECKOUT_STEP_3, ACCOUNT } from '@/constants/routes';
import { createOrderSuccess, uploadPaymentSuccess } from '../actions/checkoutActions';

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
        // yield put(checkoutFailure(e.message));
        yield put(setLoading(false));
        yield call(displayActionMessage, 'Order placement failed. Please try again.', 'error');
      }
      break;
    }
    case UPLOAD_PAYMENT: {
      try {
        yield put(setLoading(true));
        
        const formData = new FormData();
        formData.append('paymentProofFile', payload.paymentProof);
        formData.append('orderId', payload.orderId);
        console.log('PAYLOAD payment proof', payload.paymentProof);
        console.log('PAYLOAD order ID', payload);
        
        yield call(displayActionMessage, 'Uploading your payment proof...', 'info')
        const response = yield call(api.uploadPayment, formData);

        yield put(uploadPaymentSuccess({...response, orderId: payload.orderId}));

        yield call(displayActionMessage, 'Uploaded payment proof...', 'success')
        yield put(setLoading(false));
        
        yield call(history.push, ACCOUNT);
      } catch (e) { 
        yield put(setLoading(false));
        yield call(displayActionMessage, 'Payment upload failed. Please try again.', 'error');
      }
      break;
    }
    default: {
      throw new Error('Unexpected action type.');
    }
  }
}

export default checkoutSaga;