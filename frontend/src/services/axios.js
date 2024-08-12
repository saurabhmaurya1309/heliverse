import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://heliverse-1-j0cd.onrender.com/api', // Adjust the baseURL if needed
});

// Add a request interceptor to attach the token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
});

export default instance;
