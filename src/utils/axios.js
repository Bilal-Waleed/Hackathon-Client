import axios from 'axios';
import cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || (typeof window !== 'undefined' ? window.location.origin : ''),
});

api.interceptors.request.use((config) => {
  const token = cookies.get('token') || (typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null);
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
