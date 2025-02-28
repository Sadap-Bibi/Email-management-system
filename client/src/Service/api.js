import axios from 'axios';

// Backend Base URL
const API = axios.create({
  baseURL: 'http://localhost:3000/api/auth', // Updated to match your backend
  withCredentials: true, // Include credentials for authentication
});

// Attach token to requests if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
