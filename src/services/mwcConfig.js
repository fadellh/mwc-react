const mwcConfig = {
  apiBaseUrl : import.meta.env.VITE_API_BASE_URL,
  gmapsApiKey: import.meta.env.VITE_GMAPS_API_KEY,
  inventoryUrl: 'http://localhost:8081',
  orderUrl: 'http://localhost:8080',
  useDummyCall: true,
};

export default mwcConfig;