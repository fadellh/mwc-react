import axios from 'axios';
import config from "./mwcConfig";
import { create } from 'yup/lib/Reference';

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
      orderId: Math.floor(Math.random() * 100000), // Random order ID
      status: 'success',
      message: 'Order created successfully!'
    };
  }
};

export default apiService;
