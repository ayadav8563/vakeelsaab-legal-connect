// api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://687b4fa5b4bc7cfbda855e8b.mockapi.io/lawyersListing',
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  return config;
});

export default api;