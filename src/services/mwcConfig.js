const mwcConfig = {
  apiBaseUrl : import.meta.env.VITE_API_BASE_URL,
  gmapsApiKey: import.meta.env.VITE_GMAPS_API_KEY,
  inventoryUrl: 'http://localhost:8081',
  orderUrl: 'http://localhost:8080',
  // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
  // projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_FIREBASE_MSG_SENDER_ID,
  // appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export default mwcConfig;