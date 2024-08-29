import axios from 'axios';

export const httpClient = axios.create()

httpClient.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      if (refreshToken) {
        config.headers['x-refresh-token'] = refreshToken;
      }
  
      return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)