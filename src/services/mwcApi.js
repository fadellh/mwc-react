import axios from 'axios';
import config from "./mwcConfig";
import { create } from 'yup/lib/Reference';
import { uploadPayment } from '@/redux/actions/checkoutActions';

// BASE_URL
const API = axios.create({
  baseURL: config.apiBaseUrl,
});

const ORDER_API = axios.create({
  baseURL: config.orderUrl,
});

const apiService = {
  getProducts: async (lastRefKey) => {
    const response = await API.get('/v1/inventory/products', {
      params: { lastRefKey }
    });
    return response.data;
  },
  getFeaturedProducts: async() =>{
    const response = await API.get('/v1/inventory/products');
    return response.data;
  },
    
  getRecommendedProducts: async () =>{
    const response = await API.get('/v1/inventory/products');
    return response.data;
  },
  createOrder: async (order) => {
    if (config.useDummyCall) {
      return apiService.createOrderDummy(order);
    }
    const response = await ORDER_API.post('/v1/orders', order);
    return response.data;
  },
  createOrderDummy: async (apiPayload) => {
    console.log("Payload received for order:", apiPayload);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 5000)); // 2-second delay
    
    // Simulate a successful response
    return {
      orderId: Math.floor(Math.random() * 100000).toString(), // Random order ID
      status: 'success',
      message: 'Order created successfully!'
    };
  },
  uploadPayment: async (paymentFormData) => {
    if (config.useDummyCall) {
      return apiService.uploadPaymentDummy(paymentFormData);
    }
    const response = await ORDER_API.post('/v1/orders/payment', paymentFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  uploadPaymentDummy: async (payment) => {
    console.log("Payment received:", payment);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2-second delay
    
    // Simulate a successful response
    return {
      orderStatus: 'REVIEW_PAYMENT',
      message: 'Payment uploaded successfully!'
    };
  },
  getOrders: async (orderId, userId) => {
    if (config.useDummyCall) {
      return apiService.getOrdersDummy();
    }
    const response = await ORDER_API.get('/v1/orders', {
      // params: { order_number: orderId }, 
      headers: {
        'X-User-Id': userId,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },
  getOrdersDummy: async () => {
    console.log("Get for order");
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000)); // 2-second delay
    
    // Simulate a successful response
    return [
      {
        orderNumber: Math.floor(Math.random() * 100000).toString(), // Random order ID
        orderStatus: 'APPROVED',
        totalPrice: 1000000
      },
      {
        orderNumber: Math.floor(Math.random() * 100000).toString(), // Random order ID
        orderStatus: 'REVIEW_PAYMENT',
        totalPrice: 2000000
      },
  ];
  },
};

export default apiService;
