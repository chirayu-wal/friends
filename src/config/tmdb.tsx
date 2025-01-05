// apiService.js
import axios from "axios";

import env from "./env";

const BASE_URL = env.VITE_TMDB_BASE_URL;

const apiService = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Interceptors (optional): You can use interceptors to handle requests or responses globally.

// Request interceptor
apiService.interceptors.request.use(
  (config: any) => {
    const token = env.VITE_TMDB_API_KEY;

    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }

    // You can modify the request config here (e.g., add headers)
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiService.interceptors.response.use(
  (response: any) => {
    // You can modify the response data here
    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default apiService;
