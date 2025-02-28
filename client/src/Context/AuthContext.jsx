/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';
import API from '../Service/api';

// Create Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      API.get('/me', { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data }) => {
          setUser(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user:", error.response?.data?.message || error.message);
          logout();
          setLoading(false); 
        });
    } else {
      setLoading(false);
    }
  }, []);
  
  

  const login = async (email, password) => {
    try {
      const { data } = await API.post('/login', { email, password });
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return true;
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
