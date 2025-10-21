import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // your backend URL
  withCredentials: false,
});

export default api;
