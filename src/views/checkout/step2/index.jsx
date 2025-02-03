/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-nested-ternary */
import { ArrowLeftOutlined, ArrowRightOutlined, CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { Boundary } from '@/components/common';
import { CHECKOUT_STEP_1, CHECKOUT_STEP_3 } from '@/constants/routes';
import { Form, Formik, useFormikContext } from 'formik';
import { useDocumentTitle, useScrollTop, useShippingCost } from '@/hooks';
import PropType from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setShippingDetails, createOrder } from '@/redux/actions/checkoutActions';
import * as Yup from 'yup';
// import { StepTracker } from '../components';
import StepTracker from '../components/StepTracker';
import withCheckout from '../hoc/withCheckout';
import ShippingForm from './ShippingForm';
import ShippingTotal from './ShippingTotal';


const FormSchema = Yup.object().shape({
  fullname: Yup.string()
    .required('Full name is required.')
    .min(2, 'Full name must be at least 2 characters long.')
    .max(60, 'Full name must only be less than 60 characters.'),
  email: Yup.string()
    .email('Email is not valid.')
    .required('Email is required.'),
  address: Yup.object().shape({
    city: Yup.string(),
    street: Yup.string(),
  }).required('Address is required.'),
  mobile: Yup.object()
    .shape({
      country: Yup.string(),
      countryCode: Yup.string(),
      dialCode: Yup.string().required('Mobile number is required'),
      value: Yup.string().required('Mobile number is required')
    })
    .required('Mobile number is required.'),
  isInternational: Yup.boolean(),
  isDone: Yup.boolean()
});


const ShippingCostUpdater = ({ basket }) => {
  const { values, setFieldValue } = useFormikContext();
  const { shippingCostData, fetchShippingCost, isLoading, error } = useShippingCost();
  let isMounted = true; // local flag to track mounting status

  console.log('StepTracker:', StepTracker);

  useEffect(() => {
    if (
      values.location &&
      typeof values.location === 'object' &&
      values.location.address &&
      values.location.latitude &&
      values.location.longitude
    ) {
      const items = basket.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      }));
      const payload = {
        customerId: values.customerId,
        items: items,
        address: {
          street: values.location.address,
          city: values.location.address,
          state: values.location.address,
          zipCode: "10101",
          latitude: values.location.latitude,
          longitude: values.location.longitude
        }
      };

      fetchShippingCost(payload);
    }

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [JSON.stringify(values.location), values.customerId, JSON.stringify(basket), fetchShippingCost]);

  useEffect(() => {
    if (shippingCostData && shippingCostData.shippingCost !== undefined && isMounted) {
      setFieldValue('shippingFee', shippingCostData.shippingCost);
      setFieldValue('warehouseId', shippingCostData.warehouseId);
    }
  }, [shippingCostData, setFieldValue]);

  return <div className="shipping-cost-info">{/* Your UI logic here */}</div>;
};

const ShippingDetails = ({ profile, shipping, basket, subtotal }) => {
  useDocumentTitle('Check Out Step 2 | MWC');
  useScrollTop();
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLoading } = useSelector((state) => ({
    isLoading: state.app.loading
  }));


  useEffect(() => {
    if (shipping.location) {
      
    }

  }, [dispatch, shipping.location]);
  

  const initFormikValues = {
    customerId: profile.customerId || '',
    fullname: shipping.fullname || profile.fullname || '',
    email: shipping.email || profile.email || '',
    address: shipping.address || profile.address || '',
    mobile: shipping.mobile || profile.mobile || {},
    location: shipping.location || {},
    isInternational: shipping.isInternational || false,
    shippingFee: shipping.shippingFee || 0,
    warehouseId: shipping.warehouseId || '',
    isDone: shipping.isDone || false
  };

  const onSubmitForm = (form) => {
    dispatch(setShippingDetails({
      fullname: form.fullname,
      email: form.email,
      address: form.address,
      mobile: form.mobile,
      location: form.location,
      isInternational: false,
      isDone: true
    }));

    dispatch(createOrder({
      warehouseId: form.warehouseId,
      customerId: form.customerId,
      location: form.location,
      basket: basket,
    }))

    // history.push(CHECKOUT_STEP_3);
  };

  return (
    <Boundary>
      <div className="checkout">
        <StepTracker current={2} />
        <div className="checkout-step-2">
          <h3 className="text-center">Shipping Details</h3>
          <Formik
            initialValues={initFormikValues}
            validateOnChange
            validationSchema={FormSchema}
            onSubmit={onSubmitForm}
          >
            {() => (
              <Form>
                <ShippingForm />
                <ShippingCostUpdater basket={basket} />
                <br />
                {/*  ---- TOTAL --------- */}
                <ShippingTotal 
                  subtotal={subtotal}  
                />
                <br />
                {/*  ----- NEXT/PREV BUTTONS --------- */}
                <div className="checkout-shipping-action">
                  <button
                    className="button button-muted"
                    onClick={() => history.push(CHECKOUT_STEP_1)}
                    type="button"
                  >
                    <ArrowLeftOutlined />
                    &nbsp;
                    Go Back
                  </button>
                  <button
                    className="button button-icon"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? <LoadingOutlined /> : <CheckOutlined />}
                              &nbsp;
                    {isLoading ? 'Ordering' : 'Order'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Boundary>
  );
};

ShippingDetails.propTypes = {
  subtotal: PropType.number.isRequired,
  profile: PropType.shape({
    fullname: PropType.string,
    email: PropType.string,
    address: PropType.object,
    mobile: PropType.object
  }).isRequired,
  shipping: PropType.shape({
    fullname: PropType.string,
    email: PropType.string,
    address: PropType.object,
    mobile: PropType.object,
    location: PropType.object,
    isInternational: PropType.bool,
    isDone: PropType.bool
  }).isRequired
};

export default withCheckout(ShippingDetails);
