import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = () => {
  const { user,loading} = useContext(AuthContext);

  if (loading) return <>loading...</>  // Prevents flickering

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
