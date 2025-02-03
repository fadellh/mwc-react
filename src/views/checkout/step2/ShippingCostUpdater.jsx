
// import { ArrowLeftOutlined, ArrowRightOutlined, CheckOutlined, LoadingOutlined } from '@ant-design/icons';
// import { Boundary } from '@/components/common';
// import { CHECKOUT_STEP_1, CHECKOUT_STEP_3 } from '@/constants/routes';
// import { Form, Formik, useFormikContext } from 'formik';
// import { useDocumentTitle, useScrollTop } from '@/hooks';
// import PropType from 'prop-types';
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { setShippingDetails, createOrder } from '@/redux/actions/checkoutActions';
// import * as Yup from 'yup';
// import { StepTracker } from '../components';
// import withCheckout from '../hoc/withCheckout';
// import ShippingForm from './ShippingForm';
// import ShippingTotal from './ShippingTotal';
// import {useShippingCost} from '@/hooks';


// const ShippingCostUpdater = ({ basket }) => {
//   const { values, setFieldValue } = useFormikContext();
//   const { location, customerId } = values;
//   const { shippingCostData, fetchShippingCost, isLoading, error } = useShippingCost();

//   useEffect(() => {
//     // Only trigger the API if address is complete
//     if (
//       location &&
//       typeof location === 'object' &&
//       location.address &&
//       location.latitude &&
//       location.longitude
//     ) {

//       let items = [];
//       for (let i = 0; i < basket.length; i++) {
//         items.push({
//           productId: basket[i].id,
//           quantity: basket[i].quantity,
//           price: basket[i].price,
//         });
//       }

//       const payload = {
//         customerId,
//         items: items,
//         address: {
//           street: location.address,
//           city: location.address,
//           state: location.address,
//           zipCode: "10101",
//           latitude: location.latitude,
//           longitude: location.longitude
//         }
//       };

//       fetchShippingCost(payload);
//     }
//     // Use a stringified version of the address to avoid unnecessary calls
//   }, [JSON.stringify(location), customerId, JSON.stringify(basket), fetchShippingCost]);

//   useEffect(() => {
//     if (shippingCostData && shippingCostData.shippingCost !== undefined) {
//       setFieldValue('shippingFee', shippingCostData.shippingCost);
//       setFieldValue('warehouseId', shippingCostData.warehouseId);
//     }
//   }, [shippingCostData, setFieldValue]);

//   return (
//     <div className="shipping-cost-info">
//       {/* {isLoading && <p>Calculating shipping cost...</p>}
//       {error && <p className="error">{error}</p>}
//       {shippingCostData && !isLoading && (
//         <p>Shipping Cost: {shippingCostData.shippingCost}</p>
//       )} */}
//     </div>
//   );
// };

// export default ShippingCostUpdater;