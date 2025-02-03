import axios from 'axios';
import config from "./mwcConfig";
import { create } from 'yup/lib/Reference';
import { uploadPayment } from '@/redux/actions/checkoutActions';
import firebase from '@/services/firebase';
import { getUser } from '@/redux/actions/userActions';


// BASE_URL
const API = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': config.gatewayApiKey,
  },
  baseURL: config.apiBaseUrl,
});

// API.interceptors.request.use(
//   async (requestConfig) => {
//     const token = await firebase.getCurrentUserToken();
//     if (token) {
//       requestConfig.headers.Authorization = `Bearer ${token}`;
//     }
//     return requestConfig;
//   },
//   (error) => Promise.reject(error)
// );

const ORDER_API = axios.create({
  baseURL: config.orderUrl,
});

const PAYMENT_API = axios.create({
  baseURL: config.payUrl,
});

ORDER_API.interceptors.request.use(
  async (requestConfig) => {
    const token = await firebase.getCurrentUserToken();
    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    return requestConfig;
  },
  (error) => Promise.reject(error)
);

const USER_API = axios.create({
  baseURL: config.userUrl,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': config.gatewayApiKey,
  },
})

const apiService = {
  getProducts: async (lastRefKey) => {
    const response = await API.get('/v1/inventory/products', {
      params: { lastRefKey }
    });

    for (let i = 0; i < response.data.products.length; i++) {
      response.data.products[i].image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbYEfHfBCWleyU6BSpGgHz8E97mhC4nJo5pw&s";
    }

    return response.data;
  },
  getFeaturedProducts: async() =>{
    const response = await API.get('/v1/inventory/products');
    return response;
  },
    
  getRecommendedProducts: async () =>{
    const response = await API.get('/v1/inventory/products');
    return response;
  },
  createOrder: async (order) => {
    if (config.useDummyCall) {
      return apiService.createOrderDummy(order);
    }
    const response = await ORDER_API.post('/v1/orders', order);
    return response.data;
  },
  uploadPayment: async (paymentFormData) => {
    if (config.useDummyCall) {
      return apiService.uploadPaymentDummy(paymentFormData);
    }
    // Do NOT set a Content-Type header manually; axios will do this automatically.
    const response = await PAYMENT_API.post('/v1/orders/payment', paymentFormData);
    return response.data;
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
    previewShippingCost: async (payload) => {
      if (config.useDummyCall) {
        return apiService.previewShippingCostDummy(payload);
      }
      const response = await ORDER_API.post('/v1/orders/preview', payload, {
        headers: {
          'Accept': 'application/vnd.api.v1+json',
          'Content-Type': 'application/json',
        },
      });
      return response.data;
  },
  getUser: async (email) => {
    const response = await USER_API.post('/v1/users/verify', {
     email: email,
    });

    return response;

  },
  createUser: async (email, fullname) => {
    const response = await USER_API.post('/v1/users/create', {
      email: email,
      fullname: fullname
    })

    return response
  },
  createOrderDummy: async (apiPayload) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 5000)); // 2-second delay
    
    // Simulate a successful response
    return {
      orderId: Math.floor(Math.random() * 100000).toString(), // Random order ID
      status: 'success',
      message: 'Order created successfully!'
    };
  },
  uploadPaymentDummy: async (payment) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2-second delay
    
    // Simulate a successful response
    return {
      orderStatus: 'REVIEW_PAYMENT',
      message: 'Payment uploaded successfully!'
    };
  },
  previewShippingCostDummy: async (payload) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      totalAmount: 580.0,
      shippingCost: 0,
      discount: 0,
      items: [
        {
          productName: "Mizuno Phantom GT 97",
          productId: payload?.items?.[0]?.productId || "dummy-product-id",
          quantity: payload?.items?.[0]?.quantity || 0,
          price: 290.0,
          subTotal: 580.0,
        },
      ],
      warehouseName: "Warehouse_Bandung_1290",
      warehouseId: "f61ee532-f2a2-b27e-e682-a62df20cb7ca",
    };
  },
  getOrdersDummy: async () => {
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
