import axios from 'axios';
const api = axios.create({
  baseURL: 'https://mern-project-server-blue.vercel.app', // backend
  headers: { 'Content-Type': 'application/json' },
});
export default api;
