// lib/api/axios.js

import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Main axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 🔥 IMPORTANT: Cookies automatically bhejega
});

// Request interceptor (optional logging)
apiClient.interceptors.request.use(
  (config) => {
    // Debug ke liye
    console.log('API Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Auto token refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Agar 401 error hai aur refresh nahi kiya
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      // Login/register endpoints skip karo
      if (originalRequest.url.includes('/login/') || 
          originalRequest.url.includes('/register/')) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // Agar pehle se refresh ho raha hai, queue mein daalo
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => apiClient(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Refresh token API call (cookie automatically jayegi)
        await apiClient.post('/auth/refresh/');
        
        processQueue(null);
        
        // Original request retry karo
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        
        // Refresh fail - login pe redirect
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);  