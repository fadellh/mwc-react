/* eslint-disable jsx-a11y/label-has-associated-control */
import { CustomInput, CustomMobileInput, CustomAddressInput } from '@/components/formik';
import { Field, useFormikContext } from 'formik';
import React from 'react';

const ShippingForm = () => {
  const { values } = useFormikContext();
  return (
    <div className="checkout-shipping-wrapper">
      <div className="checkout-shipping-form">
        <div className="checkout-fieldset">
          <div className="d-block checkout-field">
            <Field
              name="fullname"
              type="text"
              label="* Full Name"
              placeholder="Enter your full name"
              component={CustomInput}
              style={{ textTransform: 'capitalize' }}
            />
          </div>
          <div className="d-block checkout-field">
            <Field
              name="email"
              type="email"
              label="* Email Address"
              placeholder="Enter your email address"
              component={CustomInput}
            />
          </div>
        </div>
        <div className="checkout-fieldset">
          <div className="d-block checkout-field">
            <CustomAddressInput name="location" defaultValue={values.location} />
          </div>
          <div className="d-block checkout-field">
            <CustomMobileInput name="mobile" defaultValue={values.mobile} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;
