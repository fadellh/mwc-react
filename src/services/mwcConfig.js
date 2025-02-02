const mwcConfig = {
  apiBaseUrl : import.meta.env.VITE_API_BASE_URL,
  gatewayApiKey: import.meta.env.VITE_GATEWAY_API_KEY,
  gmapsApiKey: import.meta.env.VITE_GMAPS_API_KEY,
  inventoryUrl: import.meta.env.VITE_API_BASE_URL,
  orderUrl: import.meta.env.VITE_API_BASE_URL,
  userUrl: import.meta.env.VITE_API_BASE_URL,
  useDummyCall: false,
};

export default mwcConfig;