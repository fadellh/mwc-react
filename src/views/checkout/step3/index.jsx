import { CHECKOUT_STEP_1 } from '@/constants/routes';
import { Form, Formik } from 'formik';
import { displayActionMessage } from '@/helpers/utils';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import PropType from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { StepTracker } from '../components';
import withCheckout from '../hoc/withCheckout';
import CreditPayment from './CreditPayment';
import PayPalPayment from './PayPalPayment';
import UploadPayment from './UploadPayment';
import Total from './Total';
import { useFileHandler } from '@/hooks';
import { useDispatch } from 'react-redux';
import { uploadPayment } from '@/redux/actions/checkoutActions';


const FormSchema = Yup.object().shape({
  type: Yup.string().required('Please select payment mode'),
  // Conditionally require credit card fields only if user picks 'credit'
  name: Yup.string().when('type', {
    is: 'credit',
    then: Yup.string()
      .min(4, 'Name should be at least 4 characters.')
      .required('Name is required'),
    otherwise: Yup.string().notRequired()
  }),
  cardnumber: Yup.string().when('type', {
    is: 'credit',
    then: Yup.string()
      .min(13, 'Card number should be 13-19 digits long')
      .max(19, 'Card number should only be 13-19 digits long')
      .required('Card number is required.'),
    otherwise: Yup.string().notRequired()
  }),
  expiry: Yup.string().when('type', {
    is: 'credit',
    then: Yup.string().required('Credit card expiry is required.'),
    otherwise: Yup.string().notRequired()
  }),
  ccv: Yup.string().when('type', {
    is: 'credit',
    then: Yup.string()
      .min(3, 'CCV length should be 3-4 digit')
      .max(4, 'CCV length should only be 3-4 digit')
      .required('CCV is required.'),
    otherwise: Yup.string().notRequired()
  }),
  // Conditionally require payment proof only if user picks 'upload'
  paymentProof: Yup.mixed().when('type', {
    is: 'upload',
    then: Yup.mixed().required('Please upload your payment proof'),
    otherwise: Yup.mixed().notRequired()
  })

});

const Payment = ({ shipping, payment, subtotal, order }) => {
  useDocumentTitle('Check Out Final Step | MWC');
  useScrollTop();
  
  const dispatch = useDispatch();

  const initFormikValues = {
    name: payment.name || '',
    cardnumber: payment.cardnumber || '',
    expiry: payment.expiry || '',
    ccv: payment.ccv || '',
    type: payment.type || 'paypal',
    orderId: order.orderId || '',
    orderStatus: order.status || '',
    paymentProof: null  // for the file
  };

  const {
    imageFile,
    isFileLoading,
    onFileChange,
    removeImage
  } = useFileHandler({ paymentProof: {} })

  const onConfirm = (form) => {
    if (form.type === 'paypal') {
      displayActionMessage('PayPal feature not ready yet :)', 'info');
    } else if (form.type === 'credit') {
      displayActionMessage('Processing credit card payment...');
    } else if (form.type === 'upload') {
      dispatch(uploadPayment({
        orderId: form.orderId,
        paymentProof: form.paymentProof,
      }))      
    }
  };

  if (!shipping || !shipping.isDone) {
    return <Redirect to={CHECKOUT_STEP_1} />;
  }
  return (
    <div className="checkout">
      <StepTracker current={3} />
      <Formik
        initialValues={initFormikValues}
        validateOnChange
        validationSchema={FormSchema}
        validate={(form) => {
          if (form.type === 'paypal') {
            // displayActionMessage('Feature not ready yet :)', 'info');
          }
        }}
        onSubmit={onConfirm}
      >
        {() => (
          <Form className="checkout-step-3">
            <CreditPayment />
            <PayPalPayment />
            <UploadPayment 
              imageFile={imageFile}
              isFileLoading={isFileLoading}
              onFileChange={onFileChange}
              removeImage={removeImage}
            />
            <Total
              isInternational={shipping.isInternational}
              subtotal={subtotal}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

Payment.propTypes = {
  shipping: PropType.shape({
    isDone: PropType.bool,
    isInternational: PropType.bool
  }).isRequired,
  payment: PropType.shape({
    name: PropType.string,
    cardnumber: PropType.string,
    expiry: PropType.string,
    ccv: PropType.string,
    type: PropType.string
  }).isRequired,
  order: PropType.shape({
    orderId: PropType.string,
    status: PropType.string
  }).isRequired,
  subtotal: PropType.number.isRequired
};

export default withCheckout(Payment);
