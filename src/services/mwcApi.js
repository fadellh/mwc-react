import axios from 'axios';
import config from "./mwcConfig";

// BASE_URL
const API = axios.create({
  baseURL: config.apiBaseUrl,

});

const apiService = {
  getProducts: async (lastRefKey) => {
    const response = await API.get('/v1/inventory/products', {
      params: { lastRefKey }
    });
    return response.data;
  },
};

export default apiService;
